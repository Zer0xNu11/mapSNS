"use server";

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";

export async function likeHandler(postId: string) {
  console.log({ postId: postId });
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("ユーザーの値が異常です");
  }

  const existingLike = await prismadb.like.findUnique({
    where: {
      userId_postId: {
        userId: userId,
        postId: postId,
      },
    },
  })


existingLike? removeLike(userId, postId) : addLike(userId, postId) ;

}

// いいねを追加する関数
  async function addLike(userId: string, postId: string) {
    try {
      console.log('addLike========')
      return await prismadb.$transaction(async (tx) => {
        // いいねを作成
        const like = await tx.like.create({
          data: {
            userId: userId,
            postId: postId,
          },
          include: {
            post: {
              include: {
                note: true,
                books: true,
              },
            },
          },
        });
        
        console.log({like: like})

        // 関連するPostのLikeSumを更新
        if (like.post) {
          await updatePostLikeSum(tx, like.postId);
        }
        

        // 関連するNoteのLikeSumを更新
        if (like.post.note) {
          await updateNoteLikeSum(tx, like.post.note.id);
        }
        console.log('noteOk')

        // 関連するBookのLikeSumを更新
        for (const book of like.post.books) {
          await updateBookLikeSum(tx, book.bookId);
        }

        return like;
      });
    } catch (err) {
      console.log("いいねできないっす");
      console.log(err)
      return err;
    }
  }

  // いいねを削除する関数
  async function removeLike(userId: string, postId: string) {
    try {
      console.log('remove==========')
      return await prismadb.$transaction(async (tx) => {
        // いいねを削除
        const deletedLike = await tx.like.delete({
          where: {
            userId_postId: {
              userId: userId,
              postId: postId,
            },
          },
          include: {
            post: {
              include: {
                note: true,
                books: true,
              },
            },
          },
        });

        console.log({deletedLike:deletedLike});

        // // 関連するPostのLikeSumを更新
        if (deletedLike.post.id) {
          await updatePostLikeSum(tx, deletedLike.postId);
        }

        // 関連するNoteのLikeSumを更新
        if (deletedLike.post.note) {
          console.log(deletedLike.post.note.id);
          await updateNoteLikeSum(tx, deletedLike.post.note.id);
        }

        // 関連するBookのLikeSumを更新
        for (const book of deletedLike.post.books) {
          await updateBookLikeSum(tx, book.bookId);
        }

        return deletedLike;
      });
    } catch (error) {
      console.error("Error removing like:", error);
      throw error;
    }
  }


// PostのLikeSumを更新する関数==================
async function updatePostLikeSum(tx: any, postId: string) {
  const totalLikes = await tx.like.count({
    where: {
      postId: postId,
    },
  });
  await tx.post.update({
    where: { id: postId },
    data: { totalLikes: totalLikes },
  });
}

// NoteのLikeSumを更新する関数==================
async function updateNoteLikeSum(tx: any, noteId: string) {
  const totalLikes = await tx.like.count({
    where: {
      post: {
        noteId: noteId,
      },
    },
  });

  await tx.note.update({
    where: { id: noteId },
    data: { totalLikes: totalLikes },
  });
}

// BookのLikeSumを更新する関数==================
export async function updateBookLikeSum(tx: any, bookId: string) {
  const totalLikes = await tx.like.count({
    where: {
      post: {
        books: {
          some: {
            bookId: bookId,
          },
        },
      },
    },
  });

  await tx.book.update({
    where: { id: bookId },
    data: { totalLikes: totalLikes },
  });
}


/*
// PostのLikeSumを更新する関数==================
async function updatePostLikeSum(tx: any, postId: string) {
  const totalLikes = await tx.like.count({
    where: {
      postId: postId,
    },
  });

  await tx.likeSum.upsert({
    where: { postId: postId },
    update: { totalPostLikes: totalLikes },
    create: { postId: postId, totalPostLikes: totalLikes },
  });
}

// NoteのLikeSumを更新する関数==================
async function updateNoteLikeSum(tx: any, noteId: string) {
  const totalLikes = await tx.like.count({
    where: {
      post: {
        noteId: noteId,
      },
    },
  });

  await tx.likeSum.upsert({
    where: { noteId: noteId },
    update: { totalNoteLikes: totalLikes },
    create: { noteId: noteId, totalNoteLikes: totalLikes },
  });
}

// BookのLikeSumを更新する関数==================
export async function updateBookLikeSum(tx: any, bookId: string) {
  const totalLikes = await tx.like.count({
    where: {
      post: {
        books: {
          some: {
            bookId: bookId,
          },
        },
      },
    },
  });

  await tx.likeSum.upsert({
    where: { bookId: bookId },
    update: { totalBookLikes: totalLikes },
    create: { bookId: bookId, totalBookLikes: totalLikes },
  });
}

*/

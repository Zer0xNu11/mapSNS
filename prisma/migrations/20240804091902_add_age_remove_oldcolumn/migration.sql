/*
  Warnings:

  - You are about to drop the column `likedIds` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `book` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `likedIds` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `likedIds` on the `Post` table. All the data in the column will be lost.
  - Added the required column `title` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "likedIds",
ADD COLUMN     "tag" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "book",
DROP COLUMN "likedIds",
ADD COLUMN     "tag" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likedIds",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'other',
ADD COLUMN     "tag" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "NoteBooks" (
    "noteId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NoteBooks_pkey" PRIMARY KEY ("noteId","bookId")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikeSum" (
    "id" TEXT NOT NULL,
    "noteId" TEXT,
    "totalNoteLikes" INTEGER NOT NULL DEFAULT 0,
    "bookId" TEXT,
    "totalBookLikes" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LikeSum_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_postId_key" ON "Like"("userId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "LikeSum_noteId_key" ON "LikeSum"("noteId");

-- CreateIndex
CREATE UNIQUE INDEX "LikeSum_bookId_key" ON "LikeSum"("bookId");

-- AddForeignKey
ALTER TABLE "NoteBooks" ADD CONSTRAINT "NoteBooks_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteBooks" ADD CONSTRAINT "NoteBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeSum" ADD CONSTRAINT "LikeSum_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeSum" ADD CONSTRAINT "LikeSum_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

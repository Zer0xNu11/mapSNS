import NoteEditForm from "@/components/note/NoteEditForm";
import { prismadb } from "@/globals/db";
import { NoteType } from "@/types";

interface Params {
  params: { noteId: string };
}

const EditNotePage = async ({ params }: Params) => {
  const noteId = params.noteId;
  
  try{
    if (!noteId) {
      return new Error('存在しないノート')
    }
    const noteData = await prismadb.note.findUnique({
      where:{
        id: noteId
      },
      include: {
        author:true,
      }
    });

    if (!noteData) {
      return <div>ノートが見つかりませんでした。</div>;
    }

    const note: NoteType = {
      id: noteData.id,
      title: noteData.title,
      content: noteData.content ?? undefined,
      createdAt: noteData.createdAt.toISOString(),
      authorId: noteData.authorId,
      imageUrl: noteData.imageUrl ?? undefined,
      // 必要に応じて他のフィールドも追加
    };



    return(
      <>
      <NoteEditForm note ={note}/>
      </>
    )
  }catch(err){
    return(<div>{`${err}`}</div>)
  }
  
}

export default EditNotePage;


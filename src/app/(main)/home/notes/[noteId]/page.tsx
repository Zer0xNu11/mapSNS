import React from "react";

interface Params {
  params: { noteId: string };
}


const NotePage = async ({ params }: Params) => {
  const noteId = params.noteId;
  
  return (
    <div className="w-full h-[100vh] flex flex-row">
      <div className="w-[100%] h-[80vh]">
        Under Construction
      </div>
    </div>
  );
};

export default NotePage;

export const deleteNote = async (noteId: string) => {
  const isConfirmed = confirm("本当にこのノートを削除しますか？この操作は取り消せません。");

  // ユーザーがキャンセルした場合、関数を終了
  if (!isConfirmed) {
    console.log("削除がキャンセルされました");
    return null;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`,{
    cache:'no-store', //キャッシュ無効化のオプション
    method:"DELETE",
  });

  if(response.status !== 200){
    throw new Error('不正な値です');
  }

  const data = await response.json();
  console.log({data: data})
  alert(data.message);
  window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/home/notes`;
  return data;
}
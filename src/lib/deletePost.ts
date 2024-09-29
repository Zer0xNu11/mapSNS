export const deletePost = async (postId: string, path: string) => {
  const isConfirmed = confirm(
    "本当にこのノートを削除しますか？この操作は取り消せません。"
  );

  if (!isConfirmed) {
    console.log("削除がキャンセルされました");
    return null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
    {
      cache: "no-store",
      method: "DELETE",
    }
  );
  const data = await response.json();
  if (response.ok) {
    alert(data.message);
    window.location.href = `${path}`;
    // redirect(`${process.env.NEXT_PUBLIC_API_URL}/home`)
  } else {
    alert("削除に失敗しました");
  }
};
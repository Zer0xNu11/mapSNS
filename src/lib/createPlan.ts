export const tracePost = async (planId: string, postId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/trace/${planId}/${postId}`, {
    cache: "no-store",
  });
  const data = await response.json();
  console.log({tracePostData:data})
  return data.data;
};
import RecordForm from "@/components/RecordForm";

interface Params{
  params:{id:string};
}

const getTask = async (id: string):Promise<TaskDocument> =>{
  const response = await fetch(`${process.env.API_URL}/tasks/${id}`,{cache:'no-store',});

  const data = await response.json();
  return data.task as TaskDocument;
}

const RecordPage = async ({params}: Params) => {
  const id = params.id;
  const task = await getTask(id);
  console.log(params);
  console.log(task)
  return (
    <div className='flex flex-col justify-center py-20 '>
      <h2 className='text-center text-2xl font-bold'>Edit Task</h2>
      <RecordForm task={task} />

    </div>
  );
}

export default EditTaskPage
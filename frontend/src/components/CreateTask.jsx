import Button from "./Button";


const CreateTask = () => {
  return (
    <div className="flex flex-col gap-16">
      <h1 className="text-20 text-(--color-font-heading) font-semibold">
        Create Task
      </h1>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Task Title</p>
        <input
          type="text"
          placeholder="Create New Task"
          className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Start Time</p>
        <input
          type="datetime-local"
          className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
        <p className="text-14 text-(--color-black-40)">End Time</p>
        <input
          type="datetime-local"
          className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
      </div>
      <Button
        text={'Create'}
        className={
          'bg-(--color-primary) rounded-12 text-14 text-(--color-white-100) font-normal'
        }
      />
    </div>
  );
};


export default CreateTask
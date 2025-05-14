import Button from "./Button";

const CreateCalorie = () => {
  return (
    <div className="flex flex-col gap-16">
      <h1 className="text-20 text-(--color-font-heading) font-semibold">
        Intake/Burn Calories
      </h1>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Description</p>
        <input
          type="text"
          placeholder="Write something..."
          className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
      </div>
      <select className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none">
        <option value="intake">Intake</option>
        <option value="burn">Burn</option>
      </select>
      <Button
        text={'Create'}
        className={
          'bg-(--color-primary) rounded-12 text-14 text-(--color-white-100) font-normal'
        }
      />
    </div>
  );
};

export default CreateCalorie
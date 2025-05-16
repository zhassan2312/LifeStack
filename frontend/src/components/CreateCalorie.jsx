import React, { useState } from "react";
import Button from "./Button";
import { useFitnessStore } from "../store/useFitnessStore"; // adjust path as needed
import { useAuthStore } from "../store/useAuthStore";

const CreateCalorie = () => {
  const [type, setType] = useState("intake");
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [exercise, setExercise] = useState("");
  const { createIntake, createBurnt, loading, error } = useFitnessStore();
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user_id) return alert("User not logged in");
  if (!description || !calories || (type === "intake" ? !foodItem : !exercise)) {
    return alert("Please fill all fields.");
  }

  try {
    if (type === "intake") {
      await createIntake({
        food_item: foodItem,
        calories: Number(calories),
        description,
      });
    } else {
      await createBurnt({
        exercise,
        calories: Number(calories),
        description,
      });
    }
    // Reset fields after successful creation
    setDescription("");
    setCalories("");
    setFoodItem("");
    setExercise("");
    setType("intake");
  } catch (err) {
    // Optionally handle error here
    console.error(err);
  }
};

  return (
    <form className="flex flex-col gap-16" onSubmit={handleSubmit}>
      <h1 className="text-20 text-(--color-font-heading) font-semibold">
        Intake/Burn Calories
      </h1>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Description</p>
        <input
          type="text"
          placeholder="Write something..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Calories</p>
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
      </div>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none"
      >
        <option value="intake">Intake</option>
        <option value="burn">Burn</option>
      </select>
      {type === "intake" ? (
        <div className="flex flex-col gap-8">
          <p className="text-14 text-(--color-black-40)">Food Item</p>
          <input
            type="text"
            placeholder="Food Item"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <p className="text-14 text-(--color-black-40)">Exercise</p>
          <input
            type="text"
            placeholder="Exercise"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
          />
        </div>
      )}
      <Button
        text={loading ? "Creating..." : "Create"}
        className={
          "bg-(--color-primary) rounded-12 text-14 text-(--color-white-100) font-normal"
        }
        type="submit"
        disabled={loading}
      />
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default CreateCalorie;
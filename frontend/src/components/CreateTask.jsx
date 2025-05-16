import React, { useState } from "react";
import Button from "./Button";
import { useTaskStore } from "../store/useTaskStore";
import { useAuthStore } from "../store/useAuthStore"; // adjust path if needed

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [status, setStatus] = useState("Pending");

  const { createTask, loading, error } = useTaskStore();
  const user_id = useAuthStore((state) => state.authUser?.user_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent double submit
    if (!user_id) return alert("User not logged in");

    await createTask({
      name: title,
      description,
      status,
      start_time: startTime,
      priority: priority,
      end_time: endTime,
    });

    // Optionally reset form fields after successful creation
    setTitle("");
    setDescription("");
    setStartTime("");
    setEndTime("");
    setPriority("Normal");
    setStatus("Pending");
  };

  return (
    <form className="flex flex-col gap-16" onSubmit={handleSubmit}>
      <h1 className="text-20 text-(--color-font-heading) font-semibold">
        Create Task
      </h1>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Task Title</p>
        <input
          type="text"
          placeholder="Create New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Description</p>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Start Time</p>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
        <p className="text-14 text-(--color-black-40)">End Time</p>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Priority</p>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-12 border-2 border-(--color-black-40) rounded-12"
        >
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Status</p>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-12 border-2 border-(--color-black-40) rounded-12"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
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

export default CreateTask;
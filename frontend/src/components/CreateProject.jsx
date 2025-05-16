import React, { useState } from 'react';
import Button from './Button'; // Assuming Button is a custom component
import { useProjectStore } from '../store/useProjectStore'; // Adjust path as needed

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('Pending');
  const [billingType, setBillingType] = useState('hourly');
  const [hourlyRate, setHourlyRate] = useState('');
  const [projectAmount, setProjectAmount] = useState('');
  const { createProject, loading, error } = useProjectStore(); // Adjust if needed

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      name: title,
      description,
      priority,
      image_url: imageUrl,
      status,
      project_type: billingType === 'hourly' ? 'hourly' : 'project_based',
      ...(billingType === 'hourly'
        ? { hourly_rate: hourlyRate }
        : { project_rate: projectAmount }),
      // Optionally add deadline if your backend supports it
      // deadline,
    };
    await createProject(projectData);
    // Optionally reset form or show success message here
  };

  return (
    <form className="flex flex-col gap-16" onSubmit={handleSubmit}>
      <h1 className="text-20 text-(--color-font-heading) font-semibold">
        Create Project
      </h1>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Project Title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Project Title"
          className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
          required
        />
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Deadline</p>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="Select Deadline"
          className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Project Description"
          className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
          rows="4"
        ></textarea>
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Priority</p>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Image URL</p>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter Image URL"
          className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Status</p>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Billing Type</p>
        <select
          value={billingType}
          onChange={(e) => setBillingType(e.target.value)}
          className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none"
        >
          <option value="hourly">Hourly</option>
          <option value="project_based">Project Wise</option>
        </select>
      </div>
      {billingType === 'hourly' ? (
        <div className="flex flex-col gap-8">
          <p className="text-14 text-(--color-black-40)">Hourly Rate</p>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            placeholder="Enter Hourly Rate"
            className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
            required
          />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <p className="text-14 text-(--color-black-40)">Project Amount</p>
          <input
            type="number"
            value={projectAmount}
            onChange={(e) => setProjectAmount(e.target.value)}
            placeholder="Enter Project Amount"
            className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
            required
          />
        </div>
      )}
      <Button
        text={loading ? 'Creating...' : 'Create'}
        className={
          'bg-(--color-primary) rounded-12 text-14 text-(--color-white-100) font-normal'
        }
        type="submit"
        disabled={loading}
      />
      {error && (
        <div className="text-red-500 text-14 mt-2">{error}</div>
      )}
    </form>
  );
};

export default CreateProject;
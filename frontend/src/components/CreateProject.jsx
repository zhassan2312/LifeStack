import React, { useState } from 'react';
import Button from './Button'; // Assuming Button is a custom component

const CreateProject = () => {
  const [billingType, setBillingType] = useState('hourly'); // State to track billing type

  return (
    <div className="flex flex-col gap-16">
      <h1 className="text-20 text-(--color-font-heading) font-semibold">
        Create Project
      </h1>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Project Title</p>
        <input
          type="text"
          placeholder="Enter Project Title"
          className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Deadline</p>
        <input
          type="date"
          placeholder="Select Deadline"
          className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
        />
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Description</p>
        <textarea
          placeholder="Enter Project Description"
          className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
          rows="4"
        ></textarea>
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-14 text-(--color-black-40)">Billing Type</p>
        <select
          value={billingType}
          onChange={(e) => setBillingType(e.target.value)}
          className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none"
        >
          <option value="hourly">Hourly</option>
          <option value="project">Project Wise</option>
        </select>
      </div>
      {billingType === 'hourly' ? (
        <div className="flex flex-col gap-8">
          <p className="text-14 text-(--color-black-40)">Hourly Rate</p>
          <input
            type="number"
            placeholder="Enter Hourly Rate"
            className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <p className="text-14 text-(--color-black-40)">Project Amount</p>
          <input
            type="number"
            placeholder="Enter Project Amount"
            className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
          />
        </div>
      )}
      <Button
        text={'Create'}
        className={
          'bg-(--color-primary) rounded-12 text-14 text-(--color-white-100) font-normal'
        }
      />
    </div>
  );
};

export default CreateProject;
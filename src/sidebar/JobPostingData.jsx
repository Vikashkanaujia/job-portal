import React from "react";
import InputField from "../components/InputField";
const JobPostingData = ({ handleChange }) => {
  const now = new Date();
  console.log(now);
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const SevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const ThirtyDayAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  // convert date to string
  // const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString.slice(0,10);
  const isoString24 = twentyFourHoursAgo.toISOString(); // Convert the date to an ISO string
  const twentyFourHoursSlicedString = isoString24.slice(0, 10);

  const isoString7 = SevenDaysAgo.toISOString(); // Convert the date to an ISO string
  const SevenDaysAgoSlicedString = isoString7.slice(0, 10);

  const isoString30 = ThirtyDayAgo.toISOString(); // Convert the date to an ISO string
  const ThirtyDayAgoSlicedString = isoString30.slice(0, 10);

  
//   console.log(slicedString);

  return (
    <div>
      <h4 className="text-lg font-medium md-2 ">Date of posting</h4>
      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>All time
        </label>
        <InputField
          handleChange={handleChange}
          value={twentyFourHoursSlicedString}
          title="Last 24 hours"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value={SevenDaysAgoSlicedString}
          title="Last 7 Days"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value={ThirtyDayAgoSlicedString}
          title="Last Month"
          name="test"
        />
        
      </div>
    </div>
  );
};

export default JobPostingData;

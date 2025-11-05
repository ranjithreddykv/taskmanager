import React, { useState } from "react";
import moment from "moment";
import { FaBug, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineDoneAll, MdOutlineMessage } from "react-icons/md";
import Loading from "./Loader";
import Button from "./Button";

// Define task type icon mapping

const TASK_TYPE_ICONS = {
  commented: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <MdOutlineMessage size={20} />
    </div>
  ),
  started: (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <FaUser size={16} />
    </div>
  ),
  bug: (
    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
      <FaBug size={20} />
    </div>
  ),
  completed: (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
      <MdOutlineDoneAll size={22} />
    </div>
  ),
  "in progress": (
    <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white">
      <GrInProgress size={18} />
    </div>
  ),
};

const ACTIVITY_TYPES = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

const ActivityCard = ({ item, isLast }) => {
  const icon = TASK_TYPE_ICONS[item?.type?.toLowerCase()] || (
    <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white">
      ?
    </div>
  );

  return (
    <div className="relative flex items-start space-x-4">
      {/* Left: Icon + connecting line */}
      <div className="relative flex flex-col items-center">
        {icon}

        {/* Line connecting to the next activity */}
        {!isLast && (
          <div className="absolute top-10 bottom-0 w-[2px] bg-gray-300 h-[calc(100%+4.0rem)]"></div>
        )}
      </div>

      {/* Right: Details */}
      <div className="flex flex-col gap-y-1 mb-10">
        <p className="font-semibold text-gray-800">
          {item?.by?.name || item?.by || "Unknown User"}
        </p>
        <div className="text-gray-500 space-y-1">
          <span className="capitalize block font-medium">
            {item?.type || "Unknown Activity"}
          </span>
          <span className="text-sm">
            {item?.date ? moment(item.date).fromNow() : "Unknown Date"}
          </span>
        </div>
      </div>
    </div>
  );
};

// 🔹 Main component
const Activities = ({ activity = [] }) => {
  const [selected, setSelected] = useState(ACTIVITY_TYPES[0]);
  const [text, setText] = useState("");
  const isLoading = false;
  const handleSubmit = () => {};
  return (
    <div className="w-full flex flex-col md:flex-row gap-10 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto">
      {/* Left - Timeline Activity Feed */}
      <div className="w-full md:w-2/3">
        <h4 className="text-gray-700 font-semibold text-lg mb-6">Activities</h4>

        {activity.length === 0 ? (
          <p className="text-gray-500 italic">No activities yet.</p>
        ) : (
          <div className="relative">
            <div className="space-y-4">
              {activity.map((el, index) => (
                <ActivityCard
                  key={index}
                  item={el}
                  isLast={index === activity.length - 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right - Add Activity */}
      <div className="w-full md:w-1/3">
        <h4 className="text-gray-600 font-semibold text-lg mb-5">
          Add Activity
        </h4>
        <div className="w-full flex flex-wrap gap-5">
          {ACTIVITY_TYPES.map((item, index) => (
            <div key={item} className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selected === item ? true : false}
                onChange={(e) => setSelected(item)}
              />
              <p>{item}</p>
            </div>
          ))}
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type ....."
            className="bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500"
          ></textarea>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              type="button"
              label="Submit"
              onClick={handleSubmit}
              className="bg-blue-600 text-white rounded w-full py-1"
            ></Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;

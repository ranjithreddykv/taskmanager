import React from "react";
import clsx from "clsx";
import moment from "moment";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { BGS, TASK_TYPE } from "../../utils";
import UserInfo from "../user/UserInfo";

const TaskTable = ({ tasks = [] }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp className="text-red-500 text-lg" />,
    medium: <MdKeyboardArrowUp className="text-yellow-500 text-lg" />,
    normal: <MdKeyboardArrowDown className="text-green-500 text-lg" />,
  };

  const TableHeader = () => (
    <thead className="bg-gray-100 border-b border-gray-300">
      <tr className="text-gray-700 text-left">
        <th className="py-3 px-4 text-sm font-semibold w-1/3">Task Title</th>
        <th className="py-3 px-4 text-sm font-semibold w-1/5">Priority</th>
        <th className="py-3 px-4 text-sm font-semibold w-1/4">Team</th>
        <th className="py-3 px-4 text-sm font-semibold hidden md:table-cell w-1/4">
          Created At
        </th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-150">
      {/* Task Title */}
      <td className="py-3 px-4 text-sm">
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              "inline-block w-3 h-3 rounded-full",
              TASK_TYPE[task.stage] || "bg-gray-300"
            )}
          />
          <p className="font-medium text-gray-800 truncate max-w-[180px]">
            {task.title || "Untitled"}
          </p>
        </div>
      </td>

      {/* Priority */}
      <td className="py-3 px-4 text-sm">
        <div className="flex items-center gap-2">
          {ICONS[task.priority] || null}
          <span
            className={clsx(
              "px-2 py-0.5 rounded-full text-xs font-semibold capitalize",
              task.priority === "high"
                ? "bg-red-100 text-red-700"
                : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            )}
          >
            {task.priority}
          </span>
        </div>
      </td>

      {/* Team */}
      <td className="py-2 px-4">
        <div className="flex">
          {task.team && task.team.length > 0 ? (
            task.team.map((member, i) => (
              <div
                key={i}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1 shadow-sm",
                  BGS[i % BGS.length]
                )}
              >
                <UserInfo user={member} index={i} />
              </div>
            ))
          ) : (
            <span className="text-gray-400 text-sm">—</span>
          )}
        </div>
      </td>

      {/* Created At */}
      <td className="py-3 px-4 text-sm hidden md:table-cell text-gray-600">
        {task.date ? moment(task.date).fromNow() : "—"}
      </td>
    </tr>
  );

  return (
    <div className="w-full bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
      {/* Responsive Scroll Container */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto min-w-[600px]">
          <TableHeader />
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, id) => (
                <TableRow key={id} task={task} index={id} />
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;

import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import clsx from "clsx";
import { tasks } from "../../assets/data";
import { BGS, formatDate, PRIORITYSTYLES, TASK_TYPE } from "../../utils";
import Button from "../Button";
import UserInfo from "../user/UserInfo";
import ConfirmationDialog from "../Dialog";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TableHeader = () => (
  <thead className="border-b border-gray-300 bg-gray-50">
    <tr className="text-gray-700 text-left">
      <th className="py-3 px-4 text-sm font-semibold w-1/3">Task Title</th>
      <th className="py-3 px-4 text-sm font-semibold w-1/6">Priority</th>
      <th className="py-3 px-4 text-sm font-semibold w-1/6">Created At</th>
      <th className="py-3 px-4 text-sm font-semibold w-1/5">Assets</th>
      <th className="py-3 px-4 text-sm font-semibold hidden md:table-cell w-1/5">
        Team
      </th>
      <th className="py-3 px-4 text-sm font-semibold text-right w-1/5">
        Actions
      </th>
    </tr>
  </thead>
);

const TableRow = ({ task, onDelete }) => (
  <tr className="border-b border-gray-200 text-gray-700 hover:bg-gray-100/50">
    {/* Task Title */}
    <td className="py-3 px-4">
      <div className="flex items-center gap-2">
        <div className={clsx("w-3 h-3 rounded-full", TASK_TYPE[task.stage])} />
        <p className="line-clamp-2 text-sm md:text-base font-medium text-black">
          {task?.title}
        </p>
      </div>
    </td>

    {/* Priority */}
    <td className="py-3 px-4">
      <div className="flex gap-1 items-center">
        <span className={clsx("text-lg", PRIORITYSTYLES[task?.priority])}>
          {ICONS[task?.priority]}
        </span>
        <span className="capitalize text-sm md:text-base">
          {task?.priority} Priority
        </span>
      </div>
    </td>

    {/* Created At */}
    <td className="py-3 px-4">
      <span className="text-sm text-gray-600">
        {formatDate(new Date(task?.date))}
      </span>
    </td>

    {/* Assets/Activity/Subtasks */}
    <td className="py-3 px-4">
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <BiMessageAltDetail />
          <span>{task?.activites?.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <MdAttachFile />
          <span>{task?.assets?.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaList />
          <span>0/{task?.subTasks?.length}</span>
        </div>
      </div>
    </td>

    {/* Team Members */}
    <td className="py-3 px-4 hidden md:table-cell">
      <div className="flex">
        {task?.team?.map((m, index) => (
          <div
            key={m._id}
            className={clsx(
              "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
              BGS[index % BGS?.length]
            )}
          >
            <UserInfo user={m} index={index} />
          </div>
        ))}
      </div>
    </td>

    {/* Actions */}
    <td className="py-3 px-4 text-right">
      <div className="flex justify-end gap-2">
        <Button
          className="text-blue-600 hover:text-blue-500 text-sm md:text-base border-1 bg-blue-200 hover:bg-blue-300 hover:border-0 p-1 rounded-md"
          label="Edit"
          type="button"
        />
        <Button
          className="text-red-600 hover:text-red-500 text-sm md:text-base border-red-600 border-1 bg-red-200 hover:bg-red-300 hover:border-0 p-1 rounded-md"
          label="Delete"
          type="button"
          onClick={() => onDelete(task._id)}
        />
      </div>
    </td>
  </tr>
);

const Table = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteClicks = (id) => {
    setSelected(id)
    setOpenDialog(true);
  };
  const deleteHandler=()=>{

  }
  return (
    <div className="bg-white px-3 md:px-6 pb-6 shadow-md rounded-lg">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <TableHeader />
          <tbody>
            {tasks.map((task, index) => (
              <TableRow key={index} task={task} onDelete={deleteClicks} />
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </div>
  );
};

export default Table;

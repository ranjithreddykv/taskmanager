/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdGridView } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/task/TaskTitle.jsx";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data.js";
import Table from "../components/task/Table.jsx";
import AddTask from "../components/task/AddTask.jsx";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Task = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const status = params?.status || "";

  if (loading) return <Loading />;

  return (
    <div className="w-full relative">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        {!status && (
          <Button
            label={"Create Task"}
            icon={<IoMdAdd className="text-lg" />}
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white rounded-md py-2 px-4"
          />
        )}
      </div>

      {/* Tabs and Task Views */}
      <div>
        <Tabs tabs={TABS} setSelected={setSelected}>
          {!status && (
            <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
              <TaskTitle label="To Do" className={TASK_TYPE.todo} />
              <TaskTitle
                label="In Progress"
                className={TASK_TYPE["in progress"]}
              />
              <TaskTitle label="Completed" className={TASK_TYPE.completed} />
            </div>
          )}
        </Tabs>

        {selected === 0 ? <BoardView tasks={tasks} /> : <Table tasks={tasks} />}
      </div>

      {/* Add Task Modal - Render on Top */}
      {open && <AddTask open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Task;

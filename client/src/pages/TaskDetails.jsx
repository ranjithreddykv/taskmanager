import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import Tabs from "../components/Tabs";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { BGS, getInitials, PRIORITYSTYLES, TASK_TYPE } from "../utils";
import Activites from "../components/Activites"
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { tasks } from "../assets/data";

const assets = [
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
];

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/TimeLine", icon: <RxActivityLog /> },
];



const TaskDetails = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState(0);
  const task = tasks[0];
  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <h1 className="text-2xl text-gray-600 font-bold">{task?.title}</h1>
      <Tabs tabs={TABS} selected={selected} setSelected={setSelected}>
        {selected === 0 ? (
          <>
            <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto">
              {/* LEFT */}
              <div className="w-full md:w-1/2 space-y-8">
                <div className="flex items-center gap-5">
                  <div
                    className={clsx(
                      "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                      PRIORITYSTYLES[task?.priority],
                      bgColor[task?.priority]
                    )}
                  >
                    <span className="text-lg">{ICONS[task?.priority]}</span>
                    <span className="uppercase">{task?.priority} Priority</span>
                  </div>
                  <div className={clsx("flex items-center gap-2")}>
                    <div
                      className={clsx(
                        "w-4 h-4 rounded-full",
                        TASK_TYPE[task.stage]
                      )}
                    />
                  </div>
                </div>

                <p className="text-gray-500">
                  Created At: {new Date(task?.date).toDateString()}
                </p>

                <div className="flex items-center gap-8 p-4 border-y border-gray-200">
                  <div className="space-x-2">
                    <span className="font-semibold">Assets : </span>
                    <span>{task?.assets?.length}</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <div className="space-x-2">
                    <span className="font-semibold">Sub-Task</span>
                    <span>{task?.subTasks?.length}</span>
                  </div>
                </div>

                <div className="space-y-4 py-6">
                  <p className="text-gray-600 font-semibold text-sm">
                    TASK TEAM
                  </p>
                  <div className="space-y-3">
                    {task?.team?.map((m, index) => (
                      <div
                        key={index}
                        className="flex gap-4 py-2 items-center border-t border-gray-200"
                      >
                        <div
                          className={clsx(
                            "w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 ",
                            BGS[index % task.team?.length]
                          )}
                        >
                          <span className="text-center">
                            {getInitials(m?.name)}
                          </span>
                        </div>
                        <div className="space-y-4 py-6">
                          <p className="text-lg font-semibold">{m?.name}</p>
                          <span className="text-gray-500">{m.title}</span>
                        </div>
                        <div className="space-y-4 py-6">
                          <p className="text-gray-500 font-semibold text-sm">
                            SUB-TASKS
                          </p>
                          <div className="space-y-8"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4 py-6">
                    <p className="text-gray-500 font-semibold text-sm">
                      SUB-TASKS
                    </p>
                    <div className="space-y-8">
                      {task?.subTasks?.map((el, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-200">
                            <MdTaskAlt className="text-violet-600" size={26} />
                          </div>
                          <div className="space-y-1">
                            <div className="flex gap-2 items-center">
                              <span className="text-sm text-gray-500">
                                {new Date(el?.date).toDateString()}
                              </span>
                              <span className="px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold">
                                {el?.tag}
                              </span>
                            </div>
                            <p className="text-gray-700">{el?.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* RIGHT */}
              <div className="w-full md:w-1/2 space-y-8">
                <p className="text-lg font-semibold">ASSETS</p>
                <div className="w-full grid grid-cols-2 gap-1">
                  {task?.assets?.map((el, index) => (
                    <img
                      key={index}
                      src={el}
                      alt={task?.title}
                      className="w-full rounded h-28 md:h-30 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50"
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
            <Activites activity={task?.activities} id={id} />
        )}
      </Tabs>
    </div>
  );
};

export default TaskDetails;

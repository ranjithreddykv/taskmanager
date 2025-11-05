/* eslint-disable no-unused-vars */
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ICONS = {
  alert: <HiBellAlert className="h-5 w-5 text-yellow-600" />,
  message: <BiSolidMessageRounded className="h-5 w-5 text-blue-600" />,
};

const NotificationPanel = () => {
  const [selected, setSelected] = useState(null);

  // Mock data (you can replace this with your API response)
  const data = [
    {
      _id: 1,
      type: "message",
      text: "You have a new message from John",
      createdAt: new Date(),
      read: false,
    },
    {
      _id: 2,
      type: "alert",
      text: "Server backup completed successfully",
      createdAt: moment().subtract(2, "hours"),
      read: true,
    },
  ];

  const readHandler = (id) => {
    console.log("Mark as read:", id);
  };

  const markAllRead = () => {
    console.log("Mark all notifications as read");
  };

  return (
    <div className="relative">
      <Popover className="relative">
        <PopoverButton className="inline-flex items-center outline-none">
          <div
            className={`relative w-10 h-10 flex items-center justify-center 
                bg-white text-black rounded-full shadow 
                hover:bg-gray-100 transition
                ${data?.length > 0 ? "animate-bell" : ""}`}
          >
            <IoNotificationsOutline className="text-2xl" />
            {data?.length > 0 && (
              <span className="absolute top-1 right-1 text-xs text-white font-semibold w-4 h-4 flex items-center justify-center rounded-full bg-red-600">
                {data?.length}
              </span>
            )}
          </div>
        </PopoverButton>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            className="absolute right-0 z-20 mt-3 w-80 
                         bg-white border border-gray-200 
                         shadow-xl rounded-xl p-3"
          >
            <div className="flex justify-between items-center px-2 pb-2 border-b border-gray-200">
              <h3 className="text-gray-800 font-semibold text-sm">
                Notifications
              </h3>
              {data.length > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications list */}
            <div className="mt-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
              {data.length > 0 ? (
                data.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => readHandler(item._id)}
                    className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition ${
                      item.read
                        ? "bg-transparent hover:bg-gray-100"
                        : "bg-indigo-50"
                    }`}
                  >
                    <div>{ICONS[item.type]}</div>
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          item.read
                            ? "text-gray-700"
                            : "text-gray-900 font-medium"
                        }`}
                      >
                        {item.text}
                      </p>
                      <p className="text-xs text-gray-500">
                        {moment(item.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-sm text-gray-500">
                  No new notifications 🎉
                </div>
              )}
            </div>

            {/* Footer */}
            {data.length > 0 && (
              <div className="pt-2 mt-2 border-t border-gray-200 text-center">
                <Link
                  to="/notifications"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  View all notifications
                </Link>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  );
};

export default NotificationPanel;

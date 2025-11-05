/* eslint-disable no-unused-vars */
import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems,Transition} from "@headlessui/react";

import { Fragment } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils";

const UserAvatar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    // Example: dispatch(logout()) or clear localStorage
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const initials = user?.name ? getInitials(user.name) : "U";

  return (
    <div className="relative">
      <Menu as="div" className="relative inline-block text-left">
        {/* Avatar button */}
        <div>
          <MenuButton className="flex items-center justify-center w-10 h-10 2xl:w-12 2xl:h-12 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all">
            {initials}
          </MenuButton>
        </div>

        {/* Dropdown menu */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 mt-3 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none z-50">
            <div className="p-3 text-center">
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="font-semibold text-gray-800 truncate">
                {user?.email || "guest@example.com"}
              </p>
            </div>

            <div className="">
              {/* Profile */}
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={() => navigate("/profile")}
                    className={`${
                      focus ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    } flex items-center w-full px-3 py-2 rounded-md text-sm gap-2 transition`}
                  >
                    <FaUser />
                    Profile
                  </button>
                )}
              </MenuItem>

              {/* Change Password */}
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={() => navigate("/change-password")}
                    className={`${
                      focus ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    } flex items-center w-full px-3 py-2 rounded-md text-sm gap-2 transition`}
                  >
                    <FaUserLock />
                    Change Password
                  </button>
                )}
              </MenuItem>
            </div>

            <div>
              {/* Logout */}
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={logoutHandler}
                    className={`${
                      focus ? "bg-red-50 text-red-600" : "text-gray-700"
                    } flex items-center w-full px-3 py-2 rounded-md text-sm gap-2 transition`}
                  >
                    <IoLogOutOutline />
                    Logout
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserAvatar;

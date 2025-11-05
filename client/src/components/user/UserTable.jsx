import React from "react";
import { BGS, getInitials } from "../../utils";
import clsx from "clsx";
import moment from "moment";

const TableHeader = () => (
  <thead className="bg-gray-100 border-b border-gray-300">
    <tr className="text-gray-700 text-left">
      <th className="py-3 px-4 text-sm font-semibold w-1/3">User</th>
      <th className="py-3 px-4 text-sm font-semibold w-1/5">Status</th>
      <th className="py-3 px-4 text-sm font-semibold hidden md:table-cell w-1/4">
        Joined
      </th>
    </tr>
  </thead>
);

const TableRow = ({ user, id }) => (
  <tr className="border-b border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-150">
    {/* User Info */}
    <td className="py-3 px-4">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className={clsx(
            "w-10 h-10 rounded-full text-white flex items-center justify-center text-sm font-medium shadow-sm",
            BGS[id % BGS.length]
          )}
        >
          <span>{getInitials(user?.name)}</span>
        </div>

        {/* Name & Role */}
        <div className="flex flex-col">
          <p className="font-medium text-gray-800">{user?.name || "Unknown"}</p>
          <span className="text-xs text-gray-500">{user?.role || "—"}</span>
        </div>
      </div>
    </td>

    {/* Status */}
    <td className="py-3 px-4">
      <p
        className={clsx(
          "inline-block px-3 py-1 rounded-full text-xs font-medium capitalize",
          user?.isActive
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        )}
      >
        {user?.isActive ? "Active" : "Disabled"}
      </p>
    </td>

    {/* Created At */}
    <td className="py-3 px-4 text-sm hidden md:table-cell text-gray-600">
      {moment(user?.createdAt).fromNow()}
    </td>
  </tr>
);

const UserTable = ({ users = [] }) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
      {/* Table Wrapper for small screens */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto min-w-[500px]">
          <TableHeader />
          <tbody>
            {users.length > 0 ? (
              users.map((user, id) => <TableRow key={id} user={user} id={id} />)
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;

import React, { useState } from "react";
import Title from "../components/Title";
import { IoMdAdd } from "react-icons/io";
import Button from "../components/Button";
import { summary } from "../assets/data";
import { BGS, getInitials } from "../utils";
import clsx from "clsx";
import ConfirmationDialog, { UserAction } from "../components/Dialog";
import AddUser from "../components/AddUser";
const userActionHandler = () => {};
const deleteHandler = () => {};
const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };
  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };
  const TableHeader = () => (
    <thead className="border-b border-gray-300 bg-gray-50">
      <tr className="text-gray-700 text-left">
        <th className="py-3 px-4 text-sm font-semibold w-1/3">Full Name</th>
        <th className="py-3 px-4 text-sm font-semibold w-1/6">Title</th>
        <th className="py-3 px-4 text-sm font-semibold w-1/6">Email</th>
        <th className="py-3 px-4 text-sm font-semibold w-1/5">Role</th>
        <th className="py-3 px-4 text-sm font-semibold w-1/5">Active</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user, key, index }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="p-2">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "w-9 h-9 rounded-full text-white flex items-center justify-center text-sm ",
              BGS[index % BGS?.length]
            )}
          >
            <span className="text-xs md:text-sm text-center">
              {getInitials(user.name)}
            </span>
          </div>
        </div>
      </td>
      <td className="p-2">{user.title}</td>
      <td className="p-2">user@gmail.com</td>
      <td className="p-2">{user.role}</td>

      <td>
        <button
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>
      <td className="p-2 flex gap-4 justfiy-end">
        <Button
          className="text-blue-600 px-2 bg-blue-200  hover:text-blue-500 font-semibold rounded-md"
          label="Edit"
          type="button"
          onClick={() => editClick(user)}
        />
        <Button
          className="text-red-700 bg-red-200 px-2 rounded-md hover:text-red-500 font-semibold "
          label="Delete"
          type="button"
          onClick={() => deleteClick(user?.id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Team Members" />
          <Button
            label="Add New User"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-700 p-1 rounded-md text-white"
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="bg-white px-3 md:px-6 pb-6 shadow-md rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <TableHeader />
              <tbody>
                {summary.users.map((user, index) => (
                  <TableRow key={index} user={user} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default Users;

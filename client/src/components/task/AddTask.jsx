import { DialogTitle } from "@headlessui/react";
import React, { useState } from "react";
import ModelWrapper from "../ModelWrapper";
import { useForm } from "react-hook-form";
import Textbox from "../Textbox";
import UserList from "../UserList";
import SelectedList from "../SelectedList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen }) => {
  const task = "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORITY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler = () => {};

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <ModelWrapper open={open} setOpen={setOpen}>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full max-w-2xl mx-auto px-4 sm:px-6"
      >
        {/* Title */}
        <DialogTitle
          as="h2"
          className="text-lg font-bold text-gray-900 mb-6 text-center sm:text-left"
        >
          {task ? "UPDATE TASK" : "ADD TASK"}
        </DialogTitle>

        <div className="flex flex-col gap-6">
          {/* Task Title */}
          <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label="Task Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          {/* Team Selection */}
          <UserList setTeam={setTeam} team={team} />

          {/* Stage & Date */}
          <div className="flex flex-col sm:flex-row gap-4">
            <SelectedList
              label="Task Stage"
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />
            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Task Date"
              className="w-full rounded"
              register={register("date", { required: "Date is required" })}
              error={errors.date ? errors.date.message : ""}
            />
          </div>

          {/* Priority & File Upload */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <SelectedList
              label="Priority Level"
              lists={PRIORITY}
              selected={priority}
              setSelected={setPriority}
            />
            <div className="w-full sm:w-auto flex items-center justify-center mt-2 sm:mt-0">
              <label
                htmlFor="imageUpload"
                className="flex gap-1 items-center justify-center cursor-pointer text-blue-600 hover:text-blue-700"
              >
                <BiImages className="text-2xl" />
                <span className="text-xs mt-1">Upload</span>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  onChange={handleSelect}
                  accept=".jpg,.jpeg,.png"
                  multiple
                />
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="bg-gray-50 py-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <Button
              type="button"
              className="bg-red-400 px-6 py-2 rounded-md text-sm font-semibold text-white hover:bg-red-500 sm:w-auto"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
            {uploading ? (
              <span className="text-sm py-2 text-red-500 text-center sm:text-left">
                Uploading assets...
              </span>
            ) : (
              <Button
                label="Submit"
                type="submit"
                className="bg-blue-600 px-8 py-2 rounded-md text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              />
            )}
          </div>
        </div>
      </form>
    </ModelWrapper>
  );
};

export default AddTask;

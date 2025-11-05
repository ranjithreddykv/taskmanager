import { useForm } from "react-hook-form";
import ModalWrapper from "../ModelWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";

const AddSubTask = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleOnSubmit = async (data) => {};
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            ADD SUB-TASK
          </DialogTitle>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Sub-Task title"
              type="text"
              name="title"
              label="Title"
              className="w-full rounded"
              register={register("title", { required: "Title is required!" })}
              error={errors.title ? errors.title.message : ""}
            />
            <div className="flex items-center gap-4">
              <Textbox
                placeholder="Date"
                type="date"
                name="date"
                label="Task Date"
                className="w-full rounded"
                register={register("date", {
                  required: "Date is required !",
                })}
                error={errors.date ? errors.date.message : ""}
              />
              <Textbox
                placeholder="Tag"
                type="text"
                name="tag"
                label="Tag"
                className="w-full rounded"
                register={register("tag", {
                  required: "Tag is required !",
                })}
                error={errors.tag ? errors.tag.message : ""}
              />
            </div>
          </div>
          <div className="bg-gray-50 py-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <Button
              type="button"
              className="bg-red-400 px-6 py-2 rounded-md text-sm font-semibold text-white hover:bg-red-500 sm:w-auto"
              onClick={() => setOpen(false)}
              label="Cancel"
            />

            <Button
              label="Submit"
              type="submit"
              className="bg-blue-600 px-8 py-2 rounded-md text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};
export default AddSubTask

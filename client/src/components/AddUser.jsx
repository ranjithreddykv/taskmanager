import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ModalWrapper from "./ModelWrapper";
import { Dialog, DialogTitle } from "@headlessui/react";
import Textbox from "../components/Textbox";
import Loading from "../components/Loader";
import Button from "./Button";
const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const isLoading = false,
    isUpdating = false;
  const { user } = useSelector((state) => state.auth);
  const handleOnSubmit = () => {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(defaultValues);
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </DialogTitle>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Full name"
              type="text"
              name="name"
              label="Full Name"
              className="w-full rounded"
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder="Title"
              type="text"
              name="title"
              label="Title"
              className="w-full rounded"
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder="Email Address"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded"
              register={register("email", {
                required: "Email is required",
              })}
              error={errors.email ? errors.email.message : ""}
            />
            <Textbox
              placeholder="Role"
              type="text"
              name="role"
              label="Role"
              className="w-full rounded"
              register={register("rold", {
                required: "User rold is required",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>
          {isLoading || isUpdating ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 text-white px-8 text-sm font-semibold hover:bg-blue-500"
                label="Submit"
              />
              <Button
              type='button'
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={()=>setOpen(false)}
              label='Cancel'
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;

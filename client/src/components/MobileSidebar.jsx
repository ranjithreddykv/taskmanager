import  { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import Sidebar from "../components/Sidebar";
import { IoMdClose } from "react-icons/io";

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  console.log(isSidebarOpen);
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const closeSidebar = () => dispatch(setOpenSidebar(false));

  return (
    <Transition
      as={Fragment}
      show={isSidebarOpen}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 translate-x-full"
      enterTo="opacity-100 translate-x-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-full"
    >
      <div
        ref={menuRef}
        onClick={closeSidebar}
        className={clsx(
          "fixed inset-0 z-50 md:hidden w-full h-full bg-black/40 backdrop-blur-sm transform transition-transform duration-500",
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div
          className="bg-white w-3/4 h-full shadow-lg"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <div className="flex justify-end p-4">
            <button onClick={closeSidebar}>
              <IoMdClose size={25} />
            </button>
          </div>
          <Sidebar />
        </div>
      </div>
    </Transition>
  );
};

export default MobileSidebar;

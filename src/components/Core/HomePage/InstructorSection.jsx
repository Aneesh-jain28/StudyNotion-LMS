import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Instructor from "../../../assets/Images/Instructor.png";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "./HighlightText";
import { logout } from "../../../services/operations/authAPI";

export default function InstructorSection() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBecomeInstructor = () => {
    if (token) {
      dispatch(logout(navigate));
    }
    navigate("/signup");
  };

  return (
    <div className="font-inter">
      <div className="flex flex-col lg:flex-row gap-20 items-center justify-center">
        <div className="lg:w-[50%]">
          <img
            src={Instructor}
            alt="Instructor"
            className="shadow-white shadow-[-20px_-20px_0_0]"
          />
        </div>

        <div className="lg:w-[50%] flex gap-10 flex-col ">
          <div className=" lg:w-[50%]  text-4xl font-semibold">
            Become an
            <HighlightText text={" Instructor"} />
          </div>

          <div className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </div>

          <div className="w-fit">
            <div
              onClick={handleBecomeInstructor}
              className="cursor-pointer px-6 py-3 flex justify-center items-center hover:shadow-none hover:scale-95 transition-all duration-200 font-bold bg-[#FFD60A] text-richblack-900 leading-[24px] text-[16px] text-center rounded-[8px]"
            >
              <div className="flex items-center gap-3">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

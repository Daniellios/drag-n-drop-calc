import React from "react";
import { useDispatch } from "react-redux";
import { calculate } from "../../store/slices/calculatorSlice";

const Equals = () => {
  const dispatch = useDispatch();

  return (
    <div className={`flex w-full gap-2 justify-center items-center `}>
      <button
        onClick={() => dispatch(calculate())}
        className="flex justify-center items-center text-white bg-[#5D5FEF] rounded-md w-full h-16 hover:bg-[#5D5FEF]/90 transition-all"
      >
        =
      </button>
    </div>
  );
};

export default Equals;

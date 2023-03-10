import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { clear } from "../store/slices/calculatorSlice";
import {
  setCanvasAsConstructor,
  setCanvasAsRuntime,
} from "../store/slices/uiSlice";
import { CanvasStateType } from "../types/enums";
import EyeIcon from "./icons/EyeIcon";
import SelectorIcon from "./icons/SelectorIcon";

const ModeSwitcher: React.FC = () => {
  const { canvasState } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const RUNTIME = canvasState === CanvasStateType.RUNTIME;
  const CONSTRUCTOR = canvasState === CanvasStateType.CONSTRUCTOR;

  const handleSetRunTime = () => {
    dispatch(setCanvasAsRuntime());
    dispatch(clear());
  };

  const handleSetConstructor = () => {
    dispatch(setCanvasAsConstructor());
    dispatch(clear());
  };

  return (
    <div className="flex w-full rounded-md justify-between p-[1px] h-[37px] text-[#4D5562] font-medium ">
      <button
        onClick={handleSetRunTime}
        disabled={RUNTIME}
        className={`switcher_btn ${RUNTIME ? "border border-[#E2E3E5]" : ""}`}
      >
        <EyeIcon isActive={RUNTIME} />
        Runtime
      </button>

      <button
        onClick={handleSetConstructor}
        className={`switcher_btn ${
          CONSTRUCTOR ? "border border-[#E2E3E5]" : ""
        }`}
      >
        <SelectorIcon isActive={CONSTRUCTOR} />
        Constructor
      </button>
    </div>
  );
};

export default ModeSwitcher;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { numpad } from "../../constants/calculatorButtons";
import { RootState } from "../../store";
import { enterDecimal, enterNumber } from "../../store/slices/calculatorSlice";
import { CanvasStateType } from "../../types/enums";

const Numpad = () => {
  const dispatch = useDispatch();
  const { canvasState } = useSelector((state: RootState) => state.ui);

  const RUNTIME = canvasState === CanvasStateType.RUNTIME;

  const handleNumpadEnter = (value: string) => {
    if (value === ",") dispatch(enterDecimal());
    else dispatch(enterNumber(value));
  };

  return (
    <div className={`grid grid-cols-3 gap-2 w-full`}>
      <>
        {numpad.map((numpadValue) => {
          return (
            <button
              className={`button_calculator ${!RUNTIME && "button_no_hover"} ${
                numpadValue === "0" && `button_zero`
              }`}
              key={numpadValue}
              onClick={() => handleNumpadEnter(numpadValue)}
            >
              {numpadValue}
            </button>
          );
        })}
      </>
    </div>
  );
};

export default Numpad;

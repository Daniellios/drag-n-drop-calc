import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { operators } from "../../constants/calculatorButtons";
import { RootState } from "../../store";
import { operation } from "../../store/slices/calculatorSlice";
import { CanvasStateType } from "../../types/enums";

const Operators = () => {
  const dispatch = useDispatch();
  const { canvasState } = useSelector((state: RootState) => state.ui);

  const RUNTIME = canvasState === CanvasStateType.RUNTIME;

  const handleOperatorEnter = (operator: string) => {
    dispatch(operation(operator));
  };

  return (
    <div className="flex w-full justify-between">
      {operators.map((operator, idx) => (
        <button
          key={idx}
          onClick={() => handleOperatorEnter(operator)}
          className={`button_calculator button_operator ${
            !RUNTIME && "button_no_hover"
          }`}
        >
          {operator}
        </button>
      ))}
    </div>
  );
};

export default Operators;

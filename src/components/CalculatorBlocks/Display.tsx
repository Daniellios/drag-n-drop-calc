import React from "react";
import { useSelector } from "react-redux";
import { formatDisplay } from "../../helpers/formatDisplay";
import { RootState } from "../../store";

const Display: React.FC = () => {
  const { display } = useSelector((state: RootState) => state.calculator);

  const formattedDisplay = formatDisplay(display);

  return (
    <div className={`flex w-full`}>
      <input
        type="text"
        value={formattedDisplay}
        className="h-[60px] pointer-events-none  w-full text-[36px] px-2 py-1 text-[#111827] placeholder:text-[#111827] text-right font-extrabold placeholder:text-right border border-[#F3F4F6] rounded-md focus:outline-none"
        placeholder={display}
      />
    </div>
  );
};

export default Display;

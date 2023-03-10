import React from "react";
import { removeShadowed } from "../helpers/uniqueIdToggle";
import { IDragableItem } from "../types/components";
import Dragable from "./DragComponents/Dragable";

interface IPlaceholderProps {
  items: IDragableItem[];
  activeElementId: string | null;
}

const Placeholder: React.FC<IPlaceholderProps> = ({
  items,
  activeElementId,
}) => {
  return (
    <div
      className={`flex flex-col gap-3 justify-center w-60 rounded-md  bg-white`}
    >
      {items.map((item, idx) => {
        if (item.isOnCanvas || removeShadowed(item.id) === activeElementId) {
          return (
            <Dragable
              key={item.id}
              id={item.id}
              idx={idx}
              disabled
              isUnDraggable={item.isOnCanvas}
              isPressable={false}
            >
              {item.name}
            </Dragable>
          );
        } else {
          return (
            <Dragable
              key={item.id}
              id={item.id}
              idx={idx}
              isPressable={false}
              hasContainer
            >
              {item.name}
            </Dragable>
          );
        }
      })}
    </div>
  );
};

export default Placeholder;

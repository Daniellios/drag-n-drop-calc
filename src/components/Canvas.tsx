import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CanvasStateType } from "../types/enums";
import Dragable from "./DragComponents/Dragable";
import EmptyConstructorIcon from "./icons/EmptyConstructorIcon";
import ModeSwitcher from "./ModeSwitch";
import RemoveDraggable from "./DragComponents/RemoveDraggable";
import { IDragableItem } from "../types/components";

interface ICanvasProps {
  id: string;
  items: IDragableItem[];
  returnToPlaceholder: (id: string) => void;
}
const Canvas: React.FC<ICanvasProps> = ({ items, returnToPlaceholder, id }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  const canvasState = useSelector((state: RootState) => state.ui.canvasState);

  const RUNTIME = canvasState === CanvasStateType.RUNTIME;
  const CONSTRUCTOR = canvasState === CanvasStateType.CONSTRUCTOR;

  return (
    <div
      className={`flex flex-col gap-[30px] w-[243px] rounded-md bg-white ${
        RUNTIME ? "ml-[296px]" : ""
      }`}
    >
      <ModeSwitcher />

      <SortableContext
        items={items}
        id={id}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={`h-[480px] w-full flex transition-all rounded-md ${
            items.length === 0 && CONSTRUCTOR
              ? "flex-row justify-center border-2 border-dashed border-[#C4C4C4]"
              : "justify-start flex-col items-center gap-2 "
          }`}
        >
          {CONSTRUCTOR ? (
            items.length > 0 ? (
              <>
                {items.map((item, idx) => {
                  return (
                    <RemoveDraggable
                      key={item.id}
                      removableId={item.id}
                      handleRemove={returnToPlaceholder}
                    >
                      <Dragable id={item.id} idx={idx} isPressable={RUNTIME}>
                        {item.name}
                      </Dragable>
                    </RemoveDraggable>
                  );
                })}
              </>
            ) : (
              <div className="flex flex-col justify-center items-center max-w-[127px] gap-1 text-center ">
                <EmptyConstructorIcon />
                <span className="text-[#5D5FEF] leading-4 pt-2">
                  Перетащите сюда
                </span>
                <p className="font-normal text-[#6B7280] text-[12px] leading-[14.5px] ">
                  любой элемент из левой панели
                </p>
              </div>
            )
          ) : (
            items.map((item) => item.name)
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default Canvas;

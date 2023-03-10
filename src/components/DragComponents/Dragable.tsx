import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CanvasStateType } from "../../types/enums";

interface DragableProps {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
  idx: number;
  isUnDraggable?: boolean;
  hasContainer?: boolean;
  isPressable?: boolean;
}

const Dragable: React.FC<DragableProps> = ({
  id,
  idx,
  children,
  disabled = false,
  isUnDraggable = false,
  hasContainer = false,
  isPressable = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    activeIndex,
    over,
    isDragging,
  } = useSortable({ id, disabled, data: { idx } });

  const canvasState = useSelector((state: RootState) => state.ui.canvasState);

  const CONSTRUCTOR = canvasState === CanvasStateType.CONSTRUCTOR;

  const animationStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const blockHasOverlayStyle = isUnDraggable && `no_drag_overlay`;
  const blockIsDrragging = isDragging && `no_drag_overlay`;

  const blockHasContainer = hasContainer && `shadow_container`;

  const canPress = CONSTRUCTOR && !isPressable && `no_click_overlay`;

  const insertLine =
    activeIndex !== null && over?.id === id && !isDragging
      ? idx > activeIndex && !over.id.includes("shadowed")
        ? "line_before"
        : "line_after"
      : "undefined";

  return (
    <div
      ref={setNodeRef}
      style={animationStyles}
      {...listeners}
      {...attributes}
      draggable={isUnDraggable}
      className={`w-full relative ${blockHasOverlayStyle} ${canPress} ${blockIsDrragging} ${blockHasContainer} ${insertLine} `}
    >
      {children}
    </div>
  );
};

export default Dragable;

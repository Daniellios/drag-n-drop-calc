import {
  closestCorners,
  defaultDropAnimation,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import Canvas from "./components/Canvas";
import Display from "./components/CalculatorBlocks/Display";
import Placeholder from "./components/Placeholder";
import Operators from "./components/CalculatorBlocks/Operators";
import Numpad from "./components/CalculatorBlocks/Numpad";
import Equals from "./components/CalculatorBlocks/Equals";

import {
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { BlockType, CanvasStateType } from "./types/enums";

import { useSelector } from "react-redux";
import { RootState } from "./store";
import { addShadowed, removeShadowed } from "./helpers/uniqueIdToggle";
import { IDragableItem } from "./types/components";

function App() {
  const canvasState = useSelector((state: RootState) => state.ui.canvasState);

  const CONSTRUCTOR = canvasState === CanvasStateType.CONSTRUCTOR;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),

    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );

  const [items, setItems] = useState<IDragableItem[]>([
    {
      id: BlockType.DISPLAY,
      name: <Display />,
      isOnCanvas: false,
    },
    {
      id: BlockType.OPERATORS,
      name: <Operators />,
      isOnCanvas: false,
    },
    {
      id: BlockType.NUMPAD,
      name: <Numpad />,
      isOnCanvas: false,
    },
    {
      id: BlockType.EQUALS,
      name: <Equals />,
      isOnCanvas: false,
    },
  ]);

  const [shadowedItems, setShadowedItems] = useState<IDragableItem[]>(
    addShadowed(items)
  );

  const [activeElementId, setActiveElmentId] = useState<null | string>(null);

  const returnToPlaceholder = (id: string) => {
    setShadowedItems(() =>
      shadowedItems.map((item) =>
        removeShadowed(item.id) !== id
          ? item
          : {
              ...item,
              isOnCanvas: false,
            }
      )
    );

    setItems(() =>
      items.map((item) =>
        item.id !== id
          ? item
          : {
              ...item,
              isOnCanvas: false,
            }
      )
    );

    setActiveElmentId(null);
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const activeID = removeShadowed(active.id.toString());

    setActiveElmentId(activeID);
  };

  const handleDragCancel = () => setActiveElmentId(null);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      return handleDragCancel();
    }

    const draggintItem = items.find((item) => item.id === activeElementId);

    if (!draggintItem) return;

    if (!draggintItem.isOnCanvas) {
      draggintItem.isOnCanvas = true;

      setItems(() => {
        const newItems = items.map((item) =>
          item.id === activeElementId ? draggintItem : item
        );

        const oldIndex = items.findIndex((item) => item.id === activeElementId);

        return arrayMove(newItems, oldIndex, items.length - 1);
      });

      setShadowedItems(() =>
        shadowedItems.map((shadowItem) => {
          return removeShadowed(shadowItem.id) === activeElementId
            ? { ...shadowItem, isOnCanvas: true }
            : shadowItem;
        })
      );

      return setActiveElmentId(null);
    }

    if (activeElementId !== over.id) {
      setItems(() => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const activeComponent =
    items.find((item) => item.id === activeElementId) ?? null;

  const itemsOnCanvas = items.filter((item) => item.isOnCanvas);

  return (
    <div className="App">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
      >
        <div className="flex gap-14 items-start w-[539px]">
          {CONSTRUCTOR && (
            <Placeholder
              items={shadowedItems}
              activeElementId={activeElementId}
            ></Placeholder>
          )}

          <Canvas
            id="canvas"
            items={itemsOnCanvas}
            returnToPlaceholder={returnToPlaceholder}
          ></Canvas>

          <DragOverlay dropAnimation={dropAnimation}>
            {activeComponent ? <>{activeComponent.name}</> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
}

export default App;

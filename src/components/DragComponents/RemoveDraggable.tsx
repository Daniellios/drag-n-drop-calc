import React from "react";

interface Props {
  handleRemove: (id: string) => void;
  removableId: string;
  children: React.ReactNode;
}

const RemoveDraggable: React.FC<Props> = ({
  handleRemove,
  children,
  removableId,
}) => {
  return (
    <div
      className="w-full z-30"
      onDoubleClick={() => handleRemove(removableId)}
    >
      {children}
    </div>
  );
};

export default RemoveDraggable;

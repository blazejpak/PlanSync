import { useDraggable } from "@dnd-kit/core";
import { Task } from "../../../../types/task";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../types/routes";
import TaskItem from "../../TaskItem";

const Draggable = ({ task }: { task: Task }) => {
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: "grab",
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        if (boardId) {
          navigate(ROUTES.ROUTE_TASK(boardId, task.id));
        }
      }}
    >
      <TaskItem data={task} />
    </li>
  );
};

export default Draggable;

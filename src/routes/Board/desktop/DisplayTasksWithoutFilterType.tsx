import { useNavigate, useParams } from "react-router-dom";
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";

import FilteredTasks from "../FilteredTasks/FilteredTasks";

import { ROUTES } from "../../../types/routes";
import Droppable from "./dnd/Droppable";
import { useAppDispatch } from "../../../store/hooks";
import { updateWorkflowStep } from "../../../store/reducers/tasks";

const DisplayTasksWithoutFilterType = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { boardId } = useParams<{ boardId: string }>();
  if (!boardId) return null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
    const taskId = active.id as string;
    const newType = over.id as "todo" | "progress" | "done";
    dispatch(updateWorkflowStep({ id: taskId, newType }));
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <Droppable
        id="todo"
        colorClass="todo"
        onAddTask={() =>
          navigate(ROUTES.ROUTE_ADD_TASK(boardId), {
            state: {
              typeOfTask: "todo",
            },
          })
        }
        title="todo"
      >
        <FilteredTasks typeOfTask="todo" typeOfDevice="desktop" />
      </Droppable>

      <Droppable
        id="progress"
        colorClass="progress"
        onAddTask={() =>
          navigate(ROUTES.ROUTE_ADD_TASK(boardId), {
            state: {
              typeOfTask: "progress",
            },
          })
        }
        title="progress"
      >
        <FilteredTasks typeOfTask="progress" typeOfDevice="desktop" />
      </Droppable>

      <Droppable
        id="done"
        colorClass="done"
        onAddTask={() =>
          navigate(ROUTES.ROUTE_ADD_TASK(boardId), {
            state: {
              typeOfTask: "done",
            },
          })
        }
        title="done"
      >
        <FilteredTasks typeOfTask="done" typeOfDevice="desktop" />
      </Droppable>
    </DndContext>
  );
};

export default DisplayTasksWithoutFilterType;

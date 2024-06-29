import { useEffect, useState } from "react";
import TaskMobile from "./mobile/TaskMobile";
import TasksDesktop from "./desktop/TasksDesktop";

const Tasks = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handlerResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handlerResize);
    handlerResize();

    return () => window.removeEventListener("resize", handlerResize);
  }, []);

  return <>{isMobile ? <TaskMobile /> : <TasksDesktop />}</>;
};

export default Tasks;

import classNames from "classnames";
import "./Task.css";
import { useStore } from "../store";
import trash from "../assets/trash-2.svg";
interface IProps {
  title: string;
}

export default function Task({ title }: IProps) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);

  if (!task) return null;
  return (
    <div
      className="task"
      draggable
      onDragStart={() => setDraggedTask(task.title)}
    >
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div>
          <img src={trash} onClick={() => deleteTask(task.title)} alt="Trash" />
        </div>
        <div className={classNames("status", task?.state)}>{task?.state}</div>
      </div>
    </div>
  );
}

import { Droppable } from "react-beautiful-dnd";
import TaskComponent from "../task/task";
import { useStore } from "../../store/store";
import { colorThemes } from "../../config/types";
import "./column.css";

const ColumnComponent = (props: any) => {
  const store: any = useStore();
  const { column, tasks } = props || null;
  return (
    <section
      className={`flex flex-col px-[10px] pt-[10px] pb-[5px] mr-[30px] min-h-[200px] max-h-full rounded-md ${
        store.theme === colorThemes.lightTheme
          ? ""
          : "bg-transparent border-2 border-slate-300"
      }`}
      style={{
        backgroundColor: `${
          store.theme === colorThemes.lightTheme ? "#ECECEC" : ""
        }`,
      }}
    >
      <h2
        className={`pb-[15px] ${
          store.theme === colorThemes.lightTheme ? "text-black" : "text-white"
        }`}
      >
        {column.name}
      </h2>
      <Droppable droppableId={`column-${column.id}`}>
        {(provided) => (
          <div
            className="flex-grow w-[200px] rounded-lg min-h-[20px] overflow-y-auto hidescrollbar"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task: any, index: number) => (
              <TaskComponent
                key={task.id}
                task={task}
                index={index}
                columnId={column.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
};

export default ColumnComponent;

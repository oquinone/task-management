import { Suspense } from "react";
// import { initialData } from "../../mock/tasks.mock";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnComponent from "../column/column";
import DragAndDropSkeletonComponent from "./dragAndDropSkeleton";
import { useDragAndDropHooks } from "./dragAndDrop.hooks";
import { colorThemes } from "../../config/types";

const DragAndDropComponent = () => {
  const { data, onDragEnd, store } = useDragAndDropHooks();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {Object.keys(store.selectedProject).length > 0 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <section
            className="flex flex-row w-[100%] h-full py-[20px] rounded"
            style={{
              backgroundColor: `${
                store.theme === colorThemes.lightTheme ? "#DCDCDC" : "#001529"
              }`,
            }}
          >
            {data?.columns?.map((columnData: any) => {
              const column: any = columnData;
              const tasks: any =
                column?.tasks?.map((task: string) => task) || [];
              return (
                <ColumnComponent
                  key={columnData.id}
                  column={column}
                  tasks={tasks}
                />
              );
            })}
          </section>
        </DragDropContext>
      ) : (
        <DragAndDropSkeletonComponent />
      )}
    </Suspense>
  );
};

export default DragAndDropComponent;

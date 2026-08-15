import { useState, useEffect } from "react";
import { useStore } from "../../store/store";
import { PutAPICall } from "../../apis/apis";
import { urls } from "../../config/urls";

interface DragAndDrop {
  columns: any;
  tasks: any;
  columnOrder: any;
}

export const useDragAndDropHooks = () => {
  const store: any = useStore();
  const [data, setData] = useState<DragAndDrop>();

  useEffect(() => {
    setData(store.selectedProject);
  }, [store.selectedProject]);

  const onDragEnd = async (result: any) => {
    // TODO: reorder our column
    const { destination, source, draggableId } = result;
    console.log(`Omar - result: ${JSON.stringify(data)}`);
    const sourceId = source.droppableId.split('-')[1];
    const desId    = destination.droppableId.split('-')[1];
    const dragId   = Number(draggableId.split('-')[1]); 

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // console.log(`Ha - sourceid: ${JSON.stringify(sourceId)}`);
    // const start = data?.columns.filter((item: any) => item.id == sourceId);
    // const finish = data?.columns.filter((item: any) => item.id == desId);


    if (sourceId === desId) {
      const sourceColIdx = data?.columns.findIndex((item:any) => item.id == sourceId);
      const taskToMove = data?.columns[sourceColIdx].tasks.splice(source.index, 1);
      
      data?.columns[sourceColIdx].tasks.splice(destination.index, 0, taskToMove[0]);
      data?.columns[sourceColIdx].tasks.forEach((task:any, idx: number) => task.order = idx);
      
      let newStruct:any ={
        ...data
      }
      setData({...newStruct});
      await PutAPICall({ url: urls.updateTaskBulkOrder, data: { tasks: data?.columns[sourceColIdx].tasks } });

      return;
    }


    // Get data, find source tasks
    const sourceColIdx = data?.columns.findIndex((item:any) => item.id == sourceId);
    const destinationColIdx = data?.columns.findIndex((item:any) => item.id == desId);

    // get task
    const taskToMove = data?.columns[sourceColIdx].tasks.splice(source.index, 1);
    data?.columns[destinationColIdx].tasks.splice(destination.index, 0, taskToMove[0]);

    let updatedColumn:any ={
      ...data
    }
    setData(updatedColumn);

    // Update column and order 
    const updateTask ={
      column: desId,
      order: destination.index
    }

    await PutAPICall({ url: `${urls.updateTaskColumnAndOrder}/${dragId}`, data: { ...updateTask } });
   
  };

  return { data, setData, onDragEnd, store };
};

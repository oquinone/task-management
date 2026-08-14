import { useState } from "react";
import { GetAPICall, PutAPICall, DeleteAPICall } from "../../apis/apis";
import { urls } from "../../config/urls";
import { useStore } from "../../store/store";

interface TaskData {
  summary: string;
  description: string;
  priority: string;
  date: string;
}

export const useTaskHooks = () => {
  const store: any = useStore();
  const [taskModal, setTaskModal] = useState(false);
  const [taskData, setTaskData] = useState<TaskData | any>({});

  const openTaskModal = (task: any) => {
    setTaskModal(true);
    setTaskData({
      summary: task.content,
      description: task.description,
      priority: task.priority,
      date: task.date,
    });
  };

  const updateTask = async (id: string) => {
    const data = {
      content: taskData.summary,
      description: taskData.description,
      date: taskData.date
        ? new Date(taskData.date).toISOString().split("T")[0]
        : taskData.date,
      priority: taskData.priority,
    };

    await PutAPICall({ url: `${urls.updateTask}/${id}`, data });
    const url: string = `${urls.getProjectData}${store.projectId}`;
    const res: any = await GetAPICall({ url });
    const structredData = {
      id: res.id,
      columns: res.columns,
      tasks: res.tasks,
    };
    store.setSelectedProject(structredData);
    setTaskModal(false);
  };

  const removeTask = async (props: any) => {
    const { taskId } = props || {};

    await DeleteAPICall({ url: `${urls.removeTask}/${taskId}` });
    const url: string = `${urls.getProjectData}${store.projectId}`;
    const res: any = await GetAPICall({ url });
    const structredData = {
      id: res.id,
      columns: res.columns,
      tasks: res.tasks,
    };
    store.setSelectedProject(structredData);
    setTaskModal(false);
  };

  return {
    taskModal,
    setTaskModal,
    openTaskModal,
    taskData,
    setTaskData,
    updateTask,
    removeTask,
    store,
  };
};

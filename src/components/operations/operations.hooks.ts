import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { PostAPICall, GetAPICall, DeleteAPICall } from "../../apis/apis";
import { urls } from "../../config/urls";
import { useStore } from "../../store/store";

interface TaskContent {
  summary: string;
  description: string;
  priority: string;
  date: any;
}

export const useOperationsHook = () => {
  const store: any = useStore();
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [columnsModal, setColumnsModal] = useState(false);
  const [column, setColum] = useState("");
  const [removeProject, setRemoveProject] = useState(false);
  const [taskContent, setTaskContent] = useState<TaskContent | any>({});
  const [modalAddProject, setModalAddProject] = useState(false);

  useEffect(() => {
    if (!modalAddProject) {
      const getProjects = async () => {
        const data: any = await GetAPICall({ url: urls.getProjectTitles });
        store.setMenuItems(data);
        store.setProjectTitle("");
      };

      getProjects();
    }
  }, [modalAddProject]);

  const submitTask = async () => {
    const selectedProject = store.selectedProject;
    const id = store.projectId;
    const columnid = selectedProject.columns[0].id;
    let newTask: any = {
      columnid: columnid,
      content: taskContent.summary,
      description: taskContent.description,
      priority: taskContent.priority,
      date: new Date(taskContent.date).toISOString().split("T")[0],
    };

    await PostAPICall({ url: urls.addTask, data: newTask });

    const url: string = `${urls.getProjectData}${id}`;
    const data: any = await GetAPICall({ url });
    const structredData = {
      id: data.id,
      columns: data.columns,
      tasks: data.tasks,
    };
    store.setSelectedProject(structredData);
    setNewTaskModal(false);
  };

  const submitColumn = async () => {
    const id = store.projectId;

    const columnData = {
      project: id,
      name: column,
      // columnOrder,
    };

    await PostAPICall({ url: urls.addColumn, data: columnData });
    const url: string = `${urls.getProjectData}${id}`;
    const projectData: any = await GetAPICall({ url });
    const structredData = {
      id: projectData.project_id,
      columns: projectData.columns,
    };
    store.setSelectedProject(structredData);
    setColumnsModal(false);
  };

  const openColumnsModal = () => {
    setColum("");
    setColumnsModal(true);
  };

  const openTasksModal = () => {
    setTaskContent({
      summary: "",
      description: "",
      priority: "Low",
      date: dayjs(new Date()),
    });
    setNewTaskModal(true);
  };

  const deleteProject = async () => {
    const currentId = store.projectId;
    store.resetStore();
    const url: string = `${urls.removeProject}/${currentId}`;
    await DeleteAPICall({ url });

    const data: any = await GetAPICall({ url: urls.getProjectTitles });
    store.setMenuItems(data);
    setRemoveProject(false);
  };

  const addProject = async () => {
    // let currentItems = store.menuItems || 0;
    let label = store.projectTitle;
    // let key = `${label}-${currentItems.length + 1}`;
    let data = { label };
    store.setProjectTitle("");
    await PostAPICall({ url: urls.addProject, data });
    setModalAddProject(false);
  };

  return {
    newTaskModal,
    setNewTaskModal,
    columnsModal,
    setColumnsModal,
    openTasksModal,
    submitTask,
    column,
    setColum,
    submitColumn,
    openColumnsModal,
    removeProject,
    setRemoveProject,
    deleteProject,
    store,
    taskContent,
    setTaskContent,
    modalAddProject,
    setModalAddProject,
    addProject,
  };
};

import { useEffect } from "react";
import { useStore } from "../../store/store";
import { GetAPICall } from "../../apis/apis";
import { urls } from "../../config/urls";
// import { items } from "../../mock/menu.mock";
// import { taskData } from "../../mock/tasks.mock";

export const useSidebarHooks = () => {
  const store: any = useStore();

  useEffect(() => {
    const getProjects = async () => {
      const data: any = await GetAPICall({ url: urls.getProjectTitles });
      store.setMenuItems(data);
      store.setMenuItemsLoading(false);
    };

    getProjects();
  }, []);

  const getProjectData = async (key: string) => {
    const menuItems = store.menuItems;

    const currentObject: any = menuItems.find((item: any) => {
      return item.key === key;
    });
    if (!currentObject.id) {
      store.setProjectId("");
      store.setSelectedProject({});
      return;
    }

    store.setProjectId(currentObject.id);
    const url: string = `${urls.getProjectData}${currentObject.id}`;
    const data: any = await GetAPICall({ url });

    const structredData = {
      id: data.project_id,
      columns: data.columns,
      columnOrder: data.columns.order,
      tasks: data.columns.tasks,
    };
    console.log(`${JSON.stringify(structredData)}`);
    store.setSelectedProject(structredData);
  };

  return {
    getProjectData,
  };
};

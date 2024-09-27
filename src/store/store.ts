import { create } from "zustand";

export const useStore = create((set) => ({
  menuItems: [], // sidebar menu items
  selectedProject: {}, //currently selected project
  projectId: "", // currently selected project ID
  projectTitle: "", // title for adding a new project

  setMenuItems: (newMenu: []) => set(() => ({ menuItems: newMenu })),
  setProjectId: (id: string) => set(() => ({ projectId: id })),
  setSelectedProject: (project: any) =>
    set(() => ({ selectedProject: project })),
  setProjectTitle: (title: "") => set(() => ({ projectTitle: title })),
  resetStore: () =>
    set(() => ({
      selectedProject: {},
      projectId: "",
      projectTitle: "",
    })),
}));

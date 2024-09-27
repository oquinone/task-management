import { urls } from "../config/urls";

export const getProjects = async () => {
  const response = await fetch(urls.getProjectTitles);
  const res = await response.json();
  return res;
};

// GET
export const GetAPICall = async (props: any) => {
  const { url, options } = props || {};

  let moreOptions = {
    method: "GET",
    ...options,
  };

  const response = await fetch(url, { ...moreOptions });
  const res = await response.json();
  return res;
};

// POST
export const PostAPICall = async (props: any) => {
  const { url, options, data } = props || {};

  let moreOptions = {
    method: "POST",
    body: JSON.stringify(data),
    ...options,
  };

  const response = await fetch(url, { ...moreOptions });
  const res = await response.json();
  return res;
};

// DELETE
export const DeleteAPICall = async (props: any) => {
  const { url, options } = props || {};

  let moreOptions = {
    method: "DELETE",
    ...options,
  };

  const response = await fetch(url, { ...moreOptions });
  const res = await response.json();
  return res;
};

import api from "../Interceptor/Api";

const authEndpoint = "authenticated";

const unauthEndpoint = "unauthenticated";

export const addMenu = (menuItem) =>
  api.post(`${authEndpoint}/admin/menu`, menuItem);

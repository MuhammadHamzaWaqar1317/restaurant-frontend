import api from "../Interceptor/Api";

const authEndpoint = "authenticated";

const unauthEndpoint = "unauthenticated";

export const signUp = (body) => api.post(`${unauthEndpoint}/sign-up`, body);

export const signIn = (body) => api.post(`${unauthEndpoint}/sign-in`, body);

export const getUserInfo = () => api.get(`${authEndpoint}/employee`);

export const getMenu = () => api.get(`${unauthEndpoint}/menu`);

export const addMenu = (menuItem) =>
  api.post(`${authEndpoint}/admin/menu`, menuItem);

export const updateMenu = (menuItem) =>
  api.patch(`${authEndpoint}/admin/menu`, menuItem);

export const deleteMenu = (menuItemId) =>
  api.delete(`${authEndpoint}/admin/menu?${menuItemId.toString()}`);

export const getBranch = () => api.get(`${authEndpoint}/admin/branch`);

export const addBranch = (branch) =>
  api.post(`${authEndpoint}/admin/branch`, branch);

export const updateBranch = (branch) =>
  api.patch(`${authEndpoint}/admin/branch`, branch);

export const deleteBranch = (branchId) =>
  api.delete(`${authEndpoint}/admin/branch?${branchId.toString()}`);

export const getReservation = () =>
  api.get(`${authEndpoint}/admin/reservation`);

export const addReservation = (reservation) =>
  api.post(`${authEndpoint}/admin/reservation`, reservation);

export const updateReservation = (reservation) =>
  api.patch(`${authEndpoint}/admin/reservation`, reservation);

export const deleteReservation = (reservationId) =>
  api.delete(`${authEndpoint}/admin/reservation?${reservationId.toString()}`);

export const addOrder = (order) =>
  api.post(`${authEndpoint}/admin/order`, order);

export const getOrder = () => api.get(`${authEndpoint}/admin/order`);

export const updateOrderStatus = (orderStatus) =>
  api.patch(`${authEndpoint}/admin/order`, orderStatus);

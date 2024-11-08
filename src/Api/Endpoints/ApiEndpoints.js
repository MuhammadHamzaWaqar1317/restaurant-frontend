import api from "../Interceptor/Api";

const authEndpoint = "authenticated";

const unauthEndpoint = "unauthenticated";

const URI = {
  signUp: `${unauthEndpoint}/sign-up`,
  signIn: `${unauthEndpoint}/sign-in`,
  forgetPassword: `${unauthEndpoint}/forget-password`,
  verifyOTP: `${unauthEndpoint}/verify-otp`,
  createNewPassword: `${authEndpoint}/employee/create-new-password`,
  userInfo: `${authEndpoint}/employee`,
  publicMenu: `${unauthEndpoint}/menu`,
  privateMenu: `${authEndpoint}/admin/menu`,
  publicMenuCategory: `${unauthEndpoint}/menu-category`,
  privateMenuCategory: `${authEndpoint}/admin/menu-category`,
  privateBranch: `${authEndpoint}/admin/branch`,
  privateReservation: `${authEndpoint}/admin/reservation`,
  privateOrder: `${authEndpoint}/admin/order`,
};

export const signUp = (body) => api.post(URI.signUp, body);

export const signIn = (body) => api.post(URI.signIn, body);

export const forgetPassword = (body) => api.post(URI.forgetPassword, body);

export const verifyOtp = (body) => api.post(URI.verifyOTP, body);

export const createNewPassword = (body) =>
  api.post(URI.createNewPassword, body);

export const getUserInfo = () => api.get(URI.userInfo);

export const getMenu = () => api.get(URI.publicMenu);

export const addMenu = (menuItem) => api.post(URI.privateMenu, menuItem);

export const updateMenu = (menuItem) => api.patch(URI.privateMenu, menuItem);

export const deleteMenu = (menuItemId) =>
  api.delete(`${URI.privateMenu}?${menuItemId.toString()}`);

export const getMenuCategory = () => api.get(URI.publicMenuCategory);

export const addMenuCategory = (MenuCategory) =>
  api.post(URI.privateMenuCategory, MenuCategory);

export const updateMenuCategory = (MenuCategory) =>
  api.patch(URI.privateMenuCategory, MenuCategory);

export const deleteMenuCategory = (menuCategoryId) =>
  api.delete(`${URI.privateMenuCategory}?${menuCategoryId.toString()}`);

export const getBranch = () => api.get(URI.privateBranch);

export const addBranch = (branch) => api.post(URI.privateBranch, branch);

export const updateBranch = (branch) => api.patch(URI.privateBranch, branch);

export const deleteBranch = (branchId) =>
  api.delete(`${URI.privateBranch}?${branchId.toString()}`);

export const getReservation = () => api.get(URI.privateReservation);

export const addReservation = (reservation) =>
  api.post(URI.privateReservation, reservation);

export const updateReservation = (reservation) =>
  api.patch(URI.privateReservation, reservation);

export const deleteReservation = (reservationId) =>
  api.delete(`${URI.privateReservation}?${reservationId.toString()}`);

export const addOrder = (order) => api.post(URI.privateOrder, order);

export const getOrder = () => api.get(URI.privateOrder);

export const updateOrderStatus = (orderStatus) =>
  api.patch(URI.privateOrder, orderStatus);

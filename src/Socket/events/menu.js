import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  deleteWholeCategory,
} from "../../Redux/Slices/MenuSlice";

export const insertMenuItem = (message, dispatch) => {
  dispatch(addMenuItem(message));
};

export const editMenuItem = (message, dispatch) => {
  dispatch(updateMenuItem(message));
};

export const removeMenuItem = (message, dispatch) => {
  dispatch(deleteMenuItem(message));
};

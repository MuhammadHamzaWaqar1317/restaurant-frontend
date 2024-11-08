import {
  addMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
} from "../../Redux/Slices/MenuCategorySlice";
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  deleteWholeCategory,
} from "../../Redux/Slices/MenuSlice";

export const insertMenuCategory = (message, dispatch) => {
  dispatch(addMenuCategory(message));
};

export const editMenuCategory = (message, dispatch) => {
  dispatch(updateMenuCategory(message));
};

export const removeMenuCategory = (message, dispatch) => {
  dispatch(deleteMenuCategory(message));
  dispatch(deleteWholeCategory(message));
};

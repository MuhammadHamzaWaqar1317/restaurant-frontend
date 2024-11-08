import {
  addBranch,
  updateBranch,
  deleteBranch,
} from "../../Redux/Slices/BranchSlice";

export const insertBranch = (message, dispatch) => {
  dispatch(addBranch(message));
};

export const editBranch = (message, dispatch) => {
  dispatch(updateBranch(message));
};

export const removeBranch = (message, dispatch) => {
  dispatch(deleteBranch(message));
};

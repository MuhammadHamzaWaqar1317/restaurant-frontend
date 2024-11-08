export const roles = {
  admin: "admin",
  user: "user",
  passwordReset: "passwordReset",
};

export const orderStatus = {
  pending: "Pending",
  prepairing: "Prepairing",
  ready: "Ready",
};

export const notificationIcon = {
  order: "order",
  reservation: "reservation",
};

export const socketEvents = {
  connection: "connection",
  sign_up_successfull: "sign_up_successfull",
  menu: {
    menu_item_added: "menu_item_added",
    menu_item_updated: "menu_item_updated",
    menu_item_deleted: "menu_item_deleted",
  },
  menuCategory: {
    menu_category_added: "menu_category_added",
    menu_category_updated: "menu_category_updated",
    menu_category_deleted: "menu_category_deleted",
  },
  branch: {
    branch_added: "branch_added",
    branch_updated: "branch_updated",
    branch_deleted: "branch_deleted",
  },
  reservation: {
    reservation_added: "reservation_added",
    reservation_updated: "reservation_updated",
    reservation_deleted: "reservation_deleted",
  },
  order: {
    order_added: "order_added",
    order_status_update: "order_status_update",
  },
};

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../src/index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store.js";

import Menu from "./Components/Admin/Menu.jsx";
import Layout from "./Components/Admin/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Menu />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router} />
      </App>
    </Provider>
  </StrictMode>
);

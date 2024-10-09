import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import socket from "../src/Socket/socket";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch } from "react-redux";
import { addMenuItem } from "./Redux/Slices/MenuSlice";

function App({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("connection", (message) => {
      // add socket ID to redux  state for personalized notifications after frontend
    });
    socket.on("menu_item_added", (message) => {
      console.log("new menu  item added server", message);
      dispatch(addMenuItem(message));
    });
    return () => {
      socket.off("menu_item_added");
    };
  }, []);
  return (
    <>
      {children}
      <div className="text-3xl">asd</div>
    </>
  );
}

export default App;

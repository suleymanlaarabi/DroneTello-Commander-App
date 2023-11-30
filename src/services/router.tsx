import { createBrowserRouter } from "react-router-dom";
import ControlPad from "../components/views/ControlPad/ControlPad";
import Root from "../components/Root";
import Script from "../components/views/Script/Script";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <ControlPad />,
      },
      {
        path: "script",
        element: <Script />,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import ControlPad from "../components/views/ControlPad/ControlPad";
import Root from "../components/Root";
import Script from "../components/views/Script/Script";
import ControlPadV2 from "../components/views/ControlPad/ControlPadV2";
import CreateScript from "../components/views/Script/CreateScript";

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
      {
        path: "control-pad",
        element: <ControlPadV2 />,
      },
      {
        path: "create-script",
        element: <CreateScript />,
      },
    ],
  },
]);

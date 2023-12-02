import { createBrowserRouter } from "react-router-dom";
import ControlPad from "../components/views/ControlPad/ControlPad";
import Root from "../components/Root";
import Script from "../components/views/Script/Script";
import CustomScript from "../components/views/CustomScript/CustomScript";
import Speech from "../components/views/Speech/Speech";
import RootFrame from "../components/views/Run3D/RootFrame";

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
        path: "custom-script",
        element: <CustomScript />,
      },
      {
        path: "speech",
        element: <Speech />,
      },
      {
        path: "3d-view",
        element: <RootFrame />,
      },
    ],
  },
]);

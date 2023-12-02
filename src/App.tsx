import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./services/router";
import Drone3DContextProvider from "./context/Drone3DContextProvider";

function App() {
  return (
    <>
      <ChakraProvider>
        <Drone3DContextProvider>
          <RouterProvider router={router} />
        </Drone3DContextProvider>
      </ChakraProvider>
    </>
  );
}

export default App;

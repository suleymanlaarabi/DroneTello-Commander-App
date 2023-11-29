import { Outlet } from "react-router-dom";
import NavBar from "./layouts/NavBar";
import PageContainer from "./layouts/Container/PageContainer";

const Root = () => {
  return (
    <>
      <NavBar />
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
};

export default Root;

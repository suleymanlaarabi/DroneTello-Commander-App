import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import Zoom from "../../common/anim/Zoom";

const PageContainer = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  return (
    <Zoom id={pathname}>
      <Flex
        h={"100%"}
        w={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
        gap={10}
        p={5}
      >
        {children}
      </Flex>
    </Zoom>
  );
};

export default PageContainer;

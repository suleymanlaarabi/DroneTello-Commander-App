import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const PageContainer = ({ children }: PropsWithChildren) => {
  return (
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
  );
};

export default PageContainer;

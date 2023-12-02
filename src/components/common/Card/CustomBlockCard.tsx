import { Card, CardBody, Divider, Heading } from "@chakra-ui/react";

type props = {
  uid: string;
  name: string;
  onClick: () => void;
};

const CustomBlockCard = ({ uid, name, onClick }: props) => {
  return (
    <Card
      onClick={onClick}
      transition={".2s"}
      _hover={{
        transform: "scale(1.1)",
      }}
      cursor={"pointer"}
      key={uid}
    >
      <CardBody>
        <Heading fontSize={24}>{name}</Heading>
        <Divider />
      </CardBody>
    </Card>
  );
};

export default CustomBlockCard;

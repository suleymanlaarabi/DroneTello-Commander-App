import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  url: string;
}

const Links = [
  {
    name: "Script",
    path: "script",
  },
  {
    name: "Custom Script",
    path: "custom-script",
  },
];

const Link = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as={NavLink}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      to={props.url}
    >
      {children}
    </Box>
  );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Heading as={NavLink} to="/" fontSize={24}>
              Drone Commander
            </Heading>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Link url={link.path} key={link.name}>
                  {link.name}
                </Link>
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <Link url={link.path} key={link.name}>
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

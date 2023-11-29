import { Button, ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import {
  arreter,
  avancer,
  bas,
  demarrer,
  droite,
  gauche,
  haut,
  reculer,
} from "./services/api/tello-api";

function App() {
  return (
    <>
      <ChakraProvider>
        <Flex
          h={"100vh"}
          w={"100vw"}
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
          gap={10}
        >
          <Heading>Drone Tello</Heading>
          <Flex gap={5}>
            <Button onClick={demarrer}>Démarrer</Button>
            <Button onClick={arreter}>Arreter</Button>
          </Flex>
          <Flex gap={10}>
            <Flex gap={5} direction={"column"}>
              <Button onClick={avancer}>Avancer</Button>
              <Flex gap={5}>
                <Button onClick={droite}>droite</Button>
                <Button onClick={gauche}>Gauche</Button>
              </Flex>
              <Button onClick={reculer}>reculer</Button>
            </Flex>

            <Flex gap={5} flexDirection={"column"}>
              <Button h={"100%"} onClick={haut}>
                Haut
              </Button>
              <Button h={"100%"} onClick={bas}>
                Bas
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </ChakraProvider>
    </>
  );
}

export default App;

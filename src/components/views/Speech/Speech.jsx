import { Heading } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { BlockName } from "../../../types/ScriptTypes/Block.types";
import { handleMoveTello } from "../../../utils/tello";

function searchWord(arrayWord, text) {
  const motsTrouves = arrayWord.filter((mot) => text.split(" ").includes(mot));

  if (motsTrouves.length > 0) {
    return motsTrouves[0];
  } else {
    return null;
  }
}

const Speech = () => {
  const launchAction = async (action) => {
    action(60);
  };

  const actionRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    // eslint-disable-next-line no-undef

    var SpeechRecognitionEvent =
      // eslint-disable-next-line no-undef
      SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    if (!SpeechRecognition) {
      actionRef.current.innerHTML =
        "Votre navigateur ne prend pas en charge la reconaissance vocal";
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = function (event) {
      const results = event.results;
      const text = event.results[results.length - 1][0].transcript;
      const moveWords = [
        BlockName.Avancer,
        BlockName.Reculer,
        BlockName.Gauche,
        BlockName.Droite,
      ];
      const wordSearched = searchWord(moveWords, text);
      if (wordSearched) {
        handleMoveTello(wordSearched, launchAction);
        actionRef.current.innerHTML = `${wordSearched.toUpperCase()}`;
      }
    };
    recognition.start();
    return () => {
      recognition.stop();
    };
  }, []);

  return (
    <>
      <Heading>Speech</Heading>
      <div>
        <Heading ref={actionRef}></Heading>
      </div>
    </>
  );
};

export default Speech;

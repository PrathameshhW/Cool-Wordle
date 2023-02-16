import getEnglishWords from "../components/english";
const getLanguageConfigs = () => {
  return {
    English: {
      keyboard: [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
      ],
      getWords: () => getEnglishWords(),
    },
  };
};

export default getLanguageConfigs;

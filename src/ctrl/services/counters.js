import { parsingLevelIncreased, parsingLevelDecreased } from "../events.js";

let levelCounter = -1;
let numberOfParsingsByLevel = [];

function countParsingLevel(level, action) {
  !numberOfParsingsByLevel[level] && (numberOfParsingsByLevel[level] = 0);
  switch (action) {
    case 'add':
      numberOfParsingsByLevel[level]++;
      checkLevelIncreasing();
      break;
    case 'subtract':
      numberOfParsingsByLevel[level]--;
      checkLevelDecreasing();
      break;
    default:
      break;
  }

  function checkLevelIncreasing() {
    for (let i = numberOfParsingsByLevel.length - 1; i >= 0; i--) {
      if (numberOfParsingsByLevel[i] > 0) {
        
        if (i > levelCounter) {
          for (let diff = 0; diff < (i - levelCounter); diff++) {
            document.dispatchEvent(parsingLevelIncreased);
            // console.log('+1');
          }
        }
  
        levelCounter = i;
        break;
      }
    }
  }

  function checkLevelDecreasing() {
    for (let i = 0; i < numberOfParsingsByLevel.length; i++) {
      if (numberOfParsingsByLevel[i] == 0) {
        
        if (i <= levelCounter) {
          for (let diff = 0; diff <= (levelCounter - i); diff++) {
            document.dispatchEvent(parsingLevelDecreased);
            // console.log('-1');
          }
        }
  
        levelCounter = i;
        break;
      }
    }
  }
}

function resetParsingLevelCounter() {
  levelCounter = -1;
  numberOfParsingsByLevel = [];
}

export { countParsingLevel, resetParsingLevelCounter };
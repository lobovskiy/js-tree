const connectAPIStarted = new Event("connectAPIStarted", {bubbles: true});
const parsingDataStarted = new Event("parsingDataStarted", {bubbles: true});
const parsingLevelIncreased = new Event("parsingLevelIncreased", {bubbles: true});
const parsingLevelDecreased = new Event("parsingLevelDecreased", {bubbles: true});
const finishParsingData = new Event("finishParsingData", {bubbles: true});
const dataReady = new Event("dataReady", {bubbles: true});

export {
  connectAPIStarted,
  parsingDataStarted,
  parsingLevelIncreased,
  parsingLevelDecreased,
  finishParsingData,
  dataReady
}
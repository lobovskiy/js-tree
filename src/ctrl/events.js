const connectAPIStarted = new Event("connectAPIStarted", {bubbles: true});
const parsingDataStarted = new Event("parsingDataStarted", {bubbles: true});
const parsingDataFinished = new Event("parsingDataFinished", {bubbles: true});
const parsingLevelIncreased = new Event("parsingLevelIncreased", {bubbles: true});
const parsingLevelDecreased = new Event("parsingLevelDecreased", {bubbles: true});
const dataReady = new Event("dataReady", {bubbles: true});

export {
  connectAPIStarted,
  parsingDataStarted,
  parsingDataFinished,
  parsingLevelIncreased,
  parsingLevelDecreased,
  dataReady
}
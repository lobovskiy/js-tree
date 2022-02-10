const connectAPIStarted = new Event("connectAPIStarted");
const parsingDataStarted = new Event("parsingDataStarted");
const parsingDataFinished = new Event("parsingDataFinished");
const parsingLevelIncreased = new Event("parsingLevelIncreased");
const parsingLevelDecreased = new Event("parsingLevelDecreased");
const dataReady = new Event("dataReady");

function createItemCounterEventWithLevel(level) {
  return new CustomEvent("itemParsed", { detail: { level } })
}

export {
  connectAPIStarted,
  parsingDataStarted,
  parsingDataFinished,
  parsingLevelIncreased,
  parsingLevelDecreased,
  dataReady,
  createItemCounterEventWithLevel
}
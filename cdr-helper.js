function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const sampleCDRs = (date) => [
  {
    "score": 1,
    "tags": [],
    "duration": 0,
    "state": "NOANSWER",
    "caller": "842367109722",
    "createdAt": date,
    "actionCode": "NOANSWER"
  },
  {
    "score": 1,
    "tags": [],
    "duration": 0,
    "state": "USER_HANGUP",
    "caller": "842367109722",
    "createdAt": date,
    "actionCode": "CU"
  },
  {
    "score": 1,
    "tags": [],
    "duration": 0,
    "state": "CHANUNAVAIL",
    "caller": "842367109722",
    "createdAt": date,
    "actionCode": "CU",
  },
];
exports.getSampleCdr = (date) => {
  return sampleCDRs(date)[getRandomInt(sampleCDRs.length)];
};
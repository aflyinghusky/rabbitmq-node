function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function ObjectId() {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  const machineId = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  const processId = process.pid.toString(16).padStart(4, '0');
  const increment = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');

  return timestamp + machineId + processId + increment;
}

const sampleCDRs = (date, _id = ObjectId()) => [
  {
    _id,
    "score": 1,
    "tags": [],
    "caller": "842367109722",
    "createdAt": date,
    "state": "NOANSWER",
  },
  {
    _id,
    "score": 1,
    "tags": [],
    "duration": 0,
    "state": "NOANSWER",
    "caller": "842367109722",
    "createdAt": date,
  },
  {
    _id,
    "score": 1,
    "tags": [],
    "duration": 0,
    "state": "CHANUNAVAIL",
    "caller": "842367109722",
    "createdAt": date,
  },
];
const getSampleCdr = (date) => {
  return sampleCDRs(date)[getRandomInt(sampleCDRs.length)];
};

module.exports = {
  getSampleCdr,
}

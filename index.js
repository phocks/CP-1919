// A node.js script to try to convert svg points of Pulsar CP 1919 into usable data
var pulses = require("./data");

var totalTime = 0.0;
var currentMagnitude = 0.0;
var pulseNumber = 3;

for (let i = 0; i < pulses.length; i++) {
  totalTime = 0.0; // Reset for each pulse
  console.log(i);
  console.log(getPulseLevels(i));
}

function getPulseLevels(pulse) {
  var levels = pulses[pulse].map((elem, i) => {
    var magnitude = elem[1];

    totalTime = totalTime + elem[0];

    // Account for line offset
    if (i === 0) {
      currentMagnitude = magnitude - 90 - pulse * 10;
    } else {
      currentMagnitude = currentMagnitude + magnitude;
    }

    return [totalTime, -currentMagnitude];
  });

  return levels;
}

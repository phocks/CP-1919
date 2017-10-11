// A node.js script to try to convert svg points of Pulsar CP 1919 into usable data
var pulses = require("./cp-edited");

pulses.reverse();

var totalTime = 0.0;
var currentMagnitude = 0.0;
var pulseNumber = 3;

var pulseArray = [];

for (let i = 0; i < pulses.length; i++) {
  totalTime = 0.0; // Reset for each pulse
  // console.log(i);
  // console.log(getPulseLevels(i));

  pulseArray.push(getPulseLevels(i));
}

console.log(pulseArray);

function getPulseLevels(pulse) {
  var levels = pulses[pulse].map((elem, i) => {
    var magnitude = elem[1];

    totalTime = totalTime + elem[0];

    // Account for line offset
    if (i === 0) {
      currentMagnitude = 0; // magnitude - (90 + pulse * 10);
    } else {
      currentMagnitude = currentMagnitude + magnitude;
      
    }

    return [totalTime, -currentMagnitude];
  });

  return levels;
}

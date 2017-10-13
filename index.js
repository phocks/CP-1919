// A node.js script to try to convert svg points of Pulsar CP 1919 into usable data
var pulses = require("./cp-edited");
var fs = require('fs');

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

fs.writeFile("./test", JSON.stringify(pulseArray, null, 2), 'utf-8', function(err) {
  if(err) {
      return console.log(err);
  }

  console.log("The file was saved!");
}); 

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

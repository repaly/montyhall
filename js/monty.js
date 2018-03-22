var door = {
  opened: false,
  prize: false
};
var door1 = door;
var doors = [door, door, door];
var $startButton = $("start");

$(document).click(function (event) {
  var $selectedElement = $(event.target);

  if ( $selectedElement.hasClass("start") ) {
    const prizeDoor = randomize(0, 2);
    console.log(prizeDoor);
    doors[prizeDoor].prize = true;
    console.log(doors);
  }
});


function randomize(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // генерируется число включая минимум и максимум
}

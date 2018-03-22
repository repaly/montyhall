var door1 = {
  opened: false,
  prize: false
};
var door2 = Object.assign({}, door1);
var door3 = Object.assign({}, door1);
var doors = [door1, door2, door3];
var $startButton = $(".start");

$(document).click(function (event) {
  var $selectedElement = $(event.target);
  if ( $selectedElement.hasClass("start") ) {
    const prizeDoor = randomize(0, 2);
    doors[prizeDoor].prize = true;
    $startButton.hide("slow");
  }
});


function randomize(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // генерируется число включая минимум и максимум
}

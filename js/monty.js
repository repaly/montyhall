var gameStarted = false;
var $startButton = $(".start");
var $doors = $(".door");
var $doorsArray = $doors.toArray();

for (var i = 0; i < $doorsArray.length; i++) {
  $doorsArray[i].prize = false;
  $doorsArray[i].open = function () {
    $(this).hide();
  }
  $doorsArray[i].selected = false;
}

$(document).click(function (event) {

  var $selectedElement = $(event.target);

  if ( $selectedElement.hasClass("start") ) {

    const prizeDoor = randomize(0, 2);

    $doorsArray[prizeDoor].prize = true;
    $startButton.hide("slow");
    startGame();
    $(".question").show(1000);
  } else if ( $selectedElement.hasClass("door") ) {

    if (gameStarted) {
      $doors.off("mouseover");
      $doors.off("mouseout");
      $selectedElement[0].selected = true;
      openOtherDoor();
    }
  }
});

function startGame() {

  gameStarted = true;

  $doors.mouseover(function (event) {
    $(this).children(".selection").show();
  });

  $doors.mouseout(function (event) {
    $(this).children(".selection").hide();
  });
}

function openOtherDoor() { // надо сделать так, чтобы убиралась дверь без приза

  var $otherDoors = $doorsArray;
  const openDoor = randomize(0, 1);

  for (var i = 0; i < $otherDoors.length; i++) {
    if ($otherDoors[i].selected === true) {
      $otherDoors.splice($otherDoors[i], 1); //какая-то фигня, надо додумать
    }
  }
  $otherDoors[openDoor].open();
}

function randomize(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // генерируется число включая минимум и максимум
}

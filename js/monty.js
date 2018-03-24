var gameStarted = false;
var $startButton = $(".start");
var $doors = $("div[class='door']");
var $doorsArray = $doors.toArray();
const $car = $("<img>", {
  src: "img/car.jpg",
  alt: "машина",
  class: "car"
});
const $goat = $("<img>", {
  src: "img/goat.jpg",
  alt: "козёл",
  class: "goat"
})

for (var i = 0; i < $doorsArray.length; i++) {
  $doorsArray[i].prize = false;
  $doorsArray[i].selected = false;
  $doorsArray[i].open = function() {
    if (!this.prize) {
      showPrize(this, $goat);
    } else if (this.prize) {
      showPrize(this, $car);
    }
  };
}

$(document).click(function(event) {

  var $selectedElement = $(event.target);

  if ($selectedElement.hasClass("start")) {

    const prizeDoor = randomize(0, 2);

    $doorsArray[prizeDoor].prize = true; // назначую дверь с призом
    $startButton.hide("slow");
    startGame();
    $(".question").show(1000);
  } else if ($selectedElement.hasClass("door")) {

    if (gameStarted) {
      $doors.off("mouseover"); //удаляю обработчики событий
      $doors.off("mouseout");
      $selectedElement[0].selected = true;
      openOtherDoor();
    }
  }
});

function startGame() {

  gameStarted = true;

  $doors.mouseover(function(event) {
    $(this).children(".selection").show();
  });

  $doors.mouseout(function(event) {
    $(this).children(".selection").hide();
  });
}

function openOtherDoor() {

  const randomDoor = randomize(0, 1);
  var doorsToOpen = [];

  for (var i = 0; i < $doorsArray.length; i++) {
    if ($doorsArray[i].selected === false && $doorsArray[i].prize === false) { // надо думать
      doorsToOpen.push($doorsArray[i]);
    }
  }
  if (doorsToOpen.length === 2) {
    doorsToOpen[randomDoor].open()
  } else if (doorsToOpen.length === 1) {
    doorsToOpen[0].open();
  } else {
    console.log("Что-то пошло не так, почему-то ведущий хочет открыть любую из 3 дверей");
  }

}

function showPrize(door, prize) {
  $(door).fadeOut("slow", function() {
    $(door).replaceWith(prize);
    $(door).fadeIn("slow");
  });
}

function randomize(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // генерируется число включая минимум и максимум
}

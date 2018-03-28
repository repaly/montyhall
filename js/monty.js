var gameStarted = false;
var doorAlreadyOpened = false;
const $question = $(".question");
const $startButton = $(".start");
const $notChangeButton = $(".not-change");
const $changeButton = $(".change");
var $doors = $("div[class='door']");
var $doorsArray = $doors.toArray();

assignDoorProperties();

$(document).click(function(event) {

  var $selectedElement = $(event.target);

  if ($selectedElement.hasClass("start")) {

    const prizeDoor = randomize(0, 2);

    $doorsArray[prizeDoor].prize = true; // назначую дверь с призом
    $startButton.hide("slow");
    startGame();
    $question.show(800);
  } else if ($selectedElement.hasClass("door")) {

    if (gameStarted) {
      $doors.off("mouseover"); // удаляю обработчики событий
      $doors.off("mouseout");
      $selectedElement[0].selected = true;
      if (!doorAlreadyOpened) {
        openOtherDoor();
        $doors = $("div[class='door']");
        $doorsArray = $doors.toArray();
      }
    }
  } else if ($selectedElement.hasClass("not-change")) {
      $selectedElement.parent().hide();
      for (var i = 0; i < $doorsArray.length; i++) {
        if ($doorsArray[i].selected) {
          $doorsArray[i].open();
          if ($doorsArray[i].prize) {
            $question.hide(200).text("Поздравляю, машина твоя! А ещё тобой побеждена теория вероятностей, так как шанс того, что машина будет в другой двери - выше")
            .show(200);
          } else if (!$doorsArray[i].prize) {
            $question.hide(200).text("Увы, тут была коза-стрекоза! Лучше меняй выбор, ведь шанс того, что машина будет в другой двери - выше")
            .show(200);
          }
        }
      }
    } else if ($selectedElement.hasClass("change")) {
      $selectedElement.parent().hide();
      for (var i = 0; i < $doorsArray.length; i++) {
        if (!$doorsArray[i].selected) {
          $doorsArray[i].open();
          if ($doorsArray[i].prize) {
            $question.hide(200).text("Поздравляю, машина твоя! Принятое тобой решение - правильное. При смене начального выбора шанс получить машину значительно выше")
            .show(200);
          } else if (!$doorsArray[i].prize) {
            $question.hide(200).text("Увы, тут была коза-стрекоза! Тебе просто не повезло, но по математическим законам ты в правильном направлении. При смене начального выбора шанс получить машину значительно выше")
            .show(200);
          }
        }
      }
    }
});

function restartGame() {

}

function assignDoorProperties() {
  for (var i = 0; i < $doorsArray.length; i++) { // присваиваю каждому дверному объекту свойства
    $doorsArray[i].prize = false;
    $doorsArray[i].selected = false;
    $doorsArray[i].open = function() {
      if (!this.prize) {
        showPrize(this);
      } else if (this.prize) {
        showPrize(this);
      }
    };
  }
}

function replaceDoor(door) {
  var newDoor = $("<div>", {
    class: "door"
  });
  var newCircle = $("<div>", {
    class: "circle"
  });
  var newSelection = $("<div>", {
    class: "selection"
  });
  newDoor.append(newCircle).append(newSelection);
  $(door).replaceWith(newDoor);
}

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
  var numberOfOpenedDoor;
  doorAlreadyOpened = true;

  for (var i = 0; i < $doorsArray.length; i++) {
    if ($doorsArray[i].selected === false && $doorsArray[i].prize === false) {
      doorsToOpen.push($doorsArray[i]);
    }
    $( $doorsArray[i] ).css({cursor: "default"});
  }
  if (doorsToOpen.length === 2) {
    $(doorsToOpen[randomDoor]).addClass("goat");
    doorsToOpen[randomDoor].open();
  } else if (doorsToOpen.length === 1) {
    $(doorsToOpen[0]).addClass("goat");
    doorsToOpen[0].open();
  } else {
    console.log("Что-то пошло не так, почему-то ведущий хочет открыть любую из 3 дверей");
  }
  for (var i = 0; i < $doors.length; i++) { // смотрит какая дверь открылась и присваивает это значение numberOfOpenedDoor
    if ( $($doorsArray[i]).hasClass("goat") ) {
      numberOfOpenedDoor = i + 1;
    }
  }

  $question.hide(200).text("Повезло, что не " + numberOfOpenedDoor + "-я дверь, там была коза! У тебя есть последний шанс поменять своё решение. Как поступишь?" )
  .show(200);
  $changeButton.parent().delay(200).show(1000);

}

function showPrize(door) {
  if (!door.prize) {
    var $goat = $("<img>", {
      src: "img/goat.jpg",
      alt: "козёл",
      class: "goat"
    });
    $(door).fadeOut("slow", function() {
      $(door).replaceWith($goat);
      $(door).fadeIn("slow");
    });
  } else if (door.prize) {
    var $car = $("<img>", {
      src: "img/car.jpg",
      alt: "машина",
      class: "car"
    });
    $(door).fadeOut("slow", function() {
      $(door).replaceWith($car);
      $(door).fadeIn("slow");
    });
  }
}

function randomize(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // генерируется число включая минимум и максимум
}

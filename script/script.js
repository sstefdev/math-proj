var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//kada kliknemo start/reset
document.getElementById("box__start-reset").onclick = function () {
  //ako igramo
  if (playing == true) {
    location.reload(); //relouduje stranicu
  } else {
    //menjamo mod u igranje
    playing = true;
    //score = 0
    score = 0;
    document.getElementById("score-value").innerHTML = score;
    //pokazemo vreme
    show("box__time-remaining");
    timeremaining = 60;

    document.getElementById("time-remaining-value").innerHTML = timeremaining;

    //krijemo game over
    hide("box__game-over");

    //dugme se menja na reset
    document.getElementById("box__start-reset").innerHTML = "resetuj igru";

    //otkucavanje vremena
    startCountdown();

    //pravi pitanje i vise odgovara
    generateQA();
  }
};

//kada kliknemo na odgovor
for (i = 1; i < 5; i++) {
  document.getElementById("box__choices--box" + i).onclick = function () {
    // da li igramo?
    if (playing == true) {
      //da
      if (this.innerHTML == correctAnswer) {
        //tacan odgovor
        score++;
        //povecava rezultat za 1
        document.getElementById("score-value").innerHTML = score;
        //sakriti netacnu kutiju i pokazati tacno
        hide("box__score--wrong");
        show("box__score--correct");
        setTimeout(function () {
          hide("box__score--correct");
        }, 1000);

        //pravljenje novog pitanja ako je tacan odgovor
        generateQA();
      } else {
        //netacan odgovor
        hide("box__score--correct");
        show("box__score--wrong");
        setTimeout(function () {
          hide("box__score--wrong");
        }, 1000);
      }
    }
  };
}

//funkcije

//pocinje sat
function startCountdown() {
  action = setInterval(function () {
    timeremaining -= 1;
    document.getElementById("time-remaining-value").innerHTML = timeremaining;
    if (timeremaining == 0) {
      //kraj igre
      stopCountdown();
      show("box__game-over");
      document.getElementById("box__game-over").innerHTML =
        "<p>Kraj Igre</p><p>Tvoj rezultat je " + score + ".</p>";
      hide("box__time-remaining");
      hide("box__score--correct");
      hide("box__score--wrong");
      playing = false;
      document.getElementById("box__start-reset").innerHTML = "Pocni igru";
    }
  }, 1000);
}

//zaustavlja sat
function stopCountdown() {
  clearInterval(action);
}

//krije elemnt
function hide(id) {
  document.getElementById(id).style.display = "none";
}

//pokazuje element
function show(id) {
  document.getElementById(id).style.display = "block";
}

//generise pitanje i odgovore
function generateQA() {
  var x = 1 + Math.round(9 * Math.random());
  var y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;
  document.getElementById("box__question").innerHTML = x + "X" + y;
  var correctPosition = 1 + Math.round(3 * Math.random());
  document.getElementById(
    "box__choices--box" + correctPosition
  ).innerHTML = correctAnswer; //popuni jednu kutiju tacnim odgovorm

  var answers = [correctAnswer];

  for (i = 1; i < 5; i++) {
    if (i !== correctPosition) {
      var wrongAnswer;
      do {
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random()));
      } while (answers.indexOf(wrongAnswer) > -1);

      document.getElementById("box__choices--box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}

const cvs = document.querySelector("#cvs"),
  ctx = cvs.getContext("2d");
// Set canvas width & height;
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

let s = 0,
  m = 0,
  h = 0,
  PlayerRacketY = cvs.height / 2 - 75,
  CompRacketY = cvs.height / 2 - 75,
  ballX = (cvs.width - 30) / 2,
  ballY = (cvs.height - 30) / 2,
  dx = 5,
  dy = -5;
const stopwatch = setInterval(() => {
  s++;
  if (s >= 60) {
    s = 0;
    m++;
    if (m >= 60) {
      m = 0;
      h++;
    }
  }
}, 1000);

const game = () => {
  // Fill canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  // Show stopwatch
  let time = `${h ? (h > 9 ? h : `0${h}`) : "00"}:${
    m ? (m > 9 ? m : `0${m}`) : "00"
  }:${s > 9 ? s : `0${s}`}`;
  ctx.font = "100px Helvetica";
  ctx.fillStyle = "#fff";
  ctx.fillText(
    time,
    (cvs.width - ctx.measureText(time).width) / 2,
    cvs.height / 5
  );

  // Show player racket
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, PlayerRacketY, 25, 150);
  // Show comp racket
  ctx.fillStyle = "#fff";
  ctx.fillRect(cvs.width - 25, CompRacketY, 25, 150);
  // Show ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, 15, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();

  const requistId = window.requestAnimationFrame(game);
  // There are four walls to bounce the ball off && Letting the paddle hit the ball
  if (ballX + dx < -15) {
    // Stop stopwatch
    clearTimeout(stopwatch);
    window.cancelAnimationFrame(requistId);
    // Remove all in canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    // Show game over
    const gameOver = "Game Over",
      playerScore = `Your score: ${time}`,
      enter = "Press ENTER";
    ctx.font = "100px Helvetica";
    ctx.fillStyle = "#fff";
    // Show game over
    ctx.fillText(
      gameOver,
      (cvs.width - ctx.measureText(gameOver).width) / 2,
      (cvs.height * 3) / 10
    );
    // Show player score
    ctx.fillText(
      playerScore,
      (cvs.width - ctx.measureText(playerScore).width) / 2,
      cvs.height / 2
    );
    // Show enter info
    ctx.font = "50px Helvetica";
    ctx.fillText(
      enter,
      (cvs.width - ctx.measureText(enter).width) / 2,
      (cvs.height * 7) / 10
    );
    // Reload game
    document.addEventListener("keypress", e => {
      if (e.keyCode == 13) location.reload();
    });
  } else if (
    (ballX + dx < 40 && ballY > PlayerRacketY && ballY < PlayerRacketY + 150) ||
    (ballX + dx > cvs.width - 40 &&
      ballY > CompRacketY &&
      ballY < CompRacketY + 150)
  ) {
    // Increase speed of ball
    Math.sign(dx) == 1 ? dx++ : dx--;
    dx = -dx;
  }

  if (ballY + dy > cvs.height - 15 || ballY + dy < 15) dy = -dy;
  // Set direction of ball and move it
  ballX += dx;
  ballY += dy;
  // Move computer racket
  CompRacketY = ballY - 75;
  if (CompRacketY < 0) CompRacketY = 0;
  else if (CompRacketY > cvs.height - 150) CompRacketY = cvs.height - 150;
};

game();

// Move player racket
cvs.addEventListener("mousemove", e => {
  PlayerRacketY = e.clientY;
  if (PlayerRacketY > cvs.height - 150) PlayerRacketY = cvs.height - 150;
});

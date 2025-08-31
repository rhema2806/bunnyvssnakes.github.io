const bunny = document.getElementById("bunny");
const snakeMessage = document.getElementById("snake-message");

let bunnyAlive = true;
let snakeActive = false;

// Bunny walks automatically to the left and loops
function moveBunny() {
  if (!bunnyAlive) return;

  let currentLeft = parseFloat(getComputedStyle(bunny).left);

  if (currentLeft > -50) {
    bunny.style.left = currentLeft - 2 + "px"; // bunny speed
  } else {
    // If bunny reaches left end, reset to right edge
    bunny.style.left = window.innerWidth + "px";
  }

  requestAnimationFrame(moveBunny);
}
moveBunny();

// Bunny click → dies (mistake)
bunny.addEventListener("click", () => {
  if (!bunnyAlive) return;
  bunnyDies();
  // Show snake bubble
  snakeMessage.style.display = "block";
  setTimeout(() => {
    snakeMessage.style.display = "none";
  }, 2000);
});

// Spawn snake (only one at a time)
function spawnSnake() {
  if (snakeActive || !bunnyAlive) return;
  snakeActive = true;

  const snake = document.createElement("div");
  snake.classList.add("snake");
  snake.textContent = "🐍";
  document.body.appendChild(snake);

  snake.style.left = window.innerWidth + "px"; // start off-screen right

  // Snake click → remove snake
  snake.addEventListener("click", () => {
    snake.remove();
    snakeActive = false;
  });

  const snakeSpeed = 2.5; // slightly slower than bunny

  function moveSnake() {
    if (!document.body.contains(snake) || !bunnyAlive) return;

    let snakeLeft = parseFloat(getComputedStyle(snake).left);
    let bunnyLeft = parseFloat(getComputedStyle(bunny).left);

    snakeLeft -= snakeSpeed; // move left
    snake.style.left = snakeLeft + "px";

    // Collision detection
    if (snakeLeft + 50 >= bunnyLeft && snakeLeft <= bunnyLeft + 60) {
      bunnyDies();
    }

    requestAnimationFrame(moveSnake);
  }

  moveSnake();
}

// Bunny dies
function bunnyDies() {
  bunny.textContent = "💀";
  bunny.classList.add("dead");
  bunnyAlive = false;
}

// Spawn a new snake every 3 seconds
setInterval(spawnSnake, 1000);

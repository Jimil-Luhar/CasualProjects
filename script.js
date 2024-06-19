let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');
let snake = [];
let food = {};
let score = 0;
let direction = 'right';
let speed = 5;
let intervalId;

// Initialize snake
snake.push({ x: 200, y: 200 });
generateFood();

// Draw checkerboard pattern
function drawCheckerboard() {
    let size = 20; // size of each square
    for (let y = 0; y < canvas.height; y += size) {
        for (let x = 0; x < canvas.width; x += size) {
            if ((x / size + y / size) % 2 === 0) {
                ctx.fillStyle = '#77e62e';
            } else {
                ctx.fillStyle = '#a7ed3e';
            }
            ctx.fillRect(x, y, size, size);
        }
    }
}

// Draw snake and food
function draw() {
    drawCheckerboard();

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = '#2277e0';
        ctx.fillRect(snake[i].x, snake[i].y, 20, 20);
    }

    // Draw food
    ctx.fillStyle = '#f22e07';
    ctx.fillRect(food.x, food.y, 20, 20);
}

// Generate food
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width - 20) / 20) * 20;
    food.y = Math.floor(Math.random() * (canvas.height - 20) / 20) * 20;
}

// Update snake
function updateSnake() {
    let head = snake[0];
    let newHead = {};

    switch (direction) {
        case 'right':
            newHead.x = head.x + 20;
            newHead.y = head.y;
            break;
        case 'left':
            newHead.x = head.x - 20;
            newHead.y = head.y;
            break;
        case 'up':
            newHead.x = head.x;
            newHead.y = head.y - 20;
            break;
        case 'down':
            newHead.x = head.x;
            newHead.y = head.y + 20;
            break;
    }

    // Check for collision with food
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        generateFood();
        updateSpeed();
    } else {
        snake.pop();
    }

    snake.unshift(newHead);

    // Check for collision with wall or self
    if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
        alert('Game Over! Score: ' + score);
        clearInterval(intervalId);
        location.reload();
    }

    for (let i = 1; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            alert('Game Over! Score: ' + score);
            clearInterval(intervalId);
            location.reload();
        }
    }
}

// Handle keyboard input
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowRight':
        case 'D':
        case 'd':
            if (direction !== 'left') direction = 'right';
            break;
        case 'ArrowLeft':
        case 'A':
        case 'a':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowUp':
        case 'W':
        case 'w':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
        case 'S':
        case 's':
            if (direction !== 'up') direction = 'down';
            break;
    }
});


// Update speed based on score
function updateSpeed() {
    clearInterval(intervalId);
    speed = 5 + Math.floor(score / 5); // Increase speed every 5 points
    intervalId = setInterval(gameLoop, 1000 / speed);
}

// Main game loop
function gameLoop() {
    updateSnake();
    draw();
}

// Start the game
intervalId = setInterval(gameLoop, 1000 / speed);

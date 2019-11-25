// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.height = 65;
        this.width = 95;
        this.sprite = 'images/enemy-bug.png';
        this.collision = false;
    }
    // Update the enemy's position, required method for game
    update(dt) {
        if (this.x > ctx.canvas.width + this.width) {
            this.x = -200 * Math.floor(Math.random() * 4) + 1;
        } else {
            this.x += 200 * dt;
        }
        // Check collison with player
        if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
            this.collision = true;
            if (player) {
                resetPlayer();
            }
        } else {
            this.collision = false;
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Player
class Player {
    constructor(x, y, sprite) {
        this.startX = x;
        this.startY = y;
        this.x = this.startX;
        this.y = this.startY;
        this.sprite = sprite;
        this.height = 75;
        this.width = 65;
    }
    // Update Player
    update(dt) {
        if (player.y < 40) {
            gameWon();
        }
    }
    // Player movements
    handleInput(movement) {
        const moveX = 101;
        const moveY = 83;
        switch (movement) {
            case 'left':
                if (movement === 'left' && this.x - moveX >= 0) {
                    this.x -= moveX;
                }
                break;
            case 'right':
                if (movement === 'right' && this.x + moveX < ctx.canvas.width) {
                    this.x += moveX;
                }
                break;
            case 'down':
                if (movement === 'down' && this.y + moveY < ctx.canvas.height - 200) {
                    this.y += moveY;
                }
                break;
            case 'up':
                if (movement === 'up' && this.y - moveY > 0 - player.height) {
                    this.y -= moveY;
                }
                break;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemyPosition = [60, 144, 228, 312];
const player = new Player(202, 400, 'images/char-boy.png');
let allEnemies = enemyPosition.map((y, index) => new Enemy((-200 * (index + 1)), y));

//Collision with enemy
collision = (px, py, pw, ph, ex, ey, ew, eh) => {
    return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);
};

// Notify player they won
gameWon = () => {
    console.log('gameWon');
    toggleWinModal();
    resetBoard();
};

// Reset player position
resetPlayer = () => {
    player.x = player.startX;
    player.y = player.startY;
};

// Cleanup the board
resetBoard = () => {
    allEnemies = [];
    resetPlayer();
};

// Handle win modal
toggleWinModal = () => {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('hide');
    document.querySelector('.modal-button').focus();
};

// Restart the game
(function restartGame() {
    const restartButton = document.querySelector('.modal-button');
    restartButton.addEventListener('click', function () {
        window.location.reload(true);
    });
})();

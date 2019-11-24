let game = true;

const Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.height = 65;
    this.width = 95;
    this.sprite = 'images/enemy-bug.png';
    this.collision = false;
};



Enemy.prototype.update = function(dt) {

    if (this.x > ctx.canvas.width + this.width) {
        this.x = -200 * Math.floor(Math.random() * 4) + 1;
    } else {
        this.x += 150 * dt;
    }

    //check collison with player
    if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
        this.collision = true;
        console.log('collision');
        if (player) {
            player.x = player.startX;
            player.y = player.startY;
        }
    } else {
        this.collision = false;
    }
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



//player
const Player = function(x,y,sprite) {
    this.startX = x;
    this.startY = y;
    this.x = this.startX;
    this.y = this.startY;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
    this.sprite = sprite;
};



Player.prototype.update = function(dt) {
    if (game && player.y < 40 ) {
        game = false;
        won();
    }
};


Player.prototype.handleInput = function(direction) {
    const horizontal = 101;
    const vertical = 83;

    if ( direction === 'left' && this.x - horizontal >= 0 ) {
        this.x -= horizontal;
    } else if ( direction === 'right' && this.x + horizontal < ctx.canvas.width ) {
        this.x += horizontal;
    } else if ( direction === 'down' && this.y + vertical < ctx.canvas.height - 200 ) {
        this.y += vertical;
    } else if ( direction === 'up' && this.y - vertical > 0 - player.height ) {
        this.y -= vertical;
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


const enemyPosition = [55,140,230];

const player = new Player(202, 400, 'images/char-boy.png');
let allEnemies = enemyPosition.map((y, index) =>{
    return new Enemy( (-200 * (index + 1)), y );
});

function collision (px, py, pw, ph, ex, ey, ew, eh) {
    return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh );
};

function won() {
    console.log('won');
    reset();
};

function reset() {
    //clear enemies
    allEnemies =[];
    //move player to starting position
    player.x = player.startX;
    player.y = player.startY;
}

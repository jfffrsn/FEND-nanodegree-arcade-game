let debug = false;
let game = true;


var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.height = 65;
    this.width = 95;
    this.sprite = 'images/enemy-bug.png';
};



Enemy.prototype.update = function(dt) {

};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



//player
var Player = function(x,y,sprite) {
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 65;
    this.sprite = sprite;
};



Player.prototype.update = function(dt) {

};


Player.prototype.handleInput = function(direction) {
    if ( direction === 'left') {
        this.x -= 100;
    } else if ( direction === 'right') {
        this.x += 100;
    } else if ( direction === 'up') {
        this.y -= 83;
    } else if ( direction === 'down') {
        this.y += 83;
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
const allEnemies = enemyPosition.map((y, index) =>{
    return new Enemy( (-200 * (index + 1)), y );
});

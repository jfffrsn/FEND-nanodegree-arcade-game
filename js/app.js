
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;

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

    this.sprite = sprite;
};



Player.prototype.update = function(dt) {

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

const player = new Player(202, 400, 'images/char-boy.png');
const allEnemies = [];

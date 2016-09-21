// Game class to help end the game
var Game = function() {
    gameEnd = false;
};
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.speedControl = 1;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    // determines the speed of the enemy
    this.x = this.x + this.speed * this.speedControl * dt;
    // calls the reset enemy function to reset the enemy when enemy reach the end of the screen
    if (this.x > 505) {
        this.x = 0
            //random number for the yPosition array.
        this.y = yPosition[Math.floor(Math.random() * yPosition.length)];
        // random number for the speed of the enemy
        this.speed = Math.floor((Math.random() * 50) + 10);
    }; // checks to see if the collision is happing and delays the hitdetection function
    if (player.collided) {
        setTimeout(function() {
            player.hitDetect();
        }, 200);
    } else {
        player.hitDetect();
    };
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = "images/char-boy.png";
    this.hit = "images/ka-pow.png"
    this.x = x;
    this.y = y;
    this.lives = 3;
    this.points = 0;
    this.collided = false;
};
Player.prototype.update = function(dt) {
    //checks to see if the player reaches the top and runs the win function.
    if (this.y < 0) {
        this.win();
    };
};
// Draw the player on the screen
Player.prototype.render = function() {
    // determines if the player and enemy collided and draws the correct "hit" image on the screen
    if (this.collided) {
        ctx.drawImage(Resources.get(this.hit), this.x, this.y);
    } else {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var yPosition = [250, 200, 150, 100, 50];
var allEnemies = [];
for (var i = 0; i <= 6; i++) {
    var x = 0;
    var y = yPosition[Math.floor(Math.random() * yPosition.length)];
    var speed = Math.floor((Math.random() * 300) + 10);
    var enemy = new Enemy(x, y, speed);
    allEnemies.push(enemy);
};
//instantiate the player
var player = new Player(200, 400);
Player.prototype.handleInput = function(loc) {
    // Change the player's position based on the user keyboard input
    if (loc == 'up') {
        this.y -= 50;
    } else if (loc == 'down') {
        this.y += 50;
    } else if (loc == 'left') {
        this.x -= 50;
    } else if (loc == 'right') {
        this.x += 50;
    }
    // Check the position of the player
    if (this.x < 0) {
        //prevent the player from leaving the screen
        this.x = 0;
    } else if (this.x > 400) {
        //prevent the player from leaving the screen
        this.x = 400;
        //prevent the player from leaving the screen
    } else if (this.y > 400) {
        this.y = 400
    };
};
//resets the player when the player collids with an enemy
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
    this.collided = false;
    //subtracts a live
    if (this.lives > 0) {
        this.lives -= 1;
        //ends the game if player lives is equal to 0
    } else if (this.lives <= 0) {
        game.gameEnd = true;
    };
    //updates the lives in html for index.html page
    document.getElementById("lives").innerHTML = this.lives;
};
Player.prototype.win = function() {
    // when player reaches the top of the screen player resets and extra point 10 points are awarded
    this.x = 200;
    this.y = 400;
    //adds 10 points everytime the player reaches the top
    this.points = this.points += 10;
    // adds a point to the speed control to make the enemy move faster
    enemy.speedControl = enemy.speedControl += 1;
    // updates the points section in html on index.html
    document.getElementById("points").innerHTML = this.points;
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        player.handleInput(allowedKeys[e.keyCode]);
    })
    // hit detection fucntion to determine if the ememy and player collide and what to do when it happens
Player.prototype.hitDetect = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        var e = allEnemies[i];
        if (this.x < e.x + 35 &&
            this.x + 40 > e.x &&
            this.y < e.y + 40 &&
            this.y + 50 > e.y) {
              this.collided = true;
              resetAfterCollision();
        };
    };
};
// delays the player reset function for the "hit" image to display
function resetAfterCollision() {
    setTimeout(function() {
        player.reset();
    }, 200);
};
// INSTANTIATE the game class
var game = new Game();

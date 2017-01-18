/*global Phaser*/

var game = new Phaser.Game(1350, 765, Phaser.AUTO, '');
var game_state = {};
var life = 3;
var health = 5;
var laserShot = true;
var score = 0;
var levelScore = 2;
var levelScore2 = 1;
var asteroidScore = 0;
var asteroid2 = 5;
var speed = 35;
var level = 1;

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {

        game.load.image('heart1', 'assets/Heart.png');
        game.load.image('heart2', 'assets/Heart.png');
        game.load.image('heart3', 'assets/Heart.png');
        game.load.image('starship', 'assets/starship.png');
        game.load.image('background', 'assets/background.png');
        game.load.image('laser', 'assets/laser.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('healthBar', 'assets/healthBar.png');
        game.load.image('health1', 'assets/health.png');
        game.load.image('health2', 'assets/health.png');
        game.load.image('health3', 'assets/health.png');
        game.load.image('health4', 'assets/health.png');
        game.load.image('health5', 'assets/health2.png');
        game.load.image('asteroid', 'assets/asteroid.png');
        game.load.image('earth', 'assets/earth.png');
        game.load.image('line', 'assets/line.png');
        game.load.image('explosion', 'assets/explosion.png');

    },

    create: function() {

        var _this = this;

        this.background = game.add.sprite(0, 0, 'background');

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.earth = game.add.sprite(100, 565, 'earth');

        this.explosion = game.add.group();

        this.asteroids = game.add.group();
        this.asteroids.enableBody = true;

        this.heart1 = game.add.sprite(1110, 0, 'heart1');
        this.heart2 = game.add.sprite(1190, 0, 'heart2');
        this.heart3 = game.add.sprite(1270, 0, 'heart3');

        this.line = game.add.sprite(0, 865, 'line');
        game.physics.arcade.enable(this.line);
        this.line.enableBody = true;
        this.line.immovable = true;
        
        this.line2 = game.add.sprite(0, -200, 'line');
        game.physics.arcade.enable(this.line2);
        this.line2.enableBody = true;
        this.line2.immovable = true;

        this.starship = game.add.sprite(675, 600, 'starship');
        game.physics.arcade.enable(this.starship);
        this.starship.enableBody = true;
        this.starship.immovable = true;

        this.stars = game.add.group();
        this.stars.enableBody = true;

        this.health1 = game.add.sprite(1155, 87, 'health1');
        this.health2 = game.add.sprite(1184, 87, 'health2');
        this.health3 = game.add.sprite(1209, 87, 'health3');
        this.health4 = game.add.sprite(1234, 87, 'health4');
        this.health5 = game.add.sprite(1260, 87, 'health5');

        this.healthBar = game.add.sprite(1110, 75, 'healthBar');

        this.scoreText = game.add.text(1110, 125, "Stars: " + score, {fontSize: "20px Arial", fill: "#ff0000"});
        this.scoreText2 = game.add.text(1110, 150, "Stars Needed: " + levelScore, { fontSize: "20px Arial", fill: "#ff0000"});
        this.healthText = game.add.text(1110, 40, "Earth Health:", { fontSize: "20px Arial", fill: "#ff0000"});
        // this.healthText2 = game.add.text(100, 100, "health", { fontSize: "20px Arial", fill: "#ff0000"});
        this.level = game.add.text(1110, 175, "Level:", { fontSize: "20px Arial", fill: "#ff0000"});
        // this.life = game.add.text(100, 125, "", { fontSize: "20px Arial", fill: "#ff0000"});

        this.lasers = game.add.group();
        this.lasers.enableBody = true;

        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.d = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        setInterval(function() {
            var asteroid = _this.asteroids.create(Math.random() * 1100, -64, 'asteroid');
            asteroid.body.gravity.y = speed;
        }, 3000);

    },

    update: function() {

        var _this = this;
        levelScore2 = levelScore - 1;
        
        this.scoreText.text = "Stars: " + score;
        this.scoreText2.text = "Stars Needed: " + levelScore;
        // this.healthText2.text = health;
        this.level.text = "Level: " + level;
        // this.life.text = life;
        if (this.space.isDown && laserShot == true) {
            var laser = this.lasers.create(this.starship.x + 41, this.starship.y - 50, 'laser');
            laser.body.velocity.y = -300;
            laserShot = false;
            setTimeout(function() {
                laserShot = true;
            }, 850);
        }
        if (this.left.isDown || this.a.isDown) this.starship.body.velocity.x = -350;
        else if (this.right.isDown || this.d.isDown) this.starship.body.velocity.x = 350;
        else this.starship.body.velocity.x = 0;
        game.physics.arcade.overlap(this.starship, this.asteroids, this.hitObject, null, this);
        game.physics.arcade.overlap(this.asteroids, this.line, this.die, null, this);
        game.physics.arcade.overlap(this.lasers, this.line2, this.die2, null, this);
        game.physics.arcade.overlap(this.lasers, this.asteroids, this.hitAsteroid, null, this);
        game.physics.arcade.overlap(this.starship, this.stars, this.collectStar, null, this);
        
        if (this.starship.x > -1000 && this.starship.x < -199) {
            this.starship.x = 1350;
        }

        if (this.starship.x > 1449 && this.starship.x < 2000) {
            this.starship.x = -100;
        }
        if (life < 3) {
            this.heart1.kill();
        }
        if (life < 2) {
            this.heart2.kill();
        }
        if (life < 1) {
            this.heart3.kill();
            this.starship.kill();
            laserShot = false;
            var explosion = this.explosion.create(this.starship.x - 50, this.starship.y - 50, 'explosion');
            setTimeout(function()
            {
                game.state.start('lose');
            }, 1500);
        }
        if (health < 5) {
            this.health5.kill();
        }
        if (health < 4) {
            this.health4.kill();
        }
        if (health < 3) {
            this.health3.kill();
        }
        if (health < 2) {
            this.health2.kill();
        }
        if (health < 1) {
            this.health1.kill();
            game.state.start('lose');
        }
        if (asteroidScore > 4) {
            asteroidScore = 0;
            var star = _this.stars.create(Math.random() * 1100, -64, 'star');
            star.body.gravity.y = 50;
        }
        if (score > levelScore2) {
            levelScore++;
            levelScore++;
            score = 0;
            level++;
            speed += 3;
        }
        
        if (level == 2)
        {
            game.state.start('boss');
        }
        
    },

    hitObject: function(starship, asteroid) {
        asteroid.kill();
        life--;
    },

    hitAsteroid: function(lasers, asteroid) {
        asteroid.kill();
        lasers.kill();
        asteroidScore++;
    },

    collectStar: function(starship, star) {
        star.kill();
        score++;
    },

    die: function(asteroid, line) {
        line.kill();
        health--;
    },
    
    die2: function(lasers, line2) {
        line2.kill();
    }

};
game.state.add('main', game_state.main);
// game.state.start('main');

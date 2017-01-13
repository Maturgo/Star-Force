/* global game Phaser game_state */

var life = 3;
var life2 = 10;
var laserShot = true;
var laserShot2 = true;
game_state.boss = function() {};

game_state.boss.prototype = {

    preload: function(){
        game.load.image('heart1', 'assets/Heart.png');
        game.load.image('heart2', 'assets/Heart.png');
        game.load.image('heart3', 'assets/Heart.png');
        game.load.image('starship', 'assets/starship.png');
        game.load.image('background', 'assets/background.png');
        game.load.image('laser', 'assets/laser.png');
        game.load.image('laser2', 'assets/laser2.png');
        game.load.image('earth', 'assets/earth.png');
        game.load.image('alien', 'assets/alien.png');
        game.load.image('explosion', 'assets/explosion.png');
        game.load.image('health.1', 'assets/health.1.png');
        game.load.image('health.2.1', 'assets/health2.1.png');
        game.load.image('healthBar1', 'assets/healthBar.1.png');
        game.load.image('nuke', 'assets/nuke.png');
        game.load.image('line', 'assets/line.png');
    },
    
    create: function(){
        life = 3;
        
        this.background = game.add.sprite(0, 0, 'background');
        
        this.earth = game.add.sprite(100, 565, 'earth');
        
        this.line = game.add.sprite(0, 865, 'line');
        game.physics.arcade.enable(this.line);
        this.line.enableBody = true;
        this.line.immovable = true;
        
        this.line2 = game.add.sprite(0, -200, 'line');
        game.physics.arcade.enable(this.line2);
        this.line2.enableBody = true;
        this.line2.immovable = true;
        
        this.explosion = game.add.group();
        
        this.lasers = game.add.group();
        this.lasers.enableBody = true;
        
        this.lasers2 = game.add.group();
        this.lasers2.enableBody = true;
        
        this.nuke = game.add.group();
        this.nuke.enableBody = true;
        
        this.starship = game.add.sprite(675, 600, 'starship');
        this.starship.enableBody = true;
        this.starship.immovable = true;
        game.physics.arcade.enable(this.starship);
        
        this.alien = game.add.sprite(0, 0, 'alien');
        game.physics.arcade.enable(this.alien);
        this.alien.enableBody = true;
        this.alien.immovable = true;
        
        this.life = game.add.text(100, 100, "", { fontSize: "20px Arial", fill: "#ff0000"});

        this.heart1 = game.add.sprite(1110, 0, 'heart1');
        this.heart2 = game.add.sprite(1190, 0, 'heart2');
        this.heart3 = game.add.sprite(1270, 0, 'heart3');
        
        this.health1 = game.add.sprite(1155, 87, 'health.1');
        this.health2 = game.add.sprite(1170, 87, 'health.1');
        this.health3 = game.add.sprite(1185, 87, 'health.1');
        this.health4 = game.add.sprite(1200, 87, 'health.1');
        this.health5 = game.add.sprite(1215, 87, 'health.1');
        this.health6 = game.add.sprite(1230, 87, 'health.1');
        this.health7 = game.add.sprite(1245, 87, 'health.1');
        this.health8 = game.add.sprite(1260, 87, 'health.1');
        this.health9 = game.add.sprite(1275, 87, 'health.1');
        this.health10 = game.add.sprite(1288, 87, 'health.2.1');
        
        this.healthBar = game.add.sprite(1110, 75, 'healthBar1');

        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.d = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        var _this = this;
        setInterval(function(){
            if (laserShot2 == true)
                {
                var laser2 = _this.lasers2.create(_this.alien.body.x + 84, _this.alien.body.y + 159, 'laser2');
                laser2.body.velocity.y = 400;
                }
        }, 750);
        setInterval(function(){
            if (laserShot2 == true)
            {
                var nuke = _this.nuke.create(_this.alien.body.x + 26, _this.alien.body.y + 159, 'nuke');
                nuke.body.velocity.y = 200;
            }
        }, 7875);
    },
    
    update: function(){
        
        this.life.text = life;
        
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
        
        game.physics.arcade.overlap(this.lasers, this.alien, this.bam, null, this);
        game.physics.arcade.overlap(this.lasers2, this.starship, this.blam, null, this);
        game.physics.arcade.overlap(this.nuke, this.starship, this.boom, null, this);
        game.physics.arcade.overlap(this.nuke, this.line, this.die, null, this);
        game.physics.arcade.overlap(this.lasers2, this.line,this.die3, null, this);
        game.physics.arcade.overlap(this.lasers, this.line2, this.die2, null, this);
        
        if (this.alien.x < 1)
        {
            this.alien.body.velocity.x = 300;
        }
        if (this.alien.x > 1151)
        {
            this.alien.body.velocity.x = -300;
        }
        
        if (this.starship.x > -1000 && this.starship.x < -199) {
            this.starship.x = 1350;
        }
        if (this.starship.x > 1449 && this.starship.x < 2000) {
            this.starship.x = -100;
        }
        if (life < 3 ) {
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
        
        if(life2 < 10)
        {
            this.health10.kill();
        }
        if(life2 < 9)
        {
            this.health9.kill();
        }
        if(life2 < 8)
        {
            this.health8.kill();
        }
        if(life2 < 7)
        {
            this.health7.kill();
            
        }
        if(life2 < 6)
        {
            this.health6.kill();
        }
        if(life2 < 5)
        {
            this.health5.kill();
        }
        if(life2 < 4)
        {
            this.health4.kill();
        }
        if(life2 < 3)
        {
            this.health3.kill();
        }
        if(life2 < 2)
        {
            this.health2.kill();
        }
        if (life2 < 1)
        {
            this.health1.kill();
            this.alien.kill();
            var explosion2 = this.explosion.create(this.alien.x - 50, this.alien.y, 'explosion');
            laserShot2 = false;
        }
        
        
    },

bam: function(laser, alien)
{
    alien.kill();
    life2--;
},
blam: function(laser2, starship)
{
    starship.kill();
    life--;
},
boom: function(nuke, starship)
{
    life = 0;
    starship.kill();
},
die: function(nuke, line)
{
    line.kill();
},
die2: function(laser, line2)
{
    line2.kill();
},
die3: function(laser2, line)
{
    line.kill();
}
};

game.state.add('boss', game_state.boss);
// game.state.start('boss');
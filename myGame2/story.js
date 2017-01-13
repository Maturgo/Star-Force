/* global game Phaser game_state */

var fly = 0;
game_state.story = function() {};

game_state.story.prototype = {
    
    preload: function(){
        game.load.image('starship2', 'assets/starship.png');
        game.load.image('general', 'assets/general.png');
        game.load.image('speech', 'assets/speech.png');
        game.load.image('astronaut', 'assets/astronaut.png');
    },
    
    create: function(){
        this.ship = game.add.sprite(625, 279, 'starship2');
        game.physics.arcade.enable(this.ship);
        this.ship.enableBody = true;
        this.ship.body.immovable = true;
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        setTimeout(function() {
            this.textBox = game.add.sprite(200, 525, 'speech');
            this.speech1 = game.add.text(380, 625, "Come in, Anthony, come in. Disaster on Earth. Big asteroids.", { fontSize: "32px", fill: "#1d560a"});
            this.speech2 = game.add.text(380, 575, "General Tony:", { fontSize: "32px", fill: "#1d560a"});
            this.general = game.add.sprite(225, 562, 'general');
        }, 2000);
        setTimeout(function() {
            this.textBox.kill();
            this.general.kill();
            this.speech1.destroy();
            this.speech2.destroy();
        }, 6500);
        setTimeout(function() {
            this.textBox1 = game.add.sprite(200, 525, 'speech');
            this.astronaut = game.add.sprite(225, 567, 'astronaut');
            this.speech3 = game.add.text(380, 625, "On it, General Tony.", { fontSize: "32px", fill: "#1d560a"});
            this.speech4 = game.add.text(380, 575, "Commander Anthony:", { fontSize: "32px", fill: "#1d560a"});
        }, 8500);
        setTimeout(function() {
            this.textBox1.kill();
            this.astronaut.kill();
            this.speech3.destroy();
            this.speech4.destroy();
        }, 11500);
        setTimeout(function()
        {
            this.textBox2 = game.add.sprite(200, 525, 'speech');
            this.general2 = game.add.sprite(225, 562, 'general');
            this.speech5 = game.add.text(380, 625, "Remember to use the right and left arrow keys or  \n A and D to move.", { fontSize: "20px Arial", fill: "#1d560a"});
            this.speech7 = game.add.text(380, 575, "General Tony:", { fontSize: "32px", fill: "#1d560a"});
        }, 13500);
        setTimeout(function() {
            this.speech5.destroy();
            this.speech8 = game.add.text(380, 625, "Use space to shoot the asteroids.", { fontSize: "32px", fill: "#1d560a"});
        }, 17500);
        setTimeout(function() {
            this.speech8.destroy();
            this.speech6 = game.add.text(380, 625, "Also collect stars as they fall down!", { fontSize: "32px", fill: "#1d560a"});
        }, 20500);
        setTimeout(function() {
            this.speech7.destroy();
            this.speech6.destroy();
            this.general2.kill();
            this.textBox2.kill();
            fly = 1;
        }, 23500);
        setTimeout(function() {
            game.state.start('main');
        }, 24500);
   
    },
    
    update: function(){
        if (fly > 0 && fly < 2) this.ship.body.velocity.y = -300;
    }
                                                                               
};
game.state.add('story', game_state.story);
game.state.start('story');                           
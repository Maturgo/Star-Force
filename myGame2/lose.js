/* global game Phaser game_state */

game_state.lose = function() {};

game_state.lose.prototype = {

    preload: function(){
        game.load.image('speech', 'assets/speech.png');
        game.load.image('general', 'assets/general.png');
    },
    
    create: function(){
        setTimeout(function()
        {
            this.textBox = game.add.sprite(200, 325, 'speech');
            this.general = game.add.sprite(225, 362, 'general');
            this.speech1 = game.add.text(380, 375, "General Tony:", { fontSize: "32px", fill: "#1d560a"});
            this.speech2 = game.add.text(380, 425, "You've failed us all, Anthony.", { fontSize: "32px", fill: "#1d560a"});
        }, 1000);
        setTimeout(function()
        {
            this.textBox.kill();
            this.general.kill();
            this.speech1.destroy();
            this.speech2.destroy();
        }, 4000);
    },
    
    update: function(){
        
    }

};

game.state.add('lose', game_state.lose);
//game.state.start('lose');
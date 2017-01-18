/* global game Phaser game_state */

game_state.win = function() {};

game_state.win.prototype = {

    preload: function(){
        game.load.image('general', 'assets/general.png');
        game.load.image('speech', 'assets/speech.png');
    },
    
    create: function(){
        setTimeout(function()
            {
                this.textBox = game.add.sprite(200, 325, 'speech');
                this.general = game.add.sprite(225, 362, 'general');
                this.speech1 = game.add.text(380, 375, "General Tony:", { fontSize: "32px", fill: "#1d560a"});
                this.speech2 = game.add.text(380, 425, "Well done, Anthony. You've saved Earth.", { fontSize: "32px", fill: "#1d560a"});
            }, 2000);
    },
    
    update: function(){
        
    },

};

game.state.add('win', game_state.win);
game.state.start('win');
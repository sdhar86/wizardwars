Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function  () {
	this.route ('home', {path: "/"});
    this.route('play', { 
        path: '/game/:_id',
        data: function () {
            var game = Games.findOne(this.params._id);

            if (game) { 
                game.player = game.players[Meteor.userId()];
                game.yourTurn = game.currentTurn[0] === Meteor.userId();
                game.deckSize = game.deck.length;

                var otherId = game.currentTurn[game.yourTurn ? 1 : 0];
                game.otherPlayer = {
                    username: Meteor.users.findOne(otherId).username,
                    lifePoint: game.players[otherId].lifePoint,
                    pendingDamage: game.players[otherId].pendingDamage,
                    hand: game.players[otherId].hand
                };

                game.total = game.deckSize + game.player.hand.length + game.otherPlayer.hand.length + game.used.length + game.table.length;

                if (game.winner) {
                    if (game.winner === 'tie') game.message = "It's a tie!";
                    else if (game.winner === Meteor.userId()) game.message = "You win!";
                    else game.message = 'You lose!';
                }

                return game;
            }
            return {};
        }
    });	
})
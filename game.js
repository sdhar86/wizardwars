Games = new Meteor.Collection('games');

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Meteor.users.find({ username: 'computer' }).count() === 0) {
            Meteor.users.insert({
                username: 'computer'
            });
        }
    });

    Meteor.publish('games', function () {
        return Games.find({ currentTurn: this.userId });
    });

    Meteor.publish('users', function () {
        return Meteor.users.find();
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('games')
    Meteor.subscribe('users');
}

Meteor.methods({
    createGame: function (otherPlayerId) {
        var game = GameFactory.createGame([Meteor.userId(), otherPlayerId]);
        Games.insert(game);
    },
    playCard: function  (gameId, id, card) {
        var game = Games.findOne(gameId),
            hand = game.players[id].hand,
            deck = game.deck;

        // make sure it  is the player's turn and player has that card in hand.   
        if (game.currentTurn[0] !== id || !Play.inHand(hand, card)) return; 
            game.table.push(card); // push  card to table
            game.players[id].hand = Play.removeCard(card, hand); // remove card from hand
            //if (deck.length == 0) // need to reload deck here
            game.players[id].hand.push(deck.shift()); // push card from deck to hand
            game.currentTurn.unshift(game.currentTurn.pop()); // change current turn
            game.turnCount ++ ; // count turn
            game.fatigueCountDown --; 
            if (game.fatigueCountDown == 0){
                // decrease lifepoints of both 
                game.fatigueCountDown = 10;
            }
        
        Games.update(gameId, game);
    }
});    
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
    }
});    
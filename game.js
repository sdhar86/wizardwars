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
            deck = game.deck,
            table = game.table,
            used = game.used,
            type = card.type,
            tableKeep = false,
            otherId =  game.currentTurn[game.currentTurn[0] === Meteor.userId() ? 1 : 0];

        // make sure it  is the player's turn and player has that card in hand.   
        if (game.currentTurn[0] !== id || !Play.inHand(hand, card)) return; 
            //game.table.push(card); // push  card to table
            game.players[id].hand = Play.removeCard(card, hand); // remove card from hand
            // put cards back in deck if deck is empty
            if (deck.length == 0) {
                 used.forEach(function (usedCard) {
                    game.deck.push(usedCard);
                    game.used = Play.removeCard(usedCard, game.used);
                });
            }
            game.players[id].hand.push(deck.shift()); // push card from deck to hand
            


        //effect of card
            if (type == 'blast'){
                // push  card to table
                game.table.push(card);
                // blast your opponent
                game.players[otherId].lifePoint = game.players[otherId].lifePoint + card.value;
                // apply pending Damage
                game.players[id].lifePoint = game.players[id].lifePoint + game.players[id].pendingDamage;
                game.players[id].pendingDamage = 0; 
                // clean table[] to used[] 
                 table.forEach(function (tableCard) {
                    game.used.push(tableCard);
                    game.table = Play.removeCard(tableCard, game.table);
                });
            }
            if (type == 'healer'){
                // push  card to table
                game.table.push(card);
                // heal yourself
                game.players[id].lifePoint = game.players[id].lifePoint + card.value;
                // apply pending Damage
                game.players[id].lifePoint = game.players[id].lifePoint + game.players[id].pendingDamage;
                game.players[id].pendingDamage = 0; 
                // clean table[] to used[] 
                 table.forEach(function (tableCard) {
                    game.used.push(tableCard);
                    game.table = Play.removeCard(tableCard, game.table);
                });                
            }
            if (type == 'curse'){
                // apply pending Damage
                game.players[id].lifePoint = game.players[id].lifePoint + game.players[id].pendingDamage;
                game.players[id].pendingDamage = 0;
                // clean table[] to used[] 
                 table.forEach(function (tableCard) {
                    game.used.push(tableCard);
                    game.table = Play.removeCard(tableCard, game.table);
                });   
                // push  card to table
                game.table.push(card); 
                 // apply pending Damage on opponent
                game.players[otherId].pendingDamage = card.value;
            }
            if (type == 'rebound'){
                if (!game.players[id].pendingDamage) {
                    // push to used (no effect/aka discarding)
                    game.used.push(card); 
                }    
                if (game.players[id].pendingDamage) {
                    // push  card to table
                    game.table.push(card); 
                    // rebound damage
                    game.players[otherId].pendingDamage = game.players[id].pendingDamage;
                    game.players[id].pendingDamage = 0;
                }                   
            }  
            if (type == 'doubler'){
                if (!game.players[id].pendingDamage) {
                    // push to used (no effect/aka discarding)
                    game.used.push(card); 
                }    

                if (game.players[id].pendingDamage){
                    // push  card to table
                    game.table.push(card); 
                    // double and rebound damage                
                    game.players[otherId].pendingDamage = 2*game.players[id].pendingDamage;
                    game.players[id].pendingDamage = 0;                    
                }

            } 
            if (type == 'block'){
                if (!game.players[id].pendingDamage) {
                    // push to used (no effect/aka discarding)
                    game.used.push(card); 
                }    

                if (game.players[id].pendingDamage){
                    // push  card to table
                    game.table.push(card); 
                    // block incoming attacks                              
                    game.players[id].pendingDamage = 0;

                    // clean table[] to used[] 
                     table.forEach(function (tableCard) {
                        game.used.push(tableCard);
                        game.table = Play.removeCard(tableCard, game.table);
                    });                      
                }
            }    


            game.players[id].lifePoint = game.players[id].lifePoint + game.players[id].pendingDamage;
            game.players[id].pendingDamage = 0; 
            


            game.currentTurn.unshift(game.currentTurn.pop()); // change current turn
            
            game.turnCount ++ ; // count turn
            game.fatigueCountDown --; // keeping track of fatigue

            if (game.fatigueCountDown == 0){
                game.players[id].lifePoint --;
                game.players[otherId].lifePoint --;
                game.fatigueCountDown = 10;
            }         

            game.lastCard = card;  
            // history to plot
            game.players[id].turnHistory.push(game.players[id].lifePoint);
            game.players[otherId].turnHistory.push(game.players[otherId].lifePoint);

            if (game.players[id].lifePoint <= 0 || game.players[otherId].lifePoint <= 0 ){
                game.inProgress = false;
                game.finished = new Date();
                console.log('game over');
                if (game.players[id].lifePoint <= 0 ) game.winner = otherId;
                if (game.players[otherId].lifePoint <= 0) game.winner = id;
                if (game.players[id].lifePoint <= 0 && game.players[otherId].lifePoint <= 0){
                    game.winner = 'tie';
                }  
            }             

        Games.update(gameId, game);
    }
});    
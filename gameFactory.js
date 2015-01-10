GameFactory = {};

GameFactory.createGame = function (playerIds) {
    var deck = createDeck(),
    	players = createPlayers(playerIds);

	GameFactory.dealPlayers(players, deck);    	

    return {
	    deck: deck,
	    players: players,
		table: [],
		used: [],
		turnCount: 0,
		fatigueCountDown: 10,    
	    inProgress: true,
	    currentTurn: playerIds,
        lastCard: {},
	    started: new Date()
	};
};


GameFactory.dealPlayers = function (players, deck) {
    for (var i = 0; i < 3; i++) {
        Object.keys(players).forEach(function (id) {
            players[id].hand.push(deck.shift());
        });
    }
};



function createPlayers(ids) {
    var o = {};

    ids.forEach(function (id) {
        o[id] = {
            hand: [],
            lifePoint: 20,
            pendingDamage: 0
        };
    });

    return o;
}


function createDeck () {
	var cards = [];

	 for (var i = 1; i <= 10; i++) {
	 		type =  (i < 5) ? 'blast' : 'curse';
	 		name =  (i < 5) ? 'B' : 'C'
	 		value = 0-i;
            cards.push({
                type: type,
                value: value,
                name: name,
                id: i
            });	 		
        }

 	 for (var i = 1; i <= 5; i++) {
	 		type =  'healer';
	 		name =  'H';
            cards.push({
                type: type,
                value: i,
                name: name,
                id: i
            });	 		
        }     

 	 for (var i = 1; i <= 4; i++) {
	 		type =  'block';
	 		name =  'Bl';
            cards.push({
                type: type,
                value: 0,
                name: name,
                id: i
            });	 		
        } 

 	 for (var i = 1; i <= 4; i++) {
	 		type =  'rebound';
	 		name =  'Re';
            cards.push({
                type: type,
                value: 0,
                name: name,
                id:  i
            });	 		
        } 

 	 for (var i = 1; i <= 2; i++) {
	 		type =  'doubler';
	 		name =  'Do';
            cards.push({
                type: type,
                value: 0,
                name: name,
                id: i
            });	 		
        }                           

    return _.shuffle(cards);   
}
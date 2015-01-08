Play = {};

Play.inHand = function (set, card) {
    for (var i = 0; i < set.length; i++) {
        if (matchCard(set[i], card)) return true; 
    }
    return false;
};

function matchCard(a, b) {
    return a.type === b.type && a.value === b.value && a.name === b.name && a.id === b.id;
}


// removes a card from a set of cards.
Play.removeCard = function (card, set) {
    return set.filter(function (setCard) {
        return !matchCard(card, setCard);
    });
};
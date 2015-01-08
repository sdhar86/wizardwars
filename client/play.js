Template.hand.events({
    'click .card': function (evt, template) {
        if (template.data.yourTurn) {
            Meteor.call('playCard', template.data._id, Meteor.userId(), this);
        }
    }
});

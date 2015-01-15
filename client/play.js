// Template.yourlife.rendered = function() {
//      $(".dial").knob({
//             "min":-30,
//             "max":30,
//             "fgColor": "#ffec03",
//             "thickness": ".1",
//             "readOnly": true,
//             "width" : 100,
//             "dynamicDraw" : true
//      });
// };


Template.hand.events({
    'click .card': function (evt, template) {
        if (template.data.yourTurn) {
            Meteor.call('playCard', template.data._id, Meteor.userId(), this);
        }
    }
});

// Template.score.rendered = function  () {

// var turnStart = 2000;
// var turnEnd = 2040;

// var arr = [];
// for (var i = Things.length - 1; i >= 0; i--) {
// 	Things[i]
// };
// (yearStart < yearEnd+1){
//   arr.push(yearStart++);
// }
// 	var data = {
//   // A labels array that can contain any sort of values
//   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
//   // Our series array that contains series objects or in this case series data arrays
//   series: [
//     [5, 2, 4, 2, 0]
//   ]
// };

// // Create a new line chart object where as first parameter we pass in a selector
// // that is resolving to our chart container element. The Second parameter
// // is the actual data object.
// new Chartist.Line('.ct-chart', data);
// }

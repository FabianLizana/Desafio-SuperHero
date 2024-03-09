window.onload = function(){
var chart = new CanvasJS.Chart("#chartContainer", {
	animationEnabled: true,
	exportEnabled: false,
	theme: "light1", // "light1", "light2", "dark1", "dark2"
	title:{
		text: ""
	},
  	axisY: {
      includeZero: true
    },
	data: [{
		type: "pie", //change type to bar, line, area, pie, etc
		// indexLabel: "{y}", //Shows y value on all Data Points
		indexLabelFontColor: "#5A5757",
      	indexLabelFontSize: 16,
		indexLabelPlacement: "outside",
		dataPoints: [
			{ x: 0, y: 0 },
			{ x: 5, y: 0},
		]
	}]
});
chart.render();
}
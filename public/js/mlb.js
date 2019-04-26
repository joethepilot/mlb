// Javascript to support MLB statistics viewing displayed in index.html

// Namespace the code.
window.mlb = window.mlb || {};

mlb = {
    statsUrl : "https://api.mobileqa.mlbinfra.com/api/interview/v1/records",

    // start() is called on page load.
    start : function() {
	// Get the data to display.
	mlb.getData();
    },
    
    getData : function() {
	// Hide the error div in case it was displayed previously.
	$('#error_div').hide();

	// Get the stats data
	$.get(mlb.statsUrl)
	    .done(mlb.onSuccessGetData)
	    .fail(mlb.onErrorGetData);
    },
    
    onSuccessGetData : function(data, status) {
	// Sort the incoming data by league, division, win/loss ratio.
	data.sort(mlb.sortByLeague);

	// Loop through all returned records.
	var last_league = "";
	var last_division = "";
	$.each(data, function(index, item) {
	    // Show the league, division and column headers if the league changed.
	    if (last_league != item.league) {
		var div = "<div class='league-row'>" + item.league + "</div>";
		$(div).appendTo("div#stats_div");
		div = "<div class='division-row'>" + item.division + "</div>";
		$(div).appendTo("div#stats_div");
		div = "<div class='item-header'>Team</div>";
		$(div).appendTo("div#stats_div");
		div = "<div class='item-header'>Wins</div>";
		$(div).appendTo("div#stats_div");
		div = "<div class='item-header'>Losses</div>";
		$(div).appendTo("div#stats_div");
	    }
	    // Show the division and column headers if the division changed.
	    else if (last_division != item.division) {
		div = "<div class='division-row'>" + item.division + "</div>";
		$(div).appendTo("div#stats_div");
		div = "<div class='item-header'>Team</div>";
		$(div).appendTo("div#stats_div");
		div = "<div class='item-header'>Wins</div>";
		$(div).appendTo("div#stats_div");
		div = "<div class='item-header'>Losses</div>";
		$(div).appendTo("div#stats_div");
	    }
	    
	    // Show the stats for this team.
	    var teamitem = "<div class='grid-item'>" + item.team + "</div>";
	    $(teamitem).appendTo("div#stats_div");
	    var winsitem = "<div class='grid-item'>" + item.wins + "</div>";
	    $(winsitem).appendTo("div#stats_div");
	    var lossesitem = "<div class='grid-item'>" + item.losses + "</div>";
	    $(lossesitem).appendTo("div#stats_div");
	    
	    last_league = item.league;
	    last_division = item.division;
	});
    },

    // Cascade sort the data, first by league, then by division
    // and finally by win/loss ratio.
    sortByLeague : function(a, b) {
	// If league values are the same, sort by division.
	if (a.league === b.league) {
	    return mlb.sortByDivision(a, b);
	}
	
	// Otherwise, sort by league.
	return ((a.league < b.league) ? -1 : ((a.league > b.league) ? 1 : 0));
    },
    
    sortByDivision : function(a, b) {
	// If division values are the same, sort by win/loss ratio.
	if (a.division === b.division) {
	    return mlb.sortByWL(a, b);
	}

	// Otherwise sort by division.
	return ((a.division < b.division) ? -1 : ((a.division > b.division) ? 1 : 0));
    },
    
    sortByWL : function(a, b) {
	// Sort by win/loss ratio.
	var aWL = a.wins/a.losses;
	var bWL = b.wins/b.losses;
	return ((aWL > bWL) ? -1 : ((aWL < bWL) ? 1 : 0));
    },
    
    onErrorGetData : function(request, status, error) {
	if (!error) return;

	// Display error message in error_div.
	var msg = "Could not load " + mlb.statsUrl + ", error: " + error;
	$('#error_div').show();
	$('#error_div').html(msg);
    },
};

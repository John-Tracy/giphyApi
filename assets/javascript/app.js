// array of names for intial buttons.

var gifs = {
	intialGifs: ['cats', 'lizards', 'motocross', 'coffee'],

	renderButtons: function () {
			
		$('#buttonDiv').empty();
	
			for (var i = 0; i < this.intialGifs.length; i++) {
				var x = $('<button>');
		    	x.addClass('randomGif');  
		    	x.attr('data-name', this.intialGifs[i]);
		    	x.text(this.intialGifs[i]); 
		    	$('#buttonDiv').append(x); 	
		}
	},

	displayGifs: function () {

	var theGif = $(this).attr('data-name');
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + theGif + "&api_key=dc6zaTOxFJmzC";

	$.ajax({url: queryUrl, })

	}


}



$('#infoCatch').on('click', function(){

	var gif = $('#newButton').val().trim();

	gifs.intialGifs.push(gif);

	gifs.renderButtons();

	$('#newButton').val('');

	return false;

});


$(document).on('click', '.randomGif', gifs.displayGifs());


gifs.renderButtons();
















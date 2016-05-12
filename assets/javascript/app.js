// array of names for intial buttons.

var gifs = {
	// intial buttons and search parameters for gifs.
	intialGifs: ['cats', 'lizards', 'motocross', 'coffee', 'coding'],

	renderButtons: function () {
			
		$('#buttonDiv').empty();
		// makes all the buttons.
			for (var i = 0; i < this.intialGifs.length; i++) {
				var x = $('<button>');
		    	x.addClass('btn btn-default randomGif');  
		    	x.attr('data-name', this.intialGifs[i]);
		    	x.text(this.intialGifs[i]); 
		    	$('#buttonDiv').append(x); 	
		}
	},

	displayGifs: function () {

	// dynamically displays text to inform user to play or pause gif
	var hThree = $('<h3>');
	var spanEl = $('<span>');
		
		spanEl.addClass('glyphicon glyphicon-play-circle');

		hThree.html('Click image to play/pause ');
		hThree.append(spanEl)
		$('#playText').append(hThree);
	// puts the search name into a variable to be added to url.
	var theGif = $(this).attr('data-name');
	// dynamically generated URL that searches name of button.
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + theGif + "&limit=30&api_key=dc6zaTOxFJmzC";
	// ajax request to get info for all gifs
	$.ajax({url: queryUrl, method: 'GET'}).done(function(response){
		// console.log(response);
		// empties old gifs from last button press.
		$('#gifDiv').empty();
		// generates each gif.
		for(var i = 0; i < response.data.length; i++){
			// setting variables that hold object info
			var gifUrl = response.data[i].images.fixed_height_still.url;
			var gifAnimate = response.data[i].images.fixed_height.url;
			var gifRating = response.data[i].rating;
			// variable that holds div element.
			var gifHolder = $('<div>');

				gifHolder.addClass('thumbnail');
			// variable for the heading tag that will hold ratting info.
			var gifP = $('<h4>');

				gifP.addClass('rating');
				gifP.text('Rating: ' + gifRating);
			// variable that holds img tag that will hold gif url and other attributes
			var gifImage = $('<img>');

            gifImage.attr('src', gifUrl);
            gifImage.attr('data-still', gifUrl);
            gifImage.attr('data-animate', gifAnimate);
            gifImage.attr('data-state', 'still');
            gifImage.attr('alt', 'It is a GIF');
            gifImage.addClass('newGif');
            // adds gif and its corresponding ratting to the gif holder div element.
            gifHolder.append(gifImage);
            gifHolder.append(gifP);
            // adds the newly made gif holder div to the div that will hold all the gifs.
        	$('#gifDiv').append(gifHolder);
    	};
	})

	},

	play: function() {

		var dataState = $(this).attr('data-state');
		// console.log(dataState);
		// changes data state and src to play or pause gif.
		if(dataState == 'still'){
			$(this).attr('src', $(this).data('animate'));
			$(this).attr('data-state', 'animate');
		}
		else if(dataState == 'animate'){
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
		}


	}


};


$('#infoCatch').on('click', function(){

	var gif = $('#newButton').val().trim();

	gifs.intialGifs.push(gif);

	gifs.renderButtons();

	$('#newButton').val('');

	return false;

});

// click listener for making gifs when a button is pressed
$(document).on('click', '.randomGif', gifs.displayGifs);
// click listener for playing or pausing gif
$(document).on('click', '.newGif', gifs.play);
// renders intial buttons
gifs.renderButtons();
















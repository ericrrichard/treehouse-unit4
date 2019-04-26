/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {

    // The total number of guesses the user can miss before game over.
    maxMisses = 5;
    
    constructor( ) {
	this.missed = 0;
	this.phrases =
	    [
		new Phrase( "This is a test" ),
		new Phrase( "This is only a test" ),
		new Phrase( "By the power of greyskull" ),
		new Phrase( "Pretty sneaky sis" ),
		new Phrase( "I love it when a plan comes together" )
	    ];
	this.activePhrase = null;
    }

    startGame() {

	// Get rid of the overlay
	let $startScreen = $( "#overlay" );
	$startScreen.hide();


	// Its possible there was a previous game played, so clean up
	// after ourselves.
	this.resetLives();
	this.resetKeyboard();

	// Get our phrase and display it.
	this.activePhrase = this.getRandomPhrase();
	this.activePhrase.addPhraseToDisplay();

	
    }

    getRandomPhrase() {
	let index = Math.floor( Math.random() * this.phrases.length );
	return( this.phrases[ index ] );
    }
    
    removeLife() {
	let $lives = $( "#scoreboard li" );
	let $lifeToRemove = $lives.eq( this.missed );
	let $imageToReplace = $lifeToRemove.children().first();
	$imageToReplace.attr( "src", "images/lostHeart.png" );
	$imageToReplace.attr( "alt", "Missed Heart Icon" );
    
	this.missed++;
	if ( this.missed === this.maxMisses ) {
	    this.gameOver();
	}
	
    }

    // If there was a previous game played, we need to clean
    // up everything related to our lives.
    resetLives() {
	let $lives = $( "#scoreboard li img" );
	$lives.attr( "src", "images/liveHeart.png" );
	$lives.attr( "alt", "Heart Icon" );
    
	this.missed = 0;
    }

    resetKeyboard() {
	let $keys = $( "#qwerty .key" );
	$keys.removeClass( "wrong" );
	$keys.removeClass( "chosen" );
	$keys.prop( "disabled", false );
    }
    
    checkForWin() {
	let $missingChars = $( '#phrase ul .hide' );
	return( $missingChars.length === 0 );
    }

    gameOver() {

	let $startScreen = $( "#overlay" );
	$startScreen.show();

	let $message = $( "#game-over-message" );
	if ( this.missed === this.maxMisses ) {
	    $message.text( "Sorry, you lost.  Play again?" );
	}
	else {
	    $message.text( "Congrats!  You won!" );
	}

    }

    handleInteraction( $event ) {

	let letter;
	let $target = $( $event.target );
	if ( $event.type === "click" ) {
	    letter = $target.text();
	}

	$target.prop( "disabled", true );
	
	if ( this.activePhrase.checkLetter( letter ) ) {
	    // We found a letter. Do the necessary.
	    $target.addClass( "chosen" );
	    this.activePhrase.showMatchedLetter( letter );
	
	    if ( this.checkForWin() ) {
		this.gameOver();
	    }
	}
	else {
	    // Letter not found
	    $target.addClass( "wrong" );
	    this.removeLife();
	}
	
    }
}

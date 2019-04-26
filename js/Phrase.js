/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {

    $phrase = $( '#phrase ul' );

    constructor( phrase ) {
	this.phrase = phrase.toLowerCase();
    }

    // Puts the phrase on the display.
    addPhraseToDisplay() {

	// Its possible there was a previous game, so clear the display first.
	this.$phrase.empty();

	for ( let i = 0; i < this.phrase.length; i++ ) {
	    let letter = this.phrase[ i ];
	    let $letter;
	    if ( /\w/.test( letter ) ) {
		$letter = $( `<li class="hide letter ${letter}">${letter}</li>` );
	    }
	    else if ( / /.test( letter ) )  {
		$letter = $( `<li class="space"> </li>` );
	    }
	    else {
		// This shouldn't happen...
		continue;
	    }
		
	    this.$phrase.append( $letter );
	}
    }


    // Checks to see if the guessed letter is in the phrase.  Returns
    // true or false accordingly.
    checkLetter( letterGuess ) {
	for ( let i = 0; i < this.phrase.length; i++ ) {
	    let letterInPhrase = this.phrase[ i ];

	    if ( letterGuess === letterInPhrase ) {
		return( true );
	    }
	}
	// Nothing matched, so must not be in there.
	return ( false );
    }

    showMatchedLetter( letterGuess ) {
	let $letters = $( '#phrase ul .' + letterGuess );
	$letters.removeClass( "hide" );
	$letters.addClass( "show" );
	
    }
    
}

/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let myGame;

$( "#btn__reset" ).click( () => { myGame = new Game(); myGame.startGame(); } );

$( "#qwerty" ).on( "click", ".key", (event) => myGame.handleInteraction( event ) );



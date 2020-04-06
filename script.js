var player1 = prompt("Blue player enter your name: ");
var player1Color = 'rgb(86, 151, 255)';
var player2 = prompt("Red player enter your name: ");
var player2Color = 'rgb(237, 45, 73)';
var table = $('table tr');


// change button color
function changeColor(row, column, color){
  return table.eq(row).find('td').eq(column).find('button').css('background-color', color);
}


// Report Back to current color of a button
function returnColor(row, column){
  return table.eq(row).find('td').eq(column).find('button').css('background-color');
}


// check bottom most gray spot
function columnBottom(column){
  var colorReturned = returnColor(5, column);
  for (var row = 5; row >= 0; row--) {
    colorReturned = returnColor(row,column);
    if (colorReturned === 'rgb(128, 128, 128)'){
      return row
    }
  }
}


// check for 4 consistent colors
function colorMatch(one, two, three, four){
  return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}


// check for horizontal win
function horizontalWin() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatch(returnColor(row, col), returnColor(row, col + 1) ,returnColor(row, col + 2), returnColor(row, col + 3))){
        return true;
      }else{
        continue;
      }
    }
  }
}


// Check for vertical win
function verticalWin() {
  for (var col = 0; col < 7; col++){
    for (var row = 0; row < 3; row++){
      if (colorMatch(returnColor(row, col), returnColor(row + 1, col) ,returnColor(row + 2, col), returnColor(row + 3, col))) {
        return true;
      }else{
        continue;
      }
    }
  }
}


// Check for diagonal win
function diagonalWin(){
  for (var col = 0; col < 5; col++){
    for (var row = 0; row < 7; row++){
      if (colorMatch(returnColor(row, col), returnColor(row + 1, col + 1) ,returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
        return true;
      }else if (colorMatch(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        return true;
      }else{
        continue;
      }
    }
  }
}


// check to see if the game was a tie
function tieGame(){
  var tableTop = $('.top-row button');
  if ((tableTop.eq(0).css('background-color') ===  'rgb(86, 151, 255)' || tableTop.eq(0).css('background-color') === 'rgb(237, 45, 73)') &&
   (tableTop.eq(1).css('background-color') ===  'rgb(86, 151, 255)' || tableTop.eq(1).css('background-color') === 'rgb(237, 45, 73)') &&
   (tableTop.eq(2).css('background-color') ===  'rgb(86, 151, 255)' || tableTop.eq(2).css('background-color') === 'rgb(237, 45, 73)') &&
   (tableTop.eq(3).css('background-color') ===  'rgb(86, 151, 255)' || tableTop.eq(3).css('background-color') === 'rgb(237, 45, 73)') &&
   (tableTop.eq(4).css('background-color') ===  'rgb(86, 151, 255)' || tableTop.eq(4).css('background-color') === 'rgb(237, 45, 73)') &&
   (tableTop.eq(5).css('background-color') ===  'rgb(86, 151, 255)' || tableTop.eq(5).css('background-color') === 'rgb(237, 45, 73)') &&
   (tableTop.eq(6).css('background-color') ===  'rgb(86, 151, 255)' || tableTop.eq(6).css('background-color') === 'rgb(237, 45, 73)')){
    alert("Tie Game! Refresh to play again!");
  }
}


// game over
function gameOver(winner){
  for (var col = 0; col < 7 ; col++){
    for (var row = 0; row < 7; row++){
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winner + " won! Refresh browser to play again!").css("fontSize", "50px");
    }
  }
}


var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1 + " it is your turn!");

$('.board button').on('click', function(){
  // players clicked column
  var column = $(this).closest("td").index();
  var tableTop = $('.top-row button');

  // lowest open spot
  var openSpot = columnBottom(column);

  // change lowest open spot
  changeColor(openSpot, column, currentColor);

  // see if either player won
  if (horizontalWin() || verticalWin() || diagonalWin()) {
    gameOver(currentName);
  }

  tieGame();

  // switch player if no one won or was a tie game
  currentPlayer = currentPlayer * -1 ;

  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName+" it is your turn");
    currentColor = player1Color;
  }else{
    currentName = player2
    $('h3').text(currentName+" it is your turn");
    currentColor = player2Color;
  }
})

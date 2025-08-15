export const renderBoard = function (humanPlayer, computerPlayer) {
  const humanBoardDiv = document.querySelector('.player-board');
  const computerBoardDiv = document.querySelector('.computer-board');

  console.log(humanPlayer.board.shipArray)
  for (let i  = 0; i  < 4 ;i++){
    let shipToRender = humanPlayer.board.shipArray[i]
    console.log(shipToRender)
  }
  
  
};

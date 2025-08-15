export const renderBoard = function (humanPlayer, computerPlayer) {
  const humanBoardDiv = document.querySelector('.player-board');
  const computerBoardDiv = document.querySelector('.computer-board');

  for (let i = 0; i < 4; i++) {
    let shipToRender = humanPlayer.board.shipArray[i];
    let len = shipToRender.newShip.length;
    let yPos = shipToRender.yPos;
    let xPos = shipToRender.xPos;
    const box1 = humanBoardDiv.querySelector(`[data-pos = "${xPos},${yPos}"]`);
    console.log(box1,xPos);
    // console.log(len, xPos, yPos);
  }
};

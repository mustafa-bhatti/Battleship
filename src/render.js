export const renderBoard = function (humanPlayer, computerPlayer) {
  const humanBoardDiv = document.querySelector('.player-board');
  const computerBoardDiv = document.querySelector('.computer-board');
  renderBoxes(humanPlayer, humanBoardDiv);
  renderBoxes(computerPlayer, computerBoardDiv);
};
function renderBoxes(player, boardDiv) {
  for (let i = 0; i < 4; i++) {
    let shipToRender = player.board.shipArray[i];
    let len = shipToRender.newShip.length;
    let yPos = shipToRender.yPos;
    let xPos = shipToRender.xPos;
    let direction = shipToRender.direction;
    for (let j = 0; j < len; j++) {
      if (direction === 'V') {
        const box1 = boardDiv.querySelector(
          `[data-pos = "${xPos + j},${yPos}"]`
        );
        box1.classList.add('ship-box');
      } else if (direction === 'H') {
        const box1 = boardDiv.querySelector(
          `[data-pos = "${xPos},${yPos + j}"]`
        );
        box1.classList.add('ship-box');
      }
    }
    // console.log(len, xPos, yPos);
  }
}

export const renderAttacks = function (player, boardDiv) {
  const missedAttacks = player.board.missedAttacks;
  const hitAttacks = player.board.hitAttacks;
  for (let i = 0; i < missedAttacks.length; i++) {
    const xPos = missedAttacks[i][0];
    const yPos = missedAttacks[i][1];
    const box = boardDiv.querySelector(`[data-pos = "${xPos},${yPos}"]`);
    box.classList.add("miss");
  }
  for (let i = 0; i < hitAttacks.length; i++) {
    const xPos = hitAttacks[i][0];
    const yPos = hitAttacks[i][1];
    const box = boardDiv.querySelector(`[data-pos = "${xPos},${yPos}"]`);
    box.classList.add("hit");
  }
};

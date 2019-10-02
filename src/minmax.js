import { constants, switchPlayer } from './utils';

const { SCORES } = constants;

export const minmax = (boardLogic, player) => {
  const multi = SCORES[player];
  let thisScore;
  let maxScore = -1;
  let bestMove = null;

  if (boardLogic.getWinner() !== null) {
    return [SCORES[boardLogic.getWinner()], 0];
  }
  boardLogic.getEmptySquares().forEach(_empty => {
    const copy = boardLogic.clone();
    copy.makeMove(_empty, player);
    thisScore = multi * minmax(copy, switchPlayer(player))[0];

    if (thisScore >= maxScore) {
      maxScore = thisScore;
      bestMove = _empty;
    }
  });
  return [multi * maxScore, bestMove];
};

export default minmax;

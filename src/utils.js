export const constants = {
  DIMS: 3,
  DRAW: 0,
  PLAYER_X: 1,
  PLAYER_O: 2,
  SQUARE_DIMS: 100,
  SCORES: {
    1: 1,
    0: 0,
    2: -1
  }
};

export const GAME_STATES = {
  notStarted: 'not_started',
  inProgress: 'in_progress',
  over: 'over'
};

export const switchPlayer = player => {
  return player === constants.PLAYER_X
    ? constants.PLAYER_O
    : constants.PLAYER_X;
};

// Create random integer in the range of min-max
export const getRandomInt = (min, max) => {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1)) + min;
};

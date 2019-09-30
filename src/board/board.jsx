import React, { useState, useEffect, useCallback } from 'react';
import { constants, getRandomInt, GAME_STATES, switchPlayer } from '../utils';
import {
  Container,
  Square,
  Marker,
  Screen,
  Inner,
  ChooseText,
  ButtonRow
} from './board.styles';

const arr = Array(constants.DIMS ** 2).fill(null);

const Board = () => {
  const [grid, setGrid] = useState(arr);
  const [players, setPlayers] = useState({
    human: constants.PLAYER_X,
    droid: constants.PLAYER_O
  });
  const [gameState, setGameState] = useState(GAME_STATES.notStarted);
  const [nextMove, setNextMove] = useState(null);

  const { human, droid } = players;

  const chooseSide = option => {
    setPlayers({ human: option, droid: switchPlayer(option) });
    setGameState(GAME_STATES.inProgress);
  };

  const move = useCallback(
    (index, player) => {
      if (player && gameState === GAME_STATES.inProgress) {
        setGrid(grid => {
          const gridCopy = grid.concat();
          gridCopy[index] = player;
          return gridCopy;
        });
      }
    },
    [gameState]
  );

  const droidMove = useCallback(() => {
    let index = getRandomInt(0, 8);
    while (grid[index]) {
      index = getRandomInt(0, 8);
    }
    move(index, droid);
    setNextMove(human);
  }, [move, grid, players]);

  const humanMove = index => {
    if (!grid[index && nextMove === human]) {
      move(index, human);
      setNextMove(droid);
    }
  };

  useEffect(() => {
    let timeout;
    if (
      nextMove !== null &&
      gameState !== GAME_STATES.over &&
      nextMove === droid
    ) {
      timeout = setTimeout(() => {
        droidMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, droidMove, droid, gameState]);

  return gameState === GAME_STATES.notStarted ? (
    <Screen>
      <Inner>
        <ChooseText>Choose your player</ChooseText>
        <ButtonRow>
          <button onClick={() => chooseSide(constants.PLAYER_X)}>X</button>
          <p>or</p>
          <button onClick={() => chooseSide(constants.PLAYER_O)}>O</button>
        </ButtonRow>
      </Inner>
    </Screen>
  ) : (
    <Container dims={constants.DIMS}>
      {grid.map((value, index) => {
        return (
          <Square key={index} onClick={() => humanMove(index)}>
            {value !== null && (
              <Marker>{value === constants.PLAYER_X ? 'X' : 'O'}</Marker>
            )}
          </Square>
        );
      })}
    </Container>
  );
};

export default Board;

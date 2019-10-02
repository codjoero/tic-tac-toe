import React, { useState, useEffect, useCallback } from 'react';
import { constants, getRandomInt, GAME_STATES, switchPlayer } from '../utils';
import BoardLogic from '../boardLogic';
import minimax from '../minmax';

import {
  Container,
  Square,
  Marker,
  Screen,
  Inner,
  ChooseText,
  ButtonRow
} from './board.styles';

const boardLogic = new BoardLogic();

const arr = Array(constants.DIMS ** 2).fill(null);

const Board = () => {
  const [grid, setGrid] = useState(arr);
  const [players, setPlayers] = useState({
    human: constants.PLAYER_X,
    droid: constants.PLAYER_O
  });
  const [gameState, setGameState] = useState(GAME_STATES.notStarted);
  const [nextMove, setNextMove] = useState(null);
  const [winner, setWinner] = useState(null);

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
    const board = new BoardLogic(grid.slice());
    const index = board.isBoardEmpty(grid)
      ? getRandomInt(0, 8)
      : minimax(board, droid)[1];
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
      }, 200);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, droidMove, droid, gameState]);

  useEffect(() => {
    const champion = boardLogic.getWinner(grid);
    const declareWinner = theWinner => {
      let champStr;
      switch (theWinner) {
        case constants.PLAYER_X:
          champStr = 'Player X wins!';
          break;
        case constants.PLAYER_O:
          champStr = 'Player O wins!';
          break;
        case constants.DRAW:
        default:
          champStr = "We've got a draw!";
      }
      setGameState(GAME_STATES.over);
      setWinner(champStr);
    };

    if (champion !== null && gameState !== GAME_STATES.over) {
      declareWinner(champion);
    }
  }, [gameState, grid, nextMove]);

  const startNewGame = () => {
    setGameState(GAME_STATES.notStarted);
    setGrid(arr);
  };

  switch (gameState) {
    case GAME_STATES.notStarted:
    default:
      return (
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
      );
    case GAME_STATES.inProgress:
      return (
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
    case GAME_STATES.over:
      return (
        <div>
          <p>{winner}</p>
          <button onClick={startNewGame}>Start over</button>
        </div>
      );
  }
};

export default Board;

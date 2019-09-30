import React from 'react';
import 'papercss/dist/paper.min.css';
import Board from '../board/board';
import Main from './app.styles';

const App = () => {
  return (
    <Main>
      <Board />
    </Main>
  );
};

export default App;

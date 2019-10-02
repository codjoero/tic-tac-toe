import styled, { css } from 'styled-components';
import { constants } from '../utils';

const border = css`
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  border: 2px solid #41403e;
`;

export const Container = styled.div`
  display: flex;
  flex-flow: wrap;
  position: relative;
  justify-content: center;
  width: ${({ dims }) => `${dims * (constants.SQUARE_DIMS + 5)}px`};
`;

export const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${constants.SQUARE_DIMS}px;
  height: ${constants.SQUARE_DIMS}px;
  ${border}

  &:hover {
    cursor: pointer;
  }
`;

export const Marker = styled.p`
  font-size: 68px;
`;

export const Screen = styled.div``;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

export const ButtonRow = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-between;
`;

export const ChooseText = styled.p``;

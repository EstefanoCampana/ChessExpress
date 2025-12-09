import type { FenPieceString, PositionDataType, SquareDataType } from './types';

export function generateBoard(
  noOfRows: number,
  noOfColumns: number,
  boardOrientation: 'white' | 'black',
) {
  const board: SquareDataType[][] = Array.from(
    Array(noOfRows),
    () => new Array(noOfColumns),
  );

  for (let row = 0; row < noOfRows; row++) {
    for (let column = 0; column < noOfColumns; column++) {
      board[row][column] = {
        squareId: `${columnIndexToChessColumn(column, noOfColumns, boardOrientation)}${rowIndexToChessRow(row, noOfRows, boardOrientation)}`, // e.g. "a8" for row 0, column 0 in white orientation
        isLightSquare: (row + column) % 2 === 0,
      };
    }
  }

  return board;
}

export function rowIndexToChessRow(
  row: number,
  noOfRows: number,
  boardOrientation: 'white' | 'black',
) {
  return boardOrientation === 'white'
    ? (noOfRows - row).toString()
    : (row + 1).toString();
}

export function columnIndexToChessColumn(
  column: number,
  noOfColumns: number,
  boardOrientation: 'white' | 'black',
) {
  return boardOrientation === 'white'
    ? String.fromCharCode(97 + column)
    : String.fromCharCode(97 + noOfColumns - column - 1);
}

export function fenStringToPositionObject(
  fen: string,
  noOfRows: number,
  noOfColumns: number,
) {
  const positionObject: PositionDataType = {};

  const rows = fen.split(' ')[0].split('/');

  // rows start from top of the board (black rank) in white orientation, and bottom of the board (white rank) in black orientation
  for (let row = 0; row < rows.length; row++) {
    let column = 0;

    for (const char of rows[row]) {
      // if char is a letter, it is a piece
      if (isNaN(Number(char))) {
        // force orientation to flip fen string when black orientation used
        const position = `${columnIndexToChessColumn(column, noOfColumns, 'white')}${rowIndexToChessRow(row, noOfRows, 'white')}`;

        // set piece at position (e.g. 0-0 for a8 on a normal board)
        positionObject[position] = {
          pieceType: fenToPieceCode(char as FenPieceString),
        };

        // increment column for next piece
        column++;
      } else {
        // if char is a number, it is empty squares, skip that many columns
        column += Number(char);
      }
    }
  }

  return positionObject;
}

/**
 * Convert fen piece code (e.g. p, N) to camel case notation (e.g. bP, wK).
 */
function fenToPieceCode(piece: FenPieceString) {
  // lower case is black piece
  if (piece.toLowerCase() === piece) {
    return 'b' + piece.toUpperCase();
  }

  // upper case is white piece
  return 'w' + piece.toUpperCase();
}
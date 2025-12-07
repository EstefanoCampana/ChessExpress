import { Chess, Square } from 'chess.js';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import {
  defaultAlphaNotationStyle,
  defaultBoardStyle,
  defaultDarkSquareNotationStyle,
  defaultDarkSquareStyle,
  defaultDropSquareStyle,
  defaultLightSquareNotationStyle,
  defaultLightSquareStyle,
  defaultNumericNotationStyle,
  defaultSquareStyle,
} from './defaults';
import { defaultPieces } from './pieces';
import WinnerPopUpComp from './popUpWinner';
import type {
  PieceHandlerArgs,
  PieceRenderObject,
  PositionDataType,
  SquareDataType,
  SquareHandlerArgs,
} from './types';
import {
  fenStringToPositionObject,
  generateBoard,
} from './utils';

type Defined<T> = T extends undefined ? never : T;

type ContextType = {
  // options
  id: string;
  pieces: PieceRenderObject;

  boardOrientation: 'white' | 'black';
  chessboardRows: number;
  chessboardColumns: number;

  boardStyle: StyleProp<ViewStyle>;
  squareStyle: StyleProp<ViewStyle>;
  squareStyles: Record<string, StyleProp<ViewStyle>>;
  darkSquareStyle: StyleProp<ViewStyle>;
  lightSquareStyle: StyleProp<ViewStyle>;
  dropSquareStyle: StyleProp<ViewStyle>;

  darkSquareNotationStyle: StyleProp<TextStyle>;
  lightSquareNotationStyle: StyleProp<TextStyle>;
  alphaNotationStyle: StyleProp<TextStyle>;
  numericNotationStyle: StyleProp<TextStyle>;
  showNotation: boolean;

  // internal state
  board: SquareDataType[][];
  currentPosition: PositionDataType;

  // selection state
  selectedSquare: string | null;
  legalMoves: string[];
  timer: number;
  timer2: number;

  // handlers for UI
  handleSquarePress: ({ piece, square }: SquareHandlerArgs) => void;
  handlePiecePress: ({ piece, square }: PieceHandlerArgs) => void;
};

const ChessboardContext = createContext<ContextType | null>(null);

export const useChessboardContext = () =>
  useContext(ChessboardContext) as ContextType;

// === external props ===
export type ChessboardOptions = {
  id?: string;

  // initial position (FEN or position object)
  position?: string | PositionDataType;

  // orientation / dimensions
  boardOrientation?: 'white' | 'black';
  chessboardRows?: number;
  chessboardColumns?: number;
  time: number;
  turn: string

  // styles
  boardStyle?: StyleProp<ViewStyle>;
  squareStyle?: StyleProp<ViewStyle>;
  squareStyles?: Record<string, StyleProp<ViewStyle>>;
  darkSquareStyle?: StyleProp<ViewStyle>;
  lightSquareStyle?: StyleProp<ViewStyle>;
  dropSquareStyle?: StyleProp<ViewStyle>;

  darkSquareNotationStyle?: StyleProp<TextStyle>;
  lightSquareNotationStyle?: StyleProp<TextStyle>;
  alphaNotationStyle?: StyleProp<TextStyle>;
  numericNotationStyle?: StyleProp<TextStyle>;
  showNotation?: boolean;

  // custom piece set
  pieces?: PieceRenderObject;

  // callbacks
  onSquareClick?: ({ piece, square }: SquareHandlerArgs) => void;
  onPieceClick?: ({ piece, square }: PieceHandlerArgs) => void;
  onMove?: (move: {
    from: string;
    to: string;
    piece: string;
    san: string;
  }) => void;
};

export function ChessboardProvider({
  children,
  options,
}: React.PropsWithChildren<{ options?: ChessboardOptions }>) {
  const {
    id = 'chessboard',

    // position & pieces
    position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
    pieces = defaultPieces,

    // board setup
    boardOrientation = 'white',
    chessboardRows = 8,
    chessboardColumns = 8,
    time = 300,

    // styles
    boardStyle = defaultBoardStyle(chessboardColumns),
    squareStyle = defaultSquareStyle,
    squareStyles = {},
    darkSquareStyle = defaultDarkSquareStyle,
    lightSquareStyle = defaultLightSquareStyle,
    dropSquareStyle = defaultDropSquareStyle,

    darkSquareNotationStyle = defaultDarkSquareNotationStyle,
    lightSquareNotationStyle = defaultLightSquareNotationStyle,
    alphaNotationStyle = defaultAlphaNotationStyle,
    numericNotationStyle = defaultNumericNotationStyle,
    showNotation = true,

    // callbacks
    onSquareClick,
    onPieceClick,
    onMove,
  } = options || {};

  // chess engine
  const gameRef = useRef(new Chess());
  const [winner, setWinner] = useState<string | null>(null)
  const [turn, setTurn] = useState<'w' | 'b'>('b');


  // current piece map on the board
  const [currentPosition, setCurrentPosition] = useState<PositionDataType>(
    typeof position === 'string'
      ? fenStringToPositionObject(position, chessboardRows, chessboardColumns)
      : position,
  );

  // board structure (a8..h1 + light/dark info)
  const board = useMemo(
    () => generateBoard(chessboardRows, chessboardColumns, boardOrientation),
    [chessboardRows, chessboardColumns, boardOrientation],
  );

  // selection state for tap-to-move
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [timer, setTimer] = useState(time);
  const [timer2, setTimer2] = useState(time);

  // keep chess.js in sync with initial position (FEN only for now)
  useEffect(() => {
    if (typeof position === 'string') {
      try {
        gameRef.current.load(position);
      } catch (e) {
        console.warn('Invalid FEN passed to ChessBoard:', e);
      }
    } else {
    }
  }, [position]);
  useEffect(() => {

    const interval = setInterval(() => {
      if (winner) return;
      if (turn === 'b') {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        setTimer2((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [turn]);
  useEffect(() => {
    if (timer === 0) { setWinner("Black") };
    if (timer2 === 0) { setWinner("White") };
  }, [timer, timer2]);


  // helper: color from pieceType "wP"/"bK"
  const getPieceColor = (pieceType: string) =>
    pieceType.startsWith('w') ? 'w' : 'b';

  // main tap handler for squares
  const handleSquarePress = ({ piece, square }: SquareHandlerArgs) => {
    const game = gameRef.current;


    // user callback (raw)
    onSquareClick?.({ piece, square });

    const pieceOnSquare = currentPosition[square] ?? null;

    // CASE 0: tap on empty square with nothing selected → noop
    if (!selectedSquare && !pieceOnSquare) {
      return;
    }

    const sideToMove = game.turn(); // 'w' or 'b'

    // CASE 1: no selection yet, tap on a piece
    if (!selectedSquare && pieceOnSquare) {
      const color = getPieceColor(pieceOnSquare.pieceType);
      if (color !== sideToMove) {
        // not this side's turn
        return;
      }

      // get legal moves for this square
      const moves = game
        .moves({ square: square as Square, verbose: true })
        .map((m) => m.to as string);

      setSelectedSquare(square);
      setLegalMoves(moves);
      return;
    }

    // from here on, we already have a selectedSquare
    if (selectedSquare === square) {
      // tap same square again -> cancel selection
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    // if tapped another of your own pieces -> change selection
    if (pieceOnSquare) {
      const color = getPieceColor(pieceOnSquare.pieceType);
      if (color === sideToMove) {
        const moves = game
          .moves({ square: square as Square, verbose: true })
          .map((m) => m.to as string);
        setSelectedSquare(square);
        setLegalMoves(moves);
        return;
      }
    }

    // CASE 2: attempt a move from selectedSquare -> tapped square
    if (selectedSquare && legalMoves.includes(square)) {
      const move = {
        from: selectedSquare,
        to: square,
        promotion: 'q' as const
      };

      const result = game.move(move);

      if (result) {
        setTurn(sideToMove);
        console.log(turn);
        onMove?.({
          from: result.from,
          to: result.to,
          piece:
            (result.color === 'w' ? 'w' : 'b') +
            result.piece.toUpperCase(),
          san: result.san,
        });
        if (game.isCheckmate()) {
          const winnerColor = result.color === "w" ? "White" : "Black";
          setWinner(winnerColor);
        }
        const newFen = game.fen();
        const newPos = fenStringToPositionObject(
          newFen,
          chessboardRows,
          chessboardColumns,
        );
        setCurrentPosition(newPos);

        setSelectedSquare(null);
        setLegalMoves([]);
      }
    }
  }

  const handlePiecePress = ({ piece, square }: PieceHandlerArgs) => {
    onPieceClick?.({ piece, square });
  };

  return (
    <ChessboardContext.Provider
      value={{
        id,
        pieces,

        boardOrientation,
        chessboardRows,
        chessboardColumns,
        timer,
        timer2,

        boardStyle,
        squareStyle,
        squareStyles,
        darkSquareStyle,
        lightSquareStyle,
        dropSquareStyle,

        darkSquareNotationStyle,
        lightSquareNotationStyle,
        alphaNotationStyle,
        numericNotationStyle,
        showNotation,

        board,
        currentPosition,

        selectedSquare,
        legalMoves,

        handleSquarePress,
        handlePiecePress,
      }}
    >

      {winner && <WinnerPopUpComp winner={winner} />}
      {children}
    </ChessboardContext.Provider>
  );
}

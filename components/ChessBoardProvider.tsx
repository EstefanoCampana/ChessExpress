// components/ChessBoardProvider.tsx
import { Chess, Square } from "chess.js";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

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
} from "./defaults";
import { recordWinByName } from "./leaderboardStorage";
import { defaultPieces } from "./pieces";
import playerNames from "./playerNames";
import WinnerPopUpComp from "./popUpWinner";
import type {
  PieceHandlerArgs,
  PieceRenderObject,
  PositionDataType,
  SquareDataType,
  SquareHandlerArgs,
} from "./types";
import {
  fenStringToPositionObject,
  generateBoard,
} from "./utils";

type ContextType = {
  id: string;
  pieces: PieceRenderObject;

  boardOrientation: "white" | "black";
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

  board: SquareDataType[][];
  currentPosition: PositionDataType;

  selectedSquare: string | null;
  legalMoves: string[];
  timer: number;
  timer2: number;
  turn: "w" | "b";

  handleSquarePress: ({ piece, square }: SquareHandlerArgs) => void;
  handlePiecePress: ({ piece, square }: PieceHandlerArgs) => void;
};

const ChessboardContext = createContext<ContextType | null>(null);

export const useChessboardContext = () =>
  useContext(ChessboardContext) as ContextType;

export type ChessboardOptions = {
  id?: string;

  position?: string | PositionDataType;

  boardOrientation?: "white" | "black";
  chessboardRows?: number;
  chessboardColumns?: number;
  time: number;

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

  pieces?: PieceRenderObject;

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
    id = "chessboard",

    position = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
    pieces = defaultPieces,

    boardOrientation = "white",
    chessboardRows = 8,
    chessboardColumns = 8,
    time = 300,

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

    onSquareClick,
    onPieceClick,
    onMove,
  } = options || {};

  const gameRef = useRef(new Chess());
  const [winner, setWinner] = useState<string | null>(null);
  const [turn, setTurn] = useState<"w" | "b">("b");

  const [currentPosition, setCurrentPosition] = useState<PositionDataType>(
    typeof position === "string"
      ? fenStringToPositionObject(position, chessboardRows, chessboardColumns)
      : position,
  );

  const board = useMemo(
    () => generateBoard(chessboardRows, chessboardColumns, boardOrientation),
    [chessboardRows, chessboardColumns, boardOrientation],
  );

  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [timer, setTimer] = useState(time);
  const [timer2, setTimer2] = useState(time);

  useEffect(() => {
    if (typeof position === "string") {
      try {
        gameRef.current.load(position);
      } catch (e) {
        console.warn("Invalid FEN passed to ChessBoard:", e);
      }
    }
  }, [position]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (winner) return;
      if (turn === "b") {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        setTimer2((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [turn, winner]);

  useEffect(() => {
    if (timer === 0) setWinner("Black");
    if (timer2 === 0) setWinner("White");
  }, [timer, timer2]);

  const getPieceColor = (pieceType: string) =>
    pieceType.startsWith("w") ? "w" : "b";

  const handleSquarePress = ({ piece, square }: SquareHandlerArgs) => {
    const game = gameRef.current;

    onSquareClick?.({ piece, square });

    const pieceOnSquare = currentPosition[square] ?? null;

    if (!selectedSquare && !pieceOnSquare) {
      return;
    }

    const sideToMove = game.turn(); // 'w' or 'b'

    if (!selectedSquare && pieceOnSquare) {
      const color = getPieceColor(pieceOnSquare.pieceType);
      if (color !== sideToMove) {
        return;
      }

      const moves = game
        .moves({ square: square as Square, verbose: true })
        .map((m) => m.to as string);

      setSelectedSquare(square);
      setLegalMoves(moves);
      return;
    }

    if (selectedSquare === square) {
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

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

    if (selectedSquare && legalMoves.includes(square)) {
      const move = {
        from: selectedSquare,
        to: square,
        promotion: "q" as const,
      };

      const result = game.move(move);

      if (result) {
        setTurn(game.turn() as "w" | "b");

        onMove?.({
          from: result.from,
          to: result.to,
          piece:
            (result.color === "w" ? "w" : "b") +
            result.piece.toUpperCase(),
          san: result.san,
        });

        if (game.isCheckmate()) {
          const winnerName =
            result.color === "w"
              ? playerNames.player1
              : playerNames.player2;

          setWinner(winnerName);
          recordWinByName(winnerName).catch((e) =>
            console.warn(e),
          );
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
  };

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
        turn,
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

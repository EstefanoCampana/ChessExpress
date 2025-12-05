export type SquareDataType = {
  squareId: string; // e.g. "a8"
  isLightSquare: boolean;
};

export type PieceDataType = {
  pieceType: string; // e.g. "wP" for white pawn, "bK" for black king
};

export type PositionDataType = {
  [square: string]: PieceDataType;
};

export type SquareHandlerArgs = {
  piece: PieceDataType | null;
  square: string;
};

export type PieceHandlerArgs = {
  piece: PieceDataType;
  square: string | null;
};

export type PieceRenderObject = Record<
  string,
  (props?: {
    fill?: string;
    svgStyle?: React.CSSProperties;
  }) => React.JSX.Element
>;

export type FenPieceString =
  | 'p'
  | 'r'
  | 'n'
  | 'b'
  | 'q'
  | 'k'
  | 'P'
  | 'R'
  | 'N'
  | 'B'
  | 'Q'
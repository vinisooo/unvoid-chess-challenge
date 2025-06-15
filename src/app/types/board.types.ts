import Piece from "../classes/piece.class"
import { TPiece } from "./piece.types"

interface TCell {
  moveable: boolean
  piece: Piece | null
}

export type { TCell }
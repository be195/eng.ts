export interface SizeableAttribute {
  w: number,
  h: number
}

export interface MoveableAttribute {
  x: number,
  y: number
}

export interface MoveableSizeableAttribute extends MoveableAttribute, SizeableAttribute {}
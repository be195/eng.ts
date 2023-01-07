import {
  MoveableAttribute,
  SizeableAttribute,
  MoveableSizeableAttribute
} from './moveablesizeableattr';

export interface SpritesheetFrameData {
  frame: MoveableSizeableAttribute;
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: MoveableSizeableAttribute;
  sourceSize: SizeableAttribute;
  pivot: MoveableAttribute;
};

export interface SpritesheetFrames {
  [key: string]: SpritesheetFrameData;
};

export interface SpritesheetMeta {
  app: string;
  version: string;
  image: string;
  format: string;
  size: SizeableAttribute;
  scale: number;
};

export interface SpritesheetAnimation {
  fps: number;
  frames: string[];
}

export interface SpritesheetAnimations {
  [key: string]: SpritesheetAnimation;
};

export interface SpritesheetData {
  animations: SpritesheetAnimations;
  frames: SpritesheetFrames;
  meta: SpritesheetMeta;
};
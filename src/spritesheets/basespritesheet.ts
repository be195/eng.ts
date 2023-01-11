import { MoveableAttribute } from '@/utils/types/moveablesizeableattr';
import { spritesheets } from '@/jsons/index';
import {
  SpritesheetAnimation,
  SpritesheetData,
} from '@/utils/types/spritesheetdata';
import container from '@/container';

class AnimatedSpritesheetPart {
  public fps: number;
  private accumulatedDelta = 0;
  private frame = 0;
  private readonly frames: string[];
  private readonly spritesheet: BaseSpritesheet;

  constructor(spritesheet: BaseSpritesheet, animation: SpritesheetAnimation) {
    this.spritesheet = spritesheet;
    this.fps = animation.fps;
    this.frames = animation.frames;
  }

  private get frameTime() {
    return 1000 / this.fps;
  }

  public render(offset: MoveableAttribute = { x: 0, y: 0 }) {
    const current = this.frames[this.frame];
    this.spritesheet.renderFrame(current, offset);
  }

  public update(dt: number) {
    this.accumulatedDelta += dt;
    if (this.accumulatedDelta >= this.frameTime) {
      this.accumulatedDelta -= this.frameTime;
      this.frame = (this.frame + 1) % this.frames.length;
    }
  }
};

export default class BaseSpritesheet {
  private readonly data: SpritesheetData;
  private readonly image = new Image();
  private readonly name;

  constructor(name: string) {
    this.name = name;
    if (spritesheets[name])
      this.data = spritesheets[name]
    else
      throw new Error('No such spritesheet data: "' + name + '".');
  }

  public use() {
    this.image.src = '/spritesheets/' + this.name + '.png';
  }

  public renderFrame(name: string, offset: MoveableAttribute = { x: 0, y: 0 }) {
    if (!container.context)
      throw new Error('renderFrame called with no viewport assigned in container');
    if (!(name in this.data.frames))
      throw new Error('No such spritesheet frame: "' + name + '".');
    const frame = this.data.frames[name];
    if (this.image.complete && this.image.src.length > 0) {
      container.context.drawImage(
        this.image,
        frame.frame.x,
        frame.frame.y,
        frame.frame.w,
        frame.frame.h,
        offset.x + frame.spriteSourceSize.x,
        offset.y + frame.spriteSourceSize.y,
        frame.spriteSourceSize.w,
        frame.spriteSourceSize.h
      );
    } else {
      container.context.strokeStyle = '#ff0000';
      container.context.strokeRect(
        offset.x + frame.spriteSourceSize.x,
        offset.y + frame.spriteSourceSize.y,
        frame.spriteSourceSize.w,
        frame.spriteSourceSize.h
      );
    }
  }

  public useAnimation(name: string) {
    if (!(name in this.data.animations))
      throw new Error('No such spritesheet animation: "' + name + '".');
    const animation = this.data.animations[name];
    return new AnimatedSpritesheetPart(this, animation);
  }
};
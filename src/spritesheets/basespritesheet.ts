import { spritesheets } from 'jsons/index';
import { SpritesheetData } from 'utils/types/spritesheetdata';

export default class BaseSpritesheet {
  private readonly image = new Image();
  private readonly data?: SpritesheetData;

  constructor(name: string) {
    this.image.src = '/spritesheets/' + name + '.png';

    if (spritesheets[name])
      this.data = spritesheets[name]
    else
      throw new Error('No such spritesheet data: "' + name + '".');
  }
};
/*!
  Copyright Litterbin Collective
  SPDX-License-Identifier: Apache-2.0
*/

const s = require('./default.css');

import container, { Container } from './container';

interface Config {
  mode: 'development' | 'production' | 'none'
};

declare global {
  interface globalThis {
    CONFIG: Config;
  }

  interface Window {
    container?: Container;
  }
};

(function() {
  s.default.use();
  const viewport = document.querySelector('#viewport');
  container.assign(viewport as HTMLCanvasElement);

  if (globalThis.CONFIG.mode === 'development')
    window.container = container;
})();
/*!
  Copyright Litterbin Collective
  SPDX-License-Identifier: Apache-2.0
*/

import '@/default.css';

import container, { Container } from '@/container';

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
  const viewport = document.querySelector('#viewport');
  container.assign(viewport as HTMLCanvasElement);

  if (globalThis.CONFIG.mode === 'development')
    window.container = container;
})();
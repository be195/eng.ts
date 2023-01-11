/*!
  Copyright Litterbin Collective
  SPDX-License-Identifier: Apache-2.0
*/

import './default.css';

import container, { Container } from './container';

declare global {
  interface Window {
    container?: Container;
    Stats: typeof Stats
  }
};

(async function() {
  if (import.meta.env.MODE === 'development') {
    const { default: Stats } = await import('stats.js');
    window.Stats = Stats;

    window.container = container;
  }

  const viewport = document.querySelector('#viewport');
  container.assign(viewport as HTMLCanvasElement);
})();
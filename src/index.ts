/*!
  Copyright Litterbin Collective
  SPDX-License-Identifier: Apache-2.0
*/

import './default.css';

import container, { Container } from './container';

declare global {
  interface Window {
    container?: Container;
  }
};

(function() {
  const viewport = document.querySelector('#viewport');
  container.assign(viewport as HTMLCanvasElement);

  if (import.meta.env.MODE === 'development')
    window.container = container;
})();
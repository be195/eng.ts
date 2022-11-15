/*!
  Copyright Litterbin Collective
  SPDX-License-Identifier: Apache-2.0
*/

import container, { Container } from './container';

declare global {
  interface Window {
    DEBUG?: boolean;
    container?: Container;
  }
};

(function() {
  const viewport = document.querySelector('#viewport');
  container.assign(viewport as HTMLCanvasElement);

  if (window.DEBUG)
    window.container = container;
})();
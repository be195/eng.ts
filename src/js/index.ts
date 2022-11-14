import App from './app';

declare global {
  interface Window {
    DEBUG?: boolean;
    app?: App;
  }
};

(function() {
  const app = new App();

  if (window.DEBUG)
    window.app = app;
})();
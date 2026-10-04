(function GanondorfOverlay() {
  function init() {
    if (!document.body) { setTimeout(init, 300); return; }
    if (document.getElementById('ganondorf-dance-box')) return;

    // 1. Crear el contenedor del GIF
    const box = document.createElement('div');
    box.id = 'ganondorf-dance-box';

    const img = document.createElement('img');
    img.src = 'http://localhost:8085/ganondorf_clean.gif';
    img.alt = 'Ganondorf';

    box.appendChild(img);
    document.body.appendChild(box);

    // 2. Estilos CSS: Tamano incrementado y posicion ajustada
    const style = document.createElement('style');
    style.textContent = `
      #ganondorf-dance-box {
        position: fixed !important;
        bottom: 20px !important;
        right: 380px !important;
        z-index: 999999 !important;
        pointer-events: none !important;
        display: block !important;
      }
      #ganondorf-dance-box img {
        width: 110px !important;
        height: auto !important;
        filter: drop-shadow(0px 4px 10px rgba(0,0,0,0.7));
      }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();

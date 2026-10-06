(function GanondorfOverlay() {
  function init() {
    if (!document.body) { setTimeout(init, 300); return; }
    if (document.getElementById('ganondorf-dance-box')) return;

    // Recuperar posición guardada o colocar por defecto en la esquina inferior
    const savedPos = JSON.parse(localStorage.getItem('ganondorf_pos') || 'null');

    const box = document.createElement('div');
    box.id = 'ganondorf-dance-box';

    const img = document.createElement('img');
    img.src = 'https://raw.githubusercontent.com/davidvenegasdelarosa-dotcom/ganondorf-dancing/main/ganondorfDancing.gif';
    img.alt = 'Ganondorf';
    img.draggable = false;

    box.appendChild(img);
    document.body.appendChild(box);

    // Aplicar estilos iniciales
    const style = document.createElement('style');
    style.textContent = `
      #ganondorf-dance-box {
        position: fixed !important;
        z-index: 999999 !important;
        cursor: grab !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
        touch-action: none !important;
        display: block !important;
        width: 110px !important;
        height: auto !important;
      }
      #ganondorf-dance-box:active {
        cursor: grabbing !important;
      }
      #ganondorf-dance-box img {
        width: 100% !important;
        height: auto !important;
        filter: drop-shadow(0px 4px 10px rgba(0,0,0,0.7));
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    // Definir la posición inicial según la memoria local o la ubicación por defecto
    if (savedPos && savedPos.left !== undefined && savedPos.top !== undefined) {
      box.style.setProperty('left', `${savedPos.left}px`, 'important');
      box.style.setProperty('top', `${savedPos.top}px`, 'important');
      box.style.setProperty('bottom', 'auto', 'important');
      box.style.setProperty('right', 'auto', 'important');
    } else {
      box.style.setProperty('bottom', '20px', 'important');
      box.style.setProperty('right', '380px', 'important');
      box.style.setProperty('left', 'auto', 'important');
      box.style.setProperty('top', 'auto', 'important');
    }

    // Lógica de arrastre
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    box.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Solo clic izquierdo
      isDragging = true;
      
      const rect = box.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      startX = e.clientX;
      startY = e.clientY;

      box.style.setProperty('bottom', 'auto', 'important');
      box.style.setProperty('right', 'auto', 'important');
      box.style.setProperty('left', `${initialLeft}px`, 'important');
      box.style.setProperty('top', `${initialTop}px`, 'important');

      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const newLeft = initialLeft + dx;
      const newTop = initialTop + dy;

      box.style.setProperty('left', `${newLeft}px`, 'important');
      box.style.setProperty('top', `${newTop}px`, 'important');
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;

      const rect = box.getBoundingClientRect();
      localStorage.setItem('ganondorf_pos', JSON.stringify({
        left: rect.left,
        top: rect.top
      }));
    });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();

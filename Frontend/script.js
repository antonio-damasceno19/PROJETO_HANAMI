// Seleciona elementos do DOM
const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");

// Event listeners
textInput.addEventListener("input", updateCounters);

// Previne zoom automático em mobile
document.addEventListener('touchmove', function(e) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

// Auto-focus no textarea ao carregar em desktop
document.addEventListener("DOMContentLoaded", function() {
  // Apenas focus em desktop (não em mobile para evitar teclado automático)
  if (window.innerWidth > 768) {
    textInput.focus();
  }
  
  // Ajusta altura do textarea em mobile conforme conteúdo
  if (window.innerWidth <= 768) {
    textInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 400) + 'px';
    });
  }
});

/**
 * Atualiza os contadores de caracteres e palavras
 */
function updateCounters() {
  const text = textInput.value;

  // Atualiza contagem de caracteres
  charCount.textContent = text.length;

  // Atualiza contagem de palavras
  const words = text.trim().split(/\s+/);
  wordCount.textContent = text.trim() === "" ? 0 : words.length;
}

/**
 * Converte o texto para MAIÚSCULAS
 */
function toUpperCaseText() {
  if (textInput.value.trim()) {
    const result = textInput.value.toUpperCase();
    textInput.value = result;
    updateCounters();
    openResultModal('Texto em MAIÚSCULAS', result);
    // Feedback tátil em mobile (se disponível)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }
}

/**
 * Converte o texto para minúsculas
 */
function toLowerCaseText() {
  if (textInput.value.trim()) {
    const result = textInput.value.toLowerCase();
    textInput.value = result;
    updateCounters();
    openResultModal('Texto em minúsculas', result);
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }
}

/**
 * Remove espaços extras e normaliza espaçamento
 */
function removeExtraSpaces() {
  if (textInput.value.trim()) {
    const result = textInput.value
      .replace(/\s+/g, " ")
      .trim();
    textInput.value = result;
    updateCounters();
    openResultModal('Espaços Removidos', result);
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }
}

/**
 * Limpa todo o texto com confirmação
 */
function clearText() {
  if (textInput.value.trim().length > 0) {
    if (confirm("Tem certeza que deseja limpar o texto?")) {
      textInput.value = "";
      updateCounters();
      textInput.focus();
      if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50]);
      }
    }
  } else {
    textInput.value = "";
    updateCounters();
  }
}

// Detecta orientação em mobile
window.addEventListener('orientationchange', function() {
  setTimeout(() => {
    textInput.focus();
    // Re-ajusta layout se necessário
    if (window.innerWidth <= 768) {
      textInput.style.height = 'auto';
      textInput.style.height = Math.min(textInput.scrollHeight, 400) + 'px';
    }
  }, 100);
});

/**
 * Abre o modal com resultado
 * @param {string} title - Título do modal
 * @param {string} result - Texto do resultado
 */
function openResultModal(title, result) {
  const modal = document.getElementById('resultModal');
  const modalTitle = document.getElementById('modalTitle');
  const resultText = document.getElementById('resultText');
  const resultCharCount = document.getElementById('resultCharCount');
  const resultWordCount = document.getElementById('resultWordCount');

  // Atualiza conteúdo do modal
  modalTitle.textContent = title;
  resultText.textContent = result;

  // Calcula estatísticas
  resultCharCount.textContent = result.length;
  const words = result.trim().split(/\s+/);
  resultWordCount.textContent = result.trim() === "" ? 0 : words.length;

  // Mostra o modal com animação
  modal.classList.add('active');

  // Previne scroll do body
  document.body.style.overflow = 'hidden';

  if (navigator.vibrate) {
    navigator.vibrate(30);
  }
}

/**
 * Fecha o modal
 */
function closeResultModal() {
  const modal = document.getElementById('resultModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

/**
 * Copia o resultado para a área de transferência
 */
function copyResultToClipboard() {
  const resultText = document.getElementById('resultText').textContent;

  // Usando API Clipboard (moderna e mais segura)
  if (navigator.clipboard) {
    navigator.clipboard.writeText(resultText).then(() => {
      showCopyNotification();
      if (navigator.vibrate) {
        navigator.vibrate([20, 30, 20]);
      }
    }).catch(err => {
      console.error('Erro ao copiar:', err);
      fallbackCopyToClipboard(resultText);
    });
  } else {
    // Fallback para navegadores antigos
    fallbackCopyToClipboard(resultText);
  }
}

/**
 * Fallback para copiar (navegadores antigos)
 * @param {string} text - Texto a copiar
 */
function fallbackCopyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showCopyNotification();
    if (navigator.vibrate) {
      navigator.vibrate([20, 30, 20]);
    }
  } catch (err) {
    console.error('Erro ao copiar (fallback):', err);
  }
  
  document.body.removeChild(textarea);
}

/**
 * Mostra notificação de cópia bem-sucedida
 */
function showCopyNotification() {
  let notification = document.querySelector('.copy-notification');

  // Remove notificação anterior se existir
  if (notification) {
    notification.remove();
  }

  // Cria nova notificação
  notification = document.createElement('div');
  notification.className = 'copy-notification';
  notification.textContent = '✓ Copiado!';
  document.body.appendChild(notification);

  // Remove notificação após 2 segundos
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

/**
 * Fecha o modal ao clicar fora dele (no overlay)
 */
document.addEventListener('click', function(event) {
  const modal = document.getElementById('resultModal');
  const modalContent = modal.querySelector('.modal-content');
  const modalOverlay = modal.querySelector('.modal-overlay');

  if (event.target === modalOverlay) {
    closeResultModal();
  }
});

/**
 * Fecha o modal ao pressionar ESC
 */
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeResultModal();
  }
});



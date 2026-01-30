/**
 * modules.js
 * Code Splitting - Módulos separados carregados sob demanda
 * 
 * Versão: 1.0.0
 * Data: 26 de janeiro de 2026
 */

/**
 * MÓDULO: Operações de Texto
 * Funções para transformar texto
 */
const TextOperations = {
  /**
   * Converte texto para MAIÚSCULAS
   * @param {string} text
   * @returns {string}
   */
  toUpperCase: (text) => text.toUpperCase(),

  /**
   * Converte texto para minúsculas
   * @param {string} text
   * @returns {string}
   */
  toLowerCase: (text) => text.toLowerCase(),

  /**
   * Remove espaços extras
   * @param {string} text
   * @returns {string}
   */
  removeExtraSpaces: (text) => text.replace(/\s+/g, " ").trim(),

  /**
   * Capitaliza primeira letra
   * @param {string} text
   * @returns {string}
   */
  capitalize: (text) => {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },

  /**
   * Inverte o texto
   * @param {string} text
   * @returns {string}
   */
  reverse: (text) => text.split('').reverse().join(''),

  /**
   * Remove caracteres especiais mantendo apenas alfanuméricos e espaço
   * @param {string} text
   * @returns {string}
   */
  removeSpecialChars: (text) => text.replace(/[^\w\s]/g, ''),

  /**
   * Converte para slug (para URLs)
   * @param {string} text
   * @returns {string}
   */
  toSlug: (text) => text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, ''),

  /**
   * Remove linhas em branco
   * @param {string} text
   * @returns {string}
   */
  removeBlankLines: (text) => text
    .split('\n')
    .filter(line => line.trim() !== '')
    .join('\n')
};

/**
 * MÓDULO: Contadores e Estatísticas
 * Calcula métricas do texto
 */
const TextStats = {
  /**
   * Conta caracteres
   * @param {string} text
   * @returns {number}
   */
  countCharacters: (text) => text.length,

  /**
   * Conta palavras
   * @param {string} text
   * @returns {number}
   */
  countWords: (text) => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  },

  /**
   * Conta linhas
   * @param {string} text
   * @returns {number}
   */
  countLines: (text) => {
    return text === '' ? 0 : text.split('\n').length;
  },

  /**
   * Conta parágrafos
   * @param {string} text
   * @returns {number}
   */
  countParagraphs: (text) => {
    return text.trim().split(/\n\n+/).filter(p => p.trim() !== '').length;
  },

  /**
   * Conta sentenças
   * @param {string} text
   * @returns {number}
   */
  countSentences: (text) => {
    return text.split(/[.!?]+/).filter(s => s.trim() !== '').length;
  },

  /**
   * Obtém todas as estatísticas
   * @param {string} text
   * @returns {object}
   */
  getAll: (text) => ({
    characters: TextStats.countCharacters(text),
    words: TextStats.countWords(text),
    lines: TextStats.countLines(text),
    paragraphs: TextStats.countParagraphs(text),
    sentences: TextStats.countSentences(text),
    averageWordLength: (TextStats.countCharacters(text) / TextStats.countWords(text)).toFixed(2)
  })
};

/**
 * MÓDULO: Clipboard
 * Gerencia operações com área de transferência
 */
const ClipboardManager = {
  /**
   * Copia texto para clipboard
   * @param {string} text
   * @returns {Promise}
   */
  copy: async (text) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return { success: true, message: 'Copiado com sucesso!' };
      } else {
        // Fallback para navegadores antigos
        return ClipboardManager.copyFallback(text);
      }
    } catch (error) {
      console.error('Erro ao copiar:', error);
      return { success: false, message: 'Erro ao copiar' };
    }
  },

  /**
   * Fallback para navegadores sem Clipboard API
   * @param {string} text
   * @returns {object}
   */
  copyFallback: (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    try {
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return { success: true, message: 'Copiado com sucesso!' };
    } catch (error) {
      document.body.removeChild(textarea);
      return { success: false, message: 'Erro ao copiar' };
    }
  },

  /**
   * Cola texto do clipboard
   * @returns {Promise}
   */
  paste: async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        return { success: true, text };
      }
      return { success: false, message: 'Clipboard API não disponível' };
    } catch (error) {
      console.error('Erro ao colar:', error);
      return { success: false, message: 'Erro ao colar' };
    }
  }
};

/**
 * MÓDULO: Validação
 * Valida entrada e formato de texto
 */
const Validation = {
  /**
   * Verifica se texto está vazio
   * @param {string} text
   * @returns {boolean}
   */
  isEmpty: (text) => text.trim() === '',

  /**
   * Verifica se é URL válida
   * @param {string} text
   * @returns {boolean}
   */
  isURL: (text) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Verifica se é email válido
   * @param {string} text
   * @returns {boolean}
   */
  isEmail: (text) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
  },

  /**
   * Verifica se é JSON válido
   * @param {string} text
   * @returns {boolean}
   */
  isJSON: (text) => {
    try {
      JSON.parse(text);
      return true;
    } catch {
      return false;
    }
  }
};

/**
 * MÓDULO: Exportação de Dados
 * Exporta texto em diferentes formatos
 */
const DataExport = {
  /**
   * Exporta como arquivo TXT
   * @param {string} text
   * @param {string} filename
   */
  toTXT: (text, filename = 'documento.txt') => {
    DataExport.downloadFile(text, filename, 'text/plain');
  },

  /**
   * Exporta como arquivo CSV
   * @param {string} text
   * @param {string} filename
   */
  toCSV: (text, filename = 'dados.csv') => {
    DataExport.downloadFile(text, filename, 'text/csv');
  },

  /**
   * Exporta como arquivo JSON
   * @param {object} data
   * @param {string} filename
   */
  toJSON: (data, filename = 'dados.json') => {
    const json = JSON.stringify(data, null, 2);
    DataExport.downloadFile(json, filename, 'application/json');
  },

  /**
   * Baixa arquivo genérico
   * @param {string} content
   * @param {string} filename
   * @param {string} type
   */
  downloadFile: (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
};

/**
 * MÓDULO: Tema e UI
 * Gerencia interface e temas
 */
const UITheme = {
  /**
   * Ativa dark mode
   */
  enableDarkMode: () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  },

  /**
   * Desativa dark mode
   */
  disableDarkMode: () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  },

  /**
   * Alterna entre temas
   */
  toggleTheme: () => {
    const isDark = document.body.classList.contains('dark-mode');
    if (isDark) {
      UITheme.disableDarkMode();
    } else {
      UITheme.enableDarkMode();
    }
  },

  /**
   * Carrega tema salvo
   */
  loadSavedTheme: () => {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
      UITheme.enableDarkMode();
    }
  }
};

/**
 * MÓDULO: Histórico
 * Gerencia histórico de operações
 */
const History = {
  max: 20,
  stack: [],

  /**
   * Adiciona operação ao histórico
   * @param {object} operation
   */
  add: (operation) => {
    History.stack.unshift(operation);
    if (History.stack.length > History.max) {
      History.stack.pop();
    }
    localStorage.setItem('history', JSON.stringify(History.stack));
  },

  /**
   * Obtém histórico
   * @returns {array}
   */
  get: () => History.stack,

  /**
   * Limpa histórico
   */
  clear: () => {
    History.stack = [];
    localStorage.removeItem('history');
  },

  /**
   * Carrega histórico salvo
   */
  load: () => {
    const saved = localStorage.getItem('history');
    if (saved) {
      History.stack = JSON.parse(saved);
    }
  }
};

/**
 * MÓDULO: Notificações
 * Mostra notificações ao usuário
 */
const Notifications = {
  /**
   * Mostra notificação de sucesso
   * @param {string} message
   * @param {number} duration
   */
  success: (message, duration = 2000) => {
    Notifications.show(message, 'success', duration);
  },

  /**
   * Mostra notificação de erro
   * @param {string} message
   * @param {number} duration
   */
  error: (message, duration = 3000) => {
    Notifications.show(message, 'error', duration);
  },

  /**
   * Mostra notificação genérica
   * @param {string} message
   * @param {string} type
   * @param {number} duration
   */
  show: (message, type = 'info', duration = 2000) => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 24px;
      background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, duration);
  }
};

// Exporta módulos para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TextOperations,
    TextStats,
    ClipboardManager,
    Validation,
    DataExport,
    UITheme,
    History,
    Notifications
  };
}

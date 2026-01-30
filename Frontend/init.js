/**
 * init.js
 * Inicialização da aplicação com otimizações
 * Carrega modules e lazy-loader de forma otimizada
 * 
 * Versão: 1.0.0
 * Data: 26 de janeiro de 2026
 */

/**
 * REGISTRO DO SERVICE WORKER
 * Ativa caching e offline support
 */
const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers não são suportados neste navegador');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/Frontend/service-worker.js', {
      scope: '/Frontend/'
    });

    console.log('Service Worker registrado com sucesso:', registration);

    // Monitora atualizações
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'activated') {
          console.log('Nova versão do Service Worker disponível');
          // Notifica usuário sobre atualização
          notifyUpdate();
        }
      });
    });

    return registration;
  } catch (error) {
    console.error('Erro ao registrar Service Worker:', error);
  }
};

/**
 * NOTIFICAÇÃO DE ATUALIZAÇÃO
 * Avisa usuário sobre nova versão
 */
const notifyUpdate = () => {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #3b82f6;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    font-weight: 600;
  `;
  notification.textContent = '✓ Nova versão disponível! Recarregue a página.';
  notification.style.animation = 'slideInRight 0.3s ease-out';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 5000);
};

/**
 * CARREGAMENTO DE MÓDULOS
 * Carrega módulos sob demanda
 */
const loadModules = async () => {
  try {
    // Carrega script de modules (Code Splitting)
    if (!window.TextOperations) {
      await LazyScriptLoader.load('/Frontend/modules.js');
    }
    console.log('Módulos carregados com sucesso');
  } catch (error) {
    console.error('Erro ao carregar módulos:', error);
  }
};

/**
 * OTIMIZAÇÃO DE PERFORMANCE
 * Implementa resource hints
 */
const optimizePerformance = () => {
  // DNS Prefetch para CDNs (se usado)
  ResourceHints.dnsPrefetch('cdn.example.com');
  
  // Preload de recursos críticos
  ResourceHints.preload('/Frontend/modules.js', 'script');
  ResourceHints.preload('/Frontend/lazy-loader.js', 'script');
  
  // Prefetch de recursos secundários
  ResourceHints.prefetch('/Frontend/service-worker.js');

  console.log('Performance otimizada com resource hints');
};

/**
 * CARREGAMENTO PROGRESSIVO
 * Carrega recursos na ordem correta
 */
const progressiveLoading = async () => {
  try {
    // 1. Carrega lazy-loader primeiro
    console.log('Carregando lazy-loader...');
    // Já está no HTML via <script>, mas pode ser carregado dinamicamente

    // 2. Inicializa lazy loading de imagens
    if (window.LazyImageLoader) {
      LazyImageLoader.init();
    }

    // 3. Carrega módulos em background
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        loadModules();
      });
    } else {
      setTimeout(loadModules, 2000);
    }

    console.log('Carregamento progressivo iniciado');
  } catch (error) {
    console.error('Erro no carregamento progressivo:', error);
  }
};

/**
 * ANÁLISE DE PERFORMANCE
 * Mede e loga métricas importantes
 */
const analyzePerformance = () => {
  window.addEventListener('load', () => {
    // Aguarda um pouco para que todas as métricas sejam registradas
    setTimeout(() => {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart;
      const tcpTime = perfData.connectEnd - perfData.connectStart;
      const ttfb = perfData.responseStart - perfData.navigationStart;
      const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;

      const metrics = {
        pageLoadTime: `${pageLoadTime}ms`,
        dnsTime: `${dnsTime}ms`,
        tcpTime: `${tcpTime}ms`,
        ttfb: `${ttfb}ms`,
        domReadyTime: `${domReadyTime}ms`
      };

      console.log('📊 Performance Metrics:', metrics);

      // Envia para analytics (opcional)
      if (window.sendMetrics) {
        window.sendMetrics(metrics);
      }
    }, 1000);
  });
};

/**
 * DETECÇÃO DE CONEXÃO LENTA
 * Detecta conexão 4G/3G e adapta carregamento
 */
const detectSlowConnection = () => {
  if (!('connection' in navigator)) {
    return;
  }

  const connection = navigator.connection;
  
  if (connection.saveData) {
    console.warn('Data saver ativado - reduzindo assets');
    document.body.classList.add('data-saver');
  }

  if (connection.effectiveType === '4g') {
    console.log('Conexão 4G detectada - carregamento completo');
  } else if (connection.effectiveType === '3g') {
    console.warn('Conexão 3G detectada - otimizando assets');
    document.body.classList.add('slow-connection');
  } else if (connection.effectiveType === '2g') {
    console.error('Conexão muito lenta - modo essencial');
    document.body.classList.add('very-slow-connection');
  }

  // Monitora mudanças de conexão
  connection.addEventListener('change', detectSlowConnection);
};

/**
 * LAZY LOADING CONDICIONAL
 * Carrega componentes baseado em entrada do usuário
 */
const setupConditionalLoading = () => {
  const textarea = document.getElementById('textInput');
  
  if (textarea) {
    // Carrega módulos quando usuário interage
    textarea.addEventListener('focus', () => {
      loadModules();
    });

    textarea.addEventListener('input', () => {
      // Pode carregar features adicionais conforme necessário
    });
  }
};

/**
 * INICIALIZAÇÃO PRINCIPAL
 * Coordena todo o carregamento
 */
const init = async () => {
  console.log('🚀 Iniciando TextFix com otimizações...');

  // 1. Registra Service Worker (background)
  registerServiceWorker();

  // 2. Detecta conexão lenta
  detectSlowConnection();

  // 3. Otimiza performance
  optimizePerformance();

  // 4. Configura lazy loading condicional
  setupConditionalLoading();

  // 5. Inicia carregamento progressivo
  progressiveLoading();

  // 6. Analisa performance
  analyzePerformance();

  console.log('✅ Inicialização completa');
};

/**
 * EXECUTA QUANDO DOM ESTÁ PRONTO
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/**
 * LIMPEZA DE CACHE (DESENVOLVIMENTO)
 * Função para desenvolvimento - remove cache antigo
 */
window.clearAppCache = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    const promises = cacheNames.map(name => caches.delete(name));
    await Promise.all(promises);
    console.log('Cache limpo');
  }
};

/**
 * ESTATÍSTICAS DE CACHE (DESENVOLVIMENTO)
 * Mostra tamanho do cache
 */
window.getCacheStats = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const name of cacheNames) {
      const cache = await caches.open(name);
      const requests = await cache.keys();
      totalSize += requests.length;
    }
    
    console.log(`📦 Cache: ${totalSize} arquivos armazenados`);
    return totalSize;
  }
};

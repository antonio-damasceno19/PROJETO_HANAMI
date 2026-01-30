/**
 * lazy-loader.js
 * Lazy Loading para imagens, componentes e recursos
 * 
 * Versão: 1.0.0
 * Data: 26 de janeiro de 2026
 */

/**
 * LAZY LOADING DE IMAGENS
 * Carrega imagens sob demanda com suporte a WebP
 */
const LazyImageLoader = {
  /**
   * Inicializa Intersection Observer para imagens
   */
  init: () => {
    if (!('IntersectionObserver' in window)) {
      // Fallback para navegadores antigos
      LazyImageLoader.loadAllImages();
      return;
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Carrega imagem
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          
          // Carrega srcset se disponível
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          // Remove atributo de lazy loading
          img.removeAttribute('loading');
          
          // Para de observar esta imagem
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px' // Carrega 50px antes de ficar visível
    });

    // Observa todas as imagens lazy
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  },

  /**
   * Fallback: carrega todas as imagens (para navegadores sem IO)
   */
  loadAllImages: () => {
    document.querySelectorAll('img[data-src]').forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
    });
  }
};

/**
 * LAZY LOADING DE COMPONENTES
 * Carrega componentes JavaScript sob demanda
 */
const LazyComponentLoader = {
  cache: {},

  /**
   * Carrega componente dinamicamente
   * @param {string} componentName
   * @param {string} filePath
   * @returns {Promise}
   */
  load: async (componentName, filePath) => {
    // Verifica cache
    if (LazyComponentLoader.cache[componentName]) {
      return LazyComponentLoader.cache[componentName];
    }

    try {
      // Dinamic import
      const module = await import(filePath);
      LazyComponentLoader.cache[componentName] = module;
      return module;
    } catch (error) {
      console.error(`Erro ao carregar componente ${componentName}:`, error);
      return null;
    }
  },

  /**
   * Carrega múltiplos componentes
   * @param {object} components
   * @returns {Promise}
   */
  loadMultiple: async (components) => {
    const promises = Object.entries(components).map(([name, path]) =>
      LazyComponentLoader.load(name, path)
    );
    return Promise.all(promises);
  }
};

/**
 * LAZY LOADING DE SCRIPTS
 * Carrega scripts externos sob demanda
 */
const LazyScriptLoader = {
  loaded: new Set(),

  /**
   * Carrega script externo
   * @param {string} src
   * @param {boolean} async
   * @returns {Promise}
   */
  load: (src, async = true) => {
    return new Promise((resolve, reject) => {
      // Verifica se já foi carregado
      if (LazyScriptLoader.loaded.has(src)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = async;

      script.onload = () => {
        LazyScriptLoader.loaded.add(src);
        resolve();
      };

      script.onerror = () => {
        reject(new Error(`Erro ao carregar script: ${src}`));
      };

      document.head.appendChild(script);
    });
  },

  /**
   * Carrega múltiplos scripts em sequência
   * @param {array} srcs
   * @returns {Promise}
   */
  loadSequence: async (srcs) => {
    for (const src of srcs) {
      await LazyScriptLoader.load(src, false);
    }
  },

  /**
   * Carrega múltiplos scripts em paralelo
   * @param {array} srcs
   * @returns {Promise}
   */
  loadParallel: (srcs) => {
    return Promise.all(srcs.map(src => LazyScriptLoader.load(src)));
  }
};

/**
 * LAZY LOADING DE STYLESHEETS
 * Carrega CSS sob demanda
 */
const LazyStyleLoader = {
  loaded: new Set(),

  /**
   * Carrega stylesheet
   * @param {string} href
   * @returns {Promise}
   */
  load: (href) => {
    return new Promise((resolve, reject) => {
      // Verifica se já foi carregado
      if (LazyStyleLoader.loaded.has(href)) {
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;

      link.onload = () => {
        LazyStyleLoader.loaded.add(href);
        resolve();
      };

      link.onerror = () => {
        reject(new Error(`Erro ao carregar stylesheet: ${href}`));
      };

      document.head.appendChild(link);
    });
  },

  /**
   * Carrega múltiplos stylesheets
   * @param {array} hrefs
   * @returns {Promise}
   */
  loadMultiple: (hrefs) => {
    return Promise.all(hrefs.map(href => LazyStyleLoader.load(href)));
  }
};

/**
 * LAZY LOADING DE FONTES
 * Carrega fontes Web sob demanda
 */
const LazyFontLoader = {
  /**
   * Carrega fonte Web
   * @param {string} fontFamily
   * @param {string} url
   * @returns {Promise}
   */
  load: (fontFamily, url) => {
    return new Promise((resolve, reject) => {
      const font = new FontFace(fontFamily, `url(${url})`);
      
      font.load()
        .then(loadedFont => {
          document.fonts.add(loadedFont);
          resolve(loadedFont);
        })
        .catch(error => {
          console.error(`Erro ao carregar fonte ${fontFamily}:`, error);
          reject(error);
        });
    });
  },

  /**
   * Carrega múltiplas fontes
   * @param {object} fonts
   * @returns {Promise}
   */
  loadMultiple: (fonts) => {
    const promises = Object.entries(fonts).map(([name, url]) =>
      LazyFontLoader.load(name, url)
    );
    return Promise.all(promises);
  }
};

/**
 * RESOURCE HINTS
 * Otimiza o carregamento com preload, prefetch, etc
 */
const ResourceHints = {
  /**
   * Adiciona preload
   * @param {string} href
   * @param {string} type
   */
  preload: (href, type = 'script') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = type;
    document.head.appendChild(link);
  },

  /**
   * Adiciona prefetch
   * @param {string} href
   */
  prefetch: (href) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  },

  /**
   * Adiciona dns-prefetch
   * @param {string} domain
   */
  dnsPrefetch: (domain) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  },

  /**
   * Adiciona preconnect
   * @param {string} url
   */
  preconnect: (url) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    document.head.appendChild(link);
  }
};

/**
 * PERFORMANCE OBSERVER
 * Monitora performance do carregamento
 */
const PerformanceMonitor = {
  /**
   * Inicia monitoramento
   */
  start: () => {
    if (!('PerformanceObserver' in window)) {
      return;
    }

    // Monitora Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP Observer não suportado');
    }

    // Monitora First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingDuration);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID Observer não suportado');
    }

    // Monitora Cumulative Layout Shift
    try {
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        let cls = 0;
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        });
        console.log('CLS:', cls);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS Observer não suportado');
    }
  },

  /**
   * Obtém Core Web Vitals
   * @returns {object}
   */
  getCoreWebVitals: () => {
    const vitals = {};

    // FCP
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach(entry => {
      if (entry.name === 'first-contentful-paint') {
        vitals.fcp = entry.startTime;
      }
    });

    // Navigation Timing
    const navTiming = performance.getEntriesByType('navigation')[0];
    if (navTiming) {
      vitals.domContentLoaded = navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart;
      vitals.loadComplete = navTiming.loadEventEnd - navTiming.loadEventStart;
      vitals.timeToFirstByte = navTiming.responseStart - navTiming.requestStart;
    }

    return vitals;
  }
};

/**
 * INICIALIZAÇÃO
 * Ativa otimizações ao carregar a página
 */
document.addEventListener('DOMContentLoaded', () => {
  // Inicia lazy loading de imagens
  LazyImageLoader.init();

  // Inicia monitoramento de performance
  PerformanceMonitor.start();

  // Log de Core Web Vitals
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const vitals = PerformanceMonitor.getCoreWebVitals();
      console.log('Core Web Vitals:', vitals);
    });
  }
});

// Fallback para navegadores antigos
if (!('requestIdleCallback' in window)) {
  window.requestIdleCallback = (cb) => setTimeout(cb, 0);
}

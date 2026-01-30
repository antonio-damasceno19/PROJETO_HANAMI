/**
 * service-worker.js
 * Service Worker para caching e offline support
 * 
 * Versão: 1.0.0
 * Data: 26 de janeiro de 2026
 */

const CACHE_NAME = 'textfix-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/modules.js',
  '/lazy-loader.js',
  '/img/logo.png'
];

/**
 * INSTALAÇÃO
 * Cria cache e armazena assets estáticos
 */
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Service Worker: Cache criado');
      return cache.addAll(STATIC_ASSETS);
    }).catch(error => {
      console.error('Erro ao cachear assets:', error);
    })
  );

  // Força ativação imediata
  self.skipWaiting();
});

/**
 * ATIVAÇÃO
 * Limpa caches antigos
 */
self.addEventListener('activate', event => {
  console.log('Service Worker: Ativando...');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  self.clients.claim();
});

/**
 * ESTRATÉGIA: Cache First (com Network Fallback)
 * Usa cache primeiro, se não existir tenta rede
 */
const cacheFirstStrategy = async (request) => {
  try {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    const response = await fetch(request);
    
    // Cacheia apenas respostas bem-sucedidas
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.error('Cache First Strategy erro:', error);
    
    // Retorna fallback offline
    return new Response(
      JSON.stringify({ error: 'Offline' }),
      { status: 503, statusText: 'Service Unavailable' }
    );
  }
};

/**
 * ESTRATÉGIA: Network First (com Cache Fallback)
 * Tenta rede primeiro, se falhar usa cache
 */
const networkFirstStrategy = async (request) => {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.error('Network First Strategy erro:', error);
    
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    return new Response(
      JSON.stringify({ error: 'Offline' }),
      { status: 503, statusText: 'Service Unavailable' }
    );
  }
};

/**
 * ESTRATÉGIA: Stale While Revalidate
 * Retorna cache imediatamente e atualiza em background
 */
const staleWhileRevalidateStrategy = async (request) => {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      const cache = caches.open(CACHE_NAME);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  });

  return cached || fetchPromise;
};

/**
 * INTERCEPÇÃO DE REQUESTS
 * Define estratégia por tipo de recurso
 */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip requisições de terceiros que não queremos cachear
  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  // Assets estáticos: Cache First
  if (/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf)$/.test(url.pathname)) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // HTML: Network First
  if (url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // API calls: Network First
  if (url.pathname.includes('/api/')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Padrão: Stale While Revalidate
  event.respondWith(staleWhileRevalidateStrategy(request));
});

/**
 * MENSAGENS
 * Comunica com a página
 */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    caches.open(CACHE_NAME).then(cache => {
      cache.keys().then(requests => {
        event.ports[0].postMessage({
          type: 'CACHE_SIZE',
          size: requests.length
        });
      });
    });
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(() => {
      event.ports[0].postMessage({
        type: 'CACHE_CLEARED'
      });
    });
  }
});

/**
 * BACKGROUND SYNC (Experimental)
 * Sincroniza dados quando volta online
 */
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Tenta sincronizar dados salvos
      (async () => {
        try {
          // Implementar lógica de sync
          console.log('Sincronizando dados...');
        } catch (error) {
          console.error('Erro ao sincronizar:', error);
          throw error;
        }
      })()
    );
  }
});

console.log('Service Worker carregado');



"use strict";

/* =========================================
   BAVOBEACH PDV — SERVICE WORKER
   Cache offline e atualização do aplicativo
   ========================================= */

// Altere a versão ao publicar uma nova atualização.
const CACHE_PREFIX = "bavobeach-";
const CACHE_NAME = "bavobeach-static-v7";

// Arquivos essenciais para iniciar o aplicativo.
const ARQUIVOS_ESSENCIAIS = [
  "./index.html",
  "./manifest.json"
];

// Ícones são complementares: sua ausência não deve impedir a instalação.
const ARQUIVOS_OPCIONAIS = [
  "./icon.svg"
];

/* =========================================
   1. INSTALAÇÃO
   ========================================= */

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // O aplicativo só instala esta versão se os arquivos
    // essenciais estiverem disponíveis.
    await cache.addAll(ARQUIVOS_ESSENCIAIS);

    // Tenta armazenar os arquivos opcionais sem bloquear a instalação.
    await Promise.all(
      ARQUIVOS_OPCIONAIS.map(async arquivo => {
        try {
          await cache.add(arquivo);
        } catch (erro) {
          console.warn("Arquivo opcional não armazenado:", arquivo);
        }
      })
    );

    // Ativa a nova versão sem aguardar o fechamento de todas as abas.
    await self.skipWaiting();
  })());
});

/* =========================================
   2. ATIVAÇÃO E LIMPEZA DO CACHE ANTIGO
   ========================================= */

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const nomes = await caches.keys();

    await Promise.all(
      nomes
        .filter(nome =>
          nome.startsWith(CACHE_PREFIX) &&
          nome !== CACHE_NAME
        )
        .map(nome => caches.delete(nome))
    );

    await self.clients.claim();
  })());
});

/* =========================================
   3. TRATAMENTO DAS REQUISIÇÕES
   ========================================= */

self.addEventListener("fetch", event => {
  const requisicao = event.request;

  // Não intercepta formulários enviados por POST ou outros métodos.
  if (requisicao.method !== "GET") return;

  const url = new URL(requisicao.url);

  // Não armazena nem intercepta recursos de outros domínios.
  if (url.origin !== self.location.origin) return;

  // Navegação: tenta a rede primeiro para obter a página atualizada.
  if (requisicao.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const resposta = await fetch(requisicao);

        if (resposta.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put("./index.html", resposta.clone());
        }

        return resposta;
      } catch (erro) {
        // Sem internet, abre a página armazenada.
        const pagina = await caches.match("./index.html");

        if (pagina) return pagina;

        return new Response(
          "BavoBeach PDV indisponível offline. Conecte-se à internet e tente novamente.",
          {
            status: 503,
            headers: {
              "Content-Type": "text/plain; charset=utf-8"
            }
          }
        );
      }
    })());

    return;
  }

  // Recursos estáticos: utiliza o cache quando disponível.
  event.respondWith((async () => {
    const armazenado = await caches.match(requisicao);

    if (armazenado) return armazenado;

    try {
      const resposta = await fetch(requisicao);

      // Guarda apenas respostas válidas do mesmo domínio.
      if (resposta.ok && resposta.type === "basic") {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(requisicao, resposta.clone());
      }

      return resposta;
    } catch (erro) {
      // Um recurso ausente não deve ser substituído por HTML.
      return new Response(
        "Recurso indisponível offline.",
        {
          status: 503,
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        }
      );
    }
  })());
});

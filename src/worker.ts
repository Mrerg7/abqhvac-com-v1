interface Env {
  ASSETS: Fetcher;
}

const CANONICAL_HOST = 'abqhvac.com';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === '/index.html' || url.pathname === '/index.html/') {
      url.pathname = '/';
      return Response.redirect(url.toString(), 301);
    }

    const normalizedPath = url.pathname.replace(/\/{2,}/g, '/');
    if (normalizedPath !== url.pathname) {
      url.pathname = normalizedPath;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};

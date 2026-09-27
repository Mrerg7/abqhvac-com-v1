interface Env {
  ASSETS: Fetcher;
}

const CANONICAL_HOST = 'abqhvac.com';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    let redirect = false;

    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      redirect = true;
    }

    if (url.pathname === '/index.html' || url.pathname === '/index.html/') {
      url.pathname = '/';
      redirect = true;
    }

    const normalizedPath = url.pathname.replace(/\/{2,}/g, '/');
    if (normalizedPath !== url.pathname) {
      url.pathname = normalizedPath;
      redirect = true;
    }

    if (
      url.pathname.length > 1 &&
      !url.pathname.endsWith('/') &&
      !url.pathname.split('/').pop()?.includes('.')
    ) {
      url.pathname = `${url.pathname}/`;
      redirect = true;
    }

    if (redirect) {
      return Response.redirect(url.toString(), 301);
    }

    const assetResponse = await env.ASSETS.fetch(request);
    const headers = new Headers(assetResponse.headers);
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    headers.set('Content-Language', 'en');
    const contentType = headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      headers.set(
        'X-Robots-Tag',
        assetResponse.status === 404 ? 'noindex' : 'index, follow, max-image-preview:large',
      );
    }

    if (url.pathname.startsWith('/_astro/') || /\/(?:og\.jpg|favicon\.svg|site\.webmanifest)$/.test(url.pathname)) {
      headers.set('Cache-Control', 'public, max-age=604800');
    }

    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
    });
  },
};

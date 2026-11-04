import { RenderMode, ServerRoute } from '@angular/ssr';

/** Every page is written out as HTML at build time, so search engines read real content. */
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];

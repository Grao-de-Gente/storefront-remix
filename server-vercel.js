import { createRequestHandler } from '@remix-run/vercel';
import * as build from '@remix-run/dev/server-build';
import { logDevReady } from '@remix-run/server-runtime';
import { setApiUrl } from '~/constants';

if (process.env.NODE_ENV === 'development') {
  logDevReady(build);
}

export default createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => {
   
      setApiUrl(constants.API_URL);

    return context.env;
  },
});

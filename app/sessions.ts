import { SessionStorage } from '@remix-run/server-runtime/dist/sessions';
import { ErrorResult } from '~/generated/graphql';
import { createCookieSessionStorage } from '@remix-run/cloudflare';
import { CreateCookieSessionStorageFunction } from '@remix-run/server-runtime';

// async function getCookieSessionStorageFactory(): Promise<CreateCookieSessionStorageFunction> {
//   if (IS_CF_PAGES || IS_VERCEL) {
//     return createCookieSessionStorage;
//   } else {
//     return safeRequireNodeDependency('@remix-run/node').then(
//       (module) => module.createCookieSessionStorage,
//     );
//   }
// }

async function getCookieSessionStorageFactory(): Promise<CreateCookieSessionStorageFunction> {
    return createCookieSessionStorage;
}

let sessionStorage: SessionStorage<
  { activeOrderError: ErrorResult } & Record<string, any>
>;

export async function getSessionStorage() {
  if (sessionStorage) {
    return sessionStorage;
  }
  const factory = await getCookieSessionStorageFactory();
  sessionStorage = factory({
    cookie: {
      name: 'vendure_remix_session',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: ['awdbhbjahdbaw'],
    },
  });
  return sessionStorage;
}

// TODO: Aleterar para o novo middleware do Next.js quando possível (PROXY)
import { NextRequest, NextResponse } from 'next/server';
// import { verifyJwt } from './lib/login/manage-login';

// export const config = {
//   matcher: ['/admin/:path*'],
// };

export default async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isGetRequest = request.method === 'GET';

  const shouldBeAuthenticated = isAdminPage && !isLoginPage;
  const shouldRedirect = shouldBeAuthenticated && isGetRequest;

  if (!shouldRedirect) {
    return NextResponse.next();
  }

  const jwtSession = request.cookies.get(
    process.env.LOGIN_COOKIE_NAME || 'loginSession',
  )?.value;
  // const isAuthenticated = await verifyJwt(jwtSession);
  const isAuthenticated = Boolean(jwtSession);

  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

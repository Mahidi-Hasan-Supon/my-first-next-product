import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token'); // Firebase JWT token cookie থেকে নেওয়া
  const url = request.nextUrl.clone();

  if (!token) {
    url.pathname = '/login'; // logged-in না হলে login page এ redirect
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // logged-in হলে page access দেওয়া
}

export const config = {
  matcher: ['/addproducts', '/dashboard/:path*'], // protected route গুলো
};

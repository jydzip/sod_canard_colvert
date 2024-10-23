import { NextResponse } from 'next/server';
import config from './config.json';

export function middleware(request) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (request.nextUrl.pathname === '/' && key !== config.KEY.VISITOR) {
        return NextResponse.redirect(new URL('/error', request.url));
    }
    if (request.nextUrl.pathname === '/app' && key !== config.KEY.HOST) {
        return NextResponse.redirect(new URL('/error', request.url));
    }
    return NextResponse.next();
}
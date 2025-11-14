import '@testing-library/jest-dom';
import React from 'react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, width, height, priority, ...rest } = props;
    return React.createElement('img', {
      src,
      alt,
      width,
      height,
      ...rest,
    });
  },
}));

// Next.js Link コンポーネントのモック
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  },
}));

// Request/Response グローバルの設定
if (typeof global.Request === 'undefined') {
  global.Request = class Request {} as any;
}

if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    static json(data: any, init?: ResponseInit) {
      return new Response(JSON.stringify(data), {
        ...init,
        headers: {
          'content-type': 'application/json',
          ...init?.headers,
        },
      });
    }

    constructor(public body?: BodyInit | null, public init?: ResponseInit) {}

    get headers() {
      const headersObj = this.init?.headers || {};
      return {
        get: (name: string) => {
          const key = Object.keys(headersObj).find(
            k => k.toLowerCase() === name.toLowerCase()
          );
          return key ? (headersObj as any)[key] : null;
        },
      } as any;
    }

    get status() {
      return this.init?.status || 200;
    }

    async json() {
      return JSON.parse(this.body as string);
    }
  } as any;
}


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_NOTEHUB_TOKEN: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
  },
  images: {
    domains: ['picsum.photos'],
  },
  async headers() {
    return [
      {
        source: '/notes/filter/:slug', // маршрут сторінки
        locale: false,
        headers: [
          {
            key: 'Cache-Control', // Заголовок
            value: 'public, max-age=300, must-revalidate', // кешуємо на 5 хв
          },
        ],
      },
    ]
  }
};

export default nextConfig;
  // remotePatterns: [
	  //     { protocol: 'https', hostname: 'picsum.photos' }
    //   ]
    
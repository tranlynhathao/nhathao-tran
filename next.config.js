const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // You can pass options to `@mdx-js/loader` here if needed
  },
});

module.exports = withMDX({
  reactStrictMode: true,
  env: {
    dir: '/',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
        pathname: '?app=portfolio-theme-jqe0jhmif-atlamors.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.shields.io',
        pathname: '/badge/**',
      },
      {
        protocol: 'https',
        hostname: '**.shields.io',
        pathname: '/github/**',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ositcom.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hocspringboot.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.educba.com',
        pathname: '/**',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});

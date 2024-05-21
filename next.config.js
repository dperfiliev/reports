/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    eslint: { ignoreDuringBuilds: true },
    env: {
        NEXT_PUBLIC_CMS_API_URL: process.env.NEXT_PUBLIC_CMS_API_URL,
        NEXT_PUBLIC_CMS_DOMAIN: process.env.NEXT_PUBLIC_CMS_DOMAIN
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: process.env.NEXT_PUBLIC_CMS_DOMAIN
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: "/uploads/:path*",
                destination: `${process.env.NEXT_PUBLIC_CMS_API_URL}/uploads/:path*`
            }
        ]
    },
    webpack: (config) => {
          config.resolve.alias.canvas = false;
        
          return config;
         },
};

module.exports = nextConfig;

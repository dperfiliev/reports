/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    eslint: { ignoreDuringBuilds: true },
    env: {
        NEXT_PUBLIC_CMS_API_URL: process.env.NEXT_PUBLIC_CMS_API_URL
    },
    images: {
        domains: ["127.0.0.1"]
    }
};

module.exports = nextConfig;

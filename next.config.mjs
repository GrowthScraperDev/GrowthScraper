/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/academy/no-code-ai-website-mastery-program/",
        destination: "/academy/ai-web-development-mastery-program/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

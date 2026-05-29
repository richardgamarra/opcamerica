/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trust the X-Forwarded-Proto header from nginx reverse proxy
  // so Next.js knows it's serving over HTTPS
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

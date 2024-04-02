/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    async rewrites() {
        return [
          {
            source: ' https://kalamarket-api.liara.run/api/{existing-backend-route}',
            destination: ' https://kalamarket-api.liara.run/{existing-route}',
          },
        ]
      },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*",
          // process.env.NODE_ENV === "development"
          //   ? "http://127.0.0.1:8000/api/:path*"
          //   : "/api/",
      },
      {
        source: "/docs",
        destination: "http://127.0.0.1:8000/docs",
          // process.env.NODE_ENV === "development"
          //   ? "http://127.0.0.1:8000/docs"
          //   : "/api/docs",
      },
      {
        source: "/openapi.json",
        destination: "http://127.0.0.1:8000/openapi.json",
          // process.env.NODE_ENV === "development"
          //   ? "http://127.0.0.1:8000/openapi.json"
          //   : "/api/openapi.json",
      },
    ];
  },
};

module.exports = nextConfig;

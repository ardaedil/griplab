/** @type {import('next').NextConfig} */
const config = {
  turbopack: { root: import.meta.dirname },
  experimental: { serverActions: { bodySizeLimit: "16kb" } },
  poweredByHeader: false,
};

export default config;

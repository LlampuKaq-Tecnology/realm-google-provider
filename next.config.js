/** @type {import('next').NextConfig} */
const nextConfig = {
  serverOptions: {
    key: "./key.pem", // Ruta al archivo de clave privada
    cert: "./cert.pem", // Ruta al archivo de certificado
  },
  reactStrictMode: true,
  transpilePackages: ["@llampukaq/realm", "cllk"],
};

module.exports = nextConfig;

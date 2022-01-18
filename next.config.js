module.exports = {
  reactStrictMode: true,
   env: {
    backendURLLOCAL:'http://localhost:8080',
    backendURLProduccion: 'https://chatbitback21.herokuapp.com/',
    socket: 'https://chatbitback21.herokuapp.com/'
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, os: false, module: false };
    return config;
  }

}


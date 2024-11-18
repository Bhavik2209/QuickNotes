module.exports = {
    reactStrictMode: true,
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // If you encounter issues with file system access
        path: false, // If you encounter issues with path module
      };
      return config;
    },
  };
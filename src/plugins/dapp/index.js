module.exports = function DappPlugin(context, options) {
  console.log("dappplugin");
    return {
      name: 'dapp',
      configureWebpack(config, isServer, utils) {
        return {
          resolve : {
            fallback : {
              "stream": require.resolve("stream-browserify"),
              "http": require.resolve("stream-http"),
              "https": require.resolve("https-browserify"),
              "os": require.resolve("os-browserify/browser")
            }
          }
        };
      },
    };
  };
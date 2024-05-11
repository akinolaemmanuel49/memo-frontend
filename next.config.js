const { hostname } = require("os");

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dikkedkzf/**",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
      },
    ],
  },
};

// svelte.config.js
import adapter from "@sveltejs/adapter-static";

const dev = process.env.NODE_ENV === "development";

const config = {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "index.html",
    }),
    paths: {
      base: dev ? "" : "/GdyniaWspiera",
    },
    prerender: {
      entries: ["*"],
    },
  },
};

export default config;

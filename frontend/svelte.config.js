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
      base:
        process.env.NODE_ENV === "production" ? "/sveltekit-github-pages" : "",
    },
    prerender: {
      entries: ["*"],
    },
  },
};

export default config;

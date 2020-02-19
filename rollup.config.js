import typescript from "@rollup/plugin-typescript";
import node from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import svelte from "rollup-plugin-svelte";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: `src/index.ts`,
  output: {
    name: "index",
    dir: "dist",
    format: "amd"
  },
  plugins: [
    typescript({ tsconfig: "tsconfig.json" }),
    svelte({
      // enable run-time checks when not in production
      dev: !production
    }),
    node({
      browser: true,
      dedupe: ["svelte"]
    }),
    commonjs(),
    // Live reload during development
    !production && livereload("src"),
    // Minify
    production && terser(),
    json()
  ]
};

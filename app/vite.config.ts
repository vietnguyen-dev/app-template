import * as reactPlugin from "vite-plugin-react";
import type { UserConfig } from "vite";
import tailwindcss from "tailwindcss";

const config: UserConfig = {
  jsx: "react",
  plugins: [reactPlugin],
};

export default config;

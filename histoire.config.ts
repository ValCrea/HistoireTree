import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue";

export default defineConfig({
  plugins: [HstVue()],
  setupFile: "/src/histoire.setup.ts",
  tree: {
    order: (a, b) => {
      if (a === "Basic tree") return -1;
      else if (b === "Basic tree") return 1;

      if (a === "Activatable tree") return -1;
      else if (b === "Activatable tree") return 1;

      if (a === "Custom activatable tree") return -1;
      else if (b === "Custom activatable tree") return 1;

      if (a === "Hoverable tree") return -1;
      else if (b === "Hoverable tree") return 1;

      return a.localeCompare(b); // equivalent to default behavior
    },
  },
});

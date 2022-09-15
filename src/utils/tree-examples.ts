import type { Tree } from "@/utils/tree-types";

export const test: Tree[] = [
  {
    label: "NodeA",
    items: [
      {
        label: "NodeAA",
        items: [],
      },
      {
        label: "NodeAB",
        items: [
          {
            label: "NodeABA",
            items: [],
          },
          {
            label: "NodeABB",
            items: [],
          },
        ],
      },
      {
        label: "NodeAC",
        items: [],
      },
    ],
  },
  {
    label: "NodeB",
    items: [],
  },
  {
    label: "NodeC",
    items: [
      {
        label: "nodeCA",
        items: [],
      },
      {
        label: "NodeCB",
        items: [],
      },
    ],
  },
];

export const items = [
  {
    label: "Applications :",
    items: [
      {
        label: "Calendar : app",
        items: [],
      },
      {
        label: "Chrome : app",
        items: [],
      },
      {
        label: "Webstorm : app",
        items: [],
      },
    ],
  },
  {
    label: "Documents :",
    items: [
      {
        label: "vuetify :",
        items: [
          {
            label: "src",
            items: [
              {
                label: "index : ts",
                items: [],
              },
              {
                label: "bootstrap : ts",
                items: [],
              },
            ],
          },
        ],
      },
      {
        label: "material :",
        items: [
          {
            label: "src",
            items: [
              {
                label: "v-btn : ts",
                items: [],
              },
              {
                label: "v-card : ts",
                items: [],
              },
              {
                label: "v-window : ts",
                items: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Downloads :",
    items: [
      {
        label: "October : pdf",
        items: [],
      },
      {
        label: "November : pdf",
        items: [],
      },
      {
        label: "Tutorial : html",
        items: [],
      },
    ],
  },
  {
    label: "Videos :",
    items: [
      {
        label: "Tutorials :",
        items: [
          {
            label: "Basic layouts : mp4",
            items: [],
          },
          {
            label: "Advanced techniques : mp4",
            items: [],
          },
          {
            label: "All about app : dir",
            items: [],
          },
        ],
      },
      {
        label: "Intro : mov",
        items: [],
      },
      {
        label: "Conference introduction : avi",
        items: [],
      },
    ],
  },
];

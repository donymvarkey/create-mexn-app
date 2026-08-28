import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'create-mexn-app',
  description: 'A CLI tool to scaffold a new MongoDB-Express-Node app',
  base: '/create-mexn-app/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Features', link: '/guide/features' },
        ],
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/donymvarkey/create-mexn-app',
      },
    ],
  },
});

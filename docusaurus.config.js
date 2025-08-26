// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '히리로그',
  tagline: '오늘의 기록, 내일의 성장 ― 유히리 데일리로그',
  favicon: 'img/favicon.ico',

  url: 'https://eeheueklf.github.io',
  baseUrl: '/',

  organizationName: 'eeheueklf', 
  projectName: 'eeheueklf.github.io', 

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          showLastUpdateTime: true,
          editUrl:
            'https://github.com/eeheueklf/eeheueklf.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/eeheueklf/eeheueklf.github.io/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag:{
          trackingID: "G-NE35MDLPZW",
          anonymizeIP: true,
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      metadata:[{
        name:"google-site-verification",
        content:"fhdIMfm7eKRtHRKiRQ5quuM9xGeD5qNnWKm-hnjb-Qc"
      }],
      docs:{
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        }
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
  
};

export default config;

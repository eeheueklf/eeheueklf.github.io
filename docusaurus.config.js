// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
const fs = require("fs");
const path = require("path");

function countDocs(dir) {
  let count = 0;
  function walk(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
      const fullPath = path.join(folder, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        count++;
      }
    }
  }
  walk(dir);
  return count;
}

const docsCount = countDocs(path.join(__dirname, 'docs'));
const blogCount = countDocs(path.join(__dirname, 'blog'));
const totalCount = docsCount + blogCount;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '히리로그',
  tagline: '/프론트엔드 개발로그',
  favicon: 'img/icon.svg',
  trailingSlash: false,

  url: 'https://eeheueklf.github.io',
  baseUrl: '/',

  organizationName: 'eeheueklf', 
  projectName: 'eeheueklf.github.io', 

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
      type: 'text/css',
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          editUrl:
            'https://github.com/eeheueklf/eeheueklf.github.io/tree/main/',
        },
        blog: {
          path: 'blog',         
          routeBasePath: 'blog',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Posts',
          editUrl:
            'https://github.com/eeheueklf/eeheueklf.github.io/tree/main/',

        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag:{
          trackingID: "G-NE35MDLPZW",
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      metadata:[{
        name:"google-site-verification",
        content:"fhdIMfm7eKRtHRKiRQ5quuM9xGeD5qNnWKm-hnjb-Qc"
      }],
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
    customFields: {
      blogCount,
      docsCount,
      totalCount,
    },
};

export default config;

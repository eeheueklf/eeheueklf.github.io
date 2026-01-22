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
const blogCount = countDocs(path.join(__dirname, 'blogs'));
const totalCount = docsCount + blogCount;

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
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Posts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag:{
          trackingID: "G-NE35MDLPZW",
          anonymizeIP: true,
        },
        sitemap: {
          lastmod: 'date',
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
    plugins: [
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'blogDocs',            // 고유 id
          path: 'blogs',               // 실제 blog 폴더
          routeBasePath: 'blogs',      // URL 경로: example.com/blog/~
          sidebarPath: require.resolve('./sidebarsBlog.js'),
          editUrl: 'https://github.com/eeheueklf/eeheueklf.github.io/tree/main/',
          showLastUpdateTime: true,
        },
      ],
    ],
    customFields: {
      blogCount,
      docsCount,
      totalCount,
    },
};

export default config;

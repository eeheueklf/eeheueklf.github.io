// src/data/projects.js
import NotionContent, { frontMatter as notionMatter } from './_noiton.mdx';
import TyleContent, { frontMatter as tyleMatter } from './_tyle.mdx';

export const projects = [
  { Content: NotionContent, data: notionMatter },
  { Content: TyleContent, data: tyleMatter },
];
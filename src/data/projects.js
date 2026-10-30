// src/data/projects.js
import DdingtownContent, { frontMatter as ddingtownMatter } from '../content/ddingtown/summary.mdx';
import DdingtownDetail from '../content/ddingtown/detail.mdx';
import NotionContent, { frontMatter as notionMatter } from '../content/noiton/summary.mdx';
import NotionDetail from '../content/noiton/detail.mdx';
import TyleContent, { frontMatter as tyleMatter } from '../content/tyle/summary.mdx';
import TyleDetail from '../content/tyle/detail.mdx';

export const projects = [
  { Content: DdingtownContent, DetailContent: DdingtownDetail, data: ddingtownMatter },
  { Content: NotionContent, DetailContent: NotionDetail, data: notionMatter },
  { Content: TyleContent, DetailContent: TyleDetail, data: tyleMatter },
];

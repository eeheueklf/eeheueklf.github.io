const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '../docs');
const BLOG_DIR = path.join(__dirname, '../blog');
const DATA_DIR = path.join(__dirname, '../src/data');

function getItems(dir, baseRoute) {
  const fileList = [];

  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walk(filePath);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(content);
        
        const fileName = file.replace(/\.(md|mdx)$/, '');
        const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})$/);

        const finalTitle = data.title || fileName;
        const finalDate = data.date || (dateMatch ? dateMatch[1] : stat.mtime);

        let relativePath = path.relative(dir, filePath)
          .replace(/\.(md|mdx)$/, '')
          .replace(/\\/g, '/');

        if (baseRoute === 'blog' && data.slug) {
          const parts = relativePath.split('/');
          parts[parts.length - 1] = data.slug;
          relativePath = parts.join('/');
        }

        const formattedDate = new Date(finalDate).toISOString().split('T')[0];

        fileList.push({
          title: finalTitle,
          date: formattedDate,
          path: `/${baseRoute}/${relativePath}`,
        });
      }
    });
  }

  walk(dir);
  return fileList;
}

function generateDocMeta(dir) {
  const metaMap = {};

  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);
    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walk(filePath);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(content);
        const docId = path.relative(dir, filePath)
          .replace(/\.(md|mdx)$/, '')
          .replace(/\\/g, '/');
        metaMap[docId] = {
          tags: data.tags ?? [],
          date: data.date ? new Date(data.date).toISOString().split('T')[0] : null,
        };
      }
    });
  }

  walk(dir);
  return metaMap;
}

function generate() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const docs = getItems(DOCS_DIR, 'docs')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  fs.writeFileSync(path.join(DATA_DIR, 'recent-docs.json'), JSON.stringify(docs, null, 2));

  const blogs = getItems(BLOG_DIR, 'blog')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  fs.writeFileSync(path.join(DATA_DIR, 'recent-blogs.json'), JSON.stringify(blogs, null, 2));

  const docMeta = generateDocMeta(DOCS_DIR);
  fs.writeFileSync(path.join(DATA_DIR, 'doc-tags.json'), JSON.stringify(docMeta, null, 2));
}

generate();
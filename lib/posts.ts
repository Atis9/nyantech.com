import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import sanitizeHtml from 'sanitize-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export class InvalidIdError extends Error {
  constructor(id: string) {
    super(`Invalid post ID: ${id}`);
    this.name = 'InvalidIdError';
  }
}

export interface PostSummary {
  id: string;
  title: string;
  date: string;
  author: string;
}

export interface Post extends PostSummary {
  contentHtml: string;
}

interface PostMetadata {
  title: string;
  date: string;
  author: string;
}

function extractMetadata(data: matter.GrayMatterFile<string>['data']): PostMetadata {
  return {
    title: data.title,
    date: data.date,
    author: data.author,
  };
}

export function getSortedPostSummaries(): PostSummary[] {
  return getAllPostIds()
    .map(({ id }) => getPostSummary(id))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllPostIds(): { id: string }[] {
  return fs.readdirSync(postsDirectory)
    .map((fileName) => ({ id: fileName.replace(/\.md$/, '') }))
    .filter(({ id }) => validateId(id));
}

export function getPostSummary(id: string): PostSummary {
  const rawPost = loadRawPost(id);
  const metadata = extractMetadata(rawPost.data);
  return { id, ...metadata };
}

export async function getPost(id: string): Promise<Post> {
  const rawPost = loadRawPost(id);
  const metadata = extractMetadata(rawPost.data);
  const contentHtml = await parseMarkdownToHtml(rawPost.content);
  return { id, ...metadata, contentHtml };
}

function loadRawPost(id: string): matter.GrayMatterFile<string> {
  if (!validateId(id)) {
    throw new InvalidIdError(id);
  }

  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
}

function validateId(id: string): boolean {
  return /^[\w-]+$/.test(id);
}

async function parseMarkdownToHtml(markdown: string): Promise<string> {
  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
    }),
  );
  marked.use({
    pedantic: false,
    gfm: true,
    breaks: true,
    silent: false,
  });

  return sanitizeHtml(await marked.parse(markdown), {
    allowedClasses: {
      code: ['language-*', 'lang-*', 'nohighlight'],
      '*': ['hljs-*'],
    },
  });
}

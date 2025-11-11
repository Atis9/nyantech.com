import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import sanitizeHtml from 'sanitize-html';

const postsDirectory: string = path.join(process.cwd(), 'posts');

class InvalidIdError extends Error {}

export interface PostSummary {
  id: string;
  title: string;
  date: string;
  author: string;
}

export interface Post {
  id: string;
  title: string;
  date: string;
  author: string;
  contentHtml: string;
}

export function getSortedPostSummaries(): PostSummary[] {
  const allPostSummaries: PostSummary[] = getAllPostIds().map((path) => {
    const postSummary: PostSummary = getPostSummary(path.id);

    return postSummary;
  });

  const sortedPostSummaries = allPostSummaries.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    } else {
      return 0;
    }
  });

  return sortedPostSummaries;
}

export function getAllPostIds(): { id: string }[] {
  const fileNames: string[] = fs.readdirSync(postsDirectory);
  const allPostIds: { id: string }[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    return { id: id };
  });
  const validAllPostIds: { id: string }[] = allPostIds.filter(
    (obj) => {
      return validateId(obj.id);
    },
  );

  return validAllPostIds;
}

export function getPostSummary(id: string): PostSummary {
  const RawPost = loadRawPost(id);

  const title: string = RawPost.data.title;
  const date: string = RawPost.data.date;
  const author: string = RawPost.data.author;
  const postSummary: PostSummary = { id, title, date, author };

  return postSummary;
}

export async function getPost(id: string): Promise<Post> {
  const RawPost = loadRawPost(id);

  const processedContent = await parseMarkdownToHtml(RawPost.content);
  const contentHtml: string = processedContent;
  const title: string = RawPost.data.title;
  const date: string = RawPost.data.date;
  const author: string = RawPost.data.author;
  const post: Post = { id, contentHtml, title, date, author };

  return post;
}

function loadRawPost(id: string): matter.GrayMatterFile<string> {
  if (!validateId(id)) {
    throw new InvalidIdError();
  }

  const fullPath: string = path.join(postsDirectory, `${id}.md`);
  const fileContents: string = fs.readFileSync(fullPath, 'utf8');
  const RawPost = matter(fileContents);

  return RawPost;
}

function validateId(id: string): Boolean {
  const validateRegExp: RegExp = /(\w|-)+/;
  const validResult = validateRegExp.test(id);

  return validResult;
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

  const html = sanitizeHtml(await marked.parse(markdown), {
    allowedClasses: {
      code: ['language-*', 'lang-*', 'nohighlight'],
      '*': ['hljs-*'],
    },
  });

  return html;
}

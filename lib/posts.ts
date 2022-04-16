import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

class InvalidIdError extends Error {}

export interface PostSummary {
  id: string;
  title: string;
  date: string;
}

export interface Post {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
}

export function postsDirectory(): string {
  return path.join(process.cwd(), 'posts');
}

export function getSortedPostSummaries(): PostSummary[] {
  const allPostSummaries: PostSummary[] = getAllPostIds().map((path) => {
    const postSummary: PostSummary = getPostSummary(path.params.id);

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

export function getAllPostIds(): { params: { id: string } }[] {
  const fileNames: string[] = fs.readdirSync(postsDirectory());
  const allPostIds: { params: { id: string } }[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    return { params: { id: id } };
  });
  const validAllPostIds: { params: { id: string } }[] = allPostIds.filter(
    (obj) => {
      return validateId(obj.params.id);
    },
  );

  return validAllPostIds;
}

export function getPostSummary(id: string): PostSummary {
  const RawPost = loadRawPost(id);

  const title: string = RawPost.data.title;
  const date: string = RawPost.data.date;
  const postSummary: PostSummary = { id, title, date };

  return postSummary;
}

export async function getPost(id: string): Promise<Post> {
  const RawPost = loadRawPost(id);

  const processedContent = await remark().use(html).process(RawPost.content);
  const contentHtml: string = processedContent.toString();
  const title: string = RawPost.data.title;
  const date: string = RawPost.data.date;
  const post: Post = { id, contentHtml, title, date };

  return post;
}

function loadRawPost(id: string): matter.GrayMatterFile<string> {
  if (!validateId(id)) {
    throw new InvalidIdError();
  }

  const fullPath: string = path.join(postsDirectory(), `${id}.md`);
  const fileContents: string = fs.readFileSync(fullPath, 'utf8');
  const RawPost = matter(fileContents);

  return RawPost;
}

function validateId(id: string): Boolean {
  const validateRegExp: RegExp = /(\w|-)+/;
  const validResult = validateRegExp.test(id);

  return validResult;
}

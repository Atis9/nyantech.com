'use client';

import Link from 'next/link';
import { useState } from 'react';
import Date from './date';
import { PostSummary } from '../lib/posts';

const POSTS_PER_PAGE = 6;

interface PostListProps {
  posts: PostSummary[];
}

export default function PostList({ posts }: PostListProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = page * POSTS_PER_PAGE;
  const visiblePosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className='border rounded-2 my-3'>
      <div className='color-bg-subtle px-3 py-2 border-bottom rounded-top-2'>
        <h2 className='f3 m-0'>Blog</h2>
      </div>
      <div className='d-flex flex-wrap gutter pt-3 px-3'>
        {visiblePosts.map(({ id, date, title, author }) => (
          <div className='col-12 col-md-6 pb-3' key={id}>
            <Link href={`/posts/${id}`} className='no-underline'>
              <div className='border rounded-2 p-3 height-full color-bg-default d-flex flex-column'>
                <div className='color-fg-muted f6 mb-1'>
                  <Date dateString={date} />
                </div>
                <h3 className='f4 color-fg-default mb-1 line-clamp-2'>{title}</h3>
                <div className='color-fg-muted f6 mt-auto'>{author}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <nav className='d-flex flex-justify-center flex-items-center pb-3' aria-label='Pagination'>
          <button
            className='btn btn-outline mr-2'
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            ← Prev
          </button>
          <span className='f5 color-fg-muted mx-2'>
            {page + 1} / {totalPages}
          </span>
          <button
            className='btn btn-outline ml-2'
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages - 1}
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}

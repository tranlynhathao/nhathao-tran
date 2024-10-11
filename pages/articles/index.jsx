import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import css from '../../styles/sections/articles/recent.module.scss';

const articlesDirectory = path.join(process.cwd(), 'content/articles/mdx');

export async function getStaticProps() {
  const filenames = fs.readdirSync(articlesDirectory);

  const articles = filenames.map((filename) => {
    const filePath = path.join(articlesDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      title: data.title || 'Untitled',
      pubDate: data.publishedAt || new Date().toISOString(),
      desc: data.desc || 'No description available.',
      link: `/articles/${filename.replace(/\.mdx$/, '')}`,
      thumbnail: data.thumbnail || '/default-thumbnail.jpg',
      views: data.views || 0,
    };
  });

  articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  return {
    props: {
      articles,
    },
  };
}

export default function Articles({ articles }) {
  return (
    <div className={css.articlesContainer}>
      {articles.map(({ title, pubDate, desc, link, thumbnail, views }) => (
        <article key={link} className={css.article}>
          <div className={css.thumbnailContainer}>
            <img
              src={thumbnail}
              alt={`${title} thumbnail`}
              className={css.thumbnail}
            />
          </div>
          <div className={css.articleContent}>
            <h2>
              <a href={link}>{title}</a>
            </h2>
            <p>{desc}</p>
            <div className={css.articleMeta}>
              <span>{new Date(pubDate).toLocaleDateString()}</span>
              <span>
                <i className="fas fa-eye"></i> {views}
              </span>{' '}
              {/* Hiển thị lượt xem */}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

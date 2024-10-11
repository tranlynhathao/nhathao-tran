import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import Section from '../../components/sections/section';
import useSWR from 'swr';
import { useEffect } from 'react';
import styles from '../../styles/sections/articles/detailPage.module.scss';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import { InlineMath, BlockMath } from 'react-katex'; // KaTeX components
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // PrismJS theme

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const POSTS_PATH = path.join(process.cwd(), 'content', 'articles', 'mdx');
  const files = fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const POSTS_PATH = path.join(process.cwd(), 'content', 'articles', 'mdx');
  const { slug } = context.params as IParams;
  const source = fs.readFileSync(path.join(POSTS_PATH, slug + '.mdx'), 'utf8');

  const { content, data } = matter(source);
  const mdxSource = await serialize(content);

  return {
    props: { data, slug, mdxSource },
  };
};

const fetcher = async (args: any) => {
  const res = await fetch(args);
  return res.json();
};

const PostPage = ({ ...props }) => {
  const { data } = useSWR(`/api/views/${props.slug}`, fetcher);
  const views = new Number(data?.total);

  useEffect(() => {
    fetch(`/api/views/${props.slug}`, {
      method: 'POST',
    });
    Prism.highlightAll(); // Highlight syntax on component mount
  }, [props.slug]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <Section delay={0.2}>
          <span className={styles.icon}>{props.data.icon}</span>
          <h1 className={styles.title}>{props.data.title}</h1>
          <div className={styles.meta}>
            <span>{props.data.publishedAt}</span>
            <span>{`${Number(views) > 1 ? views.toLocaleString() : '---'} views`}</span>
          </div>
          <Image
            src={props.data.thumbnail}
            alt={props.data.title}
            width={1200}
            height={675}
            className={styles.thumbnail}
          />
          <MDXRemote
            {...props.mdxSource}
            components={{
              // Render LaTeX
              InlineMath,
              BlockMath,
              // Render code blocks with PrismJS
              pre: (preProps) => (
                <pre className={styles.codeBlock} {...preProps} />
              ),
              code: (codeProps) => (
                <code className={styles.code} {...codeProps} />
              ),
              // Render tables
              table: (tableProps) => (
                <table className={styles.table} {...tableProps} />
              ),
              // Override headers
              h1: (props) => <h1 className={styles.h1} {...props} />,
              h2: (props) => <h2 className={styles.h2} {...props} />,
              h3: (props) => <h3 className={styles.h3} {...props} />,
              a: (aProps) => <a className={styles.link} {...aProps} />,
              ul: (ulProps) => <ul className={styles.list} {...ulProps} />,
              ol: (olProps) => (
                <ol className={styles.orderedList} {...olProps} />
              ),
              blockquote: (blockquoteProps) => (
                <blockquote
                  className={styles.blockquote}
                  {...blockquoteProps}
                />
              ),
              p: (pProps) => <p className={styles.paragraph} {...pProps} />,
              img: (imgProps) => <img className={styles.image} {...imgProps} />,
              hr: (hrProps) => <hr className={styles.hr} {...hrProps} />,
            }}
          />
        </Section>
      </div>
    </div>
  );
};

export default PostPage;

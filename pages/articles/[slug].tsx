import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { join } from 'path';

const postsDirectory = join(process.cwd(), 'content', 'articles'); // Update path if necessary

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    return {
      params: { slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const mdxSource = await serialize(fileContents);

  return {
    props: {
      mdxSource,
    },
  };
};

const Post = ({ mdxSource }: { mdxSource: MDXRemoteSerializeResult }) => {
  return (
    <div>
      <MDXRemote {...mdxSource} />
    </div>
  );
};

export default Post;

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Section from '../../components/sections/section'
import css from '../../styles/sections/articles/recent.module.scss'

// Path to content directory
const articlesDirectory = path.join(process.cwd(), 'content/articles')

export async function getStaticProps() {
  // Read all files from the directory
  const filenames = fs.readdirSync(articlesDirectory)
  
  // Get data from all articles
  const articles = filenames.map(filename => {
    const filePath = path.join(articlesDirectory, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(fileContent)

    // Ensure all properties are defined and provide default values if needed
    return {
      title: data.title || 'Untitled',
      pubDate: data.pubDate || new Date().toISOString(),
      link: `/articles/${filename.replace(/\.mdx$/, '')}`,
      author: data.author || 'Unknown',
      thumbnail: data.thumbnail || '/default-thumbnail.jpg',
      categories: data.categories || []
    }
  })

  return {
    props: {
      articles
    }
  }
}

export default function Articles({ articles }) {
  return (
    <Section>
      <div className={css.articlesContainer}>
        {articles.map(({ title, pubDate, link, author, thumbnail, categories }) => (
          <article key={link} className={css.article}>
            <img src={thumbnail} alt="Article thumbnail" />
            <h2><a href={link}>{title}</a></h2>
            <p>By {author} on {new Date(pubDate).toDateString()}</p>
            <div>
              {categories.map((category, index) => (
                <span key={index}>{category}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

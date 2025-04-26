import { neon } from '@neondatabase/serverless'

export default defineEventHandler(async (event) => {
  const { databaseUrl } = useRuntimeConfig()
  const db = neon(databaseUrl)

  try {
    const body = await readBody(event)

    const {
      title,
      slug,
      content,
      author_name,
      published_at,
      is_published = false,
      seo_title,
      seo_description,
      seo_keywords,
      image
    } = body

    const result = await db`
      INSERT INTO blogs (
        title, slug, content, author_name, published_at,
        is_published, seo_title, seo_description, seo_keywords , image
      )
      VALUES (
        ${title}, ${slug}, ${content}, ${author_name}, ${published_at},
        ${is_published}, ${seo_title}, ${seo_description}, ${seo_keywords}, ${image}
      )
      RETURNING *;
    `

    return {
      message: 'Blog created successfully',
      blog: result[0]
    }

  } catch (error) {
    console.error('🔥 Blog creation error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create blog: ' + error.message
    })
  }
})

import { neon } from '@neondatabase/serverless'

export default defineEventHandler(async (event) => {
  const { databaseUrl } = useRuntimeConfig()
  const db = neon(databaseUrl)

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const {
    title,
    slug,
    content,
 
    author_name,
    is_published,
    seo_title,
    seo_description,
    seo_keywords,
    image
  } = body

  try {
    const result = await db`
      UPDATE blogs
      SET
        title = ${title},
        slug = ${slug},
        content = ${content},
      
        author_name = ${author_name},
        is_published = ${is_published},
        seo_title = ${seo_title},
        seo_description = ${seo_description},
        seo_keywords = ${seo_keywords},
        image = ${image},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Blog not found',
      })
    }

    return result[0]
  } catch (error) {
    console.error("🔥 Error updating blog:", error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Database error: ' + error.message,
    })
  }
})

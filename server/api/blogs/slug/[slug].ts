import { neon } from '@neondatabase/serverless'

export default defineCachedEventHandler(
  async (event) => {
    const { databaseUrl } = useRuntimeConfig()
    const db = neon(databaseUrl)

    const slug = getRouterParam(event, 'slug')
    console.log(slug);

    if (!slug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing slug parameter',
      })
    }

    try {
      const result = await db`
        SELECT 
          id,
          title,
          slug,
          content,
          author_name,
          TO_CHAR(published_at, 'Mon DD, YYYY') AS published_at,
          is_published,
          seo_title,
          seo_description,
          seo_keywords,
          TO_CHAR(created_at, 'Mon DD, YYYY') AS created_at,
          TO_CHAR(updated_at, 'Mon DD, YYYY') AS updated_at
        FROM blogs
        WHERE slug = ${slug}
        LIMIT 1
      `

      if (result.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Blog not found',
        })
      }

      return result[0]
    } catch (error) {
      console.error('🔥 Error fetching blog by slug:', error)

      throw createError({
        statusCode: 500,
        statusMessage: 'Database error: ' + error.message,
      })
    }
  },
  {
    maxAge: 1 * 1, // Cache for 1 hour
  }
)

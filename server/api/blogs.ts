import { neon } from '@neondatabase/serverless'

export default defineCachedEventHandler(
  async (event) => {
    const { databaseUrl } = useRuntimeConfig()
    const db = neon(databaseUrl)

    try {
      const result = await db`SELECT 
  id, 
  title, 
  slug, 
  content, 
  author_name, 
  TO_CHAR(published_at, 'Mon DD, YYYY') AS published_at,  -- Short date format
  is_published, 
  seo_title, 
  seo_description, 
  seo_keywords, 
  TO_CHAR(created_at, 'Mon DD, YYYY') AS created_at,   -- Short date format
  TO_CHAR(updated_at, 'Mon DD, YYYY') AS updated_at ,    -- Short date format
  image
FROM blogs
ORDER BY id DESC;
`
      return result
    } catch (error) {
      console.error('🔥 Database query failed:', error)

      throw createError({
        statusCode: 500,
        statusMessage: 'Database error: ' + error.message,
      })
    }
  },
  {
    maxAge: 1 * 1 * 1, // Cache for 1 day
  }
)

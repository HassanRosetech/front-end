import { neon } from '@neondatabase/serverless'

export default defineEventHandler(async (event) => {
    const { databaseUrl } = useRuntimeConfig()
    const db = neon(databaseUrl)
    
  const body = await readBody(event);

  if (!body.email) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Email is required' }));
  }

  try {
    const result = await db.query(
      'INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING *',
      [body.email]
    );

    return { success: true, data: result.rows[0] || null };
  } catch (err) {
    console.error(err);
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Database error' }));
  }
});

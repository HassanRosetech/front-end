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
      `UPDATE newsletter_subscribers
       SET subscribed = FALSE, unsubscribed_date = CURRENT_TIMESTAMP
       WHERE email = $1 RETURNING *`,
      [body.email]
    );

    if (result.rowCount === 0) {
      return sendError(event, createError({ statusCode: 404, statusMessage: 'Email not found' }));
    }

    return { success: true, data: result.rows[0] };
  } catch (err) {
    console.error(err);
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Database error' }));
  }
});

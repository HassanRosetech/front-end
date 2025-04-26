import { neon } from '@neondatabase/serverless';

export default defineCachedEventHandler(
  async (event) => {
    const { databaseUrl } = useRuntimeConfig();
    const db = neon(databaseUrl);

    // Check if the 'id' exists in params
    const { id } = event.context.params || {}; // Safely access params and destructure id

    if (!id) {
      throw createError({ statusCode: 400, message: 'ID is required' });
    }

    // Perform the DELETE operation
    const result = await db`
      DELETE FROM blogs WHERE id = ${id} RETURNING *;  -- This will return the deleted row
    `;

    // Return the result (the deleted row)
    if (result.length === 0) {
      throw createError({ statusCode: 404, message: 'Contact not found' });
    }

    return { message: 'Blog deleted successfully', deletedContact: result[0] };
  },
  {
    maxAge: 60 * 60 * 24, // Cache it for a day
  }
);

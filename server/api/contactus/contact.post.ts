import { neon } from '@neondatabase/serverless'

export default defineEventHandler(async (event) => {
  const { databaseUrl } = useRuntimeConfig()
  const db = neon(databaseUrl)

  try {
    const body = await readBody(event)

    const {
        firstName,
        lastName,
        email,
        subject,
        comment  
    } = body

    const result = await db`
      INSERT INTO contact_us (
       first_name , last_name ,email , subject , comment  
      )
      VALUES (
        ${firstName}, ${lastName}, ${email}, ${subject}, ${comment}
      )
      RETURNING *;
    `

    return {
      message: 'Contact is created successfully',
      blog: result[0]
    }

  } catch (error) {
    console.error('🔥 Contact creation error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create Contact: ' + error.message
    })
  }
})

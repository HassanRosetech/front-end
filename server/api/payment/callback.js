export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate and process the payment status here
  console.log("Swedbank callback received:", body);

  // TODO: Verify signature, update order in DB, etc.

  return { status: "ok" };
});

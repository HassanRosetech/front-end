export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("Swedbank callback received:", body);

  // Optional: Validate signature or check request origin
  const signature = getHeader(event, "x-signature");
  if (signature && !isValidSignature(signature, body)) {
    console.warn("Invalid signature!");
    return { statusCode: 403, body: "Invalid signature" };
  }

  const orderId = body.payment?.orderReference;

  if (orderId) {
    // TODO: Fetch and update the order status in your DB
    console.log("Updating order:", orderId);
    // await db.orders.update({ id: orderId }, { status: "paid" });
  } else {
    console.warn("No order reference found in callback body");
  }

  return { status: "ok" };
});

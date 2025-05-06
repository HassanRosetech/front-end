// server/api/initiate-payment.js

export default defineEventHandler(async (event) => {
  const userAgent = getHeader(event, "user-agent") || "NuxtApp";

  const payload = {
    payment: {
      operation: "Purchase",
      intent: "Authorization",
      currency: "SEK",
      prices: [{ type: "Visa", amount: 10000, vatAmount: 2500 }],
      description: "Order #123",
      userAgent,
      language: "sv-SE",
      urls: {
        completeUrl: "https://www.partsshop.se/payment/complete",
        cancelUrl: "https://www.partsshop.se/payment/cancel",
        callbackUrl: "https://www.partsshop.se/api/payment/callback",
      },
    },
  };

  try {
    const response = await $fetch(
      "https://api.externalintegration.payex.com/psp/paymentorders",
      {
        method: "POST",
        body: payload,
        headers: {
          Authorization: "Bearer 98eed80d-748d-4d45-abd4-5618efa7a95d",
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (err) {
    console.error("Swedbank error:", err.data || err.message);
    return {
      statusCode: 500,
      body: {
        error: err.data || err.message,
      },
    };
  }
});

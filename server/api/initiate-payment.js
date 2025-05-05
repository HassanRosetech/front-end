// Nuxt 3 server route using Nitro conventions
import axios from "axios";

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
        callbackUrl: "https://www.partsshop.se/api/payment/callback", // use `/api/` here
      },
    },
  };

  try {
    const response = await axios.post(
      "https://api.swedbankpay.com/psp/paymentorders",
      payload,
      {
        headers: {
          Authorization:
            "Bearer f09688768d079a7646aae6cf8bc2212efe727b9476975af6f02c164ef53a9538", // ⛔ missing 'Bearer'!
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error(
      "Payment initiation error:",
      err.response?.data || err.message
    );
    return {
      statusCode: 500,
      body: {
        error: err.response?.data || err.message,
      },
    };
  }
});

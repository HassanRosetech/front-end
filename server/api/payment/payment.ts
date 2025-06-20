export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const res = await fetch('https://api.externalintegration.payex.com/psp/creditcard/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.SWEDBANK_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payment: {
          operation: "Purchase",
          intent: "Authorization",
          currency: "SEK",
          prices: [{ type: "Card", amount: 1500, vatAmount: 0 }], // <- FIXED type
          description: "Test purchase",
          payerReference: "user123",
          userAgent: "Mozilla/5.0",
          language: "sv-SE",
          urls: {
            hostUrls: ["https://www.partsshop.se/"],
            completeUrl: "https://www.partsshop.se/payment/complete",
            cancelUrl: "https://www.partsshop.se/payment/cancel",
            callbackUrl: "https://www.partsshop.se/payment/callback"
          },
          payeeInfo: {
            payeeId: config.SWEDBANK_PAYEE_ID,
            payeeReference: `ref-${Date.now()}`
          }
        }
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Swedbank API Error:', JSON.stringify(data, null, 2));
      // Return detailed error to frontend
      return {
        statusCode: res.status,
        body: data
      };
    }

    return data;
  } catch (error) {
    console.error('Internal Server Error:', error);
    return {
      statusCode: 500,
      body: error instanceof Error ? error.message : String(error)
    };
  }
});

// server/api/payment.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

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
        prices: [{ type: "Visa", amount: 1500, vatAmount: 0 }],
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
  return data;
});

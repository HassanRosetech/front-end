// server/api/initiate-payment.js
import axios from "axios";

export default async (req, res) => {
  const payload = {
    payment: {
      operation: "Purchase",
      intent: "Authorization",
      currency: "SEK",
      prices: [{ type: "Visa", amount: 10000, vatAmount: 2500 }],
      description: "Order #123",
      userAgent: req.headers["user-agent"],
      language: "sv-SE",
      urls: {
        completeUrl: "https://www.partsshop.se/payment/complete",
        cancelUrl: "https://www.partsshop.se/payment/cancel",
        callbackUrl: "https://www.partsshop.se/payment/callback",
      },
    },
  };

  try {
    const response = await axios.post(
      "https://api.swedbankpay.com/psp/paymentorders",
      payload,
      {
        headers: {
          Authorization: "98eed80d-748d-4d45-abd4-5618efa7a95d",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

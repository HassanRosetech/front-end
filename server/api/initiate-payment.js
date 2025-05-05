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
          Authorization:
            "f09688768d079a7646aae6cf8bc2212efe727b9476975af6f02c164ef53a9538",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

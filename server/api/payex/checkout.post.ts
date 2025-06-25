import { readBody, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const body = await readBody(event);

    const response = await fetch("https://api.externalintegration.payex.com/psp/paymentorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.payex.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      setResponseStatus(event, response.status);
      return {
        error: true,
        message: data || "Unknown error from PayEx",
      };
    }

    return data;
  } catch (error) {
    setResponseStatus(event, 500);
    return { error: true, message: error.message || "Server error" };
  }
});

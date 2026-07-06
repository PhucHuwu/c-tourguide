const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload));
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    sendJson(response, 500, { error: "Missing GROQ_API_KEY on the server" });
    return;
  }

  try {
    const body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const groqResponse = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: body.model || "llama-3.3-70b-versatile",
        temperature: 0.4,
        max_tokens: 900,
        messages: [
          {
            role: "system",
            content: "Bạn là trợ lý AI của C-TourGuide cho người Việt đi Trung Quốc. Trả lời bằng tiếng Việt, thực tế, ngắn gọn, ưu tiên an toàn, dịch thuật, đi lại, chợ đầu mối, local guide, booking và lưu ý rủi ro. Không bịa thông tin pháp lý, vé, giá chính xác; nếu không chắc hãy nhắc người dùng kiểm tra lại.",
          },
          ...messages,
        ],
      }),
    });

    const data = await groqResponse.json().catch(() => null);
    if (!groqResponse.ok) {
      sendJson(response, groqResponse.status, { error: data?.error?.message || "Groq request failed" });
      return;
    }

    sendJson(response, 200, { text: data?.choices?.[0]?.message?.content || "Tôi chưa có câu trả lời phù hợp." });
  } catch (error) {
    sendJson(response, 500, { error: error instanceof Error ? error.message : "AI server error" });
  }
}

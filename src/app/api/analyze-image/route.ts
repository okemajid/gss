import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { image } = await req.json();

  // Analisis deskripsi gambar pakai OpenAI
  const result = await openai.chat.completions.create({
    model: "gpt-4o-mini", // model vision kecil cepat
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Identify what kind of Adobe tool this image is most related to. Respond with only the tool name (e.g., Adobe Express, Adobe Firefly, Adobe Premiere, etc.)" },
          { type: "image_url", image_url: image },
        ],
      },
    ],
  });

  const matchedFeature = result.choices[0].message?.content?.trim() ?? "Unknown";

  return Response.json({ matchedFeature });
}

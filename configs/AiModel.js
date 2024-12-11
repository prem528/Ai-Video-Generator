const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
   
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "write a script to generate 30 seconds video on topic : interesting historical story along with Ai image prompt inRealistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"imagePrompt\": \"A bustling, sun-drenched marketplace in ancient Alexandria, Egypt. Vendors are selling spices, fabrics, and pottery. People in togas are haggling and chatting. The Library of Alexandria is visible in the background, its majestic columns gleaming white.\",\n    \"contentText\": \"Scene 1: Our story begins in Alexandria, around 250 BC.  Imagine a marketplace vibrant with life, the scent of spices thick in the air. In the distance, the grand Library of Alexandria stood as a beacon of knowledge.\"\n  },\n  {\n    \"imagePrompt\": \"A young woman, Hypatia, with long, dark hair, dressed in simple robes, stands amongst scrolls and books in a dimly lit section of the Library of Alexandria. She is focused, writing with a quill on a papyrus scroll.\",\n     \"contentText\": \"Scene 2: This is Hypatia, a brilliant mathematician and philosopher. She dedicated her life to learning and teaching within those very walls.\"\n  },\n   {\n    \"imagePrompt\": \"A group of older men, dressed in togas, are gathered around Hypatia. They are engaged in a lively intellectual debate, gesticulating with their hands. Hypatia is calmly presenting her argument.\",\n    \"contentText\": \"Scene 3:  Hypatia’s lectures were famous. She fearlessly challenged conventional wisdom and inspired countless minds with her insightful ideas.\"\n  },\n    {\n    \"imagePrompt\": \"A close-up of Hypatia's face, showing concern and perhaps a touch of fear. She is looking towards something out of frame, a sense of impending doom is subtly suggested.\",\n    \"contentText\": \"Scene 4: However, Alexandria was also a place of growing tensions, and Hypatia's progressive views made her a target.\"\n  },\n   {\n     \"imagePrompt\": \"A chaotic scene of a mob of men, some with religious symbols, attacking a woman who is clearly Hypatia. The library is in the background, burning. The scene is dramatic and filled with movement.\",\n    \"contentText\": \"Scene 5:  Tragically, her story ends with a violent mob silencing her forever. The Library, once a sanctuary of knowledge, was caught in the turmoil.\"\n   },\n   {\n     \"imagePrompt\": \"A single, smoldering scroll lies amidst the debris of a fire. Smoke rises against the backdrop of the ruins of the Library of Alexandria. The scene is desolate and sombre.\",\n    \"contentText\": \"Scene 6: Hypatia's story is a powerful reminder of the fragility of knowledge and the dangers of intolerance. It’s a story worth remembering.\"\n   }\n]\n```\n"},
          ],
        },
      ],
    });
  
 
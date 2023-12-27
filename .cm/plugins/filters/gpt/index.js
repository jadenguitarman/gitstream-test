module.exports = {
  async: true,
  filter: async (context, prompt, callback) => {
    const OPENAI_API_KEY = "";
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions", 
      {
        body: JSON.stringify({ 
          "model": "gpt-3.5-turbo", 
          "messages": [ 
            {
              "role": "system",
              "content": context
            }, 
            {
              "role": "user",
              "content": prompt
            }
          ]
        }),
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        method: "POST"
      }
    );

    const results = await response.json();

    /*
    will return something like
    {
      "id": "chatcmpl-123",
      "object": "chat.completion",
      "created": 1677652288,
      "model": "gpt-3.5-turbo-0613",
      "system_fingerprint": "fp_44709d6fcb",
      "choices": [{
        "index": 0,
        "message": {
          "role": "assistant",
          "content": "Hello there, how may I assist you today?",
        },
        "logprobs": null,
        "finish_reason": "stop"
      }],
      "usage": {
        "prompt_tokens": 9,
        "completion_tokens": 12,
        "total_tokens": 21
      }
    }
    */
    return results.choices.length > 0
      ? callback(null, results.choices[0].message.content)
      : callback("No response, "");
  }
}

module.exports = {
  async: true,
  filter: async (title, description, callback) => {
    return callback(null, 
`- [ ] **Documentation Clarity:** Ensure the README is not overly crowded and consider moving detailed examples to the wiki.
- [ ] **Wiki Update:** Confirm that the example has been added to the wiki, specifically under the \`agentTools\` section.
- [ ] **Link in README:** Verify that the README now includes a link to the new example in the wiki under the appropriate section.
- [ ] **Collaboration Invitation:** Respond to the user expressing interest in contributing and provide guidance on how to get involved.
- [ ] **Code Correction:** Address the missing import statement in the wiki.
- [ ] **Review and Merge:** Perform a final review and merge the pull request if everything is in order.`)

    /*
    const OPENAI_API_KEY = "";
    
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions", 
      {
        body: JSON.stringify({ 
          "model": "gpt-3.5-turbo", 
          "messages": [ 
            {
              "role": "user",
              "content": `The following is information about a pull request:

Title: ${title}
Description: ${description}
Comments: 
  ${comments.map(x => x.content).join("\n\t")}

Please write a very brief Slack message of less than three sentences with no introduction or subject asking the recipient to review this PR. Include a short description. Don't mention the recipient's name.`
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
    */
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
      ? callback(null, results.choices[0].message.content + " - See " + prurl)
      : callback("No response", "");
  }
}

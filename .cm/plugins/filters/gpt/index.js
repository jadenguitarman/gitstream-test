module.exports = {
  async: true,
  filter: async (_, callback) => {
    console.log("in gpt");
    return callback(null, 
`- [ ] **Documentation Clarity:** Ensure the README is not overly crowded and consider moving detailed examples to the wiki.
- [ ] **Wiki Update:** Confirm that the example has been added to the wiki, specifically under the \`agentTools\` section."
- [ ] **Link in README:** Verify that the README now includes a link to the new example in the wiki under the appropriate section.
- [ ] **Collaboration Invitation:** Respond to the user expressing interest in contributing and provide guidance on how to get involved.
- [ ] **Code Correction:** Address the missing import statement in the wiki.
- [ ] **Review and Merge:** Perform a final review and merge the pull request if everything is in order.`)
  }
}

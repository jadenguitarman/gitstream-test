/*
- @module summarizeUnitTests
- @description Provide a summary of the unit tests contained in a PR.
- This is useful if you want gitStream to post summary comments.
- @param {Object} Input - Accepts the output of source.diff.files
- @param {String} testsDirectory - The directory that contains unit tests
- @param {String} testsExtension - The extension used by the unit test framework.
- @param {List[String]} fileTypes - A list of file types to check for tests.
- @returns {string} - A summary of the unit tests in markdown format
- @example {{ source.diff.files | summarizeUnitTests(testsDirectory=testsDirectory, testsExtension=testsExtension, requiredTestExtension=".js" ) }}
- @license MIT
*/

const commentLine = (filename, content) => `<details>
<summary>${filename}</summary>

\`\`\`
${content}
\`\`\`
</details>`;

const summarizeUnitTests = async (files, keywords, callback) => {
	/*
	Post a comment that summarizes the updates to unit tests.
	
	The posted comment includes:
	Total number of new test files and updates to existing test files.
	A list of the new test files with an expandable box containing the complete code.
	A list of updated code files in the PR with indicators to show if there is a corresponding unit test
	
	Notes:
	In the automation, create testsDirectory expression and testsExtension. If the PR modifies either of these, it should trigger
	Source.diff.files
	If the value in new_file ends in testsExtension AND the value for original_file is null, the file is a new test
	If the value in new_file ends in testsExtension AND the value for original_file contains a string, the file is an updated test
	If the value in new_file ends in one of the values specified in fileTypes, it should be checked against the list of new tests to determine if an update exists in the PR.
	*/
	console.log("\n\n")
	console.log("Files")
	console.log(files)
	console.log("Keywords")
	console.log(keywords)
	console.log("\n\n")
	/*
	Files
	[
	  {
	    original_file: 'README.md',
	    new_file: 'README.md',
	    diff: '@@ -1,2 +1,2 @@\n # gitstream-test\n-1\n+2',
	    original_content: '# gitstream-test\n1\n',
	    new_content: '# gitstream-test\n2\n'
	  }
	]
	Keywords
	{
	  testsDirectory: '/tests',
	  testsExtension: '.test.js',
	  __keywords: true
	}
 	*/
	
	const affectedFiles = files.filter(file => 
		file.original_file.startsWith(keywords.testsDirectory)
		|| file.new_file.startsWith(keywords.testsDirectory)
		|| file.original_file.endsWith(keywords.testsExtension)
		|| file.new_file.endsWith(keywords.testsExtension)
	);
	if (affectedFiles.length == 0) return callback(null, "Nothing"); // no tests have been added or modified

	let testFileLines = {
		New: [],
		Updated: [],
		Renamed: []
	};
	affectedFiles.forEach(file => {
		const line = commentLine(file.new_file, file.new_content);
		if (file.new_file == file.original_file) testFileLines.Updated.push(line);
		else if (!file.original_file) testFileLines.New.push(line);
		else testFileLines.Renamed.push(line);
	});

	let comment = `## Changes to tests
Below are all the changes that this PR made to identifiable tests.

${
	Object
		.entries(testFileLines)
		.map(([type, arr]) => arr.length
			? [`### ${type} Tests - ${arr.length}`, ...arr].join("\n\n")
			: ""
		)
		.filter(section => !!section) // filter out empty sections
		.join("\n\n\n")
}`;
	console.log(comment)
	
	return callback(
		null, 
		JSON.stringify(comment)
	);
};

module.exports = {
	async: true,
	filter: summarizeUnitTests
}

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

const summarizeUnitTests = async (files, testsDirectory, testsExtension, fileTypes, callback) => {
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
  console.log("Tests Directory")
  console.log(testsDirectory)
  console.log("Tests Extension")
  console.log(testsExtension)
  console.log("File Types")
  console.log(fileTypes)
  console.log("\n\n")
	
	return callback(
		null, 
		JSON.stringify(comment)
	);
};

module.exports = {
	async: true,
	filter: summarizeUnitTests
}

module.exports = {
	async: true,
	filter: async (branch, files, pr, repo, callback) => {
		// Now that we have all the needed data here, we can use it to build our checklist

    console.log("Branch")
    console.log(branch)
    console.log("Files")
    console.log(files)
    console.log("PR")
    console.log(pr)
    console.log("Repo")
    console.log(repo)
		
		return callback(null, "");
	}
}

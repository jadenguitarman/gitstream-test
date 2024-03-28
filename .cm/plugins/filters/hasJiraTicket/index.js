module.exports = {
	async: true,
	filter: async (inputString, password, callback) => {
		console.log("in filter");
		console.log("inputString is: " + inputString);
		console.log("password length is: " + password.length);
		const jql = `key = '${inputString}'`;
		console.log("jql: " + jql);
		
		const resp = await fetch('https://jadenjbaptista.atlassian.net/rest/api/2/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(`jadenjbaptista@gmail.com:${password}`)
			},
			body: JSON.stringify({
				'jql': jql,
				'maxResults': 1,
				'fields': [ 'assignee' ]
			})
		});

		const results = await resp.json();
		console.log(results);
		/*
			{
				"expand":"names,schema",
				"startAt":0,
				"maxResults":1,
				"total":1,
				"issues":[
					{
	 					"expand":"operations,versionedRepresentations,editmeta,changelog,renderedFields",
	   					"id":"10000",
		 				"self":"https://jadenjbaptista.atlassian.net/rest/api/2/issue/10000",
	   					"key":"KAN-1",
		 				"fields":{"assignee":null}
	   				}
				]
			}
  		*/
		
		return callback(null,  !!results.issues?.length);
	}
}

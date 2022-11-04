async function fetch_data() {
	let branchUrl = window.location.protocol + "//" + window.location.hostname + ":8081/";
	console.log("Sending branch requests to " + branchUrl);

	const joblist_response = await fetch(branchUrl + '?get=joblist');
	const json_joblist_response = await jQuery.parseJSON(joblist_response);

	pkg_list = Array();

	console.log(json_joblist_response.payload);
}
fetch_data();
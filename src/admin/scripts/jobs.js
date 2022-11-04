async function fetch_data() {
	let branchUrl = window.location.protocol + "//" + window.location.hostname + ":8081/";
	console.log("Sending branch requests to " + branchUrl);

	console.log("Fetching joblist from branch..");
    wr = new WebResponse(branchUrl + '?get=joblist');
    await wr.fetch_data();

    if(wr.status != "SUCCESS") {
        alert("Failure while attempting to fetch list.");
        return;
    }

	pkg_list = Array();

	const joblist = wr.payload;

	console.log(joblist.queued_jobs.length + " queued jobs");

	for (let i = 0; i < joblist.queued_jobs.length; i++) {
		row = document.createElement("tr");

		var pkgname = document.createElement("td");
        text = document.createTextNode(joblist.queued_jobs[i].build_pkg_name);
        pkgname.append(text);

		row.append(pkgname);

		document.getElementById("table_data").appendChild(row);
	}
}
fetch_data();
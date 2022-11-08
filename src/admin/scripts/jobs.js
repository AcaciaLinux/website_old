function createRow(curJob, view_log){
	let row = document.createElement("tr");

	var pkgname = document.createElement("td");
	text = document.createTextNode(curJob.build_pkg_name);
	pkgname.append(text);

	var jobID = document.createElement("td");
	text = document.createTextNode(curJob.job_id);
	jobID.append(text);

	var requester = document.createElement("td");
	requester.classList.add("jb_requester");
	text = document.createTextNode(curJob.requesting_client);
	requester.append(text);

	var status = document.createElement("td");
	status.classList.add("jb_status");
	text = document.createTextNode(curJob.job_status);
	status.append(text);

	var td_log;
	if (view_log){
		td_log = document.createElement("td");
		a_log = document.createElement("a");
		a_log.setAttribute("href", "javascript:f_viewLog(\"" + curJob.job_id + "\");");
        text = document.createTextNode("View Log");
        a_log.appendChild(text);
		td_log.append(a_log);
	} else {
		td_log = document.createElement("td");
		text = document.createTextNode("-");
		td_log.append(text);
	}
	td_log.classList.add("jb_log");
	

	row.append(pkgname);
	row.append(jobID);
	row.append(requester);
	row.append(status);
	row.append(td_log);

	return row
}

function createBreakerRow(text){
	let row = document.createElement("tr");

	var breaker = document.createElement("td");
	breaker.setAttribute("colspan", "5");
	var breakerHeader = document.createElement("h3");
	text = document.createTextNode(text);
	breakerHeader.append(text);
	breaker.append(breakerHeader);

	row.append(breaker);

	return row;
}

async function fetch_data() {
	let branchUrl = getBranchAPIURL();
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
	document.getElementById("jobs_data").appendChild(createBreakerRow("Queued Jobs (" + joblist.queued_jobs.length + ")"));
	for (let i = 0; i < joblist.queued_jobs.length; i++) {
		var curJob = joblist.queued_jobs[i];
		document.getElementById("jobs_data").appendChild(createRow(curJob, false));
	}

	console.log(joblist.running_jobs.length + " running jobs");
	document.getElementById("jobs_data").appendChild(createBreakerRow("Running Jobs (" + joblist.running_jobs.length + ")"));
	for (let i = 0; i < joblist.running_jobs.length; i++) {
		var curJob = joblist.running_jobs[i];
		document.getElementById("jobs_data").appendChild(createRow(curJob, false));
	}

	console.log(joblist.completed_jobs.length + " completed jobs");
	document.getElementById("jobs_data").appendChild(createBreakerRow("Completed Jobs (" + joblist.completed_jobs.length + ")"));
	for (let i = 0; i < joblist.completed_jobs.length; i++) {
		var curJob = joblist.completed_jobs[i];
		document.getElementById("jobs_data").appendChild(createRow(curJob, true));
	}
}

async function f_viewLog(jobID){
	console.log("Displaying Log for jobID " + jobID);
	log = await branch_get_log(jobID);

	//If we have no log to show, error out
	if (log.status != "SUCCESS"){
		return;
	}

	//Convert the array of lines to a string with <br> as newline
	var logString = ""
	log.payload.forEach(function(line){
		console.debug("line: '" + line + "'");
		logString += line + " <br> ";
	});

	//Set the content and title for the modal dialog
	$("#staticBackdropLabel").text("Build log for " + jobID)
	$('<p>' + logString + '</p>').appendTo("#modal_body");

	//Create a new instance of the modal dialog and show it
	var modal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
		keyboard: false
	});
	modal.show();
}

fetch_data();
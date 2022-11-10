async function branch_submit_pkgbuild(pkgbuild){
	return WebResponse.from_string(await $.post(getBranchAPIURL() + "submitpackagebuild", {
		authkey: cur_authkey,
		packagebuild: pkgbuild},
		function(plain_res){
			const res = jQuery.parseJSON(plain_res);

			if(res.status != "SUCCESS") {
				alert("Failed to submit package build: " + res.payload);
				return;
			}
	}));
}

async function branch_crossbuild(pkgname){
	return WebResponse.from_string(await $.post(getBranchAPIURL() + "crossbuild", {
		authkey: cur_authkey,
		pkgname: pkgname},
		function(plain_res){
			const res = jQuery.parseJSON(plain_res);

			if(res.status != "SUCCESS") {
				alert("Failed to submit package build: " + res.payload);
				return;
			}
	}));
}

async function branch_clear_completed_jobs(){
	return WebResponse.from_string(await $.post(getBranchAPIURL() + "clearcompletedjobs", {
		authkey: cur_authkey},
		function(plain_res){
			const res = jQuery.parseJSON(plain_res);

			if(res.status != "SUCCESS") {
				alert("Failed to clear completed jobs: " + res.payload);
				return;
			}
	}));
}

async function branch_releasebuild(pkgname){
	return WebResponse.from_string(await $.post(getBranchAPIURL() + "releasebuild", {
		authkey: cur_authkey,
		pkgname: pkgname},
		function(plain_res){
			const res = jQuery.parseJSON(plain_res);

			if(res.status != "SUCCESS") {
				alert("Failed to submit package build: " + res.payload);
				return;
			}
	}));
}

async function branch_get_log(jobID){
	return WebResponse.from_string(await $.post(getBranchAPIURL() + "viewlog", {
		authkey: cur_authkey,
		jobid: jobID},
		function(plain_res){
			res = WebResponse.from_string(plain_res);

			if(res.status != "SUCCESS") {
				alert("Failed to get build log: " + res.payload);
				console.error("Failed to retrieve build log: " + res.payload);
				return;
			}
	}));
}

async function branch_check_auth(){
	let oldkey = getCookie("branch_authkey");
	if (oldkey){
		console.debug("Checking saved authkey: " + oldkey)
	} else {
		console.debug("No previous authkey");
		cur_authkey = "";
	}

	await $.post(getBranchAPIURL() + "checkauth", {
		authkey: oldkey},
		function(plain_res){
			const res = jQuery.parseJSON(plain_res);

			if(res.status == "SUCCESS") {
				console.debug("Reusing old authkey, still valid");
				cur_authkey = oldkey;
				setCookie("branch_authkey", cur_authkey, 1);
			} else {
				console.debug("Old authkey is invalid: " + res.payload);
			}
	});

	//Inform the site abaut the changed login state
	var evt = new CustomEvent("LoginStateChanged");
	window.dispatchEvent(evt);
}

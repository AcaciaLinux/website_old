async function branch_submit_pkgbuild(pkgbuild){
	return WebResponse.from_string(await $.post(getBranchAPIURL() + "submitpackagebuild", {
		authkey: cur_authkey,
		packagebuild: pkgbuild},
		function(plain_res){
			const res = jQuery.parseJSON(plain_res);

			if(res.status != "SUCCESS") {
				branch_api_error(res.payload);
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
				branch_api_error(res.payload);
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
				branch_api_error(res.payload);
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
				branch_api_error(res.payload);
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
				branch_api_error(res.payload);
				return;
			}
	}));
}

async function branch_check_auth(){
	let oldkey = getCookie("branch_authkey");
	if (!oldkey){
		cur_authkey = "";
	}

	await $.post(getBranchAPIURL() + "checkauth", {
		authkey: oldkey},
		function(plain_res){
			const res = jQuery.parseJSON(plain_res);

			if(res.status == "SUCCESS") {
				console.debug("Reusing old authkey " + oldkey + ", still valid");
				cur_authkey = oldkey;
				setCookie("branch_authkey", cur_authkey, 1);
			} else {
				console.debug("Old authkey " + oldkey + " is invalid: " + res.payload);
			}
	});

	//Inform the site abaut the changed login state
	var evt = new CustomEvent("LoginStateChanged");
	window.dispatchEvent(evt);
}

async function branch_g_get_packagebuildlist(){
	w = new WebResponse(getBranchAPIURL() + "?get=packagebuildlist");
	return branch_try_fetch(w);
}

async function branch_g_get_packagelist(){
	w = new WebResponse(getBranchAPIURL() + "?get=packagelist");
	return branch_try_fetch(w);
}

async function branch_g_get_pkgbuild(pkgname){
	w = new WebResponse(getBranchAPIURL() + "?get=packagebuild&pkgname=" + pkgname);
	return branch_try_fetch(w);
}

async function branch_g_get_joblist(){
	w = new WebResponse(getBranchAPIURL() + "?get=joblist");
	return branch_try_fetch(w);
}

async function branch_g_get_clientlist(){
	w = new WebResponse(getBranchAPIURL() + "?get=clientlist");
	return branch_try_fetch(w);
}

async function branch_try_fetch(webresponse){
	await webresponse.fetch_data();

	if(webresponse.status != "SUCCESS") {
        branch_api_error(webresponse.payload);
        return null;
    }

	return webresponse.payload;
}

function branch_api_error(text){
	console.error("Branch API error: " + text);
	
	$("#modal_error_label").text("Branch API error");
	$("#modal_error_body").empty();
	$('<p>' + text + '</p>').appendTo("#modal_error_body");

	var modal = new bootstrap.Modal(document.getElementById('modal_error_bd'), {
		keyboard: true
	});
	modal.show();
}

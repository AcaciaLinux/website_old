//load overview
$(document).ready(function() {
	console.log("Editor loading started...");
	$("#pkgbuild_name").text(cur_pkgbuild);

	load_pkgbuild(cur_pkgbuild);
});

async function load_pkgbuild(pkgname){
	let branchUrl = getBranchAPIURL();
	console.log("Sending branch requests to " + branchUrl);

	console.log("Fetching packagebuild from branch..");
    wr_pkgbuild = new WebResponse(branchUrl + '?get=packagebuild&pkgname=' + pkgname);
    await wr_pkgbuild.fetch_data();
	if(wr_pkgbuild.status != "SUCCESS") {
        alert("Failure while attempting to fetch package build for " + pkgname + ": " + wr_pkgbuild.payload);
        return;
    }

	$("#ta_code").text(wr_pkgbuild.payload);
}

function submit_pkgbuild(){
	console.log("POST test");
}



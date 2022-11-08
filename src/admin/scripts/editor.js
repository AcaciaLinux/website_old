//load overview
$(document).ready(function() {
	console.log("Editor loading started...");
	$("#pkgbuild_name").text(cur_pkgbuild);
	$(".alert").hide();

	if (cur_pkgbuild == ""){
		console.log("Redirecting to select package build...");
		show_page("#btn_pb", "sites/packagebuilds.html");
		return;
	}

	check_enable_buttons();
	buttons_add_commands();
	ta_enable_tab();

	load_pkgbuild(cur_pkgbuild);
});

function check_enable_buttons(){
	$("#btn_crossbuild").prop("disabled", cur_authkey == "");
	$("#btn_releasebuild").prop("disabled", cur_authkey == "");
	$("#btn_submit").prop("disabled", cur_authkey == "");
}

function buttons_add_commands(){
	$("#btn_crossbuild").click(async function(){
		console.log("Submitting package build and making a crossbuild");
		branch_submit_pkgbuild($("#ta_code").val());
		if ((await branch_crossbuild(cur_pkgbuild)).status == "SUCCESS"){
			show_alert_done();
		}
	});
	
	$("#btn_releasebuild").click(async function(){
		console.log("Submitting package build and making a releasebuild");
		branch_submit_pkgbuild($("#ta_code").val());
		if ((await branch_releasebuild(cur_pkgbuild)).status == "SUCCESS"){
			show_alert_done();
		}
	});

	$("#btn_submit").click(async function(){
		console.log("Submitting package build...");
		if ((await branch_submit_pkgbuild($("#ta_code").val())).status == "SUCCESS"){
			show_alert_done();
		}
	});
}

function show_alert_done(){
	$("#alert-success").slideDown(200).fadeTo(3000, 500).slideUp(500);
}

function ta_enable_tab(){
	$('body').on('keydown', '#ta_code', function(e) {
		if (e.which == 9) {
			e.preventDefault();
			var start = this.selectionStart;
			var end = this.selectionEnd;
			var text = $(this).val();
			var selText = text.substring(start, end);
			$(this).val(
			  text.substring(0, start) +
			  "\t" + selText.replace(/\n/g, "\n\t") +
			  text.substring(end)
			);
			this.selectionStart = this.selectionEnd = start + 1;
		}
	});
}

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

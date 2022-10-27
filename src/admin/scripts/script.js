var all_buttons = Array()

//load overview
$(document).ready(function() {
	console.log("HELO");
	console.log("Registering button events..");
	$('#btn_overview').addClass("active");
	$('#content-div').load('sites/overview.html');
	register_button_events($("#content-div"));
});

function register_button_events() {
	all_buttons.push($("#btn_overview"));
	$("#btn_overview").click(function() {
		$("#navbar").collapse("hide");
		disable_all_active_buttons();
		$("#btn_overview").addClass("active");
		$('#content-div').load('sites/overview.html');
	});

	all_buttons.push($("#btn_pbl"));
	$("#btn_pbl").click(function() {
		disable_all_active_buttons();
		$("#btn_pbl").addClass("active");
		$('#content-div').load('sites/packagebuildlist.html');
	});

	all_buttons.push($("#btn_cl"));
	$("#btn_cl").click(function() {
		disable_all_active_buttons();
		$("#btn_cl").addClass("active");
		$('#content-div').load('sites/clientlist.html');
	});

	all_buttons.push($("#btn_jobs"));
	$("#btn_jobs").click(function() {
		disable_all_active_buttons();
		$("#btn_jobs").addClass("active");
		$('#content-div').load('sites/jobs.html');
	});
}

function disable_all_active_buttons() {
	for (let i = 0; i < all_buttons.length; i++) {
		if(all_buttons[i].hasClass("active")) {
			all_buttons[i].removeClass("active");
		}
	}
}

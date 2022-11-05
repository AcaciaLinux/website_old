var all_buttons = Array()
var cur_pkgbuild = "";

//load overview
$(document).ready(function() {
	console.log("HELO");
	console.log("Registering button events..");
	$('#btn_overview').addClass("active");
	$('#content-div').load('sites/overview.html');
	register_button_events($("#content-div"));
});

async function show_page(btn, source_file){
	$("#navbar").collapse("hide");
	disable_all_active_buttons();
	$(btn).addClass("active");
	$('#content-div').load(source_file);
}

function register_button_events() {
	all_buttons.push($("#btn_overview"));
	$("#btn_overview").click(function() {
		show_page("#btn_overview", "sites/overview.html")
	});

	all_buttons.push($("#btn_pb"));
	$("#btn_pb").click(function() {
		show_page("#btn_pb", "sites/packagebuilds.html");
	});

	all_buttons.push($("#btn_jobs"));
	$("#btn_jobs").click(function() {
		show_page("#btn_jobs", "sites/jobs.html");
	});

	all_buttons.push($("#btn_clients"));
	$("#btn_clients").click(function() {
		show_page("#btn_clients", "sites/clients.html");
	});

	all_buttons.push($("#btn_editor"));
	$("#btn_editor").click(function() {
		show_page("#btn_editor", "sites/editor.html");
	});
}

function disable_all_active_buttons() {
	for (let i = 0; i < all_buttons.length; i++) {
		if(all_buttons[i].hasClass("active")) {
			all_buttons[i].removeClass("active");
		}
	}
}

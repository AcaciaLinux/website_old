var all_buttons = Array()
var cur_pkgbuild = "";
var cur_authkey = "";

//load overview
$(document).ready(async function() {
	console.log("HELO");

	await branch_check_auth();

	console.log("Registering button events..");
	register_button_events($("#content-div"));
	show_page("#btn_overview", "sites/overview.html");
});

async function show_page(btn, source_file){
	$("#navbar").collapse("hide");
	disable_all_active_buttons();
	$(btn).addClass("active");
	$('#content-div').load(source_file);

	if (cur_authkey == ""){
		$("#btn_auth").text("Login");
	} else {
		$("#btn_auth").text("Logout");
	}
}

function register_button_events() {
	all_buttons.push($("#btn_overview"));
	$("#btn_overview").click(function() {
		show_page("#btn_overview", "sites/overview.html");
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

	all_buttons.push($("#btn_auth"));
	$("#btn_auth").click(function() {
		if (cur_authkey == ""){
			show_page("#btn_auth", "sites/login.html");
		} else {
			$.post(getBranchAPIURL() + "logoff", {
				authkey: cur_authkey
			},
				function(plain_res){
					const res = jQuery.parseJSON(plain_res);
	
					if(res.status != "SUCCESS") {
						alert("Failure while attempting to log off: " + res.payload);
						return;
					}
	
					cur_authkey = "";
					rmCookie("branch_authkey");
					show_page("#btn_overview", "sites/overview.html");
			});
		}
	});
}

function disable_all_active_buttons() {
	for (let i = 0; i < all_buttons.length; i++) {
		if(all_buttons[i].hasClass("active")) {
			all_buttons[i].removeClass("active");
		}
	}
}



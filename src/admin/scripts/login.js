
$(document).ready(function(){

	$("#loginform").on("submit", function(eventObj){
		eventObj.preventDefault();

		userD = $("#username").val();
		passD = $("#password").val();

		$.post(getBranchAPIURL() + "auth", {
			user: userD,
			pass: passD},
			function(plain_res){
				const res = jQuery.parseJSON(plain_res);

				if(res.status != "SUCCESS") {
					alert("Failure while attempting to log in: " + res.payload);
					return;
				}

				cur_authkey = res.payload;
				setCookie("branch_authkey", cur_authkey, 1);
				console.debug("New authkey: " + cur_authkey);
				show_page("#btn_overview", "sites/overview.html");
		});
	});

});

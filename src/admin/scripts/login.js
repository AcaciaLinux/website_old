async function f_login(){
	userD = $("#username").val();
	passD = $("#password").val();

	await $.post(getBranchAPIURL() + "auth", {
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
	});
	$("#modal_login_bd").modal("hide");
	var evt = new CustomEvent("LoginStateChanged");
	window.dispatchEvent(evt);
	update_login();
}

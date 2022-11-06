
$(document).ready(function(){

	$("#loginform").on("submit", function(eventObj){
		eventObj.preventDefault();
		var htmlFormValues= $(this).serialize();
		console.log(htmlFormValues);
		//var submitAction = $(this).attr("action");
		$.post(getBranchAPIURL() + "/auth", htmlFormValues, function(formData){
			//$("#formResult").html(formData);
			console.log(formData);
		});
	});

});

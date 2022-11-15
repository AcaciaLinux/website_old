function createRow(clientName){
	let row = document.createElement("tr");

	var cName = document.createElement("td");
	text = document.createTextNode(clientName);
	cName.append(text);

	row.append(cName);

	return row;
}

function createBreakerRow(text){
	let row = document.createElement("tr");

	var breaker = document.createElement("td");
	breaker.setAttribute("colspan", "1");
	var breakerHeader = document.createElement("h3");
	text = document.createTextNode(text);
	breakerHeader.append(text);
	breaker.append(breakerHeader);

	row.append(breaker);

	return row;
}

async function fetch_data() {
	const clientList = await branch_g_get_clientlist();
	if (clientList == null){
		return;
	}

	console.log(clientList.controllers.length + " controller clients");
	document.getElementById("clients_data").appendChild(createBreakerRow("Controllers (" + clientList.controllers.length + ")"));
	for (let i = 0; i < clientList.controllers.length; i++) {
		var curClient = clientList.controllers[i];
		document.getElementById("clients_data").appendChild(createRow(curClient));
	}

	console.log(clientList.buildbots.length + " buildbot clients");
	document.getElementById("clients_data").appendChild(createBreakerRow("Buildbots (" + clientList.buildbots.length + ")"));
	for (let i = 0; i < clientList.buildbots.length; i++) {
		var curClient = clientList.buildbots[i];
		document.getElementById("clients_data").appendChild(createRow(curClient));
	}
}

fetch_data();
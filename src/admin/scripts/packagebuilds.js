async function fetch_data() {
	let branchUrl = window.location.protocol + "//" + window.location.hostname + ":8081/";
	console.log("Sending branch requests to " + branchUrl);

	const pkgbuildlist_response = await fetch(branchUrl + '?get=jsonpackagebuildlist');
	const json_pkgbuildlist_response = await pkgbuildlist_response.json();
	
	const pkglist_response = await fetch(branchUrl + '?get=jsonpackagelist')
	const json_pkglist_response = await pkglist_response.json();

	console.log("Fetching jsonpackagelist from branch..");

	pkg_list = Array();
	
	for (let i = 0; i < json_pkglist_response.length; i++) {
		pkg_list.push(json_pkglist_response[i].name);
	}

	for (let i = 0; i < json_pkgbuildlist_response.length; i++) {
		row = document.createElement("tr");

		var id = document.createElement("td");
		text = document.createTextNode(i);
		id.append(text);

		var name = document.createElement("td");
		text = document.createTextNode(json_pkgbuildlist_response[i]);
		name.appendChild(text);

		var built = document.createElement("td");
		text = null;

		if(pkg_list.includes(json_pkgbuildlist_response[i])) {
			text = document.createTextNode("true");
		} else {
			text = document.createTextNode("false");
		}

		built.appendChild(text);
		row.append(id);
		row.appendChild(name);
		row.appendChild(built);

		document.getElementById("table_data").appendChild(row);
	}
}
fetch_data();
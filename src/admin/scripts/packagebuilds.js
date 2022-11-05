async function fetch_data() {
	let branchUrl = window.location.protocol + "//" + window.location.hostname + ":8081/";
	console.log("Sending branch requests to " + branchUrl);

	console.log("Fetching packagebuildlist from branch..");
    wr_pkgbuildlist = new WebResponse(branchUrl + '?get=jsonpackagebuildlist');
    await wr_pkgbuildlist.fetch_data();
	if(wr_pkgbuildlist.status != "SUCCESS") {
        alert("Failure while attempting to fetch list.");
        return;
    }

	console.log("Fetching packaglist from branch..");
    wr_pkglist = new WebResponse(branchUrl + '?get=jsonpackagelist');
    await wr_pkglist.fetch_data();
	if(wr_pkglist.status != "SUCCESS") {
        alert("Failure while attempting to fetch list.");
        return;
    }

	pkg_list = Array();

	const packagebuildlist = wr_pkgbuildlist.payload;
	const packagelist = wr_pkglist.payload;
	pkglist = Array();
    for (let i = 0; i < packagelist.length; i++) {
        pkglist.push(packagelist[i].name);
    }

	console.log(packagebuildlist.length + " package builds");
	console.log(packagelist.length + " packages");

	for (let i = 0; i < packagebuildlist.length; i++) {
		row = document.createElement("tr");

		var pkgname = document.createElement("td");
        text = document.createTextNode(packagebuildlist[i]);
        pkgname.append(text);

		var curversion = document.createElement("td");
		curversion.classList.add("pb_curversion");
		if(pkglist.includes(packagebuildlist[i])) {
			index = pkglist.indexOf(packagebuildlist[i])
            text = document.createTextNode(packagelist[index].version);
        } else {
            text = document.createTextNode("-");
        }
		curversion.append(text);

		var currelversion = document.createElement("td");
		currelversion.classList.add("pb_currelversion");
		if(pkglist.includes(packagebuildlist[i])) {
			index = pkglist.indexOf(packagebuildlist[i])
            text = document.createTextNode(packagelist[index].real_version);
        } else {
            text = document.createTextNode("-");
        }
		currelversion.append(text);

		bt_edit = document.createElement("td");
		a_edit = document.createElement("a");
		a_edit.setAttribute("href", "https://google.de/");
        text = document.createTextNode("Edit");
        a_edit.appendChild(text);
		bt_edit.appendChild(a_edit);

		row.append(pkgname);
		row.append(curversion);
		row.append(currelversion);
		row.append(bt_edit);

		document.getElementById("table_data").appendChild(row);
	}
}
fetch_data();
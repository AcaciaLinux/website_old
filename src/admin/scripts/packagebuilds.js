async function fetch_data() {
	let branchUrl = window.location.protocol + "//" + window.location.hostname + ":8081/";
	console.log("Sending branch requests to " + branchUrl);

	console.log("Fetching packagebuildlist from branch..");
    wr = new WebResponse(branchUrl + '?get=jsonpackagebuildlist');
    await wr.fetch_data();

    if(wr.status != "SUCCESS") {
        alert("Failure while attempting to fetch list.");
        return;
    }

	pkg_list = Array();

	const packagebuildlist = wr.payload;

	console.log(packagebuildlist.length + " package builds");

	for (let i = 0; i < packagebuildlist.length; i++) {
		row = document.createElement("tr");

		var pkgname = document.createElement("td");
        text = document.createTextNode(packagebuildlist[i]);
        pkgname.append(text);

		var curversion = document.createElement("td");
		text = document.createTextNode("---");
		curversion.append(text);

		bt_edit = document.createElement("td");
		a_edit = document.createElement("a");
		a_edit.setAttribute("href", "https://google.de/");
        text = document.createTextNode("Edit");
        a_edit.appendChild(text);
		bt_edit.appendChild(a_edit);

		row.append(pkgname);
		row.append(curversion);
		row.append(bt_edit);

		document.getElementById("table_data").appendChild(row);
	}
}
fetch_data();
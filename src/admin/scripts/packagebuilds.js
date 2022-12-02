async function fetch_data() {
	//Fetch packagebuildlist	
	const packagebuildlist = await branch_g_get_packagebuildlist();
	if (packagebuildlist == null){
		return;
	}

	//Fetch packagelist
	const packagelist = await branch_g_get_packagelist();
	if (packagelist == null){
		return;
	}

	$(".rm-update").remove();

	pkglist = Array();
    for (let i = 0; i < packagelist.length; i++) {
        pkglist.push(packagelist[i].name);
    }

	console.log(packagebuildlist.length + " package builds");
	console.log(packagelist.length + " packages");

	for (let i = 0; i < packagebuildlist.length; i++) {
		row = document.createElement("tr");
		row.classList.add("rm-update");

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
		a_edit.setAttribute("href", "javascript:f_edit(\"" + packagebuildlist[i] + "\");");
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

function f_edit(str){
	cur_pkgbuild = str;
	show_page("#btn_editor", "sites/editor.html");
}

fetch_data();
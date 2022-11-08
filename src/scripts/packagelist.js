async function fetch_data() {
    console.log("Fetching jsonpackagelist from branch..");
    wr = new WebResponse(getBranchAPIURL() + '?get=packagelist');
    await wr.fetch_data();

    if(wr.status != "SUCCESS") {
        alert("Failure while attempting to fetch list.");
        return;
    }

    pkglist = wr.payload;

    for (let i = 0; i < pkglist.length; i++) {
        row = document.createElement("tr");

        var id = document.createElement("td");
        text = document.createTextNode(i);
        id.append(text);

        var name = document.createElement("td");
        text = document.createTextNode(pkglist[i].name);
        name.appendChild(text);

        var real_version = document.createElement("td");
        text = document.createTextNode(pkglist[i].real_version);
        real_version.appendChild(text);

        var version = document.createElement("td");
        text = document.createTextNode(pkglist[i].version);
        version.appendChild(text);

        var description = document.createElement("td");
        text = document.createTextNode(pkglist[i].description);
        description.appendChild(text);
        
        var dependencies = document.createElement("td");
        text = document.createTextNode(pkglist[i].dependencies);
        dependencies.appendChild(text);

        dl_link = document.createElement("a");
		dl_link.setAttribute("href", "https://api.acacialinux.org/?get=package&pkgname=" + pkglist[i].name);
        text = document.createTextNode("Download");
        dl_link.appendChild(text);

        row.append(id);
        row.appendChild(name);
        row.appendChild(real_version);
        row.appendChild(version);
        row.appendChild(description);
        row.appendChild(dependencies);
        row.appendChild(dl_link);

        document.getElementById("table_data").appendChild(row);
    }
}

// this function fetches a file by redirecting an iframe to it
function fetch_file(id, pkgname) 
{
    var ifrm = document.getElementById(id);
    ifrm.src = "?get=" + path;
}

//main:
fetch_data();
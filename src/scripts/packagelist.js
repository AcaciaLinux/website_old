async function fetch_data() {
    console.log("Fetching jsonpackagelist from branch..");
    wr = new WebResponse(getBranchAPIURL());
    await wr.fetch_data();

    if(wr.status != "SUCCESS") {
        alert("Failure while attempting to fetch list.");
        return;
    }

    pkglist = JSON.parse(wr.payload);

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

        //var url = document.createElement("td");
        //text = document.createTextNode(pkglist[i].url);
        //url.appendChild(text);

        button = document.createElement("button");
        //href="#" role="button"

        button.setAttribute("type", "button")
        button.setAttribute("href", "https://google.de/");
        button.classList.add("btn");
        button.classList.add("btn-link")
        text = document.createTextNode("Download");
        button.appendChild(text);

        row.append(id);
        row.appendChild(name);
        row.appendChild(real_version);
        row.appendChild(version);
        row.appendChild(description);
        row.appendChild(dependencies);
        row.appendChild(button);

        document.getElementById("table_data").appendChild(row);
    }
}

//main:
fetch_data();
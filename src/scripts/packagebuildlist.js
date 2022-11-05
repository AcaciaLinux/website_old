async function fetch_data() {
    console.log("Fetching jsonpackagelist from branch..");
    wr = new WebResponse(getBranchAPIURL());
    await wr.fetch_data();

    if(wr.status != "SUCCESS") {
        alert("Failure while attempting to fetch data.");
        return;
    }

    jpkglist = JSON.parse(wr.payload);
    pkglist = Array();
    for (let i = 0; i < jpkglist.length; i++) {
        pkglist.push(jpkglist[i].name);
    }

    wr = new WebResponse(getBranchAPIURL());
    await wr.fetch_data();

    if(wr.status != "SUCCESS") {
        alert("Failure while attempting to fetch data.");
        return;
    }

    jpkgbuildlist = JSON.parse(wr.payload);

    for (let i = 0; i < jpkgbuildlist.length; i++) {
        row = document.createElement("tr");

        var id = document.createElement("td");
        text = document.createTextNode(i);
        id.append(text);

        var name = document.createElement("td");
        text = document.createTextNode(jpkgbuildlist[i].name);
        name.appendChild(text);

        var built = document.createElement("td");
        text = null;

        if(pkglist.includes(jpkgbuildlist[i].name)) {
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
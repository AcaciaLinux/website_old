async function fetch_data() {
    console.log("Fetching packagelist from branch..");
    wr = new WebResponse(getBranchAPIURL() + '?get=packagelist');
    await wr.fetch_data();

    if(wr.status != "SUCCESS") {
        alert("Failure while attempting to fetch data.");
        return;
    }


    pkglist = Array();

    for(let i = 0; i < wr.payload.length; i++) {
        pkglist.push(wr.payload[i].name);
    }

    console.log(pkglist);

    wr = new WebResponse(getBranchAPIURL() + '?get=packagebuildlist');
    await wr.fetch_data();

    if(wr.status != "SUCCESS") {
        alert("Failure while attempting to fetch data.");
        return;
    }

    pkgbuildlist = wr.payload;
    console.log("Fetching packagebuildlist from branch..");
    console.log(pkgbuildlist);


    for (let i = 0; i < pkgbuildlist.length; i++) {
        row = document.createElement("tr");

        var id = document.createElement("td");
        text = document.createTextNode(i);
        id.append(text);

        var name = document.createElement("td");
        text = document.createTextNode(pkgbuildlist[i]);
        name.appendChild(text);

        var built = document.createElement("td");
        text = null;

        if(pkglist.includes(pkgbuildlist[i])) {
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
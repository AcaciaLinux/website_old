class WebResponse {
    
    constructor(endpoint_url) {
        this.endpoint_url = endpoint_url;
    }
    
    getStatus() {
        return this.status;
    }

    getPayload() {
        return this.payload;
    }

    getResponseCode() {
        return this.response_code;
    }

    static from_string(string) {
        var resp = new WebResponse("");        
        var json_string = jQuery.parseJSON(string);

        resp.status = json_string["status"];
        resp.response_code = json_string["response_code"];
        resp.payload = json_string["payload"]; 

        return resp;
    }

    async fetch_data() {
        console.debug("[WebRequest] Sending request: \"" + this.endpoint_url + "\"");
        const webresponse = await fetch(this.endpoint_url);
        const json_webresp = await webresponse.json();

        this.status = json_webresp["status"];
        this.response_code = json_webresp["response_code"];
        this.payload = json_webresp["payload"];  
        console.debug("[WebRequest] Return status: " + this.status);
    }

}
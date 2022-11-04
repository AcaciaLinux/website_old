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

    async fetch_data() {
        const webresponse = await fetch(this.endpoint_url);
        const json_webresp = await webresponse.json();

        this.status = json_webresp["status"];
        this.response_code = json_webresp["response_code"];
        this.payload = json_webresp["payload"];  
    }

}
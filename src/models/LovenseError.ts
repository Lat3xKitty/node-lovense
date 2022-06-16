var LovenseErrorMessage = {
    // "0": "Custom Error please see message",
    "400": "Invalid Command",
    "401": "Toy Not Found",
    "402": "Toy Not Connected",
    "403": "Toy Doesn't Support This Command",
    "404": "Toy Parameter",
    "500": "HTTP Server not started or disabled",
    "506": "Server Error. Restart Lovense Connect",
};

class LovenseError {
    status: Number;
    message: String;
    content?: Object;

    constructor(arg) {
        this.status = arg.status;
        this.content = arg.content;
        this.message = arg.message || "Unknown Error provided from Lovense";

        if (this.status !== 0 &&this.status.toString() in LovenseErrorMessage) {
            this.message = LovenseErrorMessage[this.status.toString()];
        }
    }
}


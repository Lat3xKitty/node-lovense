import { FetchError, Response } from "node-fetch";

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch.apply(null, args));

class Lovense {
    /** Method in which we are connecting to Lovense Servers */
    connectionType: LovenseConnectionType;

    /** Connection Port needed for Local API access */
    localConnectPort: Number = 30010;

    /** Local Domain */
    localDomain: String;

    /** What platform is the connection running on? */
    platform: String;

    /** Cache of the Lovense Toys. Information in here may not be correct and shouldn't be used. */
    _toysCache: LovenseToy[];

    /**
     * Get the Connection Type
     * @param connectionType The type of connection we are using. (Do not provide if you would like for PC & Mobile to be Tested automatically by default)
     */
    constructor(connectionType: LovenseConnectionType = LovenseConnectionType.CONNECTION_TYPE_NONE) {
        this.connectionType = connectionType;

        switch (this.connectionType) {
            case LovenseConnectionType.CONNECTION_TYPE_NONE:
                // Test PC connection
                // Test Mobile Connection
                // Error
                break;
        }
    }

    /**
     * Get's all of the Lovense Toys from Lovense Servers
     * @returns {LovenseToy[]} Returns an array of Lovense Toys.
     */
    fetchToys(): Promise<LovenseToy[]> {
        return new Promise<LovenseToy[]>(async (resolve, reject) => {

            var response = await this.executeCommand(
                new LovenseCommand ({
                        command: "GetToys"
                })
            );

            var toys: LovenseToy[] = [];
            if (response.data && response.data.toys) {
                if (typeof response.data.toys === "string") {
                    toys = JSON.parse(response.data.toys);
                }
            }
            else if (response.data && typeof response.data === "object") {
                toys = <LovenseToy[]>response.data.toys;
                this._toysCache = toys;
            }
            else {
                reject(new LovenseError({
                    content: response,
                    status: 0,
                    message: "No Toys Found"
                }));
            }

            this._toysCache = toys;
            resolve(toys);
        });
    }

    /**
     * Get all data of the Lovense toys from the cache.
     * @returns {LovenseToy[]} Returns local cache of Lovense Toys
     */
    getToys(): LovenseToy[] {
        return this._toysCache;
    };

    /**
     * Get all ONLINE Lovense Toys from the cache
     * @returns {LovenseToy[]} Returns an array of Lovense Toys
     */
    getOnlineToys(): LovenseToy[] {
        return this._toysCache.filter(toy => toy.status);
    }

    Vibrate(toy: String|LovenseToy, strength: Number, duration?: Number): Promise<void> {
        duration = duration || 0;

        if (strength > 20) { strength = 20; }
        if (strength < 0) { strength = 0; }

        return new Promise<void>(async (resolve, reject) => {
            var vibrateResponse = await this.executeCommand(new LovenseCommand({
                command: "Vibrate",
                toy: (toy instanceof LovenseToy ? toy.id : toy),
                action: "Vibrate:" + strength,
                timeSec: duration
            }));

            vibrateResponse.code === 200
                ? resolve()
                : reject(new LovenseError(vibrateResponse));
        });
    }

    setConnectCallbackData(response: LovenseQrResponse) {
        this.localDomain      = response.domain;
        this.localConnectPort = response.httpsPort;

        if (response.toys) {
            this._toysCache = response.toys;
        }
    }

    /**
     * Execute a RAW command.
     * @param command The command to be sent to the Lovense Toy.
     * @returns
     */
    async executeCommand(command: LovenseCommand): Promise<LovenseResponse>|null {
        return new Promise<LovenseResponse|null>((resolve, reject) => {

            switch (this.connectionType) {
                case LovenseConnectionType.CONNECTION_TYPE_PC:
                case LovenseConnectionType.CONNECTION_TYPE_MOBILE:
                    var response = fetch(
                        this._generateLovenseUrl(),
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(command)
                        }
                    );

                    response.then((res: Response) => {
                        res.json().then(json => {

                            if (res.status !== 200) {
                                reject(new LovenseError({
                                    content: json,
                                    status: res.status
                                }));
                            }

                            resolve(<LovenseResponse>json);
                        });
                    });
                    response.catch((err: FetchError) => {
                        // if (err.errno === "400") {}

                        // Convert to LovenseError
                        reject(err);
                    });
                    break;

                case LovenseConnectionType.CONNECTION_TYPE_QR:
                    break;

                case LovenseConnectionType.CONNECTION_TYPE_SERVER:
                    break;

            }

            return null;

        });
    }

    private _testConnection(LovenseConnectionType) {

    }

    /**
     * Generate the Correct URL Scheme for Local VS QR
     */
    private _generateLovenseUrl(): String {
        switch (this.connectionType) {
            case LovenseConnectionType.CONNECTION_TYPE_PC:
                return `https://127-0-0-1.lovense.club:${this.localConnectPort}/command`;

            case LovenseConnectionType.CONNECTION_TYPE_MOBILE:
                return `https://${this.localDomain}.lovense.club:${this.localConnectPort}/command`;

            case LovenseConnectionType.CONNECTION_TYPE_QR:
                return null;
                // Nothing

            case LovenseConnectionType.CONNECTION_TYPE_SERVER:
                return null;
                // Nothing
        }
    }

    /**
     * Convert the Object into URL encoded Parameters
     * @param params Object of parameters to be sent to the Server
     * @returns {String} String of URL encoded parameters
     */
    private _formatParams(params: LovenseCommand|Object): String {
        var retArr: String[] = [];
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                const value = params[key];

                retArr.push(
                    encodeURIComponent(key) + "=" + encodeURIComponent(value)
                );
            }
        }
        return retArr.join("&");
    }
}

export {
    Lovense as LSClient
};

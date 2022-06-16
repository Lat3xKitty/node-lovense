class LovenseQrResponse {
    /**
     * The User ID for this Response
     */
    uid: string;

    /**
     * The token to use for Authentication
     */
    utoken: string;

    /**
     * The domain to use for calling Lovense Locally
     */
    domain: string;

    /**
     * Http (Unsecure) Port to use for calling Lovense Locally
     * This is not recommended over using the `httpsPort` instead as secure connections are always better.
     */
    httpPort: number;

    /**
     * Websocket Port to use for calling Lovense Locally
     * This is not recommended over using the `wssPort` instead as secure connections are always better.
     */
    wsPort: number;

    /**
     * Https (Secure) Port to use for calling Lovense Locally
     */
    httpsPort: number;

    /**
     * Websocket (Secure) Port to use for calling Lovense Locally
     */
    wssPort:   number;

    /**
     * Platform the connection is running on
     */
    platform: LovensePlatform;

    /**
     * App version of the connection
     */
    appVersion: string;

    /**
     * Protocol version
     */
    version: number;

    toys: LovenseToy[];
}
class LovenseResponse {
    code: Number;
    data?: LovenseResponseData;
    type: String;
}

class LovenseResponseData {
    toys?: String|LovenseToy[];
    platform?: LovensePlatform;
    appType?: LovenseAppType;

    mId?: String;
    mToken?: String;
}

enum LovensePlatform {
    PC = "pc",
    iOS = "ios",
    Android = "android",
}

enum LovenseAppType {
    Connect = "connect",
    Remote = "remote"
}
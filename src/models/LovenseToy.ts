enum LovenseFeature {
    Vibrate,
    Rotate,
    Pump,

    Vibrate1,
    Vibrate2,
}

var LovenseToySupportedFunctions = {
    'calor':    LovenseFeature.Vibrate,
    'gush':     LovenseFeature.Vibrate,
    'hyphy':    LovenseFeature.Vibrate,
    'dolce':    LovenseFeature.Vibrate,
    'ambi':     LovenseFeature.Vibrate,
    'max':      LovenseFeature.Vibrate,
    'mission':  LovenseFeature.Vibrate,
    'edge':     LovenseFeature.Vibrate,
    'hush':     LovenseFeature.Vibrate,
    'lush':     LovenseFeature.Vibrate,
    'domi':     LovenseFeature.Vibrate,
    'diamo':    LovenseFeature.Vibrate,
    'osci':     LovenseFeature.Vibrate,
    'ferri':    LovenseFeature.Vibrate,
    'nora':     LovenseFeature.Vibrate,
    'exomoon':  LovenseFeature.Vibrate,
}


class LovenseToy {
    constructor(init?: Partial<LovenseToy>) {
        Object.assign(this, init);


    }

    nickname: String;
    name: String;
    id: String;
    status: Number;

    features: LovenseFeature;
}



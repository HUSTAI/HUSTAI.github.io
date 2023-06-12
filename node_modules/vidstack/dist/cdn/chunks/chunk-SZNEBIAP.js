var e={LoadFail:0,BadSignature:1,BadTimestamp:2,BadSettingValue:3,BadFormat:4,UnknownSetting:5},a=class extends Error{constructor(r){super(r.reason),this.code=r.code,this.line=r.line;}};

export { e as a, a as b };

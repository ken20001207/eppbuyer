export default class User {
    id: number;
    email: string;
    password: string;
    register_time: Date;
    deviceid: string;
    random_number: string;
    email_verified: boolean;
    email_code: string;
    email_code_pwd: string;
    enable: boolean;
    currency: string;
    expiry_time: Date;
    allow_unbind_time: Date;
    referer: string;
    remarks: string;

    constructor(data: User = emptyUserData) {
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        this.register_time = data.register_time;
        this.deviceid = data.deviceid;
        this.random_number = data.random_number;
        this.email_verified = data.email_verified;
        this.email_code = data.email_code;
        this.email_code_pwd = data.email_code_pwd;
        this.enable = data.enable;
        this.currency = data.currency;
        this.expiry_time = data.expiry_time;
        this.allow_unbind_time = data.allow_unbind_time;
        this.referer = data.referer;
        this.remarks = data.remarks;
    }
}

const emptyUserData = {
    id: 0,
    email: "",
    password: "",
    register_time: new Date(),
    deviceid: "",
    random_number: "",
    email_verified: false,
    email_code: "",
    email_code_pwd: "",
    enable: false,
    currency: "",
    expiry_time: new Date(),
    allow_unbind_time: new Date(),
    referer: "",
    remarks: "",
};

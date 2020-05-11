export default class User {
    id: string;
    email: string;
    email_verified: boolean;
    expiry_time: Date;
    total: number;
    pay_times_count: number;
    last_pay_time: Date;
    last_pay_money: number;

    constructor(data: User = emptyUser) {
        this.id = data.id;
        this.email = data.email;
        this.email_verified = data.email_verified;
        this.expiry_time = new Date(data.expiry_time);
        this.total = data.total;
        this.pay_times_count = data.pay_times_count;
        this.last_pay_time = new Date(data.last_pay_time);
        this.last_pay_money = data.last_pay_money;
    }
}

const emptyUser = {
    id: "",
    email: "",
    email_verified: false,
    expiry_time: new Date(),
    total: 0,
    pay_times_count: 0,
    last_pay_time: new Date(),
    last_pay_money: 0,
};

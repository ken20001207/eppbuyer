export default class User {
    id: number;
    email: string;
    email_verified: boolean;
    expiry_time: Date;
    total: number;
    pay_times_count: number;
    last_pay_time: Date;
    last_pay_money: number;

    constructor(data: User) {
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

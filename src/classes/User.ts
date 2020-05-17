export default class User {
    email: string;
    expiry_time: Date;
    total: number;
    pay_times_count: number;
    last_pay_time: Date;
    last_pay_money: number;

    constructor(data: User = emptyUser) {
        this.email = data.email;
        this.expiry_time = new Date(data.expiry_time);
        this.total = data.total;
        this.pay_times_count = data.pay_times_count;
        this.last_pay_time = new Date(data.last_pay_time);
        this.last_pay_money = data.last_pay_money;
    }
}

const emptyUser = {
    email: "",
    expiry_time: new Date(),
    total: 0,
    pay_times_count: 0,
    last_pay_time: new Date(),
    last_pay_money: 0,
};

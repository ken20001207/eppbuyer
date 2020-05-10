export class Project {
    project_name: string;
    project_code: string;
    area_currency: string;
    local_currency: string;
    area_name: string;
    rate: number;
    item_qty: number;
    remarks: string;
    build_time: Date;

    constructor(data: Project) {
        this.project_name = data.project_name;
        this.project_code = data.project_code;
        this.area_currency = data.area_currency;
        this.local_currency = data.local_currency;
        this.area_name = data.area_name;
        this.rate = data.rate;
        this.item_qty = data.item_qty;
        this.remarks = data.remarks;
        this.build_time = new Date(data.build_time);
    }
}

/** 商品物件 */
export default class Product {
    project_name: string;
    product_id: string;
    product_name: string;
    type_name: string;
    cost: number;
    building: string;
    counter: string;
    colors: Array<string>;
    sizes: Array<string>;
    model: string;
    tags: string;
    price_order: number;
    price_online: number;
    price_batch: number;
    material: string;
    elasticity: string;
    sizemodel: string;
    strap: string;
    purchase_qty: number;
    infosize: number;
    photo_w_path: string;
    photo_o_path: string;
    comments: string;
    remarks: string;
    build_time: Date;
    update_time: Date;
    photo: string;

    constructor(data: Product_SQL) {
        this.project_name = data.project_name;
        this.product_id = data.product_id;
        this.product_name = data.product_name;
        this.type_name = data.type_name;
        this.cost = data.cost;
        this.building = data.building;
        this.counter = data.counter;
        this.colors = data.colors.split(",");
        this.sizes = data.sizes.split(",");
        this.model = data.model;
        this.tags = data.tags;
        this.price_order = data.price_order;
        this.price_online = data.price_online;
        this.price_batch = data.price_batch;
        this.material = data.material;
        this.elasticity = data.elasticity;
        this.sizes = data.sizes.split(",");
        this.sizemodel = data.sizemodel;
        this.strap = data.strap;
        this.purchase_qty = data.purchase_qty;
        this.infosize = data.infosize;
        this.photo_o_path = data.photo_o_path;
        this.photo_w_path = data.photo_w_path;
        this.comments = data.comments;
        this.remarks = data.remarks;
        this.build_time = new Date(data.build_time);
        this.update_time = new Date(data.update_time);
        this.photo = data.photo;
    }
}

/** 後端發送過來的 Product 資料 */
interface Product_SQL {
    project_name: string;
    product_id: string;
    product_name: string;
    type_name: string;
    cost: number;
    building: string;
    counter: string;
    colors: string;
    sizes: string;
    model: string;
    tags: string;
    price_order: number;
    price_online: number;
    price_batch: number;
    material: string;
    elasticity: string;
    sizemodel: string;
    strap: string;
    purchase_qty: number;
    infosize: number;
    photo_w_path: string;
    photo_o_path: string;
    comments: string;
    remarks: string;
    build_time: Date;
    update_time: Date;
    photo: string;
}

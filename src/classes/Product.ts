import store from "../store";
import ProductType from "./ProductType";

/** 商品物件 */
export default class Product {
    project_name: string;
    product_id: string;
    product_name: string;
    type_name: string;
    cost: number;
    building: string;
    counter: string;
    colors: string[];
    sizes: string[];
    model: string;
    tags: string;
    price_order: number;
    price_online: number;
    price_batch: number;
    material: string;
    elasticity: string;
    sizemodel: string;
    strap: string;
    purchase_qty: Array<{ [k: string]: string }> | undefined;
    infosize: Array<{ [k: string]: string }> | undefined;
    photo_w_path: string;
    photo_o_path: string;
    comments: string;
    remarks: string;
    build_time: Date;
    update_time: Date;

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
        this.sizemodel = data.sizemodel;
        this.strap = data.strap;
        this.photo_o_path = data.photo_o_path;
        this.photo_w_path = data.photo_w_path;
        this.comments = data.comments;
        this.remarks = data.remarks;
        this.build_time = new Date(data.build_time);
        this.update_time = new Date(data.update_time);

        const product = this;
        const type = store.getState().user.types.find((t: ProductType) => t.type_name === product.type_name);

        if (type === undefined) {
            this.infosize = undefined;
            return;
        } else {
            var tabledata: Array<{ [k: string]: string }> = [];

            if (type.type_name !== "兩件式(內外)" && type.type_name !== "套裝(衣裙)") {
                const cols = type.type_sizecolumn.split(",");

                product.sizes.map((size) => {
                    var sizeUnit: { [k: string]: string } = {};
                    sizeUnit["尺寸"] = size;
                    cols.map((col: string) => {
                        var sizedata = data.infosize.split(",").find((i) => {
                            return i.split("=")[0] === type.type_name + "-" + size + "-" + col;
                        });
                        if (sizedata === undefined) sizeUnit[col] = "";
                        else sizeUnit[col] = sizedata.split("=")[1];
                        return null;
                    });
                    tabledata.push(sizeUnit);
                    return null;
                });
                this.infosize = tabledata;
            } else {
                this.infosize = undefined;
            }
        }

        tabledata = [];

        const cols = product.sizes;

        product.colors.map((color) => {
            var sizeUnit: { [k: string]: string } = {};
            sizeUnit["顏色"] = color;
            cols.map((col) => {
                var d = data.purchase_qty.split(",").filter((i) => {
                    return i.split("=")[0] === color + "-" + col;
                })[0];
                if (d === undefined) sizeUnit[col] = "";
                else sizeUnit[col] = d.split("=")[1];
                return null;
            });
            tabledata.push(sizeUnit);
            return null;
        });
        this.purchase_qty = tabledata;
    }
}

/** 後端發送過來的 Product 資料 */
export interface Product_SQL {
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
    purchase_qty: string;
    infosize: string;
    photo_w_path: string;
    photo_o_path: string;
    comments: string;
    remarks: string;
    build_time: Date;
    update_time: Date;
}

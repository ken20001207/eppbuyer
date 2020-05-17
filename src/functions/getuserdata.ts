import Area from "../classes/Area";
import Building from "../classes/Building";
import Color from "../classes/Color";
import Currency from "../classes/Currency";
import Product from "../classes/Product";
import ProductType from "../classes/ProductType";
import { Project } from "../classes/Project";
import Size from "../classes/Size";
import User from "../classes/User";
import { UpdateProduct } from "../redux/products/actions";
import { UpdateProject } from "../redux/projects/actions";
import { SelectProject, ToggleLoadingProducts, UpdateToken } from "../redux/system/actions";
import {
    UpdateArea,
    UpdateBuilding,
    UpdateColor,
    UpdateCurrency,
    UpdateSize,
    UpdateType,
    UpdateUser,
} from "../redux/user/actions";
import store from "../store";
import getproducts, { GetProductsResponseType } from "./getproducts";
import getprojects, { GetProjectsResponseType } from "./getprojects";

/** 透過 Token 向伺服器換取 User data */
export default function getUserData(token: string) {
    return new Promise((resolve, reject) => {
        fetch("/getuserdata/index.php", {
            mode: "cors",
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((res) => {
                    const resdata = (res as unknown) as GetUserDataResponseType;
                    store.dispatch(UpdateUser(new User(resdata.userdata)));

                    resdata.areas.map((area) => {
                        store.dispatch(UpdateArea(area));
                        return null;
                    });

                    resdata.buildings.map((building) => {
                        store.dispatch(UpdateBuilding(building));
                        return null;
                    });

                    resdata.colors.map((color) => {
                        store.dispatch(UpdateColor(color));
                        return null;
                    });

                    resdata.currencies.map((currency) => {
                        store.dispatch(UpdateCurrency(currency));
                        return null;
                    });

                    resdata.types.map((type) => {
                        store.dispatch(UpdateType(type));
                        return null;
                    });

                    resdata.sizes.map((size) => {
                        store.dispatch(UpdateSize(size));
                        return null;
                    });

                    store.dispatch(UpdateToken(token));
                    getprojects(token).then((res) => {
                        if (res.status === 200) {
                            res.json().then((res) => {
                                const resdata = (res as unknown) as GetProjectsResponseType;
                                resdata.projects.map((p) => {
                                    store.dispatch(UpdateProject(new Project(p)));
                                    return null;
                                });
                                store.dispatch(SelectProject(resdata.projects[0].project_name));
                                store.dispatch(ToggleLoadingProducts());
                                getproducts(token, resdata.projects[0].project_name).then((res) => {
                                    if (res.status === 200) {
                                        res.json().then((res) => {
                                            const resdata = (res as unknown) as GetProductsResponseType;
                                            resdata.products.map((p) => {
                                                store.dispatch(UpdateProduct(new Product(p)));
                                                return null;
                                            });
                                            store.dispatch(ToggleLoadingProducts());
                                        });
                                    }
                                });
                                resolve();
                            });
                        } else {
                            reject("獲取專案清單失敗，請聯繫客服人員 (" + res.status + ")");
                        }
                    });
                });
            } else {
                reject("請重新登入");
            }
        });
    });
}

export interface GetUserDataResponseType {
    userdata: User;
    areas: Area[];
    buildings: Building[];
    currencies: Currency[];
    types: ProductType[];
    colors: Color[];
    sizes: Size[];
}

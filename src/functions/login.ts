import Cookies from "universal-cookie";
import Area from "../classes/Area";
import Building from "../classes/Building";
import Color from "../classes/Color";
import Currency from "../classes/Currency";
import ProductType from "../classes/ProductType";
import Size from "../classes/Size";
import User from "../classes/User";
import { ToggleLoadingProducts } from "../redux/system/actions";
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
import getprojects from "./getprojects";

const cookies = new Cookies();

/** 透過帳號密碼和伺服器換取 Token 與 User data */
export default function login(username: string, password: string, remember: boolean) {
    return new Promise<string>((resolve, reject) => {
        fetch("/login/index.php", {
            redirect: "follow",
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((res) => {
                    const resdata = (res as unknown) as LoginResponseType;
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

                    const token = resdata.token;
                    if (remember)
                        cookies.set("token", token, {
                            expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                        });
                    else cookies.set("token", token, { expires: new Date(Date.now() + 10 * 60 * 1000) });

                    store.dispatch(ToggleLoadingProducts());
                    getprojects().catch((err) => reject(err));
                });
            } else if (res.status === 401) {
                reject("使用者名稱或密碼錯誤");
            } else {
                reject("伺服器發生錯誤，請聯繫客服中心");
            }
        });
    });
}

export interface LoginResponseType {
    token: string;
    userdata: User;
    areas: Area[];
    buildings: Building[];
    currencies: Currency[];
    types: ProductType[];
    colors: Color[];
    sizes: Size[];
}

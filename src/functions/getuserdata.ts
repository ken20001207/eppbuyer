import Area from "../classes/Area";
import Building from "../classes/Building";
import Color from "../classes/Color";
import Currency from "../classes/Currency";
import ProductType from "../classes/ProductType";
import Size from "../classes/Size";
import User from "../classes/User";
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

/** 透過 Token 向伺服器換取 User data */
export default function getUserData() {
    return new Promise((resolve, reject) => {
        fetch("/getuserdata/index.php", {
            mode: "cors",
            method: "GET",
            headers: {
                Accept: "application/json",
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

                    getprojects().catch((err) => reject(err));
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

import Area from "../../classes/Area";
import Building from "../../classes/Building";
import Color from "../../classes/Color";
import Currency from "../../classes/Currency";
import ProductType from "../../classes/ProductType";
import Size from "../../classes/Size";
import User from "../../classes/User";
import {
    UpdateAreaAction,
    UpdateBuildingAction,
    UpdateColorAction,
    UpdateCurrencyAction,
    UpdateSizeAction,
    UpdateTypeAction,
    UpdateUserAction,
    UPDATE_AREA,
    UPDATE_BUILDING,
    UPDATE_COLOR,
    UPDATE_CURRENCY,
    UPDATE_SIZE,
    UPDATE_TYPE,
    UPDATE_USER,
} from "./types";

export function UpdateUser(user: User): UpdateUserAction {
    return {
        type: UPDATE_USER,
        data: user,
    };
}

export function UpdateArea(area: Area): UpdateAreaAction {
    return {
        type: UPDATE_AREA,
        data: area,
    };
}

export function UpdateBuilding(building: Building): UpdateBuildingAction {
    return {
        type: UPDATE_BUILDING,
        data: building,
    };
}
export function UpdateCurrency(currency: Currency): UpdateCurrencyAction {
    return {
        type: UPDATE_CURRENCY,
        data: currency,
    };
}

export function UpdateColor(color: Color): UpdateColorAction {
    return {
        type: UPDATE_COLOR,
        data: color,
    };
}
export function UpdateType(type: ProductType): UpdateTypeAction {
    return {
        type: UPDATE_TYPE,
        data: type,
    };
}
export function UpdateSize(size: Size): UpdateSizeAction {
    return {
        type: UPDATE_SIZE,
        data: size,
    };
}

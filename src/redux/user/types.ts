import Area from "../../classes/Area";
import Building from "../../classes/Building";
import Color from "../../classes/Color";
import Currency from "../../classes/Currency";
import ProductType from "../../classes/ProductType";
import Size from "../../classes/Size";
import User from "../../classes/User";

export const UPDATE_USER = "UPDATE_USER";
export interface UpdateUserAction {
    type: typeof UPDATE_USER;
    data: User;
}

export const UPDATE_AREA = "UPDATE_AREA";
export interface UpdateAreaAction {
    type: typeof UPDATE_AREA;
    data: Area;
}

export const UPDATE_BUILDING = "UPDATE_BUILDING";
export interface UpdateBuildingAction {
    type: typeof UPDATE_BUILDING;
    data: Building;
}

export const UPDATE_CURRENCY = "UPDATE_CURRENCY";
export interface UpdateCurrencyAction {
    type: typeof UPDATE_CURRENCY;
    data: Currency;
}

export const UPDATE_TYPE = "UPDATE_TYPE";
export interface UpdateTypeAction {
    type: typeof UPDATE_TYPE;
    data: ProductType;
}

export const UPDATE_COLOR = "UPDATE_COLOR";
export interface UpdateColorAction {
    type: typeof UPDATE_COLOR;
    data: Color;
}

export const UPDATE_SIZE = "UPDATE_SIZE";
export interface UpdateSizeAction {
    type: typeof UPDATE_SIZE;
    data: Size;
}

export type UserActions =
    | UpdateUserAction
    | UpdateAreaAction
    | UpdateBuildingAction
    | UpdateSizeAction
    | UpdateCurrencyAction
    | UpdateColorAction
    | UpdateTypeAction;

export interface UserStateType {
    user: User | undefined;
    areas: Area[];
    buildings: Building[];
    currencies: Currency[];
    types: ProductType[];
    colors: Color[];
    sizes: Size[];
}

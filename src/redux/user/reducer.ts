import Area from "../../classes/Area";
import Building from "../../classes/Building";
import Color from "../../classes/Color";
import Currency from "../../classes/Currency";
import ProductType from "../../classes/ProductType";
import Size from "../../classes/Size";
import {
    UPDATE_AREA,
    UPDATE_BUILDING,
    UPDATE_COLOR,
    UPDATE_CURRENCY,
    UPDATE_SIZE,
    UPDATE_TYPE,
    UPDATE_USER,
    UserActions,
    UserStateType,
} from "./types";

const emptyState: UserStateType = {
    user: undefined,
    areas: new Array<Area>(),
    buildings: new Array<Building>(),
    currencies: new Array<Currency>(),
    colors: new Array<Color>(),
    types: new Array<ProductType>(),
    sizes: new Array<Size>(),
};

export default (state = emptyState, action: UserActions) => {
    switch (action.type) {
        case UPDATE_USER:
            return { ...state, user: action.data };
        case UPDATE_AREA:
            return {
                ...state,
                areas: [...state.areas.filter((a) => a.area_name !== action.data.area_name), action.data],
            };
        case UPDATE_BUILDING:
            return {
                ...state,
                buildings: [
                    ...state.buildings.filter((b) => b.building_name !== action.data.building_name),
                    action.data,
                ],
            };
        case UPDATE_COLOR:
            return {
                ...state,
                colors: [...state.colors.filter((c) => c.color_name !== action.data.color_name), action.data],
            };
        case UPDATE_CURRENCY:
            return {
                ...state,
                currencies: [
                    ...state.currencies.filter((c) => c.currency_code !== action.data.currency_code),
                    action.data,
                ],
            };
        case UPDATE_TYPE:
            return {
                ...state,
                types: [...state.types.filter((t) => t.type_code !== action.data.type_code), action.data],
            };
        case UPDATE_SIZE:
            return {
                ...state,
                sizes: [...state.sizes.filter((s) => s.size_code !== action.data.size_code), action.data],
            };
        default:
            return state;
    }
};

import { CombinedState, combineReducers } from "redux";
import Product from "./classes/Product";
import { Project } from "./classes/Project";
import ProductsState from "./redux/products/reducer";
import ProjectsState from "./redux/projects/reducer";
import SystemState from "./redux/system/reducer";
import { SystemStateType } from "./redux/system/types";
import UserState from "./redux/user/reducer";
import { UserStateType } from "./redux/user/types";

export const rootReducer = combineReducers({
    user: UserState,
    system: SystemState,
    projects: ProjectsState,
    products: ProductsState,
});

export type RootStateType = CombinedState<{
    user: UserStateType;
    system: SystemStateType;
    projects: Array<Project>;
    products: Array<Product>;
}>;

import { CombinedState, combineReducers, createStore } from "redux";
import UserState from "./features/user/reducer";
import { UserStateType } from "./features/user/types";

const rootReducer = combineReducers({
    userState: UserState,
});

export type RootState = CombinedState<{
    userState: UserStateType;
}>;

const store = createStore(rootReducer);

export default store;

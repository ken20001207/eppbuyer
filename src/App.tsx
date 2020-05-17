import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "rsuite/dist/styles/rsuite-default.css";
import Cookies from "universal-cookie";
import "./App.css";
import Product from "./classes/Product";
import { Project } from "./classes/Project";
import User from "./classes/User";
import getUserData from "./functions/getuserdata";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import { UpdateProduct } from "./redux/products/actions";
import { UpdateProject } from "./redux/projects/actions";
import { SelectProject, ToggleLoadingProducts, UpdateToken } from "./redux/system/actions";
import { UpdateUser } from "./redux/user/actions";
import { UserStateType } from "./redux/user/types";
import { RootStateType } from "./rootReducer";
import store from "./store";
const cookies = new Cookies();
interface Props {
    user: UserStateType;
    updateUser: (user: User) => void;
    updateToken: (token: string) => void;
    updateProject: (project: Project) => void;
    updateProduct: (product: Product) => void;
    selectProject: (id: string) => void;
    toggleLoadingProducts: () => void;
}

interface States {
    redirectTo: string | undefined;
}

function mapStateToProps(state: RootStateType) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch: typeof store.dispatch) {
    return {
        updateUser: (user: User) => dispatch(UpdateUser(user)),
        updateToken: (token: string) => dispatch(UpdateToken(token)),
        updateProject: (project: Project) => dispatch(UpdateProject(project)),
        updateProduct: (product: Product) => dispatch(UpdateProduct(product)),
        selectProject: (id: string) => dispatch(SelectProject(id)),
        toggleLoadingProducts: () => dispatch(ToggleLoadingProducts()),
    };
}

class App extends React.Component<Props, States> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            redirectTo: undefined,
        };
    }
    /** 先嘗試 Token 登入 */
    componentDidMount = () => {
        const token = cookies.get("token");
        if (token !== undefined) {
            getUserData(token).catch((err) => alert(err));
        }
    };

    render() {
        return (
            <BrowserRouter>
                {this.props.user.user === undefined ? <Redirect to="/login" /> : null}

                <Switch>
                    <Route path="/login" component={Login} exact />
                    <Route path="/products" component={Products} exact />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

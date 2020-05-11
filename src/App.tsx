import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Cookies from "universal-cookie";
import "./App.css";
import Product from "./classes/Product";
import { Project } from "./classes/Project";
import User from "./classes/User";
import getproducts, { GetProductsResponseType } from "./functions/getproducts";
import getprojects, { GetProjectsResponseType } from "./functions/getprojects";
import getUserData, { GetUserDataResponseType } from "./functions/getuserdata";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import { UpdateProduct } from "./redux/products/actions";
import { UpdateProject } from "./redux/projects/actions";
import { SelectProject, UpdateToken } from "./redux/system/actions";
import { UpdateUser } from "./redux/user/actions";
import { RootStateType } from "./rootReducer";
import store from "./store";

const cookies = new Cookies();

interface Props {
    user: User;
    updateUser: (user: User) => void;
    updateToken: (token: string) => void;
    updateProject: (project: Project) => void;
    updateProduct: (product: Product) => void;
    selectProject: (id: string) => void;
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
            getUserData(token).then(async (res) => {
                if (res.status === 200) {
                    const resdata = ((await res.json()) as unknown) as GetUserDataResponseType;
                    this.props.updateUser(new User(resdata.userdata));
                    this.props.updateToken(token);
                    getprojects(token).then(async (res) => {
                        if (res.status === 200) {
                            const resdata = ((await res.json()) as unknown) as GetProjectsResponseType;
                            resdata.projects.map((p) => {
                                this.props.updateProject(new Project(p));
                                return null;
                            });
                            this.props.selectProject(resdata.projects[0].project_name);
                            getproducts(token, resdata.projects[0].project_name).then(async (res) => {
                                if (res.status === 200) {
                                    const resdata = ((await res.json()) as unknown) as GetProductsResponseType;
                                    resdata.products.map((p) => {
                                        this.props.updateProduct(new Product(p));
                                        return null;
                                    });
                                }
                            });
                        } else alert("獲取專案清單失敗，請聯繫客服人員 (" + res.status + ")");
                    });
                    this.setState({ redirectTo: "/products" });
                } else {
                    cookies.remove("token");
                }
            });
        }
    };

    render() {
        return (
            <BrowserRouter>
                {this.props.user.id === "" ? <Redirect to="/login" /> : null}

                <Switch>
                    <Route path="/login" component={Login} exact />
                    <Route path="/products" component={Products} exact />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

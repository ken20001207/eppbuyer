import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "rsuite";
import Product from "../../classes/Product";
import { Project } from "../../classes/Project";
import User from "../../classes/User";
import getproducts, { GetProductsResponseType } from "../../functions/getproducts";
import { UpdateProduct } from "../../redux/products/actions";
import { SelectProject, ToggleLoadingProducts } from "../../redux/system/actions";
import { UpdateUser } from "../../redux/user/actions";
import { UserStateType } from "../../redux/user/types";
import { RootStateType } from "../../rootReducer";
import store from "../../store";
import "./SideBar.css";

interface Props {
    user: UserStateType;
    token: string | undefined;
    selectedProjectID: string | undefined;
    projects: Array<Project>;
    updateUser: (user: User) => void;
    updateProduct: (product: Product) => void;
    selectProject: (id: string) => void;
    toggleLoadingProducts: () => void;
}

interface States {}

function mapStateToProps(state: RootStateType) {
    return {
        user: state.user,
        token: state.system.token,
        projects: state.projects,
        selectedProjectID: state.system.selectedProjectName,
    };
}

function mapDispatchToProps(dispatch: typeof store.dispatch) {
    return {
        updateUser: (user: User) => dispatch(UpdateUser(user)),
        updateProduct: (product: Product) => dispatch(UpdateProduct(product)),
        selectProject: (id: string) => dispatch(SelectProject(id)),
        toggleLoadingProducts: () => dispatch(ToggleLoadingProducts()),
    };
}

class SideBar extends React.Component<Props, States> {
    render() {
        if (this.props.user.user !== undefined)
            return (
                <div className="sidebar" style={{ width: "100%" }}>
                    <Row>
                        <Col>
                            <p className="p1">當前登入用戶</p>
                            <p className="p2">{this.props.user.user.email}</p>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 24 }}>
                        <Col>
                            <p className="p1">當前選擇專案</p>
                            <select
                                value={this.props.selectedProjectID}
                                onChange={(e) => {
                                    if (this.props.token !== undefined) {
                                        this.props.toggleLoadingProducts();
                                        getproducts(this.props.token, e.target.value).then((res) => {
                                            if (res.status === 200) {
                                                res.json().then((res) => {
                                                    const resdata = (res as unknown) as GetProductsResponseType;
                                                    resdata.products.map((p) => {
                                                        this.props.updateProduct(new Product(p));
                                                        return null;
                                                    });
                                                    this.props.toggleLoadingProducts();
                                                });
                                            }
                                        });
                                        this.props.selectProject(e.target.value);
                                    }
                                }}
                            >
                                {this.props.projects.map((p) => {
                                    return (
                                        <option key={p.project_name} value={p.project_name}>
                                            {p.project_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </Col>
                    </Row>
                    <p className="brand">EppBuyer 批貨達人</p>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

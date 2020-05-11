import React from "react";
import { Col, Row } from "react-grid-system";
import { connect } from "react-redux";
import Product from "../../classes/Product";
import { Project } from "../../classes/Project";
import User from "../../classes/User";
import getproducts, { GetProductsResponseType } from "../../functions/getproducts";
import { UpdateProduct } from "../../redux/products/actions";
import { SelectProject } from "../../redux/system/actions";
import { UpdateUser } from "../../redux/user/actions";
import { RootStateType } from "../../rootReducer";
import store from "../../store";
import "./SideBar.css";

interface States {}

interface Props {
    user: User | undefined;
    token: string | undefined;
    selectedProjectID: string | undefined;
    projects: Array<Project>;
    updateUser: (user: User) => void;
    updateProduct: (product: Product) => void;
    selectProject: (id: string) => void;
}

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
    };
}

class SideBar extends React.Component<Props, States> {
    render() {
        if (this.props.user !== undefined)
            return (
                <div className="sidebar" style={{ width: 250 }}>
                    <Row>
                        <Col>
                            <p
                                style={{
                                    color: "rgb(180,180,180)",
                                    fontSize: 14,
                                }}
                            >
                                當前登入用戶
                            </p>
                            <p
                                style={{
                                    color: "rgb(250,250,250)",
                                    fontSize: 24,
                                }}
                            >
                                {this.props.user.id}
                            </p>
                            <p
                                style={{
                                    color: "rgb(180,180,180)",
                                    fontSize: 18,
                                }}
                            >
                                {this.props.user.email}
                            </p>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 24 }}>
                        <Col>
                            <p
                                style={{
                                    color: "rgb(180,180,180)",
                                    fontSize: 14,
                                }}
                            >
                                當前選擇專案
                            </p>
                            <select
                                value={this.props.selectedProjectID}
                                onChange={(e) => {
                                    if (this.props.token !== undefined) {
                                        getproducts(this.props.token, e.target.value).then(async (res) => {
                                            if (res.status === 200) {
                                                const resdata = ((await res.json()) as unknown) as GetProductsResponseType;
                                                resdata.products.map((p) => {
                                                    this.props.updateProduct(new Product(p));
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

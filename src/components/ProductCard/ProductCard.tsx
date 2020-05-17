import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "rsuite";
import Product from "../../classes/Product";
import User from "../../classes/User";
import { UpdateProduct } from "../../redux/products/actions";
import { SelectProject } from "../../redux/system/actions";
import { UpdateUser } from "../../redux/user/actions";
import { UserStateType } from "../../redux/user/types";
import { RootStateType } from "../../rootReducer";
import store from "../../store";
import QuantityTable from "../QuantityTable/QuantityTable";
import SizeTable from "../SizeTable/SizeTable";
import "./ProductCard.css";

interface Props {
    user: UserStateType;
    token: string | undefined;
    product: Product;
    updateUser: (user: User) => void;
    updateProduct: (product: Product) => void;
    selectProject: (id: string) => void;
}

function mapStateToProps(state: RootStateType) {
    return {
        user: state.user,
        token: state.system.token,
    };
}

function mapDispatchToProps(dispatch: typeof store.dispatch) {
    return {
        updateUser: (user: User) => dispatch(UpdateUser(user)),
        updateProduct: (product: Product) => dispatch(UpdateProduct(product)),
        selectProject: (id: string) => dispatch(SelectProject(id)),
    };
}

class ProductCard extends React.Component<Props> {
    render() {
        const product = this.props.product;

        return (
            <div
                style={{
                    width: "90%",
                    margin: 36,
                    padding: 18,
                    display: "inline-block",
                    textAlign: "left",
                    borderRadius: 25,
                    boxShadow: "0px 0px 10px 10px rgba(0, 0, 0, 0.05)",
                }}
            >
                <Row>
                    <Col lg={6} style={{ padding: 0 }}>
                        <img
                            alt={product.product_name + "的商品圖片"}
                            style={{ width: "100%" }}
                            src={"/getimage/index.php?&product_id=" + product.product_id}
                        />
                    </Col>
                    <Col lg={6}>
                        <div style={{ padding: 18 }}>
                            <div style={{ fontSize: 24, marginBottom: 18 }}>{product.product_name}</div>
                            <div style={{ marginTop: 8 }}>
                                <p className="subtle">分類</p>
                                {product.type_name}
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <p className="subtle">款號</p>
                                {product.product_id}
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <p className="subtle">大樓</p>
                                {product.building}
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <p className="subtle">櫃位</p>
                                {product.counter}
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <p className="subtle">材質</p>
                                {product.material}
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <p className="subtle">彈性</p>
                                {product.elasticity}
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <p className="subtle">定價</p>$ {product.price_order}
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <p className="subtle">連線價</p>$ {product.price_online}
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <p className="subtle">批發價 </p>$ {product.price_batch}
                            </div>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div style={{ padding: 18 }}>
                            <p style={{ marginBottom: 9 }}>採購數量</p>
                            <QuantityTable product={product} />
                        </div>
                        <div style={{ padding: 18 }}>
                            <p style={{ marginBottom: 9 }}>尺寸表</p>
                            <SizeTable product={product} user={this.props.user} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);

import React from "react";
import { connect } from "react-redux";
import { Button, Col, Drawer, Row } from "rsuite";
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
    product: Product;
    updateUser: (user: User) => void;
    updateProduct: (product: Product) => void;
    selectProject: (id: string) => void;
}

interface States {
    showDetail: boolean;
}

function mapStateToProps(state: RootStateType) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch: typeof store.dispatch) {
    return {
        updateUser: (user: User) => dispatch(UpdateUser(user)),
        updateProduct: (product: Product) => dispatch(UpdateProduct(product)),
        selectProject: (id: string) => dispatch(SelectProject(id)),
    };
}

class ProductCard extends React.Component<Props, States> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            showDetail: false,
        };
    }
    render() {
        const product = this.props.product;

        return (
            <Col xs={24} sm={12} md={12} lg={8} style={{ padding: 16 }}>
                <div
                    className="card"
                    style={{
                        width: "100%",
                        textAlign: "left",
                        borderRadius: 24,
                    }}
                >
                    <img
                        alt={product.product_name + "的商品圖片"}
                        style={{ borderRadius: 24, objectFit: "cover", width: "100%", height: 300 }}
                        src={"/getimage/index.php?&product_id=" + product.product_id}
                    />
                    <Row style={{ padding: 24 }}>
                        <Col sm={12} style={{ padding: 8 }}>
                            <p>{product.product_name}</p>
                        </Col>
                        <Col sm={12} style={{ textAlign: "right" }}>
                            <Button onClick={() => this.setState({ showDetail: true })}>商品管理</Button>
                        </Col>
                    </Row>
                </div>
                <Drawer show={this.state.showDetail} onHide={() => this.setState({ showDetail: false })}>
                    <Drawer.Header>
                        <Drawer.Title>商品詳情</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <Row>
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
                                <div style={{ marginTop: 16 }}>
                                    <p style={{ marginBottom: 9 }}>採購數量</p>
                                    <QuantityTable product={product} />
                                    <p style={{ marginBottom: 9 }}>尺寸表</p>
                                    <SizeTable product={product} user={this.props.user} />
                                </div>
                            </div>
                        </Row>
                    </Drawer.Body>
                    <Drawer.Footer style={{ paddingBottom: 36 }}>
                        <Button onClick={() => this.setState({ showDetail: false })} appearance="primary">
                            修改資料
                        </Button>
                        <Button onClick={() => this.setState({ showDetail: false })} appearance="subtle">
                            取消
                        </Button>
                    </Drawer.Footer>
                </Drawer>
            </Col>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);

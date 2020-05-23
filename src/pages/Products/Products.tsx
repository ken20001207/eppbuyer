import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Animation, Col, Row } from "rsuite";
import Product from "../../classes/Product";
import User from "../../classes/User";
import ProductCard from "../../components/ProductCard/ProductCard";
import SideBar from "../../components/SideBar/SideBar";
import { UpdateUser } from "../../redux/user/actions";
import { UserStateType } from "../../redux/user/types";
import { RootStateType } from "../../rootReducer";
import store from "../../store";

const { Fade } = Animation;

interface Props {
    user: UserStateType;
    products: Array<Product>;
    selectedProjectName: string | undefined;
    loadingProducts: boolean;
    updateUser: (user: User) => void;
}

interface States {
    windowWidth: number;
}

function mapStateToProps(state: RootStateType) {
    return {
        user: state.user,
        products: state.products,
        loadingProducts: state.system.loadingProducts,
        selectedProjectName: state.system.selectedProjectName,
    };
}

function mapDispatchToProps(dispatch: typeof store.dispatch) {
    return { updateUser: (user: User) => dispatch(UpdateUser(user)) };
}

class Products extends React.Component<Props, States> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            windowWidth: 1080,
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ windowWidth: window.innerWidth });
    };

    render() {
        if (this.props.user.user === undefined) return <Redirect to="/login" />;
        return (
            <Row>
                {this.state.windowWidth >= 992 ? (
                    <Col md={8} lg={4}>
                        <SideBar />
                    </Col>
                ) : (
                    <p />
                )}
                {this.props.selectedProjectName === undefined ? (
                    <h2>請先選擇專案</h2>
                ) : (
                    <Col xs={24} sm={24} md={16} lg={20}>
                        <Fade in={!this.props.loadingProducts}>
                            <div style={{ overflowY: "scroll", height: "100vh" }}>
                                <Row>
                                    {this.props.products
                                        .filter((p) => p.project_name === this.props.selectedProjectName)
                                        .slice(0, 50)
                                        .map((product) => (
                                            <ProductCard product={product} />
                                        ))}
                                </Row>
                            </div>
                        </Fade>
                    </Col>
                )}
            </Row>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);

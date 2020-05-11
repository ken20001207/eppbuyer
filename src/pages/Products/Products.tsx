import React from "react";
import { Col, Container } from "react-grid-system";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import User from "../../classes/User";
import SideBar from "../../components/SideBar/SideBar";
import { UpdateUser } from "../../redux/user/actions";
import { RootStateType } from "../../rootReducer";
import store from "../../store";

interface Props {
    user: User | undefined;
    updateUser: (user: User) => void;
}

function mapStateToProps(state: RootStateType) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch: typeof store.dispatch) {
    return { updateUser: (user: User) => dispatch(UpdateUser(user)) };
}

class Products extends React.Component<Props> {
    render() {
        if (this.props.user?.id === "") return <Redirect to="/login" />;
        return (
            <Container fluid style={{ padding: 0 }}>
                <Col sm={4}>
                    <SideBar />
                </Col>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);

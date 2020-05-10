import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import User from "./classes/User";
import Login from "./pages/Login/Login";
import { RootState } from "./store";

interface Props {
    user: User | undefined;
}

class App extends React.Component<Props> {
    render() {
        return (
            <BrowserRouter>
                {this.props.user === undefined ? (
                    <Redirect to="/login" />
                ) : null}
                <Switch>
                    <Route path="/login" component={Login} exact />
                </Switch>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state: RootState) {
    return {
        user: state.userState.user,
    };
}

export default connect(mapStateToProps)(App);

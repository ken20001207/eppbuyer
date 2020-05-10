import React from "react";
import "./Login.css";

interface States {
    username: string;
    password: string;
    remember: boolean;
    errUserName: boolean;
    errPwd: boolean;
}

interface Props {
    setToken: (token: string) => void;
}

export default class Login extends React.Component<Props, States> {
    errName: HTMLSpanElement | null = null;
    errPwd: HTMLSpanElement | null = null;
    errNameText: string = "";
    errPwdText: string = "";
    inputName: HTMLInputElement | null = null;
    inputPwd: HTMLInputElement | null = null;

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            username: "",
            password: "",
            remember: false,
            errUserName: false,
            errPwd: false,
        };
    }

    loginValidation = () => {
        const regUserName = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(]?)$/;
        const regPwd = /(?!^[0-9]{8,20}$)(?!^[a-zA-Z]{8,20}$)^[0-9a-zA-Z]{8,20}$/;
        if (this.state.username.length === 0) {
            this.setState({ errUserName: true });
            this.errNameText = "請輸入帳號";
        }
        if (this.state.password.length === 0) {
            this.setState(() => ({ errPwd: true }));
            this.errPwdText = "請輸入密碼";
        }
        if (this.errNameText !== "" || this.errPwdText !== "") {
            return;
        }
        if (!regUserName.test(this.state.username)) {
            this.setState({ errUserName: true });
            this.errNameText = "帳號格式錯誤 (例：abc@xyz.com)";
        }
        if (!regPwd.test(this.state.password)) {
            this.setState({ errPwd: true });
            this.errPwdText = "密碼需包含英文及數字8~20碼";
        }
        if (this.errNameText === "" && this.errPwdText === "") {
            this.login();
        }
    };

    async login() {
        let formData = new FormData();
        formData.append("account", this.state.username);
        formData.append(
            "pwd",
            new Buffer(this.state.password).toString("base64")
        );
        if (this.state.remember) {
            formData.append("remember", "on");
        }
        await fetch("/login/loginR.php", {
            method: "POST",
            body: formData,
        })
            .then(function (response) {
                return response.text();
            })
            .then((text) => {
                let resArr = text.split(",");
                if (resArr[0] === "pass") {
                    this.props.setToken(resArr[1]);
                } else {
                    this.showErrMsg(resArr[1]);
                }
            });
    }

    hideUserNameErrMsg = () => {
        this.setState({ errUserName: false });
        this.errNameText = "";
        if (this.inputName !== null) this.inputName.focus();
    };

    hidePwdErrMsg = () => {
        this.setState({ errPwd: false });
        this.errPwdText = "";
        if (this.inputPwd !== null) this.inputPwd.focus();
    };

    enterKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            this.loginValidation();
        }
    };

    checkboxHandler = () => {
        this.setState({ remember: !this.state.remember });
    };

    showErrMsg(errStr: string) {
        switch (errStr) {
            case "account error":
                this.errNameText = "沒有該帳號";
                this.setState({ errUserName: true });
                break;
            case "password error":
                this.errPwdText = "密碼錯誤";
                this.setState({ errPwd: true });
                break;
            case "account or password error":
                alert("帳號或密碼錯誤");
                break;
            default:
                alert("錯誤");
                break;
        }
    }

    render() {
        return (
            <div>
                <div className="brand">
                    <a
                        href="https://www.jamiecoulter.co.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/logo.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="login">
                    <div className="login_title">
                        <span>後台管理登入</span>
                    </div>
                    <div className="login_fields">
                        <div className="login_fields__user">
                            <div className="icon">
                                <img
                                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png"
                                    alt=""
                                />
                            </div>
                            <input
                                name="username"
                                placeholder="Username"
                                type="email"
                                onChange={(e) =>
                                    this.setState({ username: e.target.value })
                                }
                                value={this.state.username}
                                autoComplete="off"
                                onFocus={this.hideUserNameErrMsg}
                                ref={(input) => {
                                    this.inputName = input;
                                }}
                                onKeyDown={this.enterKeyPressHandler}
                            />
                            <div
                                className="validation"
                                hidden={!this.state.errUserName}
                            >
                                <span
                                    ref={(span) => {
                                        this.errName = span;
                                    }}
                                    onClick={this.hideUserNameErrMsg}
                                >
                                    {this.errNameText}
                                </span>
                            </div>
                        </div>
                        <div className="login_fields__password">
                            <div className="icon">
                                <img
                                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png"
                                    alt=""
                                />
                            </div>
                            <input
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={(e) =>
                                    this.setState({ password: e.target.value })
                                }
                                value={this.state.password}
                                autoComplete="off"
                                onFocus={this.hidePwdErrMsg}
                                ref={(input) => {
                                    this.inputPwd = input;
                                }}
                                onKeyDown={this.enterKeyPressHandler}
                            />
                            <div className="validation">
                                <span
                                    ref={(span) => {
                                        this.errPwd = span;
                                    }}
                                    onClick={this.hidePwdErrMsg}
                                >
                                    {this.errPwdText}
                                </span>
                            </div>
                        </div>
                        <div className="login_fields__remember">
                            <input
                                type="checkbox"
                                id="checkbox"
                                onChange={this.checkboxHandler}
                            />
                            <label htmlFor="checkbox">自動登入</label>
                            <br />
                        </div>
                        <div className="login_fields__submit">
                            <input
                                type="submit"
                                defaultValue="Log In"
                                onClick={this.loginValidation}
                            />
                            <div className="forgot">
                                <a href="/">Forgotten password?</a>
                            </div>
                        </div>
                    </div>
                    <div className="disclaimer">
                        <p>EppBuyer 批貨達人</p>
                    </div>
                </div>
            </div>
        );
    }
}

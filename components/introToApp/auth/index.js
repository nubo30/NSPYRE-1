import React, { Component } from 'react';
import { Container, Header, Text, View, Button, Spinner } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Swiper from 'react-native-swiper'
import * as Animatable from 'react-native-animatable';

// Colors
import { colorsPalette } from '../../global/static/colors'
import { MyStatusBar } from '../../global/statusBar'

// Child Components
import Login from './login/index'
import Signup from './signup/index'
import ForgotPassword from './forgotPassword'
import MoreAboutTheUser from './moreAboutTheUser'
import Scope from './scope'
import FbButton from './fbButton'

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginOrSignUp: true,
            submitLogin: false,
            submitSingUp: false,
            isLoading: false,
            confirmAccount: false,
            numberPhone: "",
            userData: {},
            invalidFormAnimation: false
        }
        this.child = React.createRef();
    }

    _loginOrSignUp = (value) => {
        this.setState({ loginOrSignUp: value })
    }

    _isLoading = (value) => {
        this.setState({ isLoading: value })
    }

    _confirmAccount = (value) => {
        this.setState({ confirmAccount: value })
    }

    _numberPhone = (value) => {
        this.setState({ numberPhone: value })
    }

    _dataUser = (value) => {
        this.setState({ userData: value })
    }

    _changeSwiper = (value) => {
        this.swiper.scrollBy(value)
    }

    _errAnimation = (value) => {
        this.setState({ invalidFormAnimation: value })
    }

    render() {
        const { loginOrSignUp, submitLogin, submitSingUp, isLoading, confirmAccount, numberPhone, userData, invalidFormAnimation } = this.state
        return (
            <Swiper
                ref={r => this.swiper = r}
                showsPagination={false}
                pagingEnabled={false}
                scrollEnabled={false}
                loop={false}>
                <Container>
                    <Header transparent style={{ backgroundColor: colorsPalette.primaryColor }} />
                    <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
                    <Grid style={{ backgroundColor: colorsPalette.primaryColor }}>
                        <Row size={20} style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(10), color: colorsPalette.secondaryColor, fontWeight: 'bold' }}>Nspyre</Text>
                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.secondaryColor, textAlign: 'center' }}>Welcome! {`\n`} To continue please create an account.</Text>
                        </Row>
                        <Row size={48}>
                            <View style={{
                                flex: 1,
                                backgroundColor: colorsPalette.secondaryColor,
                                padding: 20,
                                borderTopStartRadius: 5,
                                borderTopEndRadius: 5,
                                shadowOffset: { width: 0, height: -5 },
                                shadowColor: colorsPalette.primaryShadowColor,
                                shadowOpacity: 1,
                            }}>
                                {loginOrSignUp
                                    ? <Signup
                                        ref={instanceSinUp => { this.childSignUp = instanceSinUp; }}
                                        // Action
                                        submitSingUp={submitSingUp}
                                        isLoading={isLoading}

                                        // Functions
                                        _errAnimation={this._errAnimation}
                                        _dataUser={this._dataUser}
                                        _numberPhone={this._numberPhone}
                                        _isLoading={this._isLoading}
                                        _loginOrSignUp={this._loginOrSignUp}
                                        _confirmAccount={this._confirmAccount} />
                                    : <Login
                                        ref={instanceLogin => { this.childLogin = instanceLogin; }}
                                        // Action
                                        submitLogin={submitLogin}
                                        isLoading={isLoading}
                                        confirmAccount={confirmAccount}

                                        // Data
                                        numberPhone={numberPhone}

                                        // Functions
                                        _errAnimation={this._errAnimation}
                                        _changeSwiper={this._changeSwiper}
                                        _dataUser={this._dataUser}
                                        _confirmAccount={this._confirmAccount}
                                        _isLoading={this._isLoading}
                                        _loginOrSignUp={this._loginOrSignUp}
                                    />}
                            </View>
                        </Row>
                        <Row size={22} style={{ backgroundColor: colorsPalette.secondaryColor, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            {loginOrSignUp
                                ? <Animatable.View
                                    animation={invalidFormAnimation ? "shake" : undefined}
                                    onAnimationEnd={() => this.setState({ invalidFormAnimation: false })}
                                    duration={1000}
                                    style={{
                                        flex: 3.3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: "100%",
                                        shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 1 }, shadowOpacity: 1,
                                    }}>
                                    <Button
                                        disabled={isLoading}
                                        onPress={() => { this.childSignUp._validateData(); this._isLoading(true) }}
                                        style={{ width: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: colorsPalette.primaryColor }}>
                                        {isLoading ? <Spinner size="small" color={colorsPalette.secondaryColor} /> :
                                            <Text allowFontScaling={false} style={{ alignSelf: 'center', color: colorsPalette.secondaryColor, fontWeight: 'bold' }}>Sign Up</Text>}
                                    </Button>
                                </Animatable.View>
                                : <Animatable.View
                                    animation={invalidFormAnimation ? "shake" : undefined}
                                    onAnimationEnd={() => this.setState({ invalidFormAnimation: false })}
                                    duration={1000}
                                    style={{
                                        flex: 3.3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: "100%",
                                        shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 1 }, shadowOpacity: 1,
                                    }}>
                                    <Button
                                        disabled={isLoading}
                                        onPress={() => { this.childLogin._validateData(); this._isLoading(true) }}
                                        style={{ width: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: colorsPalette.primaryColor }}>
                                        {isLoading ? <Spinner size="small" color={colorsPalette.secondaryColor} /> :
                                            <Text allowFontScaling={false} style={{ alignSelf: 'center', color: colorsPalette.secondaryColor, fontWeight: 'bold' }}>Login</Text>}
                                    </Button>
                                </Animatable.View>}
                            <View style={{ width: "70%", flex: 3.3, top: 5 }}>
                                <FbButton _dataUser={this._dataUser} _changeSwiper={this._changeSwiper} />
                            </View>
                            {!loginOrSignUp ?
                                <View style={{ flex: 3.3 }}>
                                    <ForgotPassword />
                                </View>
                                : <View style={{ flex: 3.3 }}>
                                    <Button transparent disabled>
                                        <Text allowFontScaling={false} style={{ color: colorsPalette.darkText, fontSize: wp(3) }}>  </Text>
                                    </Button>
                                </View>}
                        </Row>
                    </Grid>
                </Container>
                <MoreAboutTheUser _changeSwiper={this._changeSwiper} _changeSwiper={this._changeSwiper} userData={userData} />
                <Scope userData={userData} />
            </Swiper>
        );
    }
}
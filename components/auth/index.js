import React, { Component } from 'react';
import { Keyboard } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Container, View, Text, Button, Icon, Toast } from 'native-base';
import Swiper from 'react-native-swiper'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { AfterInteractions } from 'react-native-interactions';

// Child Components
import PhoneRegister from './forms/phoneRegister'
import LoginWithPhoneEmail from './forms/loginWithPhoneEmail'
import ActivateNumberPhone from './forms/activateNumberPhone'
import MoreAboutTheUser from './forms/moreAboutTheUser'
import Scope from './forms/scope'
import AuthPlaceholder from './placeholder/index'

// Gradients
import { GadrientsAuth } from '../global/gradients/index'
import { MyStatusBar } from '../global/statusBar/index'
import Logo from '../global/lottieJs/logo'

class Auth extends Component {

    state = {
        indexSwiperRoot: 0,
        indexSwiper: 0,
        numberPhone: "",
        validateNumberButtom: false,
        moreUserData: {},
        userData: {},
        hasTheRegistrationBeenSuccessful: {
            status: '',
            firstTime: ''
        },
        activateNumberPhone: false
    }

    // Cambiar swiper
    _changeSwiperRoot = (i) => {
        this.swiperRoot.scrollBy(i)
    }

    _changeSwiper = (i) => { this.swiper.scrollBy(i) }

    _numberPhone = (value) => {
        this.setState({ numberPhone: value })
    }

    _hasTheRegistrationBeenSuccessful = (value) => {
        this.setState({ hasTheRegistrationBeenSuccessful: value })
        Toast.show({
            text: "Now you're registered! Login to start!",
            buttonText: "Okay",
            position: "top",
            duration: 10000,
            type: "success"
        })
    }

    // Datos como el nombre, apellido, usuario y email
    _moreUserData = (moreUserData) => {
        this.setState({ moreUserData })
    }

    // ID para API
    _userData = (userData) => { this.setState({ userData }) }

    _activateNumberPhone = (value) => {
        this.setState({ activateNumberPhone: value })
    }

    render() {
        const { activateNumberPhone, moreUserData, userData, indexSwiperRoot, indexSwiper, numberPhone, validateNumberButtom, hasTheRegistrationBeenSuccessful } = this.state
        const { isNotExistUserInTheAPI } = this.props
        return (
            <AfterInteractions placeholder={<View style={{ flex: 1 }}><AuthPlaceholder /></View>}>
                <Swiper
                    index={isNotExistUserInTheAPI === undefined ? 0 : isNotExistUserInTheAPI}
                    scrollEnabled={false}
                    ref={(swiper) => this.swiperRoot = swiper}
                    onIndexChanged={(index) => { this.setState({ indexSwiperRoot: index, validateNumberButtom: true }); Keyboard.dismiss() }}
                    showsPagination={false}
                    showsButtons={false}
                    loop={false}>

                    {/* MAIN */}
                    <Container>
                        <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                        <View style={{
                            bottom: "50%",
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            position: 'absolute',
                            height: "0.5%", width: "100%",
                            shadowColor: "rgba(0,0,0,0.9)",
                            shadowOffset: { width: 0 },
                            shadowOpacity: 1
                        }} />
                        <GadrientsAuth />
                        <Logo />
                        {hasTheRegistrationBeenSuccessful.status === 'SUCCESS' ? null :
                            validateNumberButtom
                                ? <Button
                                    onPress={() => this._changeSwiperRoot(1)}
                                    small iconRight transparent icon style={{ position: 'absolute', top: 20, right: 0 }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(4), color: '#FFF', right: -10 }}>Validate number</Text>
                                    <Icon name="arrow-forward" style={{ color: "#FFF" }} />
                                </Button>
                                : null}
                        <Swiper
                            ref={(swiper) => this.swiper = swiper}
                            onIndexChanged={(index) => { this.setState({ indexSwiper: index }); Keyboard.dismiss() }}
                            loop={false}
                            activeDotColor="#E91E63"
                            dotColor="#EEEEEE"
                            showsButtons={false}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', top: -70 }}>
                                <LoginWithPhoneEmail _moreUserData={this._moreUserData} hasTheRegistrationBeenSuccessful={hasTheRegistrationBeenSuccessful} numberPhone={numberPhone} _changeSwiperRoot={this._changeSwiperRoot} _activateNumberPhone={this._activateNumberPhone} />
                            </View>
                            
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', top: -70 }}>
                                <PhoneRegister _password={this._password} _numberPhone={this._numberPhone} _changeSwiperRoot={this._changeSwiperRoot} _userData={this._userData} />
                            </View>
                        </Swiper>
                        {/* <View style={{ position: 'absolute', bottom: "1.5%", width: '70%', alignSelf: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                        <Button iconLeft disabled={indexSwiper === 0 ? true : false} transparent onPressIn={() => this._changeSwiper(-1)} style={{ left: -10 }}>
                            <Icon name='arrow-back' style={{ color: indexSwiper ? "#EEEEEE" : "#E91E63" }} />
                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: indexSwiper ? "#EEEEEE" : "#E91E63", fontWeight: "bold" }}>SIGN UP</Text>
                        </Button>
                        <Button iconRight disabled={indexSwiper === 1 ? true : false} transparent onPressIn={() => this._changeSwiper(1)}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: !indexSwiper ? "#EEEEEE" : "#E91E63", fontWeight: "bold" }}>LOGIN</Text>
                            <Icon name='arrow-forward' style={{ color: !indexSwiper ? "#EEEEEE" : "#E91E63" }} />
                        </Button>
                    </View> */}
                    </Container>

                    {/* Activate Number Phone */}
                    {activateNumberPhone
                        ? <Container>
                            <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                            <View style={{ bottom: "50%", backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', height: "0.5%", width: "100%", shadowColor: "rgba(0,0,0,0.9)", shadowOffset: { width: 0 }, shadowOpacity: 1 }} />
                            <GadrientsAuth />
                            <MoreAboutTheUser moreUserData={moreUserData} userData={userData} numberPhone={numberPhone} _changeSwiperRoot={this._changeSwiperRoot} _moreUserData={this._moreUserData} />
                        </Container>
                        : <Container>
                            <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                            <View style={{ bottom: "50%", backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', height: "0.5%", width: "100%", shadowColor: "rgba(0,0,0,0.9)", shadowOffset: { width: 0 }, shadowOpacity: 1 }} />
                            <GadrientsAuth />
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', top: -55 }}>
                                <ActivateNumberPhone
                                    _changeSwiperRoot={this._changeSwiperRoot}
                                    _hasTheRegistrationBeenSuccessful={this._hasTheRegistrationBeenSuccessful}
                                    _changeSwiper={this._changeSwiper}
                                    indexSwiperRoot={indexSwiperRoot}
                                    numberPhone={numberPhone} />
                            </View>
                        </Container>}

                    {/* More about the user */}
                    {activateNumberPhone
                        ? <Container>
                            <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                            <View style={{ bottom: "50%", backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', height: "0.5%", width: "100%", shadowColor: "rgba(0,0,0,0.9)", shadowOffset: { width: 0 }, shadowOpacity: 1 }} />
                            <GadrientsAuth />
                            <Scope moreUserData={moreUserData} userData={userData} numberPhone={numberPhone} _changeSwiperRoot={this._changeSwiperRoot} />
                        </Container>
                        : <Container>
                            <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                            <View style={{ bottom: "50%", backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', height: "0.5%", width: "100%", shadowColor: "rgba(0,0,0,0.9)", shadowOffset: { width: 0 }, shadowOpacity: 1 }} />
                            <GadrientsAuth />
                            <MoreAboutTheUser moreUserData={moreUserData} userData={userData} numberPhone={numberPhone} _changeSwiperRoot={this._changeSwiperRoot} _moreUserData={this._moreUserData} />
                        </Container>}

                    {/* Action of user */}
                    <Container>
                        <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                        <View style={{ bottom: "50%", backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', height: "0.5%", width: "100%", shadowColor: "rgba(0,0,0,0.9)", shadowOffset: { width: 0 }, shadowOpacity: 1 }} />
                        <GadrientsAuth />
                        <Scope moreUserData={moreUserData} userData={userData} numberPhone={numberPhone} _changeSwiperRoot={this._changeSwiperRoot} />
                    </Container>
                </Swiper>
            </AfterInteractions>
        );
    }
}

const mapStateToProps = (state) => { return { isNotExistUserInTheAPI: state.auth.isNotExistUserInTheAPI } }

export default connect(mapStateToProps)(withNavigation(Auth))
import React, { Component } from 'react';
import { Keyboard } from 'react-native'
import { Container, View, Text, Button, Icon, Toast } from 'native-base';
import Swiper from 'react-native-swiper'

// Child Components
import PhoneRegister from './forms/phoneRegister'
import LoginWithPhoneEmail from './forms/loginWithPhoneEmail'
import ActivateNumberPhone from './forms/activateNumberPhone'
import MoreAboutTheUser from './forms/moreAboutTheUser'
import Scope from './forms/scope'

// Gradients
import { GadrientsAuth } from '../Global/gradients/index'
import { MyStatusBar } from '../Global/statusBar/index'
import Logo from '../Global/lottieJs/logo'

export default class Auth extends Component {

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
            text: "As a last step, please log in to the application to continue!",
            buttonText: "Okay",
            position: "top",
            duration: 5000
        })
    }

    // Datos como el nombre, apellido, usuario y email
    _moreUserData = (moreUserData) => { this.setState({ moreUserData }) }

    // ID para API
    _userData = (userData) => { this.setState({ userData }) }

    _activateNumberPhone = (value) => {
        this.setState({ activateNumberPhone: value })
    }

    render() {
        const { activateNumberPhone, moreUserData, userData, indexSwiperRoot, indexSwiper, numberPhone, validateNumberButtom, hasTheRegistrationBeenSuccessful } = this.state
        return (
            <Swiper
                scrollEnabled={false}
                ref={(swiper) => this.swiperRoot = swiper}
                onIndexChanged={(index) => { this.setState({ indexSwiperRoot: index, validateNumberButtom: true }); Keyboard.dismiss() }}
                showsPagination={false}
                showsButtons={false}
                loop={false}>

                {/* MAIN */}
                <Container>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                    <View style={{ bottom: "50%", backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', height: "0.5%", width: "100%", shadowColor: "rgba(0,0,0,0.9)", shadowOffset: { width: 0 }, shadowOpacity: 1 }} />
                    <GadrientsAuth />
                    <Logo />
                    {hasTheRegistrationBeenSuccessful.status === 'SUCCESS' ? null :
                        validateNumberButtom
                            ? <Button
                                onPress={() => this._changeSwiperRoot(1)}
                                small iconRight transparent icon style={{ position: 'absolute', top: 20, right: 0 }}>
                                <Text style={{ color: '#FFF', right: -10 }}>Validate number</Text>
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
                        <PhoneRegister _password={this._password} _numberPhone={this._numberPhone} _changeSwiperRoot={this._changeSwiperRoot} _userData={this._userData} />
                        <LoginWithPhoneEmail hasTheRegistrationBeenSuccessful={hasTheRegistrationBeenSuccessful} numberPhone={numberPhone} _changeSwiperRoot={this._changeSwiperRoot} _activateNumberPhone={this._activateNumberPhone} />
                    </Swiper>
                    <View style={{ position: 'absolute', bottom: "1.5%", width: '70%', alignSelf: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                        <Button iconLeft disabled={indexSwiper === 0 ? true : false} transparent onPressIn={() => this._changeSwiper(-1)} style={{ left: -10 }}>
                            <Icon name='arrow-back' style={{ color: indexSwiper ? "#EEEEEE" : "#E91E63" }} />
                            <Text style={{ color: indexSwiper ? "#EEEEEE" : "#E91E63", fontWeight: "bold" }}>SIGN UP</Text>
                        </Button>
                        <Button iconRight disabled={indexSwiper === 1 ? true : false} transparent onPressIn={() => this._changeSwiper(1)}>
                            <Text style={{ color: !indexSwiper ? "#EEEEEE" : "#E91E63", fontWeight: "bold" }}>LOGIN</Text>
                            <Icon name='arrow-forward' style={{ color: !indexSwiper ? "#EEEEEE" : "#E91E63" }} />
                        </Button>
                    </View>
                </Container>

                {/* Activate Number Phone */}
                {activateNumberPhone
                    ? <Container>
                        <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                        <View style={{ bottom: "50%", backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', height: "0.5%", width: "100%", shadowColor: "rgba(0,0,0,0.9)", shadowOffset: { width: 0 }, shadowOpacity: 1 }} />
                        <GadrientsAuth />
                        <MoreAboutTheUser userData={userData} numberPhone={numberPhone} _changeSwiperRoot={this._changeSwiperRoot} _moreUserData={this._moreUserData} />
                    </Container>
                    : <Container>
                        <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                        <View style={{ bottom: "50%", backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', height: "0.5%", width: "100%", shadowColor: "rgba(0,0,0,0.9)", shadowOffset: { width: 0 }, shadowOpacity: 1 }} />
                        <GadrientsAuth />
                        <ActivateNumberPhone
                            _changeSwiperRoot={this._changeSwiperRoot}
                            _hasTheRegistrationBeenSuccessful={this._hasTheRegistrationBeenSuccessful}
                            _changeSwiper={this._changeSwiper}
                            indexSwiperRoot={indexSwiperRoot}
                            numberPhone={numberPhone} />
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
                        <MoreAboutTheUser userData={userData} numberPhone={numberPhone} _changeSwiperRoot={this._changeSwiperRoot} _moreUserData={this._moreUserData} />
                    </Container>}

                {/* Action of user */}
                <Container>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                    <View style={{ bottom: "50%", backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', height: "0.5%", width: "100%", shadowColor: "rgba(0,0,0,0.9)", shadowOffset: { width: 0 }, shadowOpacity: 1 }} />
                    <GadrientsAuth />
                    <Scope moreUserData={moreUserData} userData={userData} numberPhone={numberPhone} _changeSwiperRoot={this._changeSwiperRoot} />
                </Container>
            </Swiper>
        );
    }
}
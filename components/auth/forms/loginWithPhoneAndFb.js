import React, { Component } from 'react';
import { Dimensions, Keyboard } from 'react-native'
import * as Facebook from 'expo-facebook';
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { withNavigation } from 'react-navigation'
import { Button, Icon, Text, List, ListItem, View, Spinner, Input } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import PhoneInput from 'react-native-phone-input'
import _ from 'lodash'
import replace from 'lodash/replace'
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper'
import CodeInput from 'react-native-confirmation-code-input';
import { showMessage } from "react-native-flash-message";

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

import { fBCredentials } from "../../global/socialNetWorksCredentials"

// colors
import { colorsPalette } from '../../global/static/colors'

// ChildComponent
import ForgottenPassword from '../../introToApp/auth/forgotPassword'

// GRPAHQL
import * as queries from '../../../src/graphql/queries'

class Login extends Component {
    state = {
        numberPhoneState: "",
        password: "",
        eyeAction: false,
        isLoading: false,
        isLoadingFb: false,
        wrongLoginAnimation: false,
        user: {},

        // actions
        forgetPasswordModal: false
    }

    _getNumberPhone = () => {
        const numberPhoneClear = replace(replace(this.phone.getValue(), new RegExp(" ", "g"), ""), new RegExp("-", "g"), "").replace(/[()]/g, '')
        this.setState({ numberPhoneState: numberPhoneClear })
    }

    _submit = async () => {
        this.setState({ isLoading: true })
        const { numberPhoneState, password } = this.state
        const { numberPhone } = this.props
        try {
            if (numberPhoneState !== "" && password !== "") {
                const user = await Auth.signIn({ username: numberPhoneState ? numberPhoneState : numberPhone, password })
                if (user.challengeName === 'SMS_MFA') { this.setState({ user }) }
                this._changeSwiper(1)
                this.setState({ wrongLoginAnimation: true, isLoading: false })
            } else {
                this.setState({ isLoading: false })
                showMessage({
                    message: "Field Empty.",
                    description: "Please, provide number phone and password to login.",
                    type: "default",
                    backgroundColor: colorsPalette.warningColor,
                    color: colorsPalette.secondaryColor, // text color
                });
            }
        } catch (error) {
            this.setState({ wrongLoginAnimation: true, isLoading: false })
            showMessage({
                message: "Login Failed.",
                description: error.message,
                type: "default",
                backgroundColor: colorsPalette.dangerColor,
                color: colorsPalette.secondaryColor, // text color
            });
        }
    }

    _resendCode = async (username) => {
        try {
            await Auth.resendSignUp(username)
        } catch (error) {
            console.log(error)
        }
    }

    _changeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    _confirmCode = async (code) => {
        const { user } = this.state
        const { hasTheRegistrationBeenSuccessful, _changeSwiperRoot, _activateNumberPhone, navigation } = this.props
        try {
            await Auth.confirmSignIn(user, code, 'SMS_MFA')
            if (hasTheRegistrationBeenSuccessful.firstTime === 'YES') { _activateNumberPhone(true); _changeSwiperRoot(1) }
            if (hasTheRegistrationBeenSuccessful.firstTime !== 'YES') { navigation.navigate('Home') }
        } catch (error) {
            showMessage({
                message: "Invalid Code.",
                description: "Please check if your code is correct, or otherwise resend a new code.",
                type: "default",
                backgroundColor: colorsPalette.dangerColor,
                color: colorsPalette.secondaryColor, // text color
            });
        }
    }

    async _openBroweserForLoginWithFacebook() {
        const { _changeSwiperRoot, _activateNumberPhone, navigation, _moreUserData } = this.props
        try {
            const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync(fBCredentials.appId, { permissions: ['public_profile'] });
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,picture,last_name`);
                const { email, name, picture, last_name } = await response.json()
                this.setState({ isLoadingFb: true })
                await Auth.federatedSignIn('facebook', { token, expires_at: expires })
                    .then(credentials => {
                        const input = { email, name, avatar: picture.data.url, id: credentials._identityId, last_name, tokenfb: token }
                        API.graphql(graphqlOperation(queries.getUser, { id: credentials._identityId })).then(({ data }) => {
                            if (data.getUser === null) {
                                _moreUserData(input)
                                _activateNumberPhone(true)
                                _changeSwiperRoot(1)
                                this.setState({ isLoadingFb: false })
                            } else {
                                navigation.navigate('Home')
                            }
                        }).catch((e) => console.log('Error', e))
                    }).catch(e => {
                        console.log(e);
                    });
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    _forgetPasswordModal = (value) => {
        this.setState({ forgetPasswordModal: value })
    }

    render() {
        const { numberPhoneState, password, eyeAction, isLoading, isLoadingFb, wrongLoginAnimation } = this.state
        const { numberPhone } = this.props
        return (
            <View style={{
                flex: 1,
                backgroundColor: colorsPalette.secondaryColor,
                width: screenWidth - 60,
                borderRadius: 5,
                shadowColor: colorsPalette.primaryShadowColor,
                shadowOpacity: 1,
                shadowOffset: { width: 1 },
                maxHeight: screenHeight / 2 + 40
            }}>
                <Swiper
                    ref={(swiper) => this.swiper = swiper}
                    onIndexChanged={() => { Keyboard.dismiss() }}
                    showsPagination={false}
                    loop={false}
                    scrollEnabled={false}>
                    <Grid>
                        <Row size={65} style={{ padding: 15, marginTop: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
                            <List style={{ width: "100%", justifyContent: 'space-between' }}>
                                <Text allowFontScaling={false} style={{ fontWeight: 'bold', color: colorsPalette.darkFont, alignSelf: 'center', top: -5 }}>LOGIN WITH YOUR</Text>
                                <ListItem style={{ height: 50, alignItems: 'center', width: "90%" }}>
                                    <PhoneInput
                                        editable={false}
                                        selectTextOnFocus={false}
                                        ref={(ref) => { this.phone = ref; }}
                                        onChangePhoneNumber={() => { this._getNumberPhone() }}
                                        autoFormat={true}
                                        autoCorrect={false}
                                        confirmText="OK"
                                        cancelText="CANCEL"
                                        pickerButtonColor={colorsPalette.primaryColor}
                                        pickerItemStyle={{ fontSize: 18 }}
                                        value={numberPhoneState ? numberPhoneState : numberPhone}
                                        style={{ height: "100%", width: "100%" }}
                                        flagStyle={{ height: 30, width: 40 }}
                                        textStyle={{ fontSize: wp(5), color: colorsPalette.darkFont }}
                                        textProps={{ placeholder: "Phone Number" }}
                                        initialCountry="us" />
                                </ListItem>
                                <ListItem itemDivider style={{ backgroundColor: colorsPalette.secondaryColor, justifyContent: 'center', alignItems: 'center', top: 10 }}>
                                    <Text allowFontScaling={false} style={{ fontWeight: 'bold', color: colorsPalette.darkFont }}>AND</Text>
                                </ListItem>
                                <ListItem style={{ height: 50, alignItems: 'center', width: "90%" }}>
                                    <Input
                                        returnKeyType='send'
                                        onSubmitEditing={() => this.phone.isValidNumber() ? this._submit() : showMessage({
                                            message: "Invalid Number Phone.",
                                            description: "Please, provide a valid number phone.",
                                            type: "default",
                                            backgroundColor: colorsPalette.warningColor,
                                            color: colorsPalette.secondaryColor, // text color
                                        })}
                                        allowFontScaling={false}
                                        autoCorrect={false}
                                        textContentType="password"
                                        style={{ fontSize: wp(5), color: colorsPalette.darkFont }}
                                        selectionColor={colorsPalette.primaryColor}
                                        value={password}
                                        secureTextEntry={!eyeAction}
                                        onChangeText={(value) => this.setState({ password: value })}
                                        placeholderTextColor={colorsPalette.gradientGray}
                                        placeholder="Password" />
                                    <Icon
                                        onPress={() => this.setState({ eyeAction: !eyeAction })}
                                        active name={eyeAction ? "eye" : "eye-off"} style={{ color: colorsPalette.gradientGray }} />
                                </ListItem>
                                <View style={{ alignSelf: 'flex-end', backgroundColor: 'pink', width: "100%" }}>
                                    <ForgottenPassword />
                                </View>
                            </List>
                        </Row>
                        <Row size={35} style={{ justifyContent: 'center', alignItems: 'center', padding: 15, flexDirection: 'column' }}>
                            <Animatable.View
                                animation={wrongLoginAnimation ? "shake" : undefined}
                                onAnimationEnd={() => this.setState({ wrongLoginAnimation: false })}
                                duration={1000}
                                style={{
                                    top: -10,
                                    width: "100%",
                                    shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 1 }, shadowOpacity: 1,
                                }}>
                                <Button
                                    disabled={isLoadingFb || isLoading}
                                    onPress={() => this._submit()}
                                    iconRight
                                    style={{ width: "100%", alignSelf: 'flex-end', backgroundColor: colorsPalette.primaryColor }}>
                                    <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Log In</Text>
                                    {isLoading ? <Spinner color={colorsPalette.secondaryColor} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                                </Button>
                            </Animatable.View>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', top: -4 }}>OR</Text>
                            <Button
                                disabled={isLoadingFb || isLoading}
                                onPress={() => this._openBroweserForLoginWithFacebook()}
                                iconRight style={{
                                    width: "100%",
                                    alignSelf: 'flex-end',
                                    backgroundColor: colorsPalette.fbColor,
                                    shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 1 }, shadowOpacity: 1,
                                }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingLeft: 15 }}>
                                    <Icon name='logo-facebook' style={{ color: colorsPalette.secondaryColor, fontSize: wp(8) }} />
                                    <Text allowFontScaling={false} style={{ left: 10, color: colorsPalette.secondaryColor, fontWeight: 'bold' }}>Continue with facebook</Text>
                                </View>
                                {isLoadingFb ? <Spinner color={colorsPalette.secondaryColor} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                            </Button>
                        </Row>
                    </Grid>

                    <Grid>
                        <Row size={30} style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                            <Text allowFontScaling={false} style={{ color: colorsPalette.gradientGray, fontSize: wp(6.5), textAlign: 'center' }}>Enter the code we send to <Text style={{ color: colorsPalette.darkFont, fontSize: wp(6.5), textAlign: 'center', fontWeight: 'bold' }}>{numberPhone ? numberPhone : numberPhoneState}</Text></Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Button small transparent onPressIn={() => this._changeSwiper(-1)}>
                                    <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(3), color: colorsPalette.darkFont }}>Come Back</Text>
                                </Button>
                            </View>
                        </Row>
                        <Row size={20} style={{ alignSelf: 'center', flexDirection: 'column' }}>
                            <CodeInput
                                disabled={false}
                                keyboardType="numeric"
                                codeLength={6}
                                activeColor={colorsPalette.primaryColor}
                                inactiveColor={colorsPalette.thirdColor}
                                className='border-b'
                                autoFocus={false}
                                ignoreCase={true}
                                inputPosition='center'
                                size={35}
                                onFulfill={(code) => { this._confirmCode(code) }}
                            />
                        </Row>
                        <Row size={50} style={{ justifyContent: 'center', alignItems: 'flex-start' }} />
                    </Grid>
                </Swiper>
            </View>
        );
    }
}

export default withNavigation(Login)
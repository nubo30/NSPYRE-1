import React, { Component } from 'react';
import { Dimensions, Keyboard } from 'react-native'
import { Auth } from 'aws-amplify'
import { Button, Icon, Text, List, ListItem, Input, Content, Spinner, View } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import PhoneInput from 'react-native-phone-input'
import _ from 'lodash'
import replace from 'lodash/replace'
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper'
import { showMessage } from "react-native-flash-message";

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

// Color
import { colorsPalette } from '../../global/static/colors'

// Mensajes de AWS
// Errors Aws
import { errListAws } from '../errorsAws/index'

export default class PhoneRegister extends Component {

    state = {
        numberPhone: "",
        newPassword: "",
        repeatPassword: "",
        invalidPhoneNumberAnimation: false,
        isInValidNumberMessageFlash: "",
        passwordsDoNotMatchAnimation: false,
        passwordsDoNotMatchMessageFlash: "",

        eyeAction: false,
        messageFlash: { cognito: null },
        isLoading: false,
    }

    _getNumberPhone = () => {
        const { _numberPhone } = this.props
        const numberPhoneClear = replace(_.replace(this.phone.getValue(), new RegExp(" ", "g"), ""), new RegExp("-", "g"), "").replace(/[()]/g, '')
        this.setState({ numberPhone: numberPhoneClear })
        _numberPhone(numberPhoneClear, this.state.newPassword)
        this.phone.isValidNumber() ? this._changeSwiper(1) : null
    }

    _verifyNumberPhone = () => {
        if (this.phone.isValidNumber()) {
            this._changeSwiper(1)
        } else {
            this.setState({ invalidPhoneNumberAnimation: true })
            showMessage({
                message: "Invalid Number Phone.",
                description: "Mmmm, I think the phone number is not correct, could you check it please.",
                type: "default",
                duration: 3000,
                backgroundColor: colorsPalette.dangerColor,
                color: colorsPalette.secondaryColor, // text color
            });
        }
    }

    _verifyPassword = () => {
        this.setState({ isLoading: true })
        const { newPassword, repeatPassword } = this.state
        if (newPassword && repeatPassword && newPassword === repeatPassword) {
            this._submit()
        } else {
            showMessage({
                message: "Password.",
                description: "Ooops, Those passwords do not match!",
                type: "default",
                duration: 3000,
                backgroundColor: colorsPalette.dangerColor,
                color: colorsPalette.secondaryColor, // text color
            });
            this.setState({ isLoading: false, passwordsDoNotMatchAnimation: true })
        }
    }

    _submit = async () => {
        const { newPassword } = this.state
        const { _changeSwiperRoot, _userData } = this.props
        try {
            const userData = await Auth.signUp({ username: this.phone.getValue(), password: newPassword })
            _userData(userData)
            _changeSwiperRoot(1)
        } catch (error) {
            this._messageFlashErr(error)
        } finally {
            this.setState({ isLoading: false })
        }
    }

    // Cambiar el swiper para introducir contraseñas
    _changeSwiper = (i) => {
        this.swiper.scrollBy(i)
        this.setState({ messageFlash: { ...this.state.messageFlash, cognito: { message: "" } } })
    }

    _messageFlashErr = (error) => {
        this.setState({ passwordsDoNotMatchAnimation: true })
        switch (error.message) {
            case errListAws.passwordGreaterThanOrEqualTo6_0:
                showMessage({
                    message: "Short password",
                    description: "Please make sure the password is greater than 6 characters.",
                    duration: 3000,
                    type: "default",
                    backgroundColor: colorsPalette.dangerColor,
                    color: colorsPalette.secondaryColor, // text color
                });
                break;
            case errListAws.passwordMustHaveNumericCharacters:
                showMessage({
                    message: "Left Number",
                    description: "It takes numbers to have a more secure password!",
                    type: "default",
                    duration: 3000,
                    backgroundColor: colorsPalette.dangerColor,
                    color: colorsPalette.secondaryColor, // text color
                });
                break;
            case errListAws.passwordGreaterThanOrEqualTo6_1:
                showMessage({
                    message: "Short password",
                    description: "Please make sure the password is greater than 6 characters.",
                    duration: 3000,
                    type: "default",
                    backgroundColor: colorsPalette.dangerColor,
                    color: colorsPalette.secondaryColor, // text color
                });
                break;
            case errListAws.accountExits:
                showMessage({
                    message: "Account used",
                    description: "Oooh, apparently this phone number has already been used, please try another one..",
                    duration: 4000,
                    type: "default",
                    backgroundColor: colorsPalette.dangerColor,
                    color: colorsPalette.secondaryColor, // text color
                });
                break;
            case errListAws.invalidCode:
                showMessage({
                    message: "Invalid Code.",
                    description: "Please check if your code is correct, or otherwise resend a new code.",
                    type: "default",
                    backgroundColor: colorsPalette.dangerColor,
                    color: colorsPalette.secondaryColor, // text color
                });
                break;
            case errListAws.numberPhoneExists:
                showMessage({
                    message: "Account used",
                    description: "Oooh, apparently this phone number has already been used, please try another one..",
                    duration: 4000,
                    type: "default",
                    backgroundColor: colorsPalette.dangerColor,
                    color: colorsPalette.secondaryColor, // text color
                });
                break;
            default:
                showMessage({
                    message: "Something has happened",
                    description: "Please try again!",
                    duration: 4000,
                    type: "default",
                    backgroundColor: colorsPalette.dangerColor,
                    color: colorsPalette.secondaryColor, // text color
                });
        }
    }

    _changeFocusInput = () => {
        this.secondTextInput.focus();
    }

    render() {
        const {
            invalidPhoneNumberAnimation,
            passwordsDoNotMatchAnimation,
            eyeAction,

            isLoading,
            messageFlash,
            repeatPassword,
            newPassword,
            numberPhone } = this.state

        return (
            <View style={{
                flex: 1,
                backgroundColor: colorsPalette.secondaryColor,
                width: screenWidth - 60,
                borderRadius: 5,
                shadowColor: colorsPalette.primaryShadowColor,
                shadowOpacity: 1,
                shadowOffset: { width: 1 },
                maxHeight: screenHeight / 2 + 40,
            }}>
                <Swiper
                    scrollEnabled={false}
                    onIndexChanged={(index) => {
                        Keyboard.dismiss(); this.setState({
                            passwordsDoNotMatchMessageFlash: "",
                            isInValidNumberMessageFlash: ""
                        })
                    }}
                    ref={(swiper) => this.swiper = swiper}
                    showsButtons={false}
                    showsPagination={false}
                    loop={false}>
                    {/* Verify number */}
                    <Grid>
                        <Row size={40} style={{ padding: 15 }}>
                            <List style={{ width: "100%", justifyContent: 'space-between' }}>
                                <ListItem style={{ height: 80, alignItems: 'center', width: "90%", borderBottomColor: colorsPalette.transparent }}>
                                    <Text allowFontScaling={false} style={{ fontWeight: 'bold', color: colorsPalette.gradientGray, fontSize: wp(5) }}>Press the <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontSize: wp(5) }}>flag</Text> to see the <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontSize: wp(5) }}>list of cities</Text></Text>
                                </ListItem>
                                <ListItem style={{ height: 70, alignItems: 'center', width: "90%" }}>
                                    <PhoneInput
                                        editable={false}
                                        selectTextOnFocus={false}
                                        ref={(ref) => { this.phone = ref; }}
                                        onChangePhoneNumber={() => { this._getNumberPhone() }}
                                        autoFormat={true}
                                        buttonTextStyle={{ backgroundColor: 'red' }}
                                        confirmText="OK"
                                        cancelText="CANCEL"
                                        pickerButtonColor={colorsPalette.primaryColor}
                                        pickerItemStyle={{ fontSize: 18 }}
                                        value={numberPhone}
                                        style={{ height: "100%", width: "100%" }}
                                        flagStyle={{ height: 30, width: 40 }}
                                        textStyle={{ fontSize: wp(5), color: colorsPalette.darkFont }}
                                        textProps={{ placeholder: "Your Phone Number" }}
                                        initialCountry="us" />
                                </ListItem>
                            </List>
                        </Row>
                        <Row size={40} style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text allowFontScaling={false} style={{ color: colorsPalette.gradientGray, fontSize: wp(4), top: 25, left: "10%" }}>We will send you a one time sms {'\n'} message.</Text>
                            <Text allowFontScaling={false} style={{ color: colorsPalette.errColor, fontSize: wp(3), alignSelf: 'center', textAlign: 'center' }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                        </Row>
                        <Row size={20} style={{
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            padding: 15,
                            shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 1 }, shadowOpacity: 1,
                            flexDirection: 'column'
                        }}>
                            <Animatable.View
                                animation={invalidPhoneNumberAnimation ? "shake" : undefined}
                                onAnimationEnd={() => this.setState({ invalidPhoneNumberAnimation: false })}
                                duration={1000}
                                style={{ width: "100%" }}>
                                <Button onPressIn={() => this._verifyNumberPhone()}
                                    iconRight style={{ width: "100%", alignSelf: 'flex-end', backgroundColor: colorsPalette.primaryColor }}>
                                    <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Sign Up</Text>
                                    <Icon name='arrow-forward' />
                                </Button>
                            </Animatable.View>
                        </Row>
                    </Grid>

                    {/* Password */}
                    <Grid>
                        <Content padder contentContainerStyle={{ flex: 1 }}>
                            <Row size={25} style={{ flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingTop: 25 }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(6), color: colorsPalette.gradientGray, fontWeight: 'bold' }}>Create a <Text allowFontScaling={false} style={{ fontSize: wp(6), fontWeight: 'bold', color: colorsPalette.darkFont }}>password</Text></Text>
                                <Button small transparent onPressIn={() => this._changeSwiper(-1)}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.gradientGray, fontSize: wp(4), left: -15 }}>Change number <Text allowFontScaling={false} style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(4) }}>{numberPhone}</Text>.</Text>
                                </Button>
                                <Text allowFontScaling={false} style={{ top: 3, color: colorsPalette.gradientGray, fontSize: wp(4) }}>The password must have numbers.</Text>
                            </Row>
                            <Row size={35}>
                                <List style={{ width: "100%", justifyContent: 'center' }}>
                                    <ListItem style={{ height: 70, alignItems: 'center', width: "90%" }}>
                                        <Input
                                            returnKeyType='next'
                                            blurOnSubmit={false}
                                            allowFontScaling={false}
                                            textContentType="telephoneNumber"
                                            style={{ fontSize: wp(6), color: colorsPalette.darkFont }}
                                            selectionColor={colorsPalette.primaryColor}
                                            value={newPassword}
                                            secureTextEntry={!eyeAction}
                                            onChangeText={(value) => this.setState({ newPassword: value })}
                                            placeholderTextColor={colorsPalette.gradientGray}
                                            placeholder="New Password" />
                                        <Icon
                                            onPress={() => this.setState({ eyeAction: !eyeAction })}
                                            active name={eyeAction ? "eye" : "eye-off"} style={{ color: colorsPalette.gradientGray }} />
                                    </ListItem>
                                    <ListItem style={{ height: 70, alignItems: 'center', width: "90%" }}>
                                        <Input
                                            returnKeyType='send'
                                            onSubmitEditing={() => this.phone.isValidNumber() ? this._verifyPassword() : Keyboard.dismiss()}
                                            allowFontScaling={false}
                                            style={{ fontSize: wp(6), color: colorsPalette.darkFont }}
                                            selectionColor={colorsPalette.primaryColor}
                                            value={repeatPassword}
                                            secureTextEntry={!eyeAction}
                                            onChangeText={(value) => this.setState({ repeatPassword: value })}
                                            placeholderTextColor={colorsPalette.gradientGray}
                                            placeholder="Repeat Password" />
                                    </ListItem>
                                </List>
                            </Row>
                            <Row size={40} style={{
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}>
                                <Animatable.View
                                    animation={passwordsDoNotMatchAnimation ? "shake" : undefined}
                                    onAnimationEnd={() => this.setState({ passwordsDoNotMatchAnimation: false })}
                                    duration={1000}
                                    style={{
                                        width: "97%", top: -5,
                                        shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 1 }, shadowOpacity: 1,
                                    }}>
                                    <Button
                                        onPressIn={() => this._verifyPassword()}
                                        iconRight style={{ width: "100%", alignSelf: 'flex-end', backgroundColor: colorsPalette.primaryColor }}>
                                        <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Submit</Text>
                                        {isLoading ? <Spinner color={colorsPalette.secondaryColor} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                                    </Button>
                                </Animatable.View>
                            </Row>
                        </Content>
                    </Grid>
                </Swiper>
            </View>
        );
    }
}
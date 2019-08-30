import React, { Component } from 'react';
import { Dimensions, Keyboard } from 'react-native'
import { Auth } from 'aws-amplify'
import { Button, Icon, Text, List, ListItem, Input, Content, Spinner, View } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import PhoneInput from 'react-native-phone-input'
import _ from 'lodash'
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper'

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

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
        const numberPhoneClear = _.replace(_.replace(this.phone.getValue(), new RegExp(" ", "g"), ""), new RegExp("-", "g"), "").replace(/[()]/g, '')
        this.setState({ numberPhone: numberPhoneClear })
        _numberPhone(numberPhoneClear, this.state.newPassword)
    }

    _verifyNumberPhone = () => {
        this.phone.isValidNumber()
            ? this._changeSwiper(1)
            : this.setState({ messageFlash: { ...this.state.messageFlash, cognito: { message: "Oops, please, verify the number!" } }, invalidPhoneNumberAnimation: true })
    }

    _verifyPassword = () => {
        this.setState({ isLoading: true })
        const { newPassword, repeatPassword } = this.state
        if (newPassword && repeatPassword && newPassword === repeatPassword) {
            this._submit()
            this.setState({ messageFlash: { ...this.state.messageFlash, cognito: { message: "" } } })
        } else {
            this.setState({ isLoading: false, messageFlash: { ...this.state.messageFlash, cognito: { message: "Oops, please, verify the password!" } }, passwordsDoNotMatchAnimation: true })
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
        let err = null;
        this.setState({ passwordsDoNotMatchAnimation: true })
        switch (error.message) {
            case errListAws.passwordGreaterThanOrEqualTo6_0:
                !error.message ? err = { "message": "Password greater than or equal to 6" } : err = { message: "Password greater than or equal to 6" }
                this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
                break;
            case errListAws.passwordMustHaveNumericCharacters:
                !error.message ? err = { "message": "Password must have numeric characters" } : err = { message: "Password must have numeric characters" }
                this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
                break;
            case errListAws.passwordGreaterThanOrEqualTo6_1:
                !error.message ? err = { "message": "Password greater than or equal to 6" } : err = { message: "Password greater than or equal to 6" }
                this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
                break;
            case errListAws.usernameShouldBeAnEmail:
                !error.message ? err = { "message": "Username should be an email" } : err = { message: "Username should be an email" }
                this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
                break;
            case errListAws.accountExits:
                !error.message ? err = { "message": "An account with the given email already exists" } : err = { message: "An account with the given email already exists" }
                this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
                break;
            case errListAws.invalidCode:
                !error.message ? err = { "message": "Invalid verification code provided, please try again" } : err = { message: "Invalid verification code provided, please try again" }
                this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
                break;
            case errListAws.numberPhoneExists:
                !error.message ? err = { "message": "An account with the given phone number already exist" } : err = { message: "An account with the given phone number already exist" }
                this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
                break;
            default:
                !error.message ? err = { "message": error } : err = error
                this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
        }
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
                backgroundColor: '#FFF',
                width: screenWidth - 60,
                borderRadius: 5,
                shadowColor: "rgba(0,0,0,0.3)",
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
                                <ListItem style={{ height: 80, alignItems: 'center', width: "90%", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                                    <Text allowFontScaling={false} style={{ fontWeight: 'bold', color: "#E0E0E0", fontSize: wp(5) }}>Press the <Text allowFontScaling={false} style={{ color: "#333", fontSize: wp(5) }}>flag</Text> to see the <Text allowFontScaling={false} style={{ color: "#333", fontSize: wp(5) }}>list of cities</Text></Text>
                                </ListItem>
                                <ListItem style={{ height: 70, alignItems: 'center', width: "90%" }}>
                                    <PhoneInput
                                        allowFontScaling={false}
                                        editable={false} selectTextOnFocus={false}
                                        ref={(ref) => { this.phone = ref; }}
                                        onChangePhoneNumber={() => { this._getNumberPhone() }}
                                        autoFormat={true}
                                        buttonTextStyle={{ backgroundColor: 'red' }}
                                        confirmText="OK"
                                        cancelText="CANCEL"
                                        pickerButtonColor="#E91E63"
                                        pickerItemStyle={{ fontSize: 18 }}
                                        value={numberPhone}
                                        style={{ height: "100%", width: "100%" }}
                                        flagStyle={{ height: 30, width: 40 }}
                                        textStyle={{ fontSize: wp(5), color: '#333' }}
                                        textProps={{ placeholder: "Your Phone Number" }}
                                        initialCountry="us" />
                                </ListItem>
                            </List>
                        </Row>
                        <Row size={40} style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text allowFontScaling={false} style={{ color: "#E0E0E0", fontSize: wp(4.5), top: 25, left: "10%" }}>We will send you a one time sms {'\n'} message.</Text>
                            <Text allowFontScaling={false} style={{ color: "#F44336", fontSize: wp(3), alignSelf: 'center', textAlign: 'center', fontWeight: '100' }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                        </Row>
                        <Row size={20} style={{
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            padding: 15,
                            shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                            flexDirection: 'column'
                        }}>
                            <Animatable.View
                                animation={invalidPhoneNumberAnimation ? "shake" : undefined}
                                onAnimationEnd={() => this.setState({ invalidPhoneNumberAnimation: false })}
                                duration={1000}
                                style={{ width: "100%" }}>
                                <Button onPressIn={() => this._verifyNumberPhone()}
                                    iconRight style={{ width: "100%", alignSelf: 'flex-end', backgroundColor: '#E91E63' }}>
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
                                <Text allowFontScaling={false} style={{ fontSize: wp(6), color: "#E0E0E0", fontWeight: 'bold' }}>Create a <Text allowFontScaling={false} style={{ fontSize: wp(6), fontWeight: 'bold', color: "#333" }}>password</Text></Text>
                                <Button small transparent onPressIn={() => this._changeSwiper(-1)}>
                                    <Text allowFontScaling={false} style={{ color: '#E0E0E0', fontSize: wp(4), fontWeight: '100', left: -15 }}>Change number <Text allowFontScaling={false} style={{ fontWeight: 'bold', color: '#333', fontSize: wp(4) }}>{numberPhone}</Text>.</Text>
                                </Button>
                                <Text allowFontScaling={false} style={{ top: 3, color: '#E0E0E0', fontSize: wp(4), fontWeight: '100' }}>The password must have numbers.</Text>
                            </Row>
                            <Row size={35}>
                                <List style={{ width: "100%", justifyContent: 'center' }}>
                                    <ListItem style={{ height: 70, alignItems: 'center', width: "90%" }}>
                                        <Input
                                            allowFontScaling={false}
                                            textContentType="telephoneNumber"
                                            style={{ fontSize: wp(6), color: "#333" }}
                                            selectionColor="#E91E63"
                                            value={newPassword}
                                            secureTextEntry={!eyeAction}
                                            onChangeText={(value) => this.setState({ newPassword: value })}
                                            placeholderTextColor="#E0E0E0"
                                            placeholder="New Password" />
                                        <Icon
                                            onPress={() => this.setState({ eyeAction: !eyeAction })}
                                            active name={eyeAction ? "eye" : "eye-off"} style={{ color: "#E0E0E0" }} />
                                    </ListItem>
                                    <ListItem style={{ height: 70, alignItems: 'center', width: "90%" }}>
                                        <Input
                                            allowFontScaling={false}
                                            style={{ fontSize: wp(6), color: "#333" }}
                                            selectionColor="#E91E63"
                                            value={repeatPassword}
                                            secureTextEntry={!eyeAction}
                                            onChangeText={(value) => this.setState({ repeatPassword: value })}
                                            placeholderTextColor="#E0E0E0"
                                            placeholder="Repeat Password" />
                                    </ListItem>
                                </List>
                            </Row>
                            <Row size={40} style={{
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}>
                                <Text allowFontScaling={false} style={{ top: "20%", color: "#F44336", fontSize: wp(3), fontWeight: '100' }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                                <Animatable.View
                                    animation={passwordsDoNotMatchAnimation ? "shake" : undefined}
                                    onAnimationEnd={() => this.setState({ passwordsDoNotMatchAnimation: false })}
                                    duration={1000}
                                    style={{
                                        width: "97%", top: -5,
                                        shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                                    }}>
                                    <Button
                                        onPressIn={() => this._verifyPassword()}
                                        iconRight style={{ width: "100%", alignSelf: 'flex-end', backgroundColor: '#E91E63' }}>
                                        <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Submit</Text>
                                        {isLoading ? <Spinner color="#FFF" size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
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
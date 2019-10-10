import React, { Component } from 'react';
import { Dimensions, Keyboard } from 'react-native'
import { Auth } from 'aws-amplify'
import { Content, Form, Item, Input, Icon, Button, Text, View, Header, Body, Title } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import PhoneInput from 'react-native-phone-input'
import replace from 'lodash/replace'
import Modal from 'react-native-modal';
import _ from 'lodash'
import CodeInput from 'react-native-confirmation-code-input';
import { Grid, Row } from 'react-native-easy-grid'

const screenHeight = Dimensions.get('screen').height

// Colors
import { colorsPalette } from '../../../global/static/colors'
import { MyStatusBar } from '../../../global/statusBar'

import { errListAws } from '../errorsAws'

class Login extends Component {
    state = {
        numberPhoneState: "",
        password: "",
        hiddenPasswords: true,
        messageFlash: { cognito: null },
        openModalForValidatePhoneWithSMS: false,
        user: {}
    }

    _getNumberPhone = () => {
        const numberPhoneClear = replace(replace(this.phone.getValue(), new RegExp(" ", "g"), ""), new RegExp("-", "g"), "").replace(/[()]/g, '')
        this.setState({ numberPhoneState: numberPhoneClear })
    }

    _validateData = () => {
        const { password } = this.state
        const { _isLoading, _errAnimation } = this.props
        _isLoading(true)
        this.phone.isValidNumber()
            ? password
                ? this._submit()
                : this.setState({ messageFlash: { cognito: { message: "Left password" } } })
            : this.setState({ messageFlash: { cognito: { message: "Invalid number phone" } } });
        setTimeout(() => { _isLoading(false), _errAnimation(true) }, 500);
    }

    _submit = async () => {
        const { password } = this.state
        const { _isLoading, _errAnimation } = this.props
        _isLoading(true)
        try {
            const user = await Auth.signIn({ username: this.phone.getValue(), password })
            if (user.challengeName === 'SMS_MFA') { this.setState({ user, openModalForValidatePhoneWithSMS: true, messageFlash: { cognito: "" } }) }
            _isLoading(false)
        } catch (error) {
            _errAnimation(true)
            this._messageFlashErr(error)
            _isLoading(false)
        }
    }

    _confirmCode = async (code) => {
        const { user } = this.state
        const { _isLoading, _confirmAccount, _changeSwiper } = this.props
        try {
            await Auth.confirmSignIn(user, code, 'SMS_MFA')
            _isLoading(false)
            _confirmAccount(false)
            this.setState({ openModalForValidatePhoneWithSMS: false })
            _changeSwiper(1)
        } catch (error) {
            this._messageFlashErr(error)
        }
    }

    _resendCode = async () => {
        try {
            await Auth.resendSignUp(this.phone.getValue())
            Keyboard.dismiss()
            Toast.show({
                text: "The verification code has been sent again",
                buttonText: "Okay",
                duration: 3000,
                type: "success"
            })
        } catch (error) {
            this._messageFlashErr(error)
            Keyboard.dismiss()
        }
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
                !error.message ? err = { "message": "An account with the given phone number already exist" } : err = { message: "An account with the given phone number already exist." }
                this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err }, activateOptionsConfirn: true })
                break;
            case errListAws.combinationNotFound:
                !error.message ? err = { "message": "Something wrong has happened, close this window and try again" } : err = { message: "Something wrong has happened, close this window and try again." }
                this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
                break;
            default:
                !error.message ? err = { "message": error } : err = error
                this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
        }
    }

    componentWillReceiveProps(nextPros) {
        this.setState({
            numberPhoneState: nextPros.numberPhone
        })
    }

    render() {
        const { numberPhoneState, password, hiddenPasswords, messageFlash, openModalForValidatePhoneWithSMS } = this.state
        const { _loginOrSignUp, isLoading, confirmAccount } = this.props
        return (
            <Content contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
                <View>
                    {confirmAccount && <Text allowFontScaling={false} style={{ fontSize: wp(5), alignSelf: 'center', color: colorsPalette.darkFont, padding: 10 }}>Please confirm your account.</Text>}
                    <Form style={{ width: '90%', alignSelf: 'center', right: 5 }}>
                        <Item>
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
                                value={numberPhoneState}
                                style={{ height: "100%", width: "81%" }}
                                flagStyle={{ height: 30, width: 40 }}
                                textStyle={{ fontSize: wp(5) }}
                                textProps={{ placeholder: "Phone Number" }}
                                initialCountry="us" />
                            <Button transparent disabled>
                                <Icon type="Entypo" name="phone" style={{ color: colorsPalette.gradientGray }} />
                            </Button>
                        </Item>
                        <Item>
                            <Input
                                onSubmitEditing={() => this._validateData()}
                                allowFontScaling={false}
                                value={password}
                                onChangeText={(password) => this.setState({ password })}
                                secureTextEntry={hiddenPasswords}
                                returnKeyType="done"
                                maxLength={256}
                                autoCapitalize="none"
                                keyboardType="visible-password"
                                textContentType="password"
                                placeholder="Password"
                                placeholderTextColor={colorsPalette.gradientGrayDark}
                                style={{ fontSize: wp(5) }} />
                            <Button transparent onPress={() => this.setState({ hiddenPasswords: !hiddenPasswords })}>
                                <Icon type="Ionicons" name={hiddenPasswords ? 'md-eye-off' : 'md-eye'} style={{ color: colorsPalette.gradientGray }} />
                            </Button>
                        </Item>
                    </Form>
                    <Button
                        disabled={isLoading}
                        transparent style={{ left: 15 }} onPress={() => _loginOrSignUp(true)}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.gradientGray }}>If you don't have an account, <Text style={{ fontSize: wp(4), color: colorsPalette.primaryColor, fontWeight: 'bold' }}>create it!</Text></Text>
                    </Button>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                    <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.errColor }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                </View>
                <Modal
                    isVisible={openModalForValidatePhoneWithSMS}
                    backdropColor={colorsPalette.transparent}
                    style={{ justifyContent: 'flex-end', margin: 0 }}>
                    <View
                        style={{
                            borderTopStartRadius: 30,
                            borderTopEndRadius: 30,
                            shadowOpacity: 1,
                            shadowOffset: { width: 0, height: -10 },
                            shadowColor: 'rgba(0,0,0,0.2)',
                            height: screenHeight / 2 + 160,
                            backgroundColor: '#FFF'
                        }}>
                        <Header transparent>
                            <Icon type="AntDesign" name="minus" style={{ position: 'absolute', fontSize: wp(12), top: -5, color: colorsPalette.grayPlaceholder }} />
                            <Body>
                                <Title allowFontScaling={false}>Telephone Number Verification</Title>
                            </Body>
                        </Header>
                        <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
                        <Grid>
                            <Row size={20} style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                                <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontSize: wp(6), textAlign: 'center' }}>Enter the code we send to {numberPhoneState}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontSize: wp(3), textAlign: 'center', left: 22 }}>Change</Text>
                                    <Button small transparent style={{ left: 11 }} onPressIn={() => this.setState({ activateOptionsConfirn: false, openModalForValidatePhoneWithSMS: false, messageFlash: { cognito: null } })}>
                                        <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(3), color: colorsPalette.darkFont }}>phone number</Text>
                                    </Button>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontSize: wp(3), textAlign: 'center' }}>o</Text>
                                    <Button small transparent onPress={() => this._resendCode()}>
                                        <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(3), color: colorsPalette.darkFont, right: 10 }}>forward SMS</Text>
                                    </Button>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontSize: wp(3), textAlign: 'center', left: -25 }}>.</Text>
                                </View>
                            </Row>
                            <Row size={15} style={{ alignSelf: 'center' }}>
                                <CodeInput
                                    allowFontScaling={false}
                                    disable={false}
                                    keyboardType="numeric"
                                    codeLength={6}
                                    activeColor={colorsPalette.primaryColor}
                                    inactiveColor={colorsPalette.gradientGray}
                                    className='border-b'
                                    autoFocus={true}
                                    ignoreCase={true}
                                    inputPosition='center'
                                    size={35}
                                    onFulfill={(code) => { this._confirmCode(code) }} />
                            </Row>
                            <Row size={65} style={{ flexDirection: 'column' }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.errColor, alignSelf: 'center', top: 20, textAlign: 'center' }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                            </Row>
                        </Grid>
                    </View>
                </Modal>
            </Content>
        );
    }
}

export default Login
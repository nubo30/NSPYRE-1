import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Auth } from 'aws-amplify'
import { Header, Title, Content, Footer, Button, Body, Icon, Text, View, Item, Input, Spinner, Toast } from 'native-base';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import PhoneInput from 'react-native-phone-input'
import Swiper from 'react-native-swiper'
import replace from 'lodash/replace'
import CodeInput from 'react-native-confirmation-code-input';

// Colors
import { colorsPalette } from '../../../global/static/colors'
import { MyStatusBar } from '../../../global/statusBar'

const heightScreen = Dimensions.get('screen').height

export default class ForgotPassword extends Component {
    state = {
        modalAnimated: false,
        hiddenPasswords: false,
        numberPhoneState: "",
        newPassword: "",
        repeatNewPassword: "",
        messageFlash: { cognito: null },
        isLoading: false,
        sendEmailForRecoveryPassword: false,
        phoneNumber: "",
        isValidNumber: false,
        loading: false
    };

    _getNumberPhone = () => {
        const numberPhoneClear = replace(replace(this.phone.getValue(), new RegExp(" ", "g"), ""), new RegExp("-", "g"), "").replace(/[()]/g, '')
        this.setState({ numberPhoneState: numberPhoneClear, isValidNumber: this.phone.isValidNumber() })
    }

    _submit = () => {
        this._sendNumberPhoneForRecoveryPassword()
    }

    // SEND SMS FOR RECOVERY THE PASSWORD
    _sendNumberPhoneForRecoveryPassword = async () => {
        this.setState({ loading: true })
        const username = this.phone.getValue()
        try {
            await Auth.forgotPassword(username)
            this.setState({ isValidNumber: false })
            this.phone.isValidNumber() && this.swiper.scrollBy(1)
        } catch (error) {
            let err = null
            switch (error.message) {
                case "Username/client id combination not found.":
                    !error.message ? err = { "message": "Phone number not found" } : err = { message: "Phone number not found" }
                    this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
                    break;
                default:
                    !error.message ? err = { "message": error } : err = error
                    this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
            }
        }
    }

    // NEW PASSWORD
    _recoveryPasswordAfterGetPinOfNumberPhone = async (code) => {
        try {
            await Auth.forgotPasswordSubmit(this.phone.getValue(), code, this.state.newPassword)
            Toast.show({
                duration: 3000,
                position: "top",
                type: "success",
                text: "Password reset successfully!"

            })
            this.setState({ modalAnimated: false })
        } catch (error) {
            let err = null
            switch (error.message) {
                case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
                    !error.message ? err = { "message": "Password must have length greater than or equal to 6" } : err = { message: "Password must have length greater than or equal to 6" }
                    this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
                    break;
                default:
                    !error.message ? err = { "message": error } : err = error
                    this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
            }
        } finally {
            this.setState({ loading: false })
        }
    }

    render() {
        const { modalAnimated, numberPhoneState, newPassword, hiddenPasswords, messageFlash, isLoading } = this.state
        return (
            <View style={{ flex: 1 }}>
                <Button transparent onPress={() => this.setState({ modalAnimated: true })}>
                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkText, fontSize: wp(3) }}>Forgot password?</Text>
                </Button>

                <Modal
                    isVisible={modalAnimated}
                    onSwipeComplete={() => this.setState({ modalAnimated: false })}
                    backdropColor="rgba(0,0,0,0.0)"
                    swipeDirection={['down']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}>
                    <View
                        style={{
                            borderTopStartRadius: 10,
                            borderTopEndRadius: 10,
                            shadowOpacity: 1,
                            shadowOffset: { width: 0, height: -10 },
                            shadowColor: "rgba(0,0,0,0.2)",
                            height: heightScreen / 2 + 185,
                            backgroundColor: '#FFF'
                        }}>
                        <Header transparent>
                            <Icon type="AntDesign" name="minus" style={{ position: 'absolute', fontSize: wp(12), top: -5, color: colorsPalette.grayPlaceholder }} />
                            <Body>
                                <Title allowFontScaling={false}>Forgot password?</Title>
                            </Body>
                        </Header>
                        <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
                        <Swiper
                            ref={r => this.swiper = r}
                            showsPagination={false}
                            pagingEnabled={false}
                            loop={false} scrollEnabled={false}>
                            <Content scrollEnabled={true} padder contentContainerStyle={{ padding: 30, flex: 0.9 }}>
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
                                <Text allowFontScaling={false} style={{ top: 20, fontSize: wp(3), color: colorsPalette.darkFont }}>
                                    Please enter your phone number.
                                </Text>
                            </Content>
                            <Content scrollEnabled={true} padder contentContainerStyle={{ padding: 30, flex: 0.9 }}>
                                <Item style={{ borderBottomColor: colorsPalette.transparent }}>
                                    <Input
                                        allowFontScaling={false}
                                        value={newPassword}
                                        onChangeText={(newPassword) => this.setState({ newPassword })}
                                        secureTextEntry={hiddenPasswords}
                                        returnKeyType="done"
                                        maxLength={256}
                                        autoCapitalize="none"
                                        keyboardType="visible-password"
                                        textContentType="password"
                                        placeholder="New password"
                                        selectionColor={colorsPalette.primaryColor}
                                        placeholderTextColor={colorsPalette.gradientGrayDark}
                                        style={{ fontSize: wp(5), textAlign: 'center', left: 20 }} />
                                    <Button transparent onPress={() => this.setState({ hiddenPasswords: !hiddenPasswords })}>
                                        <Icon type="Ionicons" name={hiddenPasswords ? 'md-eye-off' : 'md-eye'} style={{ color: colorsPalette.gradientGray }} />
                                    </Button>
                                </Item>
                                <Item style={{ borderBottomColor: colorsPalette.transparent }}>
                                    <CodeInput
                                        ref="codeInputRef"
                                        keyboardType="numeric"
                                        codeLength={6}
                                        activeColor={colorsPalette.primaryColor}
                                        inactiveColor={colorsPalette.gradientGray}
                                        className='border-circle'
                                        autoFocus={false}
                                        ignoreCase={true}
                                        inputPosition='center'
                                        size={25}
                                        onFulfill={(code) => this._recoveryPasswordAfterGetPinOfNumberPhone(code)} />
                                    {this.state.newPassword === "" && <Button transparent style={{ width: "100%", position: 'absolute' }} onPress={() => this.setState({ messageFlash: { cognito: { message: "Please enter a password first" } } })} />}
                                </Item>
                                <Text allowFontScaling={false} style={{ top: 20, fontSize: wp(3), color: colorsPalette.darkFont, textAlign: 'center' }}>
                                    We have sent you a SMS to the number phone {<Text style={{ fontWeight: "bold", color: colorsPalette.darkFont }}>{this.state.numberPhoneState}</Text>}, use this CODE to fill in the following
                            </Text>
                            </Content>
                        </Swiper>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 0.1, top: -20 }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.errColor }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                        </View>
                        <Footer style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderTopColor: 'rgba(0,0,0,0.0)' }}>
                            <Button
                                disabled={!this.state.isValidNumber}
                                onPress={() => this._submit()}
                                style={{ width: "60%", alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.isValidNumber ? colorsPalette.primaryColor : colorsPalette.gradientGray }}>
                                {isLoading ? <Spinner color={colorsPalette.secondaryColor} size="small" /> :
                                    <Text allowFontScaling={false} style={{ letterSpacing: 1, color: colorsPalette.secondaryColor }}>Submit</Text>}
                            </Button>
                        </Footer>
                    </View>
                </Modal>
            </View>
        );
    }
}
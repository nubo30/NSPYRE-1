import React, { Component } from "react";
import { Auth } from 'aws-amplify'
import { Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { View, Container, Header, Left, Button, Icon, Right, Text, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Row, Grid } from 'react-native-easy-grid'
import Swiper from 'react-native-swiper'
import PhoneInput from 'react-native-phone-input'
import CodeInput from 'react-native-confirmation-code-input';
import { showMessage } from "react-native-flash-message";

// Colors
import { colorsPalette } from '../global/static/colors'


class PasswordForget extends Component {
    state = {
        sendEmailForRecoveryPassword: false,
        loading: false,
        phoneNumber: "",
        messageFlash: "",
        newPassword: "",
        swiperIndex: 0
    }

    _getNumberPhone = () => {
        this.setState({
            phoneNumber: this.phone.getValue(),
            sendEmailForRecoveryPassword: this.phone.isValidNumber()
        })
    }


    // SEND EMAIL FOR RECOVERY THE PASSWORD
    _sendNumberPhoneForRecoveryPassword = async () => {
        this.setState({ loading: true })
        const username = this.state.phoneNumber
        try {
            await Auth.forgotPassword(username)
            this.refs.swiper.scrollBy(1)
            this.setState({ loading: false })
        } catch (error) {
            this.setState({ loading: false })
            switch (error.message) {
                case "Username/client id combination not found.":
                    showMessage({
                        message: "Number Phone",
                        description: "Phone number not found.",
                        type: "default",
                        duration: 4000,
                        backgroundColor: colorsPalette.dangerColor,
                        color: colorsPalette.secondaryColor, // text color
                    });
                    break;
                default:
                    showMessage({
                        message: "Failed",
                        description: "Al has happened, we could not finish the process, could you try again, please!",
                        type: "default",
                        duration: 4000,
                        backgroundColor: colorsPalette.dangerColor,
                        color: colorsPalette.secondaryColor, // text color
                    });
            }
        }
    }

    // NEW PASSWORD
    _recoveryPasswordAfterGetPinOfNumberPhone = async (code) => {
        const { _forgetPasswordModal } = this.props
        try {
            await Auth.forgotPasswordSubmit(this.state.phoneNumber, code, this.state.newPassword)
            this.setState({ modalVisible: false })
            showMessage({
                message: "Done!",
                description: "The password has been updated correctly!",
                type: "default",
                duration: 4000,
                backgroundColor: colorsPalette.validColor,
                color: colorsPalette.secondaryColor, // text color
            });
            _forgetPasswordModal(false)
        } catch (error) {
            switch (error.message) {
                case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
                    showMessage({
                        message: "Invalid Password.",
                        description: "Password must have length greater than or equal to 6!",
                        type: "default",
                        duration: 4000,
                        backgroundColor: colorsPalette.dangerColor,
                        color: colorsPalette.secondaryColor, // text color
                    });
                    break;
                default:
                    showMessage({
                        message: "Failed",
                        description: "Al has happened, we could not finish the process, could you try again, please!",
                        type: "default",
                        duration: 4000,
                        backgroundColor: colorsPalette.dangerColor,
                        color: colorsPalette.secondaryColor, // text color
                    });
            }
        } finally {
            this.setState({ loading: false })
        }
    }

    _changeSwiper = (i) => {
        this.refs.swiper.scrollBy(i)
    }

    render() {
        const { phoneNumber, swiperIndex } = this.state
        const { forgetPasswordModal, _forgetPasswordModal } = this.props
        return (
            <Modal
                transparent={false}
                hardwareAccelerated={true}
                transparent={false}
                visible={forgetPasswordModal}
                animationType="slide"
                presentationStyle="fullScreen"
                onRequestClose={() => { }}>
                <Container>
                    <Header transparent>
                        <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Button
                                transparent
                                onPress={() => swiperIndex === 1 ? this._changeSwiper(-1) : _forgetPasswordModal(false)}>
                                <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(4) }}>Close</Text>
                            </Button>
                        </Left>
                        <Right />
                    </Header>
                    <Swiper
                        onIndexChanged={(index) => this.setState({ swiperIndex: index })}
                        loop={false}
                        ref="swiper"
                        removeClippedSubviews={true}
                        scrollEnabled={false}
                        showsPagination={false}
                        bounces={true}>

                        {/* ENTER PHONE NUMBER FOR RECOVERY PASSWORD */}
                        <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                            <Grid style={{ flex: 1 }}>
                                <Row size={20} style={{ justifyContent: "center", alignItems: "flex-end", bottom: 10, padding: 40 }}>
                                    <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: wp(3), color: colorsPalette.darkFont }}>Please, enter your number phone, we will be sending a PIN such phone so you can reset your password.</Text>
                                </Row>
                                <Row size={20} style={{ justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ width: "80%", borderBottomWidth: 1, borderBottomColor: colorsPalette.primaryColor, maxHeight: 50 }}>
                                        <PhoneInput
                                            editable={false} selectTextOnFocus={false}
                                            ref={(ref) => { this.phone = ref; }}
                                            onChangePhoneNumber={() => { this._getNumberPhone() }}
                                            autoFormat={true}
                                            buttonTextStyle={{ backgroundColor: 'red' }}
                                            confirmText="OK"
                                            cancelText="CANCEL"
                                            pickerButtonColor={colorsPalette.primaryColor}
                                            pickerItemStyle={{ fontSize: 18 }}
                                            value={phoneNumber}
                                            style={{ height: "100%", width: "100%" }}
                                            flagStyle={{ height: 30, width: 40 }}
                                            textStyle={{ fontSize: wp(6), color: colorsPalette.darkFont }}
                                            textProps={{ placeholder: "Your Phone Number" }}
                                            initialCountry="us" />
                                    </View>
                                </Row>
                                <Row size={10} style={{ justifyContent: "center", alignItems: "flex-start" }}>
                                    <Button small iconRight
                                        onPress={() => this._sendNumberPhoneForRecoveryPassword()}
                                        disabled={!this.state.loading}
                                        style={{ backgroundColor: this.state.sendEmailForRecoveryPassword ? colorsPalette.primaryColor : colorsPalette.gradientGray, marginTop: 15 }}>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.secondaryColor }}>Submit</Text>
                                        {!this.state.loading
                                            ? <Icon type="Ionicons" name="md-send" />
                                            : <Spinner color={colorsPalette.secondaryColor} size="small" hidesWhenStopped={true} style={{ right: 5 }} />}
                                    </Button>
                                </Row>
                                <Row size={50} style={{ justifyContent: "center" }}>
                                    <Text scrollEnabled={false} style={{ fontSize: wp(4), color: colorsPalette.errColor, marginTop: 50 }}>
                                        {this.state.messageFlash.cognito && this.state.messageFlash.cognito.message}
                                    </Text>
                                </Row>
                            </Grid>
                        </KeyboardAvoidingView>

                        {/* ENTER USERNAME, CODE AND NEWPASSWORD  */}
                        <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                            <Grid style={{ flex: 1 }}>
                                <Row size={20} style={{ justifyContent: "center", alignItems: "flex-end", bottom: 10, padding: 40 }}>
                                    <Text style={{ textAlign: 'center', fontSize: wp(4), color: colorsPalette.darkFont }}>
                                        We have sent you a PIN to the email {<Text style={{ fontWeight: "bold", color: colorsPalette.darkFont }}>{this.state.email}</Text>}, use this PIN to fill in the following
                                    </Text>
                                </Row>
                                <Row size={10} style={{ justifyContent: "center", alignItems: "flex-start" }}>
                                    <View style={{ width: "80%", borderBottomWidth: 1, borderBottomColor: colorsPalette.primaryColor }}>
                                        <TextInput
                                            maxLength={99} selectionColor={colorsPalette.primaryColor}
                                            placeholder="New password" secureTextEntry
                                            placeholderTextColor={colorsPalette.darkFont} autoFocus={false}
                                            underlineColorAndroid={colorsPalette.transparent}
                                            onChangeText={(newPassword) => this.setState({ newPassword })}
                                            value={this.state.newPassword}
                                            style={{ fontSize: wp(7), width: "100%", color: colorsPalette.darkFont, textAlign: "center", top: -5 }} />
                                    </View>
                                </Row>
                                <Row size={20} style={{ justifyContent: "center", alignItems: "center", marginBottom: 40 }}>
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
                                        onFulfill={(code) => this._recoveryPasswordAfterGetPinOfNumberPhone(code)}
                                    />
                                </Row>
                                <Row size={50} style={{ justifyContent: "center" }} />
                            </Grid>
                        </KeyboardAvoidingView>
                    </Swiper>
                </Container>
            </Modal>
        )
    }
}


export default (PasswordForget)
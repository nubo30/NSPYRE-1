import React, { Component } from "react";
import { Auth } from 'aws-amplify'
import { Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { View, Container, Header, Left, Button, Icon, Body, Right, Text, Spinner, Toast } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Row, Grid } from 'react-native-easy-grid'
import Swiper from 'react-native-swiper'
import { isEmail } from 'validator'
import CodeInput from 'react-native-confirmation-code-input';

class PasswordForget extends Component {
    state = {
        modalVisible: false,
        indexSwiper: 0,
        sendEmailForRecoveryPassword: false,
        loading: false,
        email: "",
        messageFlash: "",
        newPassword: "",
    }

    handleEmailForRecoveryText = (email) => {
        this.setState({ sendEmailForRecoveryPassword: isEmail(email), email: email })
    }

    // componentDidMount() { this.inputEmail && this.inputEmail.focus() }

    // SEND EMAIL FOR RECOVERY THE PASSWORD
    sendEmailForRecoveryPassword = async () => {
        try {
            await Auth.forgotPassword(this.state.email)
            this.refs.swiper.scrollBy(1)
            this.setState({ loading: false })
        } catch (error) {
            let err = null
            this.refs.swiper.scrollBy(1)
            switch (error.message) {
                case "Username/client id combination not found.":
                    !error.message ? err = { "message": "Email not found" } : err = { message: "Email not found" }
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

    // NEW PASSWORD
    recoveryPasswordAfterGetPinOfEmail = async (code) => {
        try {
            await Auth.forgotPasswordSubmit(this.state.email, code, this.state.newPassword)
            this.setState({ modalVisible: false })
            Toast.show({
                duration: 3000,
                position: "top",
                type: "success",
                text: "Password reset successfully!"

            })
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
        return (
            <View>
                <Button transparent
                    onPress={() => { this.setState({ modalVisible: true }) }}>
                    <Text style={{ color: "#fff", fontSize: wp('4.5%') }} >Have you forgotten the password?</Text>
                </Button>
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={this.state.modalVisible}
                    animationType="slide"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Container>
                        <Header style={{ width: "100%", height: Platform.OS === 'android' ? 55 : 70, backgroundColor: "#FFF", borderBottomColor: "#FFF" }}>
                            <Left>
                                <Button
                                    disabled={this.props.confirmData}
                                    onPress={() => this.setState({ modalVisible: false })}
                                    transparent>
                                    <Icon name='close' style={{
                                        fontSize: Platform.OS === 'android' ? 30 : 45,
                                        top: Platform.OS === 'android' ? -2 : -7,
                                        color: "#D81B60"
                                    }} />
                                </Button>
                            </Left>
                            <Body />
                            <Right />
                        </Header>
                        <Swiper
                            loop={false}
                            ref='swiper'
                            index={this.state.indexSwiper}
                            removeClippedSubviews={true} scrollEnabled={false}
                            showsPagination={false} bounces={true}>
                            {/* ENTER EMAIL FOR RECOVERY PASSWORD */}
                            <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                                <Grid style={{ flex: 1 }}>
                                    <Row size={20} style={{ justifyContent: "center", alignItems: "flex-end", bottom: 10, padding: 40 }}>
                                        <Text style={{ textAlign: "center", fontSize: wp(4) }}>Please, enter your email, we will be sending a PIN such email so you can reset your password.</Text>
                                    </Row>
                                    <Row size={20} style={{ justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width: "80%", borderBottomWidth: 1, borderBottomColor: "#D81B60" }}>
                                            <TextInput
                                                maxLength={99} keyboardType="email-address" selectionColor="#D81B60"
                                                placeholder="Write your email"
                                                // ref={(ref) => { this.inputEmail = ref; }}
                                                placeholderTextColor="#333" autoFocus={false}
                                                underlineColorAndroid='rgba(0,0,0,0.0)'
                                                onChangeText={(email) => this.handleEmailForRecoveryText(email)}
                                                value={this.state.email}
                                                style={{ fontSize: wp(7), width: "100%", color: "#333", textAlign: "center", top: -5 }} />
                                        </View>
                                    </Row>
                                    <Row size={10} style={{ justifyContent: "center", alignItems: "flex-start" }}>
                                        <Button
                                            onPress={() => { this.sendEmailForRecoveryPassword(); this.setState({ loading: true }) }}
                                            iconRight small
                                            disabled={!this.state.sendEmailForRecoveryPassword}
                                            style={{
                                                backgroundColor: this.state.sendEmailForRecoveryPassword ? "#D81B60" : "#F48FB1",
                                                borderRadius: "50%", marginTop: 15
                                            }}>
                                            <Text>Submit</Text>
                                            {!this.state.loading
                                                ? <Icon name="send" />
                                                : <Spinner color='#FFF' size="small" hidesWhenStopped={true} animating={this.state.loading} style={{ right: 5 }} />}
                                        </Button>
                                    </Row>
                                    <Row size={50} style={{ justifyContent: "center" }}>
                                        <Text style={{ fontSize: wp(4.5), color: "#333", marginTop: 50 }}>
                                            {this.state.messageFlash.cognito && this.state.messageFlash.cognito.message}
                                        </Text>
                                    </Row>
                                </Grid>
                            </KeyboardAvoidingView>

                            {/* ENTER USERNAME, CODE AND NEWPASSWORD  */}
                            <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                                <Grid style={{ flex: 1 }}>
                                    <Row size={20} style={{ justifyContent: "center", alignItems: "flex-end", bottom: 10, padding: 40 }}>
                                        <Text style={{ textAlign: 'center', fontSize: wp(4), color: "#333" }}>
                                            We have sent you a PIN to the email {<Text style={{ fontWeight: "bold", color: "#333" }}>{this.state.email}</Text>}, use this PIN to fill in the following
                                        </Text>
                                    </Row>
                                    <Row size={20} style={{ justifyContent: "center", alignItems: "center", marginBottom: 40 }}>
                                        <CodeInput
                                            ref="codeInputRef"
                                            keyboardType="numeric"
                                            codeLength={6}
                                            activeColor='#D81B60'
                                            inactiveColor='#FCE4EC'
                                            className='border-circle'
                                            autoFocus={false}
                                            ignoreCase={true}
                                            inputPosition='center'
                                            size={25}
                                            onFulfill={(code) => this.recoveryPasswordAfterGetPinOfEmail(code)}
                                        />
                                    </Row>
                                    <Row size={10} style={{ justifyContent: "center", alignItems: "flex-start" }}>
                                        <View style={{ width: "80%", borderBottomWidth: 1, borderBottomColor: "#D81B60" }}>
                                            <TextInput
                                                maxLength={99} selectionColor="#D81B60"
                                                placeholder="New password" secureTextEntry
                                                // ref={(ref) => { this.inputNewPassword = ref; }}
                                                placeholderTextColor="#333" autoFocus={false}
                                                underlineColorAndroid='rgba(0,0,0,0.0)'
                                                onChangeText={(newPassword) => this.setState({ newPassword })}
                                                value={this.state.newPassword}
                                                style={{ fontSize: wp(7), width: "100%", color: "#333", textAlign: "center", top: -5 }} />
                                        </View>
                                    </Row>
                                    <Row size={50} style={{ justifyContent: "center" }}>
                                        <Text style={{ fontSize: wp(4.5), color: "#333", marginTop: 50 }}>
                                            {this.state.messageFlash.cognito && this.state.messageFlash.cognito.message}
                                        </Text>
                                    </Row>
                                </Grid>
                            </KeyboardAvoidingView>
                        </Swiper>
                    </Container>
                </Modal>
            </View>
        )
    }
}


export default (PasswordForget)
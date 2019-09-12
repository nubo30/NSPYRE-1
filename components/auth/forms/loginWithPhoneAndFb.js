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

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const facebookAppid = "884636148579880"

// ChildComponent
import ForgottenPassword from '../passwordForget'

// GRPAHQL
import * as queries from '../../../src/graphql/queries'

class Login extends Component {
    state = {
        numberPhoneState: "",
        password: "",
        eyeAction: false,
        messageFlash: { cognito: null },
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
            const user = await Auth.signIn({ username: numberPhoneState ? numberPhoneState : numberPhone, password })
            if (user.challengeName === 'SMS_MFA') { this.setState({ user }) }
            this._changeSwiper(1)
            this.setState({ wrongLoginAnimation: true, messageFlash: { cognito: "" }, isLoading: false })
        } catch (error) {
            this.setState({ wrongLoginAnimation: true, messageFlash: { cognito: error }, isLoading: false })
        }
    }

    _resendCode = async (username) => {
        try {
            const response = await Auth.resendSignUp(username)
            console.log(response, "<-----")
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
            this.setState({ messageFlash: { cognito: error }, })
        }
    }

    async _openBroweserForLoginWithFacebook() {
        const { _changeSwiperRoot, _activateNumberPhone, navigation, _moreUserData } = this.props
        try {
            const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync(facebookAppid, { permissions: ['public_profile', 'user_posts'] });
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,picture,last_name`);
                const { email, name, picture, id, last_name, posts } = await response.json()
                this.setState({ isLoadingFb: true })
                await Auth.federatedSignIn('facebook', { token, expires_at: expires })
                    .then(credentials => {
                        const input = { email, name, avatar: picture.data.url, id: credentials._identityId, last_name }
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
        const { numberPhoneState, password, eyeAction, messageFlash, isLoading, isLoadingFb, wrongLoginAnimation } = this.state
        const { numberPhone } = this.props

        return (
            <View style={{
                flex: 1,
                backgroundColor: '#FFF',
                width: screenWidth - 60,
                borderRadius: 5,
                shadowColor: "rgba(0,0,0,0.3)",
                shadowOpacity: 1,
                shadowOffset: { width: 1 },
                maxHeight: screenHeight / 2 + 40
            }}>
                <Swiper
                    ref={(swiper) => this.swiper = swiper}
                    onIndexChanged={() => { this.setState({ messageFlash: { cognito: null } }); Keyboard.dismiss() }}
                    showsPagination={false}
                    loop={false}
                    scrollEnabled={false}>
                    <Grid>
                        <Row size={70} style={{ padding: 15, marginTop: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
                            <List style={{ width: "100%", justifyContent: 'space-between' }}>
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
                                        pickerButtonColor="#E91E63"
                                        pickerItemStyle={{ fontSize: 18 }}
                                        value={numberPhoneState ? numberPhoneState : numberPhone}
                                        style={{ height: "100%", width: "100%" }}
                                        flagStyle={{ height: 30, width: 40 }}
                                        textStyle={{ fontSize: wp(6), color: '#333' }}
                                        textProps={{ placeholder: "Your Phone Number" }}
                                        initialCountry="us" />
                                </ListItem>
                                <ListItem itemDivider style={{ backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', top: 10 }}>
                                    <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>AND</Text>
                                </ListItem>
                                <ListItem style={{ height: 50, alignItems: 'center', width: "90%" }}>
                                    <Input
                                        returnKeyType='send'
                                        onSubmitEditing={() => this.phone.isValidNumber() ? this._submit() : Keyboard.dismiss()}
                                        allowFontScaling={false}
                                        autoCorrect={false}
                                        textContentType="password"
                                        style={{ fontSize: wp(6), color: "#333" }}
                                        selectionColor="#E91E63"
                                        value={password}
                                        secureTextEntry={!eyeAction}
                                        onChangeText={(value) => this.setState({ password: value })}
                                        placeholderTextColor="#E0E0E0"
                                        placeholder="Password" />
                                    <Icon
                                        onPress={() => this.setState({ eyeAction: !eyeAction })}
                                        active name={eyeAction ? "eye" : "eye-off"} style={{ color: "#E0E0E0" }} />
                                </ListItem>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() => this._forgetPasswordModal(true)}>
                                    <Text allowFontScaling={false} style={{ color: '#3333', fontSize: wp(3) }}>Forgot your password?</Text>
                                </Button>
                            </List>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text allowFontScaling={false} style={{ color: "#F44336", fontSize: wp(3) }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                            </View>
                        </Row>
                        <Row size={30} style={{ justifyContent: 'center', alignItems: 'center', padding: 15, flexDirection: 'column' }}>
                            <Button
                                disabled={isLoadingFb}
                                onPress={() => this._openBroweserForLoginWithFacebook()}
                                iconRight style={{
                                    top: -10,
                                    width: "100%",
                                    alignSelf: 'flex-end',
                                    backgroundColor: '#3b5998',
                                    shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                                }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingLeft: 15 }}>
                                    <Icon name='logo-facebook' style={{ color: "#FFF", fontSize: wp(8) }} />
                                    <Text allowFontScaling={false} style={{ left: 10, color: '#FFF', fontWeight: 'bold' }}>Continue with facebook</Text>
                                </View>
                                {isLoadingFb ? <Spinner color="#FFF" size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                            </Button>

                            <Animatable.View
                                animation={wrongLoginAnimation ? "shake" : undefined}
                                onAnimationEnd={() => this.setState({ wrongLoginAnimation: false })}
                                duration={1000}
                                style={{
                                    width: "100%",
                                    shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                                }}>
                                <Button
                                    disable={isLoading}
                                    onPress={() => isLoadingFb ? {} : this._submit()}
                                    iconRight style={{ width: "100%", alignSelf: 'flex-end', backgroundColor: '#E91E63' }}>
                                    <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Log In</Text>
                                    {isLoading ? <Spinner color="#FFF" size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                                </Button>
                            </Animatable.View>
                        </Row>
                    </Grid>

                    <Grid>
                        <Row size={30} style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                            <Text allowFontScaling={false} style={{ color: "#333", fontSize: wp(7), textAlign: 'center' }}>Enter the code we send to {numberPhone ? numberPhone : numberPhoneState}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text allowFontScaling={false} style={{ color: "#333", fontSize: wp(3), textAlign: 'center', left: 12 }}>Change</Text>
                                <Button small transparent onPressIn={() => this._changeSwiper(-1)}>
                                    <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(3), color: '#333' }}>phone number</Text>
                                </Button>
                            </View>
                        </Row>
                        <Row size={20} style={{ alignSelf: 'center', flexDirection: 'column' }}>
                            <CodeInput
                                disable={false}
                                keyboardType="numeric"
                                codeLength={6}
                                activeColor='#D81B60'
                                inactiveColor='#FCE4EC'
                                className='border-b'
                                autoFocus={false}
                                ignoreCase={true}
                                inputPosition='center'
                                size={35}
                                onFulfill={(code) => { this._confirmCode(code) }}
                            />
                        </Row>
                        <Row size={50} style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text allowFontScaling={false} style={{ color: "#F44336", fontSize: wp(3) }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                        </Row>
                    </Grid>
                </Swiper>
                <ForgottenPassword forgetPasswordModal={this.state.forgetPasswordModal} _forgetPasswordModal={this._forgetPasswordModal} />
            </View>
        );
    }
}

export default withNavigation(Login)
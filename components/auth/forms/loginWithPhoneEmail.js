import React, { Component } from 'react';
import { Dimensions, Keyboard } from 'react-native'
import { Facebook } from 'expo';
import { Auth } from 'aws-amplify'
import { withNavigation } from 'react-navigation'
import { Button, Icon, Text, List, ListItem, View, Spinner, Input } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import PhoneInput from 'react-native-phone-input'
import _ from 'lodash'
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper'
import CodeInput from 'react-native-confirmation-code-input';

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height


class Login extends Component {
    state = {
        numberPhoneState: "",
        password: "",
        eyeAction: false,
        messageFlash: { cognito: null },
        isLoading: false,
        wrongLoginAnimation: false,
        user: {}
    }

    _getNumberPhone = () => {
        const numberPhoneClear = _.replace(_.replace(this.phone.getValue(), new RegExp(" ", "g"), ""), new RegExp("-", "g"), "").replace(/[()]/g, '')
        this.setState({ numberPhoneState: numberPhoneClear })
    }

    _submit = async () => {
        const { numberPhoneState, password } = this.state
        const { numberPhone } = this.props
        try {
            const user = await Auth.signIn({ username: numberPhoneState ? numberPhoneState : numberPhone, password })
            if (user.challengeName === 'SMS_MFA') { this.setState({ user }) }
            this._changeSwiper(1)
        } catch (error) {
            this.setState({ wrongLoginAnimation: true, messageFlash: { cognito: error } })
        } finally {
            this.setState({ isLoading: false })
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

    _openBroweserForLoginWithSocialNetworks = () => {
        // WebBrowser.openBrowserAsync('https://expo.io');
        this.signIn()
    }

    async signIn() {
        const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync('884636148579880', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            // sign in with federated identity
            Auth.federatedSignIn('facebook', { token, expires_at: expires }, { name: '+18293598098' })
                .then(credentials => {
                    console.log('get aws credentials', credentials);
                }).catch(e => {
                    console.log(e);
                });
        }
    }

    render() {
        const { numberPhoneState, password, eyeAction, messageFlash, isLoading, wrongLoginAnimation } = this.state
        const { numberPhone } = this.props

        return (
            <View style={{
                backgroundColor: '#FFF',
                width: screenWidth - 60,
                borderRadius: 5,
                alignSelf: 'center',
                shadowColor: "rgba(0,0,0,0.3)",
                shadowOpacity: 1,
                shadowOffset: { width: 1 },
                maxHeight: screenHeight / 2 + 40,
                top: 35,
                flex: 1
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
                                        editable={false} selectTextOnFocus={false}
                                        ref={(ref) => { this.phone = ref; }}
                                        onChangePhoneNumber={() => { this._getNumberPhone() }}
                                        autoFormat={true}
                                        buttonTextStyle={{ backgroundColor: 'red' }}
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
                                    <Text style={{ fontWeight: 'bold' }}>AND</Text>
                                </ListItem>
                                <ListItem style={{ height: 50, alignItems: 'center', width: "90%" }}>
                                    <Input
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
                            </List>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: "#F44336", fontSize: wp(4) }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                            </View>
                        </Row>
                        <Row size={30} style={{ justifyContent: 'center', alignItems: 'center', padding: 15, flexDirection: 'column' }}>
                            <Button
                                onPress={() => this._openBroweserForLoginWithSocialNetworks()}
                                style={{ width: "100%", alignSelf: 'flex-end', backgroundColor: '#FFF', top: -10, shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1 }}>
                                <Icon name='logo-facebook' style={{ color: "#3b5998" }} />
                                <Icon name='logo-twitter' style={{ color: "#38A1F3" }} />
                                <Icon name='logo-instagram' style={{ color: "#cd486b" }} />
                                <Icon name='logo-snapchat' style={{ color: "#FFEA00" }} />
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
                                    onPressIn={() => this.setState({ isLoading: true })}
                                    onPress={() => this._submit()}
                                    iconRight style={{ width: "100%", alignSelf: 'flex-end', backgroundColor: '#E91E63' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Submit</Text>
                                    {isLoading ? <Spinner color="#FFF" size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                                </Button>
                            </Animatable.View>
                        </Row>
                    </Grid>
                    <Grid>
                        <Row size={30} style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ color: "#333", fontSize: wp(8), textAlign: 'center' }}>Enter the code we send to {numberPhone ? numberPhone : numberPhoneState}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#333", fontSize: wp(4), textAlign: 'center', left: 35 }}>Change</Text>
                                <Button small transparent onPressIn={() => _changeSwiperRoot(-1)} style={{ left: 25 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: wp(4), color: '#333' }}>phone number</Text>
                                </Button>
                                <Text style={{ color: "#333", fontSize: wp(4), textAlign: 'center', left: 12 }}>o</Text>
                                <Button small transparent onPress={() => this._resendCode(numberPhone)} >
                                    <Text style={{ fontWeight: 'bold', fontSize: wp(4), color: '#333' }}>forward SMS</Text>
                                </Button>
                                <Text style={{ color: "#333", fontSize: wp(5), textAlign: 'center', right: 17, top: -1.5 }}>.</Text>
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
                            <Text style={{ color: "#F44336", fontSize: wp(4) }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                        </Row>
                    </Grid>
                </Swiper>
            </View>
        );
    }
}

export default withNavigation(Login)
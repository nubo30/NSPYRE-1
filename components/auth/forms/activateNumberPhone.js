import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Auth } from 'aws-amplify'
import { Button, Text, View, Toast } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CodeInput from 'react-native-confirmation-code-input';
import _ from 'lodash'

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

import { errListAws } from '../errorsAws/index'

export default class ActivateNumberPhone extends Component {

    state = {
        numberPhone: "",
        messageFlash: { cognito: null },
    }

    _confirmCode = async (code) => {
        const { numberPhone, _changeSwiperRoot, _changeSwiper, _hasTheRegistrationBeenSuccessful } = this.props
        try {
            const status = await Auth.confirmSignUp(numberPhone, code, { forceAliasCreation: true })
            await _hasTheRegistrationBeenSuccessful({ status, firstTime: 'YES' })
            await _changeSwiper(1)
            await _changeSwiperRoot(-1)
        } catch (error) {
            this._messageFlashErr(error)
        }
    }

    _resendCode = async (username) => {
        try {
            await Auth.resendSignUp(username)
            Toast.show({
                text: "The verification code has been sent again",
                buttonText: "Okay",
                duration: 3000,
                type: "success"
            })
        } catch (error) {
            this._messageFlashErr(error)
            console.log(error)
        }
    }

    _messageFlashErr = (error) => {
        let err = null;
        switch (error.message) {
            case errListAws.AttemptLimitExceeded:
                !error.message ? err = { "message": "Attempt limit exceeded, please try after some time" } : err = { message: "Attempt limit exceeded, please try after some time" }
                this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
                break;
            default:
                !error.message ? err = { "message": error } : err = error
                this.setState({ messageFlash: { ...this.state.messageFlash, cognito: err } })
        }
    }

    render() {
        const { messageFlash } = this.state
        const { indexSwiperRoot, numberPhone, _changeSwiperRoot } = this.props
        return (
            <Grid>
                <Row size={30} style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                    <Text allowFontScaling={false} style={{ color: "#FFF", fontSize: wp(7), textAlign: 'center' }}>Enter the code we send to {numberPhone}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={{ color: "#FFF", fontSize: wp(4), textAlign: 'center', left: 22 }}>Change</Text>
                        <Button small transparent style={{ left: 11 }} onPressIn={() => _changeSwiperRoot(-1)}>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(4), color: '#FFF' }}>phone number</Text>
                        </Button>
                        <Text allowFontScaling={false} style={{ color: "#FFF", fontSize: wp(4), textAlign: 'center' }}>o</Text>
                        <Button small transparent onPress={() => this._resendCode(numberPhone)}>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(4), color: '#FFF', right: 10 }}>forward SMS</Text>
                        </Button>
                        <Text allowFontScaling={false} style={{ color: "#FFF", fontSize: wp(4), textAlign: 'center', left: -25 }}>.</Text>
                    </View>
                </Row>
                <Row size={70} style={{ alignSelf: 'center' }}>
                    <Grid style={{
                        backgroundColor: '#FFF',
                        maxWidth: screenWidth - 60,
                        borderRadius: 5,
                        alignSelf: 'center',
                        shadowColor: "rgba(0,0,0,0.3)",
                        shadowOpacity: 1,
                        shadowOffset: { width: 1 },
                        maxHeight: screenHeight / 2 + 40,
                        top: -13
                    }}>
                        <Row size={20} style={{ padding: 15 }}>
                            {indexSwiperRoot === 0 ? null :
                                <CodeInput
                                    allowFontScaling={false}
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
                                />}
                        </Row>
                        <Row size={80} style={{ backgroundColor: '#FFF', justifyContent: 'center', padding: 20 }}>
                            <Text allowFontScaling={false} style={{ color: "#F44336", fontSize: wp(4) }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                        </Row>
                    </Grid>
                </Row>
            </Grid>
        );
    }
}
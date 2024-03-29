import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Auth } from 'aws-amplify'
import { Button, Text, View } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CodeInput from 'react-native-confirmation-code-input';
import _ from 'lodash'
import { showMessage } from "react-native-flash-message";

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

import { errListAws } from '../errorsAws/index'

// Colors
import { colorsPalette } from '../../global/static/colors'

export default class ActivateNumberPhone extends Component {

    state = { numberPhone: "" }

    _confirmCode = async (code) => {
        const { numberPhone, _changeSwiperRoot, _changeSwiper, _hasTheRegistrationBeenSuccessful } = this.props
        try {
            const status = await Auth.confirmSignUp(numberPhone, code, { forceAliasCreation: true })
            await _hasTheRegistrationBeenSuccessful({ status, firstTime: 'YES' })
            await _changeSwiper(-1)
            await _changeSwiperRoot(-1)
        } catch (error) {
            this._messageFlashErr(error)
        }
    }

    _resendCode = async (username) => {
        try {
            await Auth.resendSignUp(username)
            showMessage({
                message: "Code Send.",
                description: "The verification code has been sent again.",
                type: "default",
                duration: 3000,
                backgroundColor: colorsPalette.validColor,
                color: colorsPalette.secondaryColor, // text color
            });
        } catch (error) {
            showMessage({
                message: "Code not sent.",
                description: "Ooops! The code could not be sent, please try again.",
                type: "default",
                duration: 3000,
                backgroundColor: colorsPalette.validColor,
                color: colorsPalette.secondaryColor, // text color
            });
        }
    }

    _messageFlashErr = (error) => {
        switch (error.message) {
            case errListAws.AttemptLimitExceeded:
                showMessage({
                    message: "Limit Exceeded.",
                    description: "Attempt limit exceeded, please try after some time.",
                    type: "default",
                    duration: 3000,
                    backgroundColor: colorsPalette.dangerColor,
                    color: colorsPalette.secondaryColor, // text color
                });
                break;
            default:
                showMessage({
                    message: "Invalid Code.",
                    description: "Please verify that the code is correct and that it is also valid.",
                    type: "default",
                    duration: 3000,
                    backgroundColor: colorsPalette.dangerColor,
                    color: colorsPalette.secondaryColor, // text color
                });
        }
    }

    render() {
        const { indexSwiperRoot, numberPhone, _changeSwiperRoot } = this.props
        return (
            <Grid>
                <Row size={30} style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                    <Text allowFontScaling={false} style={{ color: colorsPalette.secondaryColor, fontSize: wp(6), textAlign: 'center' }}>Enter the code we send to {numberPhone}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={{ color: colorsPalette.secondaryColor, fontSize: wp(3), textAlign: 'center', left: 22 }}>Change</Text>
                        <Button small transparent style={{ left: 11 }} onPressIn={() => _changeSwiperRoot(-1)}>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(3), color: colorsPalette.secondaryColor }}>phone number</Text>
                        </Button>
                        <Text allowFontScaling={false} style={{ color: colorsPalette.secondaryColor, fontSize: wp(3), textAlign: 'center' }}>o</Text>
                        <Button small transparent onPress={() => this._resendCode(numberPhone)}>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(3), color: colorsPalette.secondaryColor, right: 10 }}>forward SMS</Text>
                        </Button>
                        <Text allowFontScaling={false} style={{ color: colorsPalette.secondaryColor, fontSize: wp(3), textAlign: 'center', left: -25 }}>.</Text>
                    </View>
                </Row>
                <Row size={70} style={{ alignSelf: 'center' }}>
                    <Grid style={{
                        backgroundColor: colorsPalette.secondaryColor,
                        maxWidth: screenWidth - 60,
                        borderRadius: 5,
                        alignSelf: 'center',
                        shadowColor: colorsPalette.primaryShadowColor,
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
                                    activeColor={colorsPalette.primaryColor}
                                    inactiveColor={colorsPalette.gradientGray}
                                    className='border-b'
                                    autoFocus={false}
                                    ignoreCase={true}
                                    inputPosition='center'
                                    size={35}
                                    onFulfill={(code) => { this._confirmCode(code) }}
                                />}
                        </Row>
                        <Row size={80} style={{ backgroundColor: colorsPalette.secondaryColor, justifyContent: 'center', padding: 20 }} />
                    </Grid>
                </Row>
            </Grid>
        );
    }
}
import React, { Component } from 'react';
import { Container, Text, Button, Icon, List, ListItem } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable';
import PhoneInput from 'react-native-phone-input'

// Child Components
import { GadrientsAuth } from '../../global/gradients/index'
import { MyStatusBar } from '../../global/statusBar/index'
import Logo from '../../global/lottieJs/logo'

// Colors
import { colorsPalette } from '../../global/static/colors'

class AuthPlaceholder extends Component {
    render() {
        return (
            <Container>
                <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
                <GadrientsAuth />
                <Logo />
                <Grid>
                    <Row size={40} style={{ padding: 15 }}>
                        <List style={{ width: "100%", justifyContent: 'space-between' }}>
                            <ListItem style={{ height: 80, alignItems: 'center', width: "90%", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                                <Text allowFontScaling={false} style={{ fontWeight: 'bold', color: colorsPalette.gradientGray, fontSize: wp(5) }}>Press the <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontSize: wp(5) }}>flag</Text> to see the <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontSize: wp(5) }}>list of cities</Text></Text>
                            </ListItem>
                            <ListItem style={{ height: 70, alignItems: 'center', width: "90%" }}>
                                <PhoneInput
                                    allowFontScaling={false}
                                    editable={false}
                                    selectTextOnFocus={false}
                                    autoFormat={true}
                                    buttonTextStyle={{ backgroundColor: 'red' }}
                                    confirmText="OK"
                                    cancelText="CANCEL"
                                    pickerButtonColor={colorsPalette.primaryColor}
                                    pickerItemStyle={{ fontSize: 18 }}
                                    style={{ height: "100%", width: "100%" }}
                                    flagStyle={{ height: 30, width: 40 }}
                                    textStyle={{ fontSize: wp(5), color: colorsPalette.darkFont }}
                                    textProps={{ placeholder: "Your Phone Number" }}
                                    initialCountry="us" />
                            </ListItem>
                        </List>
                    </Row>
                    <Row size={40} style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Text allowFontScaling={false} style={{ color: colorsPalette.gradientGray, fontSize: wp(4.5), top: 25, left: "10%" }}>We will send you a one time sms {'\n'} message.</Text>
                    </Row>
                    <Row size={20} style={{
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        padding: 15,
                        shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 1 }, shadowOpacity: 1,
                        flexDirection: 'column'
                    }}>
                        <Animatable.View
                            duration={1000}
                            style={{ width: "100%" }}>
                            <Button disabled onPressIn={() => this._verifyNumberPhone()}
                                iconRight style={{ width: "100%", alignSelf: 'flex-end', backgroundColor: colorsPalette.primaryColor }}>
                                <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Next</Text>
                                <Icon name='arrow-forward' />
                            </Button>
                        </Animatable.View>
                    </Row>
                </Grid>
            </Container>
        );
    }
}

export default AuthPlaceholder
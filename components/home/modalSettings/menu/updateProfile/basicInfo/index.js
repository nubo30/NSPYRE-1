import React, { Component } from 'react';
import { Modal } from 'react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, Right, List, Header, Title, Toast, Root, Spinner, View } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import PhoneInput from 'react-native-phone-input'
import _ from 'lodash'
import CodeInput from 'react-native-confirmation-code-input';

// GraphQL
import * as mutations from '../../../../../../src/graphql/mutations'
import * as queries from '../../../../../../src/graphql/queries'

import { colorsPalette } from '../../../../../global/static/colors'

export default class BasicInfo extends Component {

    state = {
        modalVisiblePhone: false,
        numberPhone: "",
        isValidNumherPhone: false,
        isLoading: false,
        messageFlash: { cognito: null },
        isPINsend: false
    }

    _getNumberPhone = () => {
        const numberPhoneClear = _.replace(_.replace(this.phone.getValue(), new RegExp(" ", "g"), ""), new RegExp("-", "g"), "").replace(/[()]/g, '')
        this.setState({ numberPhone: numberPhoneClear, isValidNumherPhone: this.phone.isValidNumber() })
    }

    _updateNumberPhoneAWS = async () => {
        const { userData, _isLoading } = this.props
        const input = { phone: this.state.numberPhone, id: userData.id }
        _isLoading(true)
        try {
            await API.graphql(graphqlOperation(mutations.updateUser, { input }))
            _isLoading(false)
            this.setState({ modalVisiblePhone: false })
        } catch (error) {
            _isLoading(false)
            Toast.show({ text: "Oops! Something went wrong, please try again.", buttonText: "Okay", type: "danger", duration: 3000, position: 'bottom' })
        }
    }

    // Verifica si el número telefonico ya existe
    _verifyNumberPhone = async () => {
        const { numberPhone } = this.state
        const { _isLoading } = this.props
        _isLoading(true)
        this.setState({ messageFlash: { cognito: { message: "" } } })
        try {
            const response = await API.graphql(graphqlOperation(queries.listUsers, { filter: { phone: { eq: numberPhone } } }))
            await response.data.listUsers.items.length
                ? this.setState({ messageFlash: { cognito: { message: "This phone number is already being used, try another one please." } } })
                : this._updateNumberPhoneAWS()
            _isLoading(false)
        } catch (error) {
            console.log(error)
            _isLoading(false)
        }
    }

    _sendPin = async () => {
        try {

            await Auth.verifyCurrentUserAttribute(this.phone.getValue())
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
        }
        this.setState({ isPINsend: true })
    }

    render() {
        const { numberPhone, modalVisiblePhone, isValidNumherPhone, messageFlash, isPINsend } = this.state
        const { userData, isLoading } = this.props
        return (
            <Container>
                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
                    <List style={{ width: '100%', backgroundColor: '#FFF' }}>
                        {/* EMAIL */}
                        <ListItem icon style={{ backgroundColor: '#FFF' }}>
                            <Left>
                                <Button style={{ backgroundColor: "#FF9501" }}>
                                    <Icon active name="mail" />
                                </Button>
                            </Left>
                            <Body>
                                <Text
                                    allowFontScaling={false}
                                    minimumFontScale={wp(4)}
                                    style={{ fontSize: wp(4) }}
                                >Email</Text>
                            </Body>
                            <Right>
                                <Text
                                    allowFontScaling={false}
                                    minimumFontScale={wp(4)}
                                    style={{ fontSize: wp(4) }}>{userData.email}</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>

                        {/* PHONE */}
                        <ListItem
                            disabled={userData.phone === null ? false : true}
                            icon last style={{ backgroundColor: '#FFF' }} onPress={() => this.setState({ modalVisiblePhone: true })}>
                            <Left>
                                <Button style={{ backgroundColor: "#007AFF" }}>
                                    <Icon active type="Entypo" name="phone" />
                                </Button>
                            </Left>
                            <Body>
                                <Text
                                    allowFontScaling={false}
                                    minimumFontScale={wp(4)}
                                    style={{ fontSize: wp(4) }}
                                >Phone</Text>
                            </Body>
                            <Right>
                                <Text
                                    allowFontScaling={false}
                                    minimumFontScale={wp(4)}
                                    style={{ fontSize: wp(4) }}
                                >{userData.phone === null ? 'Not Specified' : userData.phone}</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                    <Text
                        allowFontScaling={false}
                        minimumFontScale={wp(3)}
                        style={{ color: "#333", alignSelf: 'center', top: 10, fontSize: wp(3) }}>Account created {moment(userData.datetime).calendar()}</Text>
                </Content>
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={modalVisiblePhone}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Root>
                        <Container>
                            <Header transparent>
                                <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', bottom: 0 }}>
                                    <Title style={{ color: isLoading ? colorsPalette.opaqueWhite : '#333', fontSize: wp(7) }}>Number phone</Title>
                                </View>
                                <Left>
                                    <Button
                                        disabled={isLoading}
                                        iconLeft transparent onPress={() => this.setState({ modalVisiblePhone: false, numberPhone: "" })}>
                                        <Icon name='arrow-back' style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.primaryColor }} />
                                        <Text style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.primaryColor }}>Back</Text>
                                    </Button>
                                </Left>
                                <Body />
                                <Right>
                                    <Button
                                        disabled={!isValidNumherPhone ? true : false}
                                        transparent
                                        onPress={() => this._sendPin()}>
                                        {isLoading ? <Spinner size="small" color={colorsPalette.opaqueWhite} /> : <Text style={{ color: !isValidNumherPhone ? colorsPalette.gradientGray : colorsPalette.primaryColor }}>OK</Text>}
                                    </Button>
                                </Right>
                            </Header>
                            <List style={{ width: "100%", justifyContent: 'space-between' }}>
                                <ListItem style={{ height: 70, alignItems: 'center', width: "90%" }}>
                                    <PhoneInput
                                        editable={false} selectTextOnFocus={false}
                                        ref={(ref) => { this.phone = ref; }}
                                        onChangePhoneNumber={() => { this._getNumberPhone() }}
                                        autoFormat={true}
                                        autoFocus={true}
                                        confirmText="OK"
                                        cancelText="CANCEL"
                                        pickerButtonColor={colorsPalette.primaryColor}
                                        pickerItemStyle={{ fontSize: 18 }}
                                        value={numberPhone}
                                        style={{ height: "100%", width: "100%" }}
                                        flagStyle={{ height: 30, width: 40 }}
                                        textStyle={{ fontSize: wp(6), color: '#000' }}
                                        initialCountry="us" />
                                </ListItem>
                                <Text allowFontScaling={false} style={{ alignSelf: 'center', color: colorsPalette.darkFont, fontSize: wp(2.5), top: 10 }}>Touch to write</Text>
                                <ListItem style={{ borderBottomColor: colorsPalette.transparent }}>
                                    <CodeInput
                                        ref="codeInputRef"
                                        keyboardType="numeric"
                                        codeLength={6}
                                        activeColor={isPINsend ? colorsPalette.primaryColor : colorsPalette.gradientGray}
                                        inactiveColor={colorsPalette.gradientGray}
                                        className='border-circle'
                                        autoFocus={false}
                                        ignoreCase={true}
                                        inputPosition='center'
                                        size={25}
                                        onFulfill={(code) => { }} />
                                    {!isPINsend && <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: colorsPalette.transparent, bottom: 0 }} />}
                                </ListItem>
                                <Text allowFontScaling={false} style={{ alignSelf: 'center', color: colorsPalette.darkFont, fontSize: wp(2.5), top: 10, width: "80%", textAlign: 'center' }}>Enter here the PIN that will be sent to confirm your telephone number (Enter first the telephone number to activate the field)</Text>
                            </List>
                            <Text allowFontScaling={false} style={{ color: colorsPalette.errColor, fontSize: wp(3.5), width: "80%", alignSelf: 'center', textAlign: 'center', top: 20 }}>
                                {messageFlash.cognito && messageFlash.cognito.message}
                            </Text>
                        </Container>
                    </Root>
                </Modal>
            </Container>
        );
    }
}
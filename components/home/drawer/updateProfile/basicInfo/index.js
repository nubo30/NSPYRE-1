import React, { Component } from 'react';
import { Modal } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, Right, List, Header, Title, Toast, Root, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import PhoneInput from 'react-native-phone-input'
import _ from 'lodash'

// GraphQL
import * as mutations from '../../../../../src/graphql/mutations'

export default class BasicInfo extends Component {

    state = { modalVisiblePhone: false, numberPhone: "", isValidNumherPhone: false }

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


    render() {
        const { numberPhone, modalVisiblePhone, isValidNumherPhone } = this.state
        const { userData, isLoading } = this.props
        return (
            <Container>
                <Content scrollEnabled={false} contentContainerStyle={{ backgroundColor: '#F5F5F5', flex: 1 }}>
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
                                <Left>
                                    <Button
                                        disabled={isLoading}
                                        iconLeft transparent onPress={() => this.setState({ modalVisiblePhone: false, numberPhone: "" })}>
                                        <Icon name='arrow-back' style={{ color: isLoading ? "#EEEEEE" : "#E91E63" }} />
                                        <Text style={{ color: isLoading ? "#EEEEEE" : "#E91E63" }}>Back</Text>
                                    </Button>
                                </Left>
                                <Body>
                                    <Title style={{ color: isLoading ? '#EEEEEE' : '#333' }}>Edit your number phone</Title>
                                </Body>
                                <Right>
                                    <Button
                                        disabled={!isValidNumherPhone ? true : false}
                                        transparent
                                        onPress={() => this._updateNumberPhoneAWS()}>
                                        {isLoading ? <Spinner size="small" color="#BDBDBD" /> : <Text style={{ color: isValidNumherPhone ? "#E91E63" : "#3333" }}>Accept</Text>}
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
                                        buttonTextStyle={{ backgroundColor: 'red' }}
                                        confirmText="OK"
                                        cancelText="CANCEL"
                                        pickerButtonColor="#E91E63"
                                        pickerItemStyle={{ fontSize: 18 }}
                                        value={numberPhone}
                                        style={{ height: "100%", width: "100%" }}
                                        flagStyle={{ height: 30, width: 40 }}
                                        textStyle={{ fontSize: wp(6), color: '#333' }}
                                        textProps={{ placeholder: "Your Phone Number" }}
                                        initialCountry="us" />
                                </ListItem>
                            </List>
                        </Container>

                    </Root>
                </Modal>
            </Container>
        );
    }
}
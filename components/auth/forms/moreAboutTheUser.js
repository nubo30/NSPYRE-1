import React, { Component } from 'react';
import { Dimensions, Keyboard } from 'react-native'
import { Text, List, ListItem, Button, Input, Content, View, Icon, Spinner } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import _ from 'lodash'
import { isEmail, isAlphanumeric } from 'validator'
import * as Animatable from 'react-native-animatable';
import moment from 'moment'
import AnimateNumber from 'react-native-animate-number'
import { showMessage } from "react-native-flash-message";


const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

// GRAPHQL
import * as mutations from '../../../src/graphql/mutations'

// Colors
import { colorsPalette } from '../../global/static/colors'

export default class MoreAboutTheUser extends Component {
    state = {
        name: "",
        lastname: "",
        username: "",
        email: "",
        avatar: null,
        isLoading: false,
        invalidFormAnimation: false,

        // Coins
        pointsForTheName: 0,
        pointsForTheLastName: 0,
        pointsForTheUsername: 0,
        pointsForTheEmail: 0,

    }


    _submitInformationAboutTheUser = async () => {
        this.setState({ isLoading: true })
        const { avatar, name, lastname, username, email, pointsForTheName, pointsForTheLastName, pointsForTheUsername, pointsForTheEmail } = this.state
        const { _changeSwiperRoot, _moreUserData, moreUserData } = this.props
        const input = { name, lastname, email, username: username, datetime: moment().toISOString(), avatar: avatar ? avatar : null }
        try {
            const user = await Auth.currentAuthenticatedUser();
            if (avatar === null || avatar === undefined) {
                await Auth.updateUserAttributes(user, { email, name, middle_name: lastname, nickname: username, phone_number: user.attributes.phone_number });
                Object.assign(input, {
                    tokenfb: null,
                    id: user.attributes.sub,
                    userId: user.attributes.sub,
                    phone: user.attributes.phone_number,
                    coins: _.sum([pointsForTheName, pointsForTheLastName, pointsForTheUsername, pointsForTheEmail])
                })
                await API.graphql(graphqlOperation(mutations.createUser, { input })) // Crea un usuario en la API de APPASYNC COGNITO
                _moreUserData(input)
                _changeSwiperRoot(1)
            } else {
                Object.assign(input, {
                    tokenfb: moreUserData.tokenfb,
                    id: user.id,
                    userId: user.id,
                    phone: null,
                    coins: _.sum([pointsForTheName, pointsForTheLastName, pointsForTheUsername, pointsForTheEmail])
                })
                await API.graphql(graphqlOperation(mutations.createUser, { input })) // Crea un usuario en la API de APPASYNC FB
                _moreUserData(input)
                _changeSwiperRoot(1)
            }
        } catch (e) {
            showMessage({
                message: "Something Has Happened",
                description: "The profile could not be created, please verify your network connectivity and try again.",
                type: "default",
                duration: 4000,
                backgroundColor: colorsPalette.dangerColor,
                color: colorsPalette.secondaryColor
            })
            this.setState({ isLoading: false })
        }
    }

    _validateForm = () => {
        this.setState({ isLoading: true })
        const { name, lastname, username, email } = this.state
        const regName = /^[a-zA-Z0 ]*$/gm
        const regLast_Name = /^[a-zA-Z0 ]*$/gm
        regName.test(name)
            ? regLast_Name.test(lastname)
                ? isAlphanumeric(username)
                    ? isEmail(email)
                        ? this._submitInformationAboutTheUser()
                        : showMessage({
                            message: "Invalid Email",
                            description: "Please provide an email.",
                            type: "default",
                            duration: 30000,
                            backgroundColor: colorsPalette.dangerColor,
                            color: colorsPalette.secondaryColor
                        })
                    : showMessage({
                        message: "Invalid username",
                        description: "Please provide an username.",
                        type: "default",
                        duration: 30000,
                        backgroundColor: colorsPalette.dangerColor,
                        color: colorsPalette.secondaryColor
                    })
                : showMessage({
                    message: "Invalid Last Name",
                    description: "Please provide a last name.",
                    type: "default",
                    duration: 30000,
                    backgroundColor: colorsPalette.dangerColor,
                    color: colorsPalette.secondaryColor
                })
            : showMessage({
                message: "Invalid name",
                description: "Please provide a name.",
                type: "default",
                duration: 30000,
                backgroundColor: colorsPalette.dangerColor,
                color: colorsPalette.secondaryColor
            })
        this.setState({ isLoading: false })
    }

    componentWillReceiveProps(nextProps) {
        const { moreUserData } = nextProps
        this.setState({
            name: moreUserData.name,
            lastname: moreUserData.last_name,
            email: moreUserData.email,
            avatar: moreUserData.avatar,
            pointsForTheName: 50,
            pointsForTheLastName: 50,
            pointsForTheEmail: 60,
        })
    }

    render() {
        const { name, lastname, username, email, isLoading, invalidFormAnimation,
            //Poinst
            pointsForTheName,
            pointsForTheLastName,
            pointsForTheUsername,
            pointsForTheEmail
        } = this.state
        return (
            <Grid>
                <Row size={20} style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                    <Text allowFontScaling={false} style={{ color: colorsPalette.secondaryColor, fontSize: wp(5), textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}>
                        Let's get you registered!
                    </Text>
                    <AnimateNumber
                        allowFontScaling={false}
                        style={{ color: colorsPalette.secondaryColor, fontSize: wp(5), textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}
                        value={_.sum([pointsForTheName,
                            pointsForTheLastName,
                            pointsForTheUsername,
                            pointsForTheEmail])}
                        interval={10}
                        countBy={5}
                        formatter={(val) => {
                            return 'Coins earned ' + parseFloat(val).toFixed(0)
                        }} />
                </Row>
                <Row size={80} style={{ alignSelf: 'center' }}>
                    <Grid style={{
                        maxWidth: screenWidth - 60,
                        borderRadius: 5,
                        alignSelf: 'center',
                        shadowColor: colorsPalette.primaryShadowColor,
                        shadowOpacity: 1,
                        shadowOffset: { width: 1 },
                        maxHeight: screenHeight / 2 + 85,
                        top: -13
                    }}>
                        <Row size={80} style={{ backgroundColor: colorsPalette.secondaryColor, justifyContent: 'center', borderRadius: 5 }}>
                            <Content>
                                <List style={{ width: "100%", padding: 10 }}>
                                    {/* Name */}
                                    <ListItem style={{ height: 60, width: "90%" }}>
                                        <Input
                                            returnKeyType="done"
                                            onSubmitEditing={() =>
                                                name &&
                                                    lastname &&
                                                    username &&
                                                    email ? this._validateForm() : Keyboard.dismiss()
                                            }
                                            allowFontScaling={false}
                                            value={name}
                                            onEndEditing={() => name ? this.setState({ pointsForTheName: 50 }) : this.setState({ pointsForTheName: 0 })}
                                            onChangeText={(value) => {
                                                value
                                                    ? this.setState({ name: value, messageFlash: { cognito: { message: "" } } })
                                                    : this.setState({ name: value, messageFlash: { cognito: { message: value + " invalid name" } } })
                                            }}
                                            keyboardType="ascii-capable"
                                            selectionColor={colorsPalette.primaryColor}
                                            style={{ fontSize: wp(5), color: colorsPalette.darkFont }}
                                            placeholderTextColor={colorsPalette.gradientGray}
                                            placeholder="First Name" />
                                    </ListItem>

                                    {/* Lastname */}
                                    <ListItem style={{ height: 60, width: "90%" }}>
                                        <Input
                                            returnKeyType="done"
                                            onSubmitEditing={() =>
                                                name &&
                                                    lastname &&
                                                    username &&
                                                    email ? this._validateForm() : Keyboard.dismiss()
                                            }
                                            allowFontScaling={false}
                                            value={lastname}
                                            onEndEditing={() => lastname ? this.setState({ pointsForTheLastName: 50 }) : this.setState({ pointsForTheLastName: 0 })}
                                            onChangeText={(value) => {
                                                value
                                                    ? this.setState({ lastname: value, messageFlash: { cognito: { message: "" } } })
                                                    : this.setState({ lastname: value, messageFlash: { cognito: { message: value + " invalid lastname" } } })
                                            }}
                                            keyboardType="ascii-capable"
                                            selectionColor={colorsPalette.primaryColor}
                                            style={{ fontSize: wp(5), color: colorsPalette.darkFont }}
                                            placeholderTextColor={colorsPalette.gradientGray}
                                            placeholder="Last Name" />
                                    </ListItem>

                                    {/* Username */}
                                    <ListItem style={{ height: 60, width: "90%" }}>
                                        <Input
                                            returnKeyType="done"
                                            onSubmitEditing={() =>
                                                name &&
                                                    lastname &&
                                                    username &&
                                                    email ? this._validateForm() : Keyboard.dismiss()
                                            }
                                            allowFontScaling={false}
                                            value={username}
                                            onEndEditing={() => isAlphanumeric(username) ? this.setState({ pointsForTheUsername: 75 }) : this.setState({ pointsForTheUsername: 0 })}
                                            onChangeText={(value) => {
                                                isAlphanumeric(value)
                                                    ? this.setState({ username: value, messageFlash: { cognito: { message: "" } } })
                                                    : this.setState({ username: value, messageFlash: { cognito: { message: value + " invalid username" } } })
                                            }}
                                            selectionColor={colorsPalette.primaryColor}
                                            style={{ fontSize: wp(5), color: colorsPalette.darkFont }}
                                            placeholderTextColor={colorsPalette.gradientGray}
                                            placeholder="Username" />
                                    </ListItem>

                                    {/* Email */}
                                    <ListItem style={{ height: 60, width: "90%" }}>
                                        <Input
                                            returnKeyType="done"
                                            onSubmitEditing={() =>
                                                name &&
                                                    lastname &&
                                                    username &&
                                                    email ? this._validateForm() : Keyboard.dismiss()
                                            }
                                            allowFontScaling={false}
                                            value={email}
                                            onEndEditing={() => isEmail(email) ? this.setState({ pointsForTheEmail: 60 }) : this.setState({ pointsForTheEmail: 0 })}
                                            onChangeText={(value) => {
                                                isEmail(value)
                                                    ? this.setState({ email: value, messageFlash: { cognito: { message: "" } } })
                                                    : this.setState({ email: value, messageFlash: { cognito: { message: value + " invalid email" } } })
                                            }}
                                            selectionColor={colorsPalette.primaryColor}
                                            style={{ fontSize: wp(5), color: colorsPalette.darkFont }}
                                            placeholderTextColor={colorsPalette.gradientGray}
                                            placeholder="Email" />
                                    </ListItem>
                                </List>
                                <View style={{ height: '100%', justifyContent: 'flex-start', alignItems: 'center', top: 10 }} />
                            </Content>
                        </Row>
                        <Row size={20} style={{ backgroundColor: colorsPalette.secondaryColor, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Animatable.View
                                animation={invalidFormAnimation ? "shake" : undefined}
                                onAnimationEnd={() => this.setState({ invalidFormAnimation: false })}
                                duration={1000}
                                style={{
                                    width: "100%",
                                    shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 1 }, shadowOpacity: 1,
                                }}>
                                <Button iconLeft icon disabled={isLoading}
                                    onPress={() => this._validateForm()}
                                    style={{ width: "80%", backgroundColor: colorsPalette.primaryColor, alignSelf: 'center' }}>
                                    <Text allowFontScaling={false} style={{ letterSpacing: 2, fontWeight: 'bold', fontSize: wp(4) }}>NEXT</Text>
                                    {!isLoading
                                        ? <Icon name="arrow-forward" style={{ left: -10 }} />
                                        : <Spinner color={colorsPalette.secondaryColor} size="small" style={{ left: -10 }} />
                                    }
                                </Button>
                            </Animatable.View>
                        </Row>
                    </Grid>
                </Row>
            </Grid>

        );
    }
}
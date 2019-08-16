import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Text, List, ListItem, Button, Input, Content, View, Icon, Spinner } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import _ from 'lodash'
import { isEmail, isAlphanumeric, isAlpha } from 'validator'
import * as Animatable from 'react-native-animatable';
import moment from 'moment'
import AnimateNumber from 'react-native-animate-number'


const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

// GRAPHQL
import * as mutations from '../../../src/graphql/mutations'

export default class MoreAboutTheUser extends Component {
    state = {
        name: "",
        lastname: "",
        username: "",
        email: "",
        messageFlash: { cognito: null },
        isLoading: false,
        invalidFormAnimation: false,

        // Coins
        pointsForTheName: 0,
        pointsForTheLastName: 0,
        pointsForTheUsername: 0,
        pointsForTheEmail: 0,

    }


    _submitInformationAboutTheUser = async () => {
        const { name, lastname, username, email, pointsForTheName, pointsForTheLastName, pointsForTheUsername, pointsForTheEmail } = this.state
        const { _changeSwiperRoot, _moreUserData } = this.props
        const input = { name, lastname, email, username: username, datetime: moment().toISOString() }
        try {
            let user = await Auth.currentAuthenticatedUser();
            await Auth.updateUserAttributes(user, { email, name, middle_name: lastname, nickname: username, phone_number: user.attributes.phone_number });
            await Object.assign(input, {
                id: user.attributes.sub,
                userId: user.attributes.sub,
                phone: user.attributes.phone_number,
                coins: _.sum([pointsForTheName, pointsForTheLastName, pointsForTheUsername, pointsForTheEmail])
            })
            await API.graphql(graphqlOperation(mutations.createUser, { input })) // Crea un usuario en la API de APPASYNC
            _moreUserData(input)
            _changeSwiperRoot(1)
        } catch (e) {
            console.log(e)
            this.setState({ isLoading: false })
        }
    }

    _validateForm = () => {
        this.setState({ isLoading: true })
        const { name, lastname, username, email } = this.state
        isAlpha(name)
            ? isAlpha(lastname)
                ? isAlphanumeric(username)
                    ? isEmail(email)
                        ? this._submitInformationAboutTheUser()
                        : this.setState({
                            invalidFormAnimation: true,
                            isLoading: false,
                            messageFlash: { cognito: { message: "Invalid email" } }
                        })
                    : this.setState({
                        invalidFormAnimation: true,
                        isLoading: false,
                        messageFlash: { cognito: { message: "Invalid username" } }
                    })
                : this.setState({
                    invalidFormAnimation: true,
                    isLoading: false,
                    messageFlash: { cognito: { message: "Invalid lastname" } }
                })
            : this.setState({
                invalidFormAnimation: true,
                isLoading: false,
                messageFlash: { cognito: { message: "Invalid name" } }
            })
    }

    render() {
        const { name, lastname, username, email, messageFlash, isLoading, invalidFormAnimation,
            //Poinst
            pointsForTheName,
            pointsForTheLastName,
            pointsForTheUsername,
            pointsForTheEmail
        } = this.state
        return (
            <Grid>
                <Row size={20} style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                    <Text style={{ color: "#FFF", fontSize: wp(8), textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}>
                        Let's get you registered!
                    </Text>
                    <AnimateNumber
                        style={{ color: "#FFF", fontSize: wp(6), textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}
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
                        shadowColor: "rgba(0,0,0,0.3)",
                        shadowOpacity: 1,
                        shadowOffset: { width: 1 },
                        maxHeight: screenHeight / 2 + 85,
                        top: -13
                    }}>
                        <Row size={80} style={{ backgroundColor: '#FFF', justifyContent: 'center', borderRadius: 5 }}>
                            <Content>
                                <List style={{ width: "100%", padding: 10 }}>
                                    {/* Name */}
                                    <ListItem style={{ height: 60, width: "90%" }}>
                                        <Input
                                            value={name}
                                            onEndEditing={() => isAlpha(name) ? this.setState({ pointsForTheName: 50 }) : this.setState({ pointsForTheName: 0 })}
                                            onChangeText={(value) => {
                                                isAlpha(value)
                                                    ? this.setState({ name: value, messageFlash: { cognito: { message: "" } } })
                                                    : this.setState({ name: value, messageFlash: { cognito: { message: value + " invalid name" } } })
                                            }}
                                            keyboardType="ascii-capable"
                                            selectionColor="#E91E63"
                                            style={{ fontSize: wp(7), color: '#333' }}
                                            placeholderTextColor="#E0E0E0"
                                            placeholder="Name" />
                                    </ListItem>

                                    {/* Lastname */}
                                    <ListItem style={{ height: 60, width: "90%" }}>
                                        <Text style={{ fontSize: wp(7), color: '#E0E0E0' }}></Text>
                                        <Input
                                            value={lastname}
                                            onEndEditing={() => isAlpha(lastname) ? this.setState({ pointsForTheLastName: 50 }) : this.setState({ pointsForTheLastName: 0 })}
                                            onChangeText={(value) => {
                                                isAlpha(value)
                                                    ? this.setState({ lastname: value, messageFlash: { cognito: { message: "" } } })
                                                    : this.setState({ lastname: value, messageFlash: { cognito: { message: value + " invalid lastname" } } })
                                            }}
                                            keyboardType="ascii-capable"
                                            selectionColor="#E91E63"
                                            style={{ fontSize: wp(7), color: '#333' }}
                                            placeholderTextColor="#E0E0E0"
                                            placeholder="Lastname" />
                                    </ListItem>

                                    {/* Username */}
                                    <ListItem style={{ height: 60, width: "90%" }}>
                                        <Input
                                            value={username}
                                            onEndEditing={() => isAlphanumeric(username) ? this.setState({ pointsForTheUsername: 75 }) : this.setState({ pointsForTheUsername: 0 })}
                                            onChangeText={(value) => {
                                                isAlphanumeric(value)
                                                    ? this.setState({ username: value, messageFlash: { cognito: { message: "" } } })
                                                    : this.setState({ username: value, messageFlash: { cognito: { message: value + " invalid username" } } })
                                            }}
                                            selectionColor="#E91E63"
                                            style={{ fontSize: wp(7), color: '#333' }}
                                            placeholderTextColor="#E0E0E0"
                                            placeholder="Username" />
                                    </ListItem>

                                    {/* Email */}
                                    <ListItem style={{ height: 60, width: "90%" }}>
                                        <Input
                                            value={email}
                                            onEndEditing={() => isEmail(email) ? this.setState({ pointsForTheEmail: 60 }) : this.setState({ pointsForTheEmail: 0 })}
                                            onChangeText={(value) => {
                                                isEmail(value)
                                                    ? this.setState({ email: value, messageFlash: { cognito: { message: "" } } })
                                                    : this.setState({ email: value, messageFlash: { cognito: { message: value + " invalid email" } } })
                                            }}
                                            selectionColor="#E91E63"
                                            style={{ fontSize: wp(7), color: '#333' }}
                                            placeholderTextColor="#E0E0E0"
                                            placeholder="Email" />
                                    </ListItem>
                                </List>
                                <View style={{ height: '100%', justifyContent: 'flex-start', alignItems: 'center', top: 10 }}>
                                    <Text style={{ color: "#F44336", fontSize: wp(4) }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                                </View>
                            </Content>
                        </Row>
                        <Row size={20} style={{ backgroundColor: '#FFF', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Animatable.View
                                animation={invalidFormAnimation ? "shake" : undefined}
                                onAnimationEnd={() => this.setState({ invalidFormAnimation: false })}
                                duration={1000}
                                style={{
                                    width: "100%",
                                    shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                                }}>
                                <Button iconLeft icon disabled={isLoading}
                                    onPress={() => this._validateForm()}
                                    style={{ width: "80%", backgroundColor: '#E91E63', alignSelf: 'center' }}>
                                    <Text style={{ letterSpacing: 2, fontWeight: 'bold' }}>NEXT</Text>
                                    {!isLoading
                                        ? <Icon name="arrow-forward" style={{ left: -10 }} />
                                        : <Spinner color="#FFF" size="small" style={{ left: -10 }} />
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
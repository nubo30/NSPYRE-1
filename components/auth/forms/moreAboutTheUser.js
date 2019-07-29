import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Text, List, ListItem, Button, Input, Content, View, Icon, Spinner, Toast } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import _ from 'lodash'
import { isAscii, isEmail, isAlphanumeric } from 'validator'
import * as Animatable from 'react-native-animatable';
import moment from 'moment'


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
        invalidFormAnimation: false
    }


    _submitInformationAboutTheUser = async () => {
        const { name, lastname, username, email } = this.state
        const { _changeSwiperRoot, _moreUserData } = this.props
        const input = { name, lastname, email, username: username, datetime: moment().toISOString() }
        try {
            let user = await Auth.currentAuthenticatedUser();
            await Auth.updateUserAttributes(user, { email, name, middle_name: lastname, nickname: username, phone_number: user.attributes.phone_number });
            await Object.assign(input, { id: user.attributes.sub, userId: user.attributes.sub, phone: user.attributes.phone_number })
            await API.graphql(graphqlOperation(mutations.createUser, { input })) // Crea un usuario en la API de APPASYNC
            _moreUserData(input)
            _changeSwiperRoot(1)
        } catch (e) {
            console.log(e)
        } finally {
            this.setState({ isLoading: false })
        }
    }

    _validateForm = () => {
        const { name, lastname, username, email } = this.state
        isAscii(name)
            ? isAscii(lastname)
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
        const { name, lastname, username, email, messageFlash, isLoading, invalidFormAnimation } = this.state
        return (
            <Grid>
                <Row size={20} style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                    <Text style={{ color: "#FFF", fontSize: wp(8), textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}>
                        Give us more information so that other users can find you!
                    </Text>
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
                                            onChangeText={(value) => {
                                                isAscii(value)
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
                                            onChangeText={(value) => {
                                                isAscii(value)
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
                                            onChangeText={(value) => this.setState({ email: value })}
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
                                    onPressIn={() => this.setState({ isLoading: true })}
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
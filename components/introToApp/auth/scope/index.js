import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { Text, List, ListItem, Button, Icon, Spinner, CheckBox, Body, View } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as Animatable from 'react-native-animatable';
import _ from 'lodash'


const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

// GRAPHQL
import * as mutations from '../../../../src/graphql/mutations'

// Colors
import { colorsPalette } from '../../../global/static/colors'

class Scope extends Component {
    state = {
        scope: "",
        messageFlash: { cognito: null },
        isLoading: false,
        scopeAnimation: false,
    }

    _scopeSelect = async (value) => {
        switch (value) {
            case "engage":
                this.setState({ scope: value, messageFlash: { cognito: { message: "" } } })
                break;
            case "createContest":
                this.setState({ scope: value, messageFlash: { cognito: { message: "" } } })
                break
            case "submitPrize":
                this.setState({ scope: value, messageFlash: { cognito: { message: "" } } })
                break
            case "":
                this.setState({ scope: value, messageFlash: { cognito: { message: "" } } })
                break
            default:
                this.setState({ scopeAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Select a option" } } })
        }
    }

    _submit = async () => {
        this.setState({ isLoading: true })
        const { scope } = this.state
        const { navigation } = this.props
        try {
            const user = await Auth.currentAuthenticatedUser();
            await API.graphql(graphqlOperation(mutations.updateUser, {
                input: {
                    id: user.id ? user.id : user.attributes.sub,
                    scope: _.replace(_.upperCase(scope), " ", "")
                }
            }))
            navigation.navigate(_.replace(_.startCase(scope), " ", ""))
        } catch (error) {
            console.log(error)
            this.setState({ scopeAnimation: true, isLoading: false })
        }
    }

    render() {
        const { scope, scopeAnimation, isLoading, messageFlash } = this.state
        return (
            <Grid style={{ backgroundColor: colorsPalette.primaryColor }}>
                <View style={{ backgroundColor: colorsPalette.secondaryColor, position: 'absolute', height: screenHeight / 2, width: "100%", bottom: 0, shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 0 }, shadowOpacity: 1 }} />
                <Row size={20} style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                    <Text allowFontScaling={false} style={{ color: colorsPalette.secondaryColor, fontSize: wp(7), textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}>
                        Hey, how do you want to continue?
                    </Text>
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
                        <Row size={80} style={{ backgroundColor: colorsPalette.secondaryColor, justifyContent: 'center', borderRadius: 5, alignItems: 'center', flexDirection: 'column' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(7), color: colorsPalette.darkFont, alignSelf: 'flex-start', left: '10%', fontWeight: 'bold' }}>Choose an option</Text>
                            <Text allowFontScaling={false} style={{ fontSize: wp(4.5), color: colorsPalette.darkFont, alignSelf: 'flex-start', left: '10%' }}>Which user type would you like to set up?</Text>
                            <List style={{ width: "100%", padding: 10 }}>
                                <ListItem style={{ height: 60, width: "90%" }}>
                                    <CheckBox checked={scope === "engage" ? true : false} color={colorsPalette.primaryColor} onPress={() => this._scopeSelect("engage")} />
                                    <Body>
                                        <Text allowFontScaling={false} onPress={() => this._scopeSelect("engage")} style={{ fontSize: wp(7), color: colorsPalette.gradientGray, }}>Engage</Text>
                                    </Body>
                                </ListItem>
                                <ListItem style={{ height: 60, width: "90%" }}>
                                    <CheckBox checked={scope === "createContest" ? true : false} color={colorsPalette.primaryColor} onPress={() => this._scopeSelect("createContest")} />
                                    <Body>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(7), color: colorsPalette.gradientGray }} onPress={() => this._scopeSelect("createContest")}>Create Contest</Text>
                                    </Body>
                                </ListItem>
                                <ListItem style={{ height: 60, width: "90%" }}>
                                    <CheckBox checked={scope === "submitPrize" ? true : false} color={colorsPalette.primaryColor} onPress={() => this._scopeSelect("submitPrize")} />
                                    <Body>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(7), color: colorsPalette.gradientGray }} onPress={() => this._scopeSelect("submitPrize")}>Submit Prize</Text>
                                    </Body>
                                </ListItem>
                            </List>
                        </Row>
                        <Row size={20} style={{ backgroundColor: colorsPalette.secondaryColor, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, flexDirection: "column" }}>
                            <Text allowFontScaling={false} style={{ top: -20, alignSelf: 'center', fontSize: wp(4), color: colorsPalette.errColor }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                            <Animatable.View
                                animation={scopeAnimation ? "shake" : undefined}
                                onAnimationEnd={() => this.setState({ scopeAnimation: false })}
                                duration={1000}
                                style={{
                                    width: "100%",
                                    shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 1 }, shadowOpacity: 1, justifyContent: 'center'
                                }}>
                                <Button
                                    iconLeft
                                    onPress={scope ? () => this._submit() : () => this._scopeSelect()}
                                    style={{ width: "80%", backgroundColor: colorsPalette.primaryColor, alignSelf: 'center' }}>
                                    <Text allowFontScaling={false} style={{ letterSpacing: 2, fontWeight: 'bold' }}>NEXT</Text>
                                    {isLoading ? <Spinner color={colorsPalette.secondaryColor} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' style={{ left: -10 }} />}
                                </Button>
                            </Animatable.View>
                        </Row>
                    </Grid>
                </Row>
            </Grid>
        );
    }
}

export default withNavigation(Scope)
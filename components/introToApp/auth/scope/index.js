import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { Text, List, ListItem, Button, Icon, Spinner, CheckBox, Body, View } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as Animatable from 'react-native-animatable';
import _ from 'lodash'
import { showMessage } from "react-native-flash-message";


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
                this.setState({ scopeAnimation: true, isLoading: false })
                showMessage({
                    message: "Not selected",
                    description: "EY! I think you forget to select some type of profile from the ones below!",
                    type: "default",
                    duration: 4000,
                    backgroundColor: colorsPalette.warningColor,
                    color: colorsPalette.secondaryColor, // text color
                });
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
            showMessage({
                message: "Failed",
                description: "Apparently an error has occurred, you could check your connection and try again, please!",
                type: "default",
                duration: 4000,
                backgroundColor: colorsPalette.dangerColor,
                color: colorsPalette.secondaryColor, // text color
            });
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
                        What user type would you like to create?
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
                            <Text allowFontScaling={false} style={{ fontSize: wp(7), color: colorsPalette.darkFont, alignSelf: 'flex-start', left: '8%', fontWeight: 'bold' }}>Choose an option</Text>
                            <List style={{ width: "100%", padding: 10 }}>
                                <ListItem style={{ height: 60, width: "90%" }}>
                                    <CheckBox checked={scope === "engage" ? true : false} color={colorsPalette.primaryColor} onPress={() => this._scopeSelect("engage")} />
                                    <Body>
                                        <Text allowFontScaling={false} onPress={() => this._scopeSelect("engage")} style={{ fontSize: wp(7), color: colorsPalette.gradientGray, }}>Engage in contest</Text>
                                    </Body>
                                </ListItem>
                                <ListItem style={{ height: 60, width: "90%" }}>
                                    <CheckBox checked={scope === "createContest" ? true : false} color={colorsPalette.primaryColor} onPress={() => this._scopeSelect("createContest")} />
                                    <Body>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(7), color: colorsPalette.gradientGray }} onPress={() => this._scopeSelect("createContest")}>Create contests</Text>
                                    </Body>
                                </ListItem>
                                <ListItem style={{ height: 60, width: "90%" }}>
                                    <CheckBox checked={scope === "submitPrize" ? true : false} color={colorsPalette.primaryColor} onPress={() => this._scopeSelect("submitPrize")} />
                                    <Body>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(7), color: colorsPalette.gradientGray }} onPress={() => this._scopeSelect("submitPrize")}>Submit prizes</Text>
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
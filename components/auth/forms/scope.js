import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { API, graphqlOperation } from 'aws-amplify'
import { Text, List, ListItem, Button, Icon, Spinner, CheckBox, Body } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as Animatable from 'react-native-animatable';
import _ from 'lodash'


const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

// GRAPHQL
import * as mutations from '../../../src/graphql/mutations'

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
        const { moreUserData, navigation } = this.props
        try {
            await API.graphql(graphqlOperation(mutations.updateUser, {
                input: {
                    id: moreUserData.userId,
                    scope: _.replace(_.upperCase(scope), " ", "")
                }
            }))
            await navigation.navigate(_.replace(_.startCase(scope), " ", ""))
        } catch (error) {
            console.log(error)
            this.setState({ scopeAnimation: true, isLoading: false })
        }
    }

    render() {
        const { scope, scopeAnimation, isLoading, messageFlash } = this.state
        const { moreUserData } = this.props
        return (
            <Grid>
                <Row size={20} style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                    <Text style={{ color: "#FFF", fontSize: wp(8), textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}>
                        Hey <Text style={{ fontWeight: 'bold', color: '#FFF', fontSize: wp(8) }}>{moreUserData && moreUserData.name}</Text>, how do you want to continue?
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
                        <Row size={80} style={{ backgroundColor: '#FFF', justifyContent: 'center', borderRadius: 5, alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ fontSize: wp(7), color: "#333", alignSelf: 'flex-start', left: '10%', fontWeight: 'bold' }}>Choose an option</Text>
                            <Text style={{ fontSize: wp(4.5), color: "#333", alignSelf: 'flex-start', left: '10%', fontWeight: '100' }}>What do you want to do now?</Text>
                            <List style={{ width: "100%", padding: 10 }}>
                                <ListItem style={{ height: 60, width: "90%" }}>
                                    <CheckBox checked={scope === "engage" ? true : false} color="#E91E63" onPress={() => this._scopeSelect("engage")} />
                                    <Body>
                                        <Text onPress={() => this._scopeSelect("engage")} style={{ fontSize: wp(7), color: "#E0E0E0", }}>Engage</Text>
                                    </Body>
                                </ListItem>
                                <ListItem style={{ height: 60, width: "90%" }}>
                                    <CheckBox checked={scope === "createContest" ? true : false} color="#E91E63" onPress={() => this._scopeSelect("createContest")} />
                                    <Body>
                                        <Text style={{ fontSize: wp(7), color: "#E0E0E0" }} onPress={() => this._scopeSelect("createContest")}>Create Contest</Text>
                                    </Body>
                                </ListItem>
                                <ListItem style={{ height: 60, width: "90%" }}>
                                    <CheckBox checked={scope === "submitPrize" ? true : false} color="#E91E63" onPress={() => this._scopeSelect("submitPrize")} />
                                    <Body>
                                        <Text style={{ fontSize: wp(7), color: "#E0E0E0" }} onPress={() => this._scopeSelect("submitPrize")}>Submit Prize</Text>
                                    </Body>
                                </ListItem>
                            </List>
                        </Row>
                        <Row size={20} style={{ backgroundColor: '#FFF', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, flexDirection: "column" }}>
                            <Text style={{ top: -20, alignSelf: 'center', fontSize: wp(5), color: '#F44336' }}>{messageFlash.cognito && messageFlash.cognito.message}</Text>
                            <Animatable.View
                                animation={scopeAnimation ? "shake" : undefined}
                                onAnimationEnd={() => this.setState({ scopeAnimation: false })}
                                duration={1000}
                                style={{
                                    width: "100%",
                                    shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1, justifyContent: 'center'
                                }}>
                                <Button
                                    iconLeft
                                    onPress={scope ? () => this._submit() : () => this._scopeSelect()}
                                    style={{ width: "80%", backgroundColor: '#E91E63', alignSelf: 'center' }}>
                                    <Text style={{ letterSpacing: 2, fontWeight: 'bold' }}>NEXT</Text>
                                    {isLoading ? <Spinner color="#FFF" size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' style={{ left: -10 }} />}
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
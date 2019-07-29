import React, { Component } from "react";
import { StatusBar } from "react-native"
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { Connect } from 'aws-amplify-react-native'
import { connect } from 'react-redux'
import { withNavigation } from "react-navigation"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Text, Drawer, Header, Title, Left, Button, Icon, Container, ActionSheet, Content, View } from 'native-base';
import _ from 'lodash'
import { Platform } from "expo-core";

// Child Components
import UserInfo from "./photoAndButtom/index"
import DrawerRight from "./drawer/index"
import ListContest from "./listContest/index"
import PlaceholderHome from "./placeholder/index"

// gadrient
import { GadrientsHome } from "../Global/gradients/index"

// Graphql
import * as queries from '../../src/graphql/queries'
import * as subscriptions from '../../src/graphql/subscriptions'

const BUTTONS = ["Engage", "Create a contest", "Submit a prize", "Cancel"];
const CANCEL_INDEX = 3;

class Home extends Component {
    constructor() {
        super()
        this.state = {
            userData: null,
            isReady: false,
            animation: null,
            openDrower: false,
            swipe: "",
            actionSheetButtonIndex: "Engage",
            heightHeader: 0,
            image: null
        }
    }


    async componentDidMount() {
        try {
            const { attributes } = await Auth.currentUserInfo()
            const userData = await API.graphql(graphqlOperation(queries.getUser, { id: attributes.sub }))
            this.setState({ userData: userData.data.getUser })
        } catch (error) {
            console.log(error)
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            image: nextProps.imageName
        })
    }

    measureView(event) {
        this.setState({
            heightHeader: event.nativeEvent.layout.height // height of the principal height
        })
    }

    render() {
        const { userData, openDrower } = this.state
        const { navigation } = this.props
        return (
            userData ?
                <Connect
                    query={graphqlOperation(queries.getUser, { id: userData.id })}
                    subscription={graphqlOperation(subscriptions.onUpdateUser)}
                    onSubscriptionMsg={(prev, newData) => {
                        prev.getUser.name = newData.onUpdateUser.name;
                        prev.getUser.lastName = newData.onUpdateUser.lastName
                        prev.getUser.avatar = newData.onUpdateUser.avatar;
                        return prev
                    }}>
                    {({ data: { getUser }, loading, error }) => {
                        if (error) return (<Text>Error</Text>);
                        if (loading || !getUser) return <PlaceholderHome />
                        return (
                            <Container style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                                {/* Header */}
                                <Header style={{ backgroundColor: "#D81B60", borderBottomColor: "rgba(0,0,0,0.0)" }} onLayout={(event) => this.measureView(event)}>
                                    <Left style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Button style={{ minWidth: wp(11) }} transparent
                                            onPress={() => { this.setState({ openDrower: !openDrower }); }}>
                                            {!openDrower
                                                ? <Icon name='menu' style={{ color: "#fff", fontSize: wp(9.5), top: -2 }} />
                                                : <Icon name='close' style={{ color: "#fff", fontSize: wp(11), top: -5, left: 5 }} />}
                                        </Button>
                                        <Title style={{ color: "#fff", fontSize: wp('7%') }}>INFLUENCE ME NOW</Title>
                                    </Left>
                                </Header>
                                {/* Drower left */}
                                <Drawer
                                    openDrawerOffset={50}
                                    type={Platform.OS === 'ios' ? "displace" : "static"}
                                    panCloseMask={1}
                                    closedDrawerOffset={Platform.OS === 'ios' ? -3 : 0}
                                    styles={{
                                        main: {
                                            shadowColor: 'rgba(0,0,0,0.2)', shadowOpacity: 10,
                                            shadowOffset: { width: -5, height: 1 }, zIndex: 1000
                                        }
                                    }}
                                    open={openDrower}
                                    content={<DrawerRight userData={getUser} image={this.state.image} />}>

                                    {/* Home Content */}
                                    <Content scrollEnabled={false}>
                                        <Container>
                                            <GadrientsHome />
                                            <Header span style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: hp(35),
                                                flexDirection: "column",
                                                shadowColor: 'rgba(0,0,0,0.2)',
                                                shadowOpacity: 1,
                                                shadowOffset: { width: 0 },
                                                borderBottomColor: 'rgba(0,0,0,0.0)'
                                            }}>
                                                <StatusBar barStyle='light-content' />
                                                <UserInfo userData={getUser} image={this.state.image} />
                                                <Button rounded transparent style={{ alignSelf: "center", top: -10 }}
                                                    onPress={() => {
                                                        ActionSheet.show(
                                                            {
                                                                options: BUTTONS,
                                                                cancelButtonIndex: CANCEL_INDEX,
                                                                title: "Touch for to do action"
                                                            },
                                                            buttonIndex => {
                                                                BUTTONS[buttonIndex] === 'Create a contest' ? navigation.navigate("CREATE_A_CONTEST", { fromWhere: "fromHome" }) : null
                                                                BUTTONS[buttonIndex] === 'Submit a prize' ? navigation.navigate("SUBMIT_A_PRIZE", { fromWhere: "fromHome" }) : null
                                                            })
                                                    }}>
                                                    <Text style={{ color: "#E0E0E0", textAlign: "center", fontSize: wp(4.4) }}>{`Touch for to do action`}</Text>
                                                </Button>
                                                <Text style={{ fontSize: wp(8), fontWeight: "200", color: "#333", textAlign: "center", top: -5 }}>
                                                    LIST OF CONTESTS
                                                </Text>
                                            </Header>
                                            <Content padder showsVerticalScrollIndicator={false} style={{ backgroundColor: 'rgba(0,0,0,0.0)' }}>
                                                <ListContest />
                                            </Content>
                                            <View style={{ height: this.state.heightHeader }} />
                                        </Container>
                                    </Content>

                                </Drawer>
                            </Container>)

                    }}
                </Connect> : <PlaceholderHome />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        imageName: state.project.urlAvatar
    }
}

export default connect(mapStateToProps)(withNavigation(Home))
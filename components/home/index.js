import React, { Component } from "react";
import { StatusBar } from "react-native"
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { withNavigation } from "react-navigation"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Text, Drawer, Header, Title, Left, Button, Icon, Container, ActionSheet, Content, View, Toast } from 'native-base';
import _ from 'lodash'
import { Platform } from "expo-core";

// Child Components
import UserInfo from "./photoAndButtom/index"
import DrawerRight from "./drawer/index"
import ListContest from "./listContest/index"

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
            userData: {},
            isReady: false,
            animation: null,
            openDrower: false,
            actionSheetButtonIndex: "Engage",
            heightHeader: 0,
            prizeCategory: []
        }
        this.actionSheet = null;
    }


    componentDidMount() {
        this.getDataFromAWS()
        API.graphql(graphqlOperation(subscriptions.onUpdateUser)).subscribe({
            error: ({ errors }) => {
                console.log(errors)
            },
            next: (getData) => {
                if (getData.value.data.onUpdateUser.id === this.state.userData.id) { this.setState({ userData: getData.value.data.onUpdateUser }) }
            }
        })
    }

    getDataFromAWS = async () => {
        try {
            const data = await Auth.currentSession()
            const userData = await API.graphql(graphqlOperation(queries.getUser, { id: data.idToken.payload.sub }))
            const prizeCategory = await API.graphql(graphqlOperation(queries.listPrizesCategorys))
            this.setState({ userData: userData.data.getUser, isReady: true, prizeCategory: prizeCategory.data.listPrizesCategorys.items })
        } catch (error) {
            console.log(error)
        }
    }

    measureView(event) {
        this.setState({
            heightHeader: event.nativeEvent.layout.height // height of the principal height
        })
    }

    showActionSheet() {
        const { navigation } = this.props
        if (this.actionSheet !== null) {
            this.actionSheet._root.showActionSheet(
                {

                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    title: "Create a contest or Submit a prize"
                },
                buttonIndex => {
                    BUTTONS[buttonIndex] === 'Create a contest' ? navigation.navigate("CreateContest", { fromWhere: "fromHome" }) : null
                    BUTTONS[buttonIndex] === 'Submit a prize' ? navigation.navigate("SubmitPrize", { fromWhere: "fromHome" }) : null
                })
        }
    }

    render() {
        const { userData, openDrower, isReady, prizeCategory } = this.state
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
                    content={<DrawerRight userData={userData} />}
                    open={openDrower}>

                    {/* Home Content */}
                    <Content scrollEnabled={false}>
                        <Container>
                            <GadrientsHome />
                            <Header span style={{
                                height: hp(35),
                                flexDirection: "column",
                                shadowColor: 'rgba(0,0,0,0.2)',
                                shadowOpacity: 1,
                                shadowOffset: { width: 0 },
                                borderBottomColor: 'rgba(0,0,0,0.0)',
                            }}>
                                <StatusBar barStyle='light-content' />

                                {/* Componentes como el avatar, your contest y redeem points */}
                                <UserInfo prizeCategory={prizeCategory} userData={userData} isReady={isReady} />
                                <Button rounded transparent style={{ alignSelf: "center", top: -10 }}
                                    onPress={() => this.showActionSheet()}>
                                    <Text style={{ color: "#D82B60", textAlign: "center", fontSize: wp(4.4) }}>{`Create a contest or Submit a prize`}</Text>
                                </Button>
                                <ActionSheet ref={(c) => { this.actionSheet = c; }} />
                                <Text style={{ fontSize: wp(8), fontWeight: "200", color: "#333", textAlign: "center", top: -5 }}>
                                    LIST OF CONTESTS
                                </Text>
                            </Header>
                            <Content padder showsVerticalScrollIndicator={false} style={{ backgroundColor: 'rgba(0,0,0,0.0)' }}>
                                <ListContest userData={userData} />
                            </Content>
                            <View style={{ height: this.state.heightHeader }} />
                        </Container>
                    </Content>
                </Drawer>
            </Container>
        )
    }
}

export default withNavigation(Home)
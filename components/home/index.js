import React, { Component } from "react";
import { Platform } from "react-native"
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { withNavigation } from "react-navigation"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Text, Drawer, Header, Title, Left, Button, Icon, Container, ActionSheet, Content, View, Right, Badge, Footer } from 'native-base';
import _ from 'lodash'
import Swiper from 'react-native-swiper'

// Child Components
import UserInfo from "./photoAndButtom"
import DrawerRight from "./drawer"
import ListContest from "./listContest"

// gadrient
import { MyStatusBar } from '../Global/statusBar'

// Graphql
import * as queries from '../../src/graphql/queries'
import * as subscriptions from '../../src/graphql/subscriptions'

// Redux
import { connect } from 'react-redux'

// Child component
import NotificationCenter from './notificationCenter'

const BUTTONS = ["Submit a prize", "Create a contest", "Cancel"];
const CANCEL_INDEX = 2;

class Home extends Component {
    constructor() {
        super()
        this.state = {
            userData: {},
            isReady: false,
            animation: null,
            openDrower: false,
            actionSheetButtonIndex: "Create a contest",
            heightHeader: 0,
            prizeCategory: [],
            notifications: []
        }
        this.actionSheet = null;
    }


    componentDidMount() {
        const { online } = this.props.networkStatus
        if (online) {
            this.getDataFromAWS()
            API.graphql(graphqlOperation(subscriptions.onUpdateUser)).subscribe({
                error: ({ errors }) => { console.log(errors) },
                next: (getData) => {
                    if (getData.value.data.onUpdateUser.id === this.state.userData.id) { this.setState({ userData: getData.value.data.onUpdateUser }) }
                }
            })
            API.graphql(graphqlOperation(subscriptions.onCreateNotifications)).subscribe({
                error: ({ errors }) => { console.log(errors) },
                next: (getData) => {
                    this.setState({ notifications: [...this.state.notifications, getData.value.data.onCreateNotifications] })
                }
            })
        }
    }

    getDataFromAWS = async () => {
        try {
            const data = await Auth.currentAuthenticatedUser()
            const userData = await API.graphql(graphqlOperation(queries.getUser, { id: data.id || data.attributes.sub }))
            const prizeCategory = await API.graphql(graphqlOperation(queries.listPrizesCategorys))
            const notifications = await API.graphql(graphqlOperation(queries.listNotificationss, { filter: { idUserTo: { eq: userData.data.getUser.id } } }))
            this.setState({ userData: userData.data.getUser, isReady: true, prizeCategory: prizeCategory.data.listPrizesCategorys.items, notifications: notifications.data.listNotificationss.items })
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
                    BUTTONS[buttonIndex] === 'Submit a prize' ? navigation.navigate("SubmitPrize", { fromWhere: "fromHome" }) : null
                    BUTTONS[buttonIndex] === 'Create a contest' ? navigation.navigate("CreateContest", { fromWhere: "fromHome" }) : null
                })
        }
    }

    _changeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    render() {
        const { userData, openDrower, isReady, prizeCategory, notifications } = this.state
        const { online } = this.props.networkStatus
        return (
            <Swiper
                ref={(swiper) => this.swiper = swiper}
                scrollEnabled={!openDrower}
                showsPagination={false}
                showsButtons={false}
                index={0}
                loop={false}>
                <Container style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    {/* Header */}
                    <Header style={{ backgroundColor: "#D81B60" }} onLayout={(event) => this.measureView(event)}>
                        <Left style={{ flexDirection: "row", alignItems: "center" }}>
                            <Button style={{ minWidth: wp(11) }} transparent
                                onPress={() => { this.setState({ openDrower: !openDrower }); }}>
                                {!openDrower
                                    ? <Icon name='menu' style={{ color: "#fff", fontSize: wp(9.5), top: -2 }} />
                                    : <Icon name='close' style={{ color: "#fff", fontSize: wp(11), top: -5, left: 5 }} />}
                            </Button>
                            <Title style={{ color: "#fff", fontSize: wp('7%') }}>INFLUENCE ME NOW</Title>
                        </Left>
                        <Right style={{ position: 'absolute', right: 0, top: 23, right: 5 }}>
                            <View style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1, height: '100%' }}>
                                <Button
                                    onPress={() => {
                                        this._changeSwiper(1)
                                        this.setState({ openDrower: false });
                                    }}
                                    transparent small style={{ height: '100%', alignSelf: 'flex-end', paddingLeft: 20, zIndex: 1000 }}>
                                    <Icon type="Feather" name='bell' style={{ color: '#FFF', fontSize: wp(6.5), top: 2, left: -2 }} />
                                </Button>
                                {notifications.length === 0 ? null : <Badge style={{ position: 'absolute', right: 0, top: 0, maxWidth: 30, minWidth: 30, backgroundColor: '#FFF', zIndex: 0 }}>
                                    <Text style={{ color: "#D81B60", }}>{notifications.length > 9 ? `+9` : notifications.length}</Text>
                                </Badge>}
                            </View>
                        </Right>
                    </Header>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />

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
                        <Container style={{ backgroundColor: '#FAFAFA' }}>
                            <Header span style={{
                                backgroundColor: '#FAFAFA',
                                height: hp(35),
                                flexDirection: "column",
                                shadowColor: 'rgba(0,0,0,0.2)',
                                shadowOpacity: 1,
                                shadowOffset: { width: 0 },
                                borderBottomColor: 'rgba(0,0,0,0.0)',
                            }}>
                                {/* Componentes como el avatar, your contest y redeem points */}
                                <UserInfo
                                    prizeCategory={prizeCategory}
                                    userData={userData}
                                    isReady={isReady}
                                    offLine={!online} />
                                <Button
                                    disabled={!online}
                                    rounded transparent style={{ alignSelf: "center", top: -10 }}
                                    onPress={() => this.showActionSheet()}>
                                    <Text style={{ color: !online ? "#3333" : "#D82B60", textAlign: "center", fontSize: wp(4.4) }}>{`Create a contest or Submit a prize`}</Text>
                                </Button>
                                <ActionSheet ref={(c) => { this.actionSheet = c; }} />
                                <Text style={{ fontSize: wp(8), fontWeight: "200", color: "#333", textAlign: "center", top: -5 }}>
                                    LIST OF CONTESTS
                                </Text>
                            </Header>
                            <Content padder showsVerticalScrollIndicator={false}>
                                <ListContest offLine={!online} userData={userData} />
                            </Content>
                        </Container>
                    </Drawer>
                </Container>
                <NotificationCenter notifications={notifications} _changeSwiper={this._changeSwiper} />
            </Swiper>
        )
    }
}


// Store connection
const mapStateToProps = ({ networkStatus }) => {
    return { networkStatus }
}

export default connect(mapStateToProps, null)(withNavigation(Home))
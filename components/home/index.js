import React, { Component } from "react";
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { withNavigation } from "react-navigation"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Text, Header, Title, Left, Button, Icon, Container, ActionSheet, Content, View, Right, Badge } from 'native-base';
import Swiper from 'react-native-swiper'

// Child Components
import UserInfo from "./photoAndButtom"
import ListContest from "./listContest"
import Menu from './modalSettings'

// gadrient
import { MyStatusBar } from '../global/statusBar'

// Colors
import { colorsPalette } from '../global/static/colors'

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
            menu: false,
            actionSheetButtonIndex: "Create a contest",
            prizeCategory: [],
            notifications: [],
            isLoading: false,
            refreshing: false,
        }
        this.actionSheet = null;
    }

    _deleteNotificationLoading = (value) => {
        this.setState({ isLoading: value })
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

            // Agregar notifications
            API.graphql(graphqlOperation(subscriptions.onCreateNotifications)).subscribe({
                error: ({ errors }) => { console.log(errors) },
                next: (getData) => {
                    if (getData.value.data.onCreateNotifications.idUserTo === this.state.userData.id) {
                        this.setState({ notifications: [...this.state.notifications, getData.value.data.onCreateNotifications] })
                    }
                }
            })

            // Delete notifications
            API.graphql(graphqlOperation(subscriptions.onDeleteNotifications)).subscribe({
                error: ({ errors }) => { console.log(errors) },
                next: () => { this.getDataFromAWS() }
            })

            // Create Engage
            API.graphql(graphqlOperation(subscriptions.onCreateEngage)).subscribe({
                error: ({ errors }) => { console.log(errors) },
                next: () => { this.getDataFromAWS() }
            })
        }
    }

    getDataFromAWS = async () => {
        try {
            const data = await Auth.currentAuthenticatedUser()
            const userData = await API.graphql(graphqlOperation(queries.getUser, { id: data.id || data.attributes.sub }))
            const prizeCategory = await API.graphql(graphqlOperation(queries.listPrizesCategorys))
            const notifications = await API.graphql(graphqlOperation(queries.listNotificationss, { filter: { idUserTo: { eq: userData.data.getUser.id } } }))
            this._deleteNotificationLoading(false)
            this._refreshing(false)
            this.setState({ userData: userData.data.getUser, isReady: true, prizeCategory: prizeCategory.data.listPrizesCategorys.items, notifications: notifications.data.listNotificationss.items })
        } catch (error) {
            console.log(error)
        }
    }

    _refreshing = (value) => {
        this.setState({ refreshing: value })
    }

    _refreshData = () => {
        this.getDataFromAWS()
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

    _menu = (value) => {
        this.setState({ menu: value })
    }

    render() {
        const { userData, menu, isReady, prizeCategory, notifications, isLoading, refreshing } = this.state
        const { online } = this.props.networkStatus
        return (
            <Swiper
                ref={(swiper) => this.swiper = swiper}
                scrollEnabled={!menu}
                showsPagination={false}
                showsButtons={false}
                index={0}
                loop={false}>
                <Container style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    {/* Header */}
                    <Header style={{ backgroundColor: colorsPalette.primaryColor }}>
                        <Left style={{ flexDirection: "row", alignItems: "center" }}>
                            <Button style={{ minWidth: wp(11) }} transparent
                                onPress={() => { this._menu(true) }}>
                                <Icon name='menu' style={{ color: colorsPalette.secondaryColor, fontSize: wp(9.5), top: -2 }} />
                            </Button>
                            <Title
                                allowFontScaling={false}
                                style={{ color: colorsPalette.secondaryColor, fontSize: wp(6) }}>INFLUENCE ME NOW</Title>
                        </Left>
                        <Right style={{ position: 'absolute', right: 0, top: 23, right: 5 }}>
                            <View style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1, height: '100%' }}>
                                <Button
                                    onPress={() => { this._changeSwiper(1) }}
                                    transparent small style={{ height: '100%', alignSelf: 'flex-end', paddingLeft: 20, zIndex: 1000, left: 10 }}>
                                    <Icon type="Feather" name='bell' style={{ color: colorsPalette.secondaryColor, fontSize: wp(6.5), top: 2 }} />
                                </Button>
                                {notifications.length === 0 ? null :
                                    <Badge style={{ position: 'absolute', right: 0, top: 0, maxWidth: 20, minWidth: 20, backgroundColor: colorsPalette.secondaryColor, zIndex: 0, minHeight: 20, maxHeight: 20 }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{ color: colorsPalette.primaryColor, fontSize: wp(2.5), position: 'absolute', minHeight: 20, maxHeight: 20, maxWidth: 20, minWidth: 20, alignSelf: 'center' }}>{notifications.length > 9 ? `+9` : notifications.length}</Text>
                                    </Badge>}
                            </View>
                        </Right>
                    </Header>
                    <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
                    <Container
                        allowFontScaling={false}
                        style={{ backgroundColor: colorsPalette.secondaryColor }}>
                        <Header
                            span style={{
                                backgroundColor: colorsPalette.secondaryColor,
                                height: hp(35),
                                flexDirection: "column",
                                shadowColor: colorsPalette.primaryShadowColor,
                                shadowOpacity: 1,
                                shadowOffset: { width: 0, height: 1.5 },
                                borderBottomColor: colorsPalette.transparent
                            }}>
                            {/* Componentes como el avatar, your contest y redeem points */}
                            <UserInfo
                                _getDataFromAWS={this.getDataFromAWS}
                                prizeCategory={prizeCategory}
                                userData={userData}
                                isReady={isReady}
                                offLine={!online} />
                            <Button
                                disabled={!online}
                                bordered
                                small
                                transparent style={{ alignSelf: "center", top: -10, borderColor: colorsPalette.transparent }}
                                onPress={() => this.showActionSheet()}>
                                <Text
                                    allowFontScaling={false}
                                    style={{ color: !online ? colorsPalette.thirdColor : colorsPalette.primaryColor, textAlign: "center", fontSize: wp(4) }}>CREATE A CONTEST <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.primaryColor }}>OR</Text> SUBMIT A PRIZE</Text>
                            </Button>
                            <ActionSheet ref={(c) => { this.actionSheet = c; }} />
                            <Text
                                allowFontScaling={false}
                                style={{ fontSize: wp(6.5), fontWeight: "200", color: colorsPalette.darkFont, textAlign: "center", top: -5 }}>
                                LIST OF CONTESTS
                                </Text>
                        </Header>
                        <Content padder showsVerticalScrollIndicator={false}>
                            <ListContest offLine={!online} userData={userData} />
                        </Content>
                        <Menu menu={menu} userData={userData} _menu={this._menu} />
                    </Container>
                </Container>
                <NotificationCenter _refreshing={this._refreshing} refreshing={refreshing} _refreshData={this._refreshData} _deleteNotificationLoading={this._deleteNotificationLoading} isLoading={isLoading} notifications={notifications} _changeSwiper={this._changeSwiper} />
            </Swiper>
        )
    }
}


// Store connection
const mapStateToProps = ({ networkStatus }) => {
    return { networkStatus }
}

export default connect(mapStateToProps, null)(withNavigation(Home))
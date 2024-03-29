import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, View, Tab, Tabs, Text, TabHeading, Icon, Header, Item, Input, Button } from "native-base"
import lowerCase from 'lodash/lowerCase'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { PlaceholderMedia } from 'rn-placeholder'
import times from 'lodash/times'

// childComponents
import HeaderContest from "./header"
import CardContent from "./cardContent"
import CardMatched from './matched'
import AssociatedContest from './associatedContest'
import { DataNotFound } from "../../../global/emojis/index"

// Graphql
import { API, graphqlOperation } from 'aws-amplify'
import { showParticipationByUser } from '../../../../src/graphql/queries'
import * as queries from '../../../../src/graphql/queries'

// Colors
import { colorsPalette } from '../../../global/static/colors'
import { MyStatusBar } from '../../../global/statusBar'

class UserContest extends Component {
    constructor() {
        super()
        this.state = {
            input: "",
            contestParticipated: [],
            contestList: [],
            refreshing: false,
            matched: null
        }
        this._isMounted = true
    }

    componentDidMount() {
        this.getContestParticipated()
        this._getContestMatched()
    }

    _getContestMatched = async () => {
        if (this._isMounted) {
            const { userData } = this.props
            const { data } = await API.graphql(graphqlOperation(queries.listAudiences));
            const parseData = data.listAudiences.items.map(item => ({ usersFound: JSON.parse(item.usersFound).map(item => item.id), contest: JSON.parse(item.contest), allCompleteData: item }))
            Array.prototype.contains = function (element) { return this.indexOf(element) > -1 };
            const matched = parseData.map(item => item.usersFound.contains(userData.id) ? item : null)
            this.setState({ matched })
        }
    }

    getContestParticipated = async () => {
        if (this._isMounted) {
            const { userData } = this.props
            const { data } = await API.graphql(graphqlOperation(showParticipationByUser, { userId: userData.id }));
            let contestParticipated = JSON.parse(data.showParticipationByUser)
            this.setState({ contestParticipated })
        }
    }

    _onRefreshParticipated = () => {
        this.setState({ refreshing: true });
        this.getContestParticipated().then(() => { this.setState({ refreshing: false }) });
    }

    _onRefreshMatched = () => {
        this.setState({ refreshing: true });
        this._getContestMatched().then(() => { this.setState({ refreshing: false }) });
    }

    _onRefresCreated = () => {
        const { _getDataFromAWS } = this.props
        this.setState({ refreshing: true });
        _getDataFromAWS().then(() => { this.setState({ refreshing: false }) });
    }

    componentWillUnmount() { this._isMounted = false }

    _createContest = () => {
        const { navigation, _setModalVisibleYourContest } = this.props
        _setModalVisibleYourContest(false)
        navigation.navigate('CreateContest')
    }

    render() {
        const { userData, _setModalVisibleYourContest } = this.props
        const { input, contestParticipated, refreshing, matched } = this.state

        // Filtra por el nombre del concurso
        let filterContestCreated = []; filterContestCreated = userData.createContest.items.filter((item) => { return item.general.nameOfContest.toLowerCase().indexOf(lowerCase(input)) !== -1 })
        let filterContestParticipated = []; filterContestParticipated = contestParticipated.filter((item) => { return item.contestData.Item && item.contestData.Item.general.nameOfContest.toLowerCase().indexOf(lowerCase(input)) !== -1 })
        let filterContestMatched = []; filterContestMatched = matched && matched.filter((item) => { return item !== null && item.contest.general.nameOfContest.toLowerCase().indexOf(lowerCase(input)) !== -1 })
        return (
            <Container style={{ backgroundColor: colorsPalette.primaryColor }}>
                {/* Header */}
                <HeaderContest _setModalVisibleYourContest={_setModalVisibleYourContest} />
                <Header searchBar rounded transparent style={{ height: 50, width: 300 }}>
                    <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
                    <Item style={{ top: -10, backgroundColor: colorsPalette.primaryColor }}>
                        <Icon name="ios-search" style={{ color: colorsPalette.secondaryColor }} />
                        <Input
                            minimumFontScale={wp(4)}
                            allowFontScaling={false}
                            selectionColor={colorsPalette.secondaryColor}
                            style={{ color: colorsPalette.secondaryColor }}
                            value={input}
                            onChangeText={(input) => this.setState({ input })}
                            placeholderTextColor={colorsPalette.secondaryColor}
                            placeholder="Filter by name of contest" />
                    </Item>
                </Header>
                <Tabs
                    style={{ backgroundColor: colorsPalette.secondaryColor }}
                    onChangeTab={() => this.setState({ input: "" })}
                    tabBarUnderlineStyle={{ backgroundColor: colorsPalette.secondaryColor }}>
                    <Tab
                        heading={
                            <TabHeading style={{ backgroundColor: colorsPalette.primaryColor }}>
                                <Text
                                    minimumFontScale={wp(4)}
                                    allowFontScaling={false}
                                    style={{ color: colorsPalette.secondaryColor, fontSize: wp(4) }}>Matched</Text>
                            </TabHeading>
                        }
                        activeTextStyle={{ color: colorsPalette.secondaryColor, fontSize: wp(4) }}
                        textStyle={{ color: colorsPalette.secondaryColor }}
                        activeTabStyle={{ backgroundColor: colorsPalette.primaryColor }}>
                        {
                            matched !== null ?
                                filterContestMatched && filterContestMatched.length
                                    ? <FlatList
                                        refreshControl={<RefreshControl tintColor={colorsPalette.primaryColor} refreshing={refreshing} onRefresh={this._onRefreshMatched} />}
                                        data={filterContestMatched}
                                        renderItem={({ item, index }) =>
                                            <View key={index}>
                                                <CardMatched _getContestMatched={this._getContestMatched} userData={userData} allCompleteData={item.allCompleteData} item={item.contest} inputText={input} _setModalVisibleYourContest={_setModalVisibleYourContest} />
                                                <View style={{ borderBottomColor: colorsPalette.underlinesColor, borderBottomWidth: 0.5, width: "90%", alignSelf: 'center', top: 5 }} />
                                            </View>
                                        }
                                        keyExtractor={(item, index) => index.toString()} />
                                    : <DataNotFound inputText={input} />
                                : <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={times(5, () => [{ id: 1 }])}
                                    renderItem={() =>
                                        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.0)' }}>
                                            <PlaceholderMedia
                                                style={{ width: "90%", alignSelf: "center", height: 100, borderRadius: 5, padding: 20, marginTop: 20 }}
                                                hasRadius={false} animate="fade" />
                                        </View>
                                    }
                                    keyExtractor={(item, index) => index.toString()} />
                        }
                    </Tab>

                    <Tab
                        heading={
                            <TabHeading style={{ backgroundColor: colorsPalette.primaryColor }}>
                                <Text
                                    minimumFontScale={wp(4)}
                                    allowFontScaling={false}
                                    style={{ color: colorsPalette.secondaryColor, fontSize: wp(4) }}>Created</Text>
                            </TabHeading>
                        }
                        activeTextStyle={{ color: colorsPalette.secondaryColor, fontSize: wp(4) }}
                        textStyle={{ color: colorsPalette.secondaryColor }}
                        tabStyle={{ backgroundColor: colorsPalette.primaryColor }}
                        activeTabStyle={{ backgroundColor: colorsPalette.primaryColor }}>
                        {
                            userData && userData.createContest.items.length ?
                                filterContestCreated && filterContestCreated.length
                                    ? <FlatList
                                        refreshControl={
                                            <RefreshControl tintColor={colorsPalette.primaryColor} refreshing={refreshing} onRefresh={this._onRefresCreated} />
                                        }
                                        data={filterContestCreated}
                                        renderItem={({ item, index }) =>
                                            <View key={index}>
                                                <CardContent userData={userData} item={item} inputText={input} _setModalVisibleYourContest={_setModalVisibleYourContest} />
                                                <View style={{ borderBottomColor: colorsPalette.underlinesColor, borderBottomWidth: 0.5, width: "90%", alignSelf: 'center', top: 5 }} />
                                            </View>
                                        }
                                        keyExtractor={(item, index) => index.toString()} />
                                    : <DataNotFound inputText={input} />
                                : <View style={{ flex: 1, alignItems: 'center', top: 50 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.gradientGray }}>You have no contests created</Text>
                                    <Button style={{ backgroundColor: colorsPalette.primaryColor, alignSelf: 'center', top: 15 }} onPress={() => this._createContest()}>
                                        <Text style={{ fontWeight: 'bold' }}>Create one!</Text>
                                    </Button>
                                </View>
                        }
                    </Tab>

                    <Tab
                        heading={
                            <TabHeading style={{ backgroundColor: colorsPalette.primaryColor }}>
                                <Text
                                    minimumFontScale={wp(4)}
                                    allowFontScaling={false}
                                    style={{ color: colorsPalette.secondaryColor, fontSize: wp(4) }}>Submitted</Text>
                            </TabHeading>
                        }
                        activeTextStyle={{ color: colorsPalette.secondaryColor }}
                        textStyle={{ color: colorsPalette.secondaryColor }}
                        tabStyle={{ backgroundColor: colorsPalette.primaryColor }}
                        activeTabStyle={{ backgroundColor: colorsPalette.primaryColor }}>
                        {
                            filterContestParticipated && filterContestParticipated.length
                                ? <FlatList
                                    data={filterContestParticipated}
                                    refreshControl={
                                        <RefreshControl tintColor={colorsPalette.primaryColor} refreshing={refreshing} onRefresh={this._onRefreshParticipated} />
                                    }
                                    renderItem={({ item, index }) =>
                                        <View key={index}>
                                            <AssociatedContest
                                                item={item}
                                                userData={userData}
                                                _setModalVisibleYourContest={_setModalVisibleYourContest} />
                                            <View style={{ borderBottomColor: colorsPalette.underlinesColor, borderBottomWidth: 0.5, width: "90%", alignSelf: 'center', top: 5 }} />
                                        </View>
                                    }
                                    keyExtractor={(item, index) => index.toString()} />
                                : <DataNotFound inputText={input} />
                        }
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}
export default withNavigation(UserContest)
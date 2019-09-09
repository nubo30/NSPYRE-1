import React, { Component } from 'react';
import { FlatList, Platform, RefreshControl } from 'react-native';
import { Container, View, Tab, Tabs, Text, TabHeading, Icon } from "native-base"
import _ from 'lodash'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import SearchBar from 'react-native-searchbar'

// childComponents
import HeaderContest from "./header"
import CardContent from "./cardContent"
import AssociatedContest from './associatedContest'
import { DataNotFound } from "../../../Global/emojis/index"

// Graphql
import { API, graphqlOperation } from 'aws-amplify'
import { showParticipationByUser } from '../../../../src/graphql/queries'


class UserContest extends Component {
    constructor() {
        super()
        this.state = { input: "", contestParticipated: [], contestList: [], refreshing: false }
        this._isMounted = true
    }


    _emptySearchInput = () => {
        this.setState({ input: "" })
        this.searchBar._clearInput()
    }

    _openSearchBar = () => {
        this.searchBar.show()
    }

    _closeSearchBar = () => {
        this.searchBar.hide()
    }

    componentDidMount() {
        this.getContestParticipated()
    }

    getContestParticipated = async () => {
        if (this._isMounted) {
            const { userData } = this.props
            const { data } = await API.graphql(graphqlOperation(showParticipationByUser, { userId: userData.id }));
            let contestParticipated = JSON.parse(data.showParticipationByUser)
            this.setState({ contestParticipated })
        }
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getContestParticipated().then(() => {
            this.setState({ refreshing: false });
        });
    }

    componentWillUnmount() {
        this._isMounted = false
    }


    render() {
        const { userData, _setModalVisibleYourContest } = this.props
        const { input, contestParticipated, refreshing } = this.state

        // Filtra por el nombre del concurso
        let filterContestCreated = []; filterContestCreated = userData.createContest.items.filter((item) => { return item.general.nameOfContest.toLowerCase().indexOf(_.lowerCase(input)) !== -1 })
        let filterContestParticipated = []; filterContestParticipated = contestParticipated.filter((item) => { return item.contestData.Item.general.nameOfContest.toLowerCase().indexOf(_.lowerCase(input)) !== -1 })
        return (
            <Container style={{ backgroundColor: '#FAFAFA' }}>
                {/* Search Bar */}
                <View style={Platform.OS === "ios" ? { position: "absolute", zIndex: 1 } : { position: "absolute" }}>
                    <SearchBar
                        ref={(ref) => this.searchBar = ref}
                        handleChangeText={(input) => this.setState({ input })}
                        allowFontScaling={false}
                        minimumFontScale={wp(6)}
                        fontSize={15}
                        placeholder={`Filter by name...`}
                        animate={false}
                        iconColor="#D81B60"
                        backgroundColor="#F5F5F5"
                        heightAdjust={-5}
                        autoCorrect={false}
                    />
                </View>

                {/* Header */}
                <HeaderContest _openSearchBar={this._openSearchBar} _setModalVisibleYourContest={_setModalVisibleYourContest} />
                <Tabs
                    style={{ backgroundColor: '#FFF' }}
                    onChangeTab={() => { this._closeSearchBar(); this._emptySearchInput() }}
                    tabBarUnderlineStyle={{ backgroundColor: '#D81B60' }}>
                    <Tab
                        heading={
                            <TabHeading>
                                <Text
                                    minimumFontScale={wp(4)}
                                    allowFontScaling={false}
                                    style={{ color: '#D81B60', fontSize: wp(4) }}>Matched</Text>
                            </TabHeading>
                        }
                        activeTextStyle={{ color: '#D81B60', fontSize: wp(4) }}
                        textStyle={{ color: '#D81B60' }}
                        tabStyle={{ backgroundColor: "#F5F5F5" }}
                        activeTabStyle={{ backgroundColor: '#F5F5F5' }}>
                        <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1, top: -40 }}>
                            <Icon type="Ionicons" name="ios-construct" style={{ fontSize: wp(20), color: '#3333', alignSelf: 'center' }} />
                            <Text style={{ alignSelf: 'center', color: "#3333" }}>In construction</Text>
                        </View>
                    </Tab>
                    <Tab
                        heading={
                            <TabHeading>
                                <Text
                                    minimumFontScale={wp(4)}
                                    allowFontScaling={false}
                                    style={{ color: '#D81B60', fontSize: wp(4) }}>Created</Text>
                            </TabHeading>
                        }
                        activeTextStyle={{ color: '#D81B60', fontSize: wp(4) }}
                        textStyle={{ color: '#D81B60' }}
                        tabStyle={{ backgroundColor: "#F5F5F5" }}
                        activeTabStyle={{ backgroundColor: '#F5F5F5' }}>
                        {
                            filterContestCreated && filterContestCreated.length
                                ? <FlatList
                                    data={filterContestCreated}
                                    renderItem={({ item, index }) =>
                                        <View key={index}>
                                            <CardContent userData={userData} item={item} inputText={input} _setModalVisibleYourContest={_setModalVisibleYourContest} />
                                            <View style={{ borderBottomColor: '#BDBDBD', borderBottomWidth: 0.5, width: "90%", alignSelf: 'center', top: 5 }} />
                                        </View>
                                    }
                                    keyExtractor={(item, index) => index.toString()} />
                                : <DataNotFound inputText={input} />
                        }
                    </Tab>
                    <Tab
                        heading={
                            <TabHeading>
                                <Text
                                    minimumFontScale={wp(4)}
                                    allowFontScaling={false}
                                    style={{ color: '#D81B60', fontSize: wp(4) }}>Participated</Text>
                            </TabHeading>
                        }
                        activeTextStyle={{ color: '#D81B60' }}
                        textStyle={{ color: '#D81B60' }}
                        tabStyle={{ backgroundColor: "#F5F5F5" }}
                        activeTabStyle={{ backgroundColor: '#F5F5F5' }}>
                        {
                            filterContestParticipated && filterContestParticipated.length
                                ? <FlatList
                                    data={filterContestParticipated}
                                    refreshControl={
                                        <RefreshControl tintColor="#D82B60" refreshing={refreshing} onRefresh={this._onRefresh} />
                                    }
                                    renderItem={({ item, index }) =>
                                        <View key={index}>
                                            <AssociatedContest
                                                item={item}
                                                userData={userData}
                                                _setModalVisibleYourContest={_setModalVisibleYourContest} />
                                            <View style={{ borderBottomColor: '#BDBDBD', borderBottomWidth: 0.5, width: "90%", alignSelf: 'center', top: 5 }} />
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
export default (UserContest)
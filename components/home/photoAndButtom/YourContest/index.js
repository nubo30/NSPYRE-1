import React, { Component } from 'react';
import { FlatList, Platform, RefreshControl } from 'react-native';
import { Container, View, Tab, Tabs, Text, TabHeading } from "native-base"
import SearchBar from 'react-native-searchbar';
import _ from 'lodash'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// childComponents
import HeaderContest from "./header"
import CardContent from "./cardContent"
import AssociatedContest from './associatedContest'
import { DataNotFound } from "../../../Global/emojis/index"

// Gradients
import { GadrientsListContenst } from "../../../Global/gradients/index"

// Graphql
import { API, graphqlOperation } from 'aws-amplify'
import { showParticipationByUser } from '../../../../src/graphql/queries'


class UserContest extends Component {
    constructor() {
        super()
        this.state = { input: "", contestAsociated: [], contestList: [], refreshing: false }
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
        this.getContestAsociated()
    }

    getContestAsociated = async () => {
        if (this._isMounted) {
            const { userData } = this.props
            const { data } = await API.graphql(graphqlOperation(showParticipationByUser, { userId: userData.id }));
            let contestAsociated = JSON.parse(data.showParticipationByUser)
            this.setState({ contestAsociated })
        }
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getContestAsociated().then(() => {
            this.setState({ refreshing: false });
        });
    }

    componentWillUnmount() {
        this._isMounted = false
    }


    render() {
        const { userData, _setModalVisibleYourContest } = this.props
        const { input, contestAsociated, refreshing } = this.state

        // Filtra por el nombre del concurso
        let filterContest = []; filterContest = userData.createContest.items.filter((item) => { return item.general.nameOfContest.toLowerCase().indexOf(_.lowerCase(input)) !== -1 })
        return (
            <Container>
                <GadrientsListContenst />

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
                    onChangeTab={() => { this._closeSearchBar(); this._emptySearchInput() }}
                    tabBarUnderlineStyle={{ backgroundColor: '#D81B60' }}>
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
                            filterContest && filterContest.length
                                ? <FlatList
                                    data={filterContest}
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
                            contestAsociated && contestAsociated.length
                                ? <FlatList
                                    data={contestAsociated}
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
                                : <View style={{ justifyContent: 'center', alignItems: 'center', top: 40 }}>
                                    <Text
                                        allowFontScaling={false}
                                        minimumFontScale={wp(5)}
                                        style={{ color: '#BDBDBD', fontSize: wp(5), alignSelf: 'center', textAlign: 'center' }}>You have not joined any contest!</Text>
                                </View>
                        }
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}
export default UserContest
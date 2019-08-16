import React, { Component } from 'react';
import { FlatList, Platform, RefreshControl } from 'react-native';
import { Container, View, Tab, Tabs, Text } from "native-base"
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
    state = { input: "", contestAsociated: [], contestList: [], refreshing: false }

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
        const { userData } = this.props
        const { data } = await API.graphql(graphqlOperation(showParticipationByUser, { userId: userData.id }));
        let contestAsociated = JSON.parse(data.showParticipationByUser)
        this.setState({ contestAsociated })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getContestAsociated().then(() => {
            this.setState({ refreshing: false });
        });
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
                        placeholder={`Filter by name...`}
                        animate={false}
                        iconColor="#D81B60"
                        backgroundColor="#F5F5F5"
                        heightAdjust={-5}
                        autoCorrect={true}
                    />
                </View>

                {/* Header */}
                <HeaderContest _openSearchBar={this._openSearchBar} _setModalVisibleYourContest={_setModalVisibleYourContest} />
                <Tabs
                    onChangeTab={() => { this._closeSearchBar(); this._emptySearchInput() }}
                    tabBarUnderlineStyle={{ backgroundColor: '#D81B60' }}>
                    <Tab
                        heading="Created"
                        activeTextStyle={{ color: '#D81B60' }}
                        textStyle={{ color: '#D81B60' }}
                        tabStyle={{ backgroundColor: "#F5F5F5" }}
                        activeTabStyle={{ backgroundColor: '#F5F5F5' }}>
                        {
                            filterContest.length
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
                        heading="Participated"
                        activeTextStyle={{ color: '#D81B60' }}
                        textStyle={{ color: '#D81B60' }}
                        tabStyle={{ backgroundColor: "#F5F5F5" }}
                        activeTabStyle={{ backgroundColor: '#F5F5F5' }}>
                        {
                            contestAsociated.length
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
                                    <Text style={{ color: '#BDBDBD', fontSize: wp(6.5), alignSelf: 'center', textAlign: 'center' }}>You have not joined any contest!</Text>
                                </View>
                        }
                    </Tab>
                </Tabs>
            </Container>

        )
    }
}
export default UserContest
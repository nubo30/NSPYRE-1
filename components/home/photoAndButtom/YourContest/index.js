import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Container, View, Tab, Tabs, Text, TabHeading, Icon, Header, Item, Input } from "native-base"
import lowerCase from 'lodash/lowerCase'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

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
        let filterContestCreated = []; filterContestCreated = userData.createContest.items.filter((item) => { return item.general.nameOfContest.toLowerCase().indexOf(lowerCase(input)) !== -1 })
        let filterContestParticipated = []; filterContestParticipated = contestParticipated.filter((item) => { return item.contestData.Item.general.nameOfContest.toLowerCase().indexOf(lowerCase(input)) !== -1 })
        return (
            <Container style={{ backgroundColor: '#FAFAFA' }}>
                {/* Header */}
                <HeaderContest _setModalVisibleYourContest={_setModalVisibleYourContest} />
                <Header searchBar rounded transparent style={{ height: 50, width: 300 }}>
                    <Item style={{ top: -10, backgroundColor: '#FAFAFA' }}>
                        <Icon name="ios-search" style={{ color: !input ? "#D81B60" : "#333" }} />
                        <Input
                            minimumFontScale={wp(4)}
                            allowFontScaling={false}
                            value={input}
                            onChangeText={(input) => this.setState({ input })}
                            placeholderTextColor="#D81B60"
                            placeholder="Filter by name of contest" />
                    </Item>
                </Header>
                <Tabs
                    style={{ backgroundColor: '#FAFAFA' }}
                    onChangeTab={() => this.setState({ input: "" })}
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
                        tabStyle={{ backgroundColor: "#FAFAFA" }}
                        activeTabStyle={{ backgroundColor: '#FAFAFA' }}>
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
                        tabStyle={{ backgroundColor: "#FAFAFA" }}
                        activeTabStyle={{ backgroundColor: '#FAFAFA' }}>
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
                        tabStyle={{ backgroundColor: "#FAFAFA" }}
                        activeTabStyle={{ backgroundColor: '#FAFAFA' }}>
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
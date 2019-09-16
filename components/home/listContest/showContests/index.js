import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify'
import { withNavigation } from 'react-navigation'
import {
    Container,
    Text,
    Left,
    Header,
    Item,
    Icon,
    Input,
    Button,
    Title,
} from "native-base"
import truncate from 'lodash/truncate'
import startCase from 'lodash/startCase'
import lowerCase from 'lodash/lowerCase'
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Child Components
import CardContestAll from "./switchCards/cardContestAll"
import { DataNotFound } from "../../../global/emojis/index"
import PlaceholderAll from './placeholderAll'
import { MyStatusBar } from '../../../global/statusBar/index'

// GraphQL
import * as queries from '../../../../src/graphql/queries'

class ShowContest extends Component {
    state = {
        isReady: false,
        statusBar: false,
        userData: null,
        input: "",
        contests: null,
        refreshing: false
    }

    componentDidMount() {
        this.getContest()
    }


    getContest = async () => {
        const categoryContest = this.props.navigation.getParam('categoryContest');
        try {
            const contests = await API.graphql(graphqlOperation(queries.listCreateContests, { filter: { category: { eq: categoryContest.category } } }))
            this.setState({ contests: contests.data.listCreateContests.items })
        } catch (error) {
            console.log(error);
        }
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getContest().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        const { input, contests } = this.state
        const categoryContest = this.props.navigation.getParam('categoryContest');
        const userData = this.props.navigation.getParam('userData')
        let filterContest = contests && contests.filter((item) => { return item.general.nameOfContest.toLowerCase().indexOf(lowerCase(input)) !== -1 })
        return (
            <Container>
                <Header span style={{ backgroundColor: "#D82B60", borderBottomColor: "rgba(0,0,0,0.0)", height: 110 }}>
                    <Grid>
                        <Row size={50}>
                            <Left style={{ flexDirection: 'row' }}>
                                <Button transparent onPress={() => { this.props.navigation.goBack(); }}>
                                    <Icon name='arrow-back' style={{ color: "#FFF" }} />
                                    <Text
                                        minimumFontScale={wp(4)}
                                        allowFontScaling={false}
                                        style={{ left: 5, color: "#FFF", fontSize: wp(4) }}>Back</Text>
                                </Button>
                                <Title
                                    minimumFontScale={wp(9)}
                                    allowFontScaling={false}
                                    style={{ alignSelf: "center", left: 15, color: "#FFF", fontSize: wp(9) }}>{truncate(startCase(categoryContest.name), { length: 17, separator: "..." })}</Title>
                            </Left>
                        </Row>
                        <Row size={50} style={{ paddingLeft: 15 }}>
                            <Header searchBar rounded style={{ height: "100%", width: 300, backgroundColor: "#D82B60", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                                <Item style={{ backgroundColor: '#fff', top: -10 }}>
                                    <Icon name="ios-search" style={{ color: !input ? "#E0E0E0" : "#333" }} />
                                    <Input
                                        minimumFontScale={wp(4)}
                                        allowFontScaling={false}
                                        onChangeText={(input) => this.setState({ input })}
                                        placeholderTextColor="#E0E0E0"
                                        placeholder="Filter by name of contest" />
                                </Item>
                            </Header>
                        </Row>
                    </Grid>
                </Header>
                <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                {contests !== null
                    ? filterContest.length
                        ? <FlatList
                            data={filterContest}
                            refreshControl={
                                <RefreshControl tintColor="#D82B60" refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
                            }
                            keyExtractor={item => item.id}
                            initialNumToRender={2}
                            renderItem={({ item, index }) =>
                                <CardContestAll userData={userData} index={index} item={item} />
                            } /> : <DataNotFound inputText={input} />
                    : <PlaceholderAll />}
            </Container>
        )
    }
}

export default withNavigation(ShowContest)


import React, { Component } from 'react';
import { FlatList, RefreshControl, ImageBackground, TouchableHighlight, Platform } from 'react-native';
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
    View
} from "native-base"
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CountDown from 'react-native-countdown-component';
import moment from 'moment'
import _ from 'lodash'
import * as Animatable from 'react-native-animatable';

import { colorsPalette } from '../../../global/static/colors'
import { MyStatusBar } from '../../../global/statusBar'
import { DataNotFound } from "../../../global/emojis/index"

// Child components
import PlaceholderAll from '../showContests/placeholderAll'

import * as queries from '../../../../src/graphql/queries'

class Trending extends Component {
    state = {
        isReady: false,
        input: "",
        refreshing: false,
        animation: false,
        trendingContests: null,
        isFinishedContest: false
    }


    _onRefresh = () => {
        this.setState({ refreshing: true });
        this._getTrendingContest().then(() => {
            this.setState({ refreshing: false });
        });
    }

    componentDidMount() {
        this._getTrendingContest()
    }

    _getTrendingContest = async () => {
        try {
            const response = await API.graphql(graphqlOperation(queries.trending, { params: "" }))
            this.setState({ trendingContests: JSON.parse(response.data.trending) })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const userData = this.props.navigation.getParam('userData')
        const { input, trendingContests, animation, isFinishedContest } = this.state
        let filterTrendingContest = trendingContests && trendingContests.filter(item => item.general.nameOfContest.indexOf(input) !== -1)
        return (
            <Container>
                <Header span style={{ backgroundColor: "#D82B60", borderBottomColor: "rgba(0,0,0,0.0)", height: 110 }}>
                    <Grid>
                        <Row size={50}>
                            <Left style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
                                    <Title
                                        minimumFontScale={wp(9)}
                                        allowFontScaling={false}
                                        style={{ alignSelf: "center", left: 15, color: "#FFF", fontSize: wp(9) }}>Trending 🔥</Title>
                                </View>
                                <Button transparent onPress={() => { this.props.navigation.goBack(); }}>
                                    <Icon name='arrow-back' style={{ color: "#FFF" }} />
                                    <Text
                                        minimumFontScale={wp(4)}
                                        allowFontScaling={false}
                                        style={{ color: "#FFF", fontSize: wp(4) }}>Back</Text>
                                </Button>
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
                {trendingContests !== null
                    ? trendingContests.length ?
                        filterTrendingContest.length
                            ? <FlatList
                                data={filterTrendingContest}
                                refreshControl={<RefreshControl tintColor="#D82B60" refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}
                                keyExtractor={item => item.id}
                                initialNumToRender={2}
                                renderItem={({ item }) =>
                                    <View>
                                        <TouchableHighlight
                                            underlayColor={colorsPalette.transparent}
                                            onPress={() => this.setState({ animation: true })}>
                                            <Animatable.View
                                                onAnimationEnd={() => {
                                                    this.setState({ animation: false })
                                                    this.props.navigation.navigate("AboutContest", { contest: Object.assign(item, { user: { avatar: "lorem", id: "lorem" }, usersLikes: { items: [] } }), fromWhere: 'trending', userData })
                                                }}
                                                animation={animation ? "pulse" : undefined}
                                                duration={200}
                                                style={{
                                                    flex: 0,
                                                    borderRadius: 5,
                                                    elevation: Platform.OS === 'ios' ? 10 : 5,
                                                    marginBottom: 10,
                                                    width: "90%", height: 100,
                                                    alignSelf: "center",
                                                    marginTop: 30,
                                                }}>
                                                <View style={{
                                                    borderRadius: 5,
                                                    shadowColor: colorsPalette.primaryShadowColor,
                                                    shadowOffset: { width: 0 }, shadowOpacity: 1
                                                }}>
                                                    <ImageBackground
                                                        borderRadius={5}
                                                        source={{ uri: item.general.picture.url }}
                                                        style={{ height: 100, width: "100%" }}>
                                                        <View style={{ backgroundColor: colorsPalette.primaryShadowColor, width: "100%", height: "100%", borderRadius: 5, alignItems: 'center', justifyContent: 'space-evenly' }}>
                                                            {isFinishedContest
                                                                ? <View style={{
                                                                    position: 'absolute',
                                                                    right: 0,
                                                                    top: 0,
                                                                    padding: 5
                                                                }}>
                                                                    <View style={{
                                                                        borderRadius: 5,
                                                                        padding: 10, backgroundColor: colorsPalette.errColor,
                                                                        shadowColor: colorsPalette.primaryShadowColor,
                                                                        shadowOffset: { width: 0 },
                                                                        shadowOpacity: 1,
                                                                    }}>
                                                                        <Text
                                                                            minimumFontScale={wp(3)}
                                                                            allowFontScaling={false}
                                                                            style={{ fontSize: wp(3), color: colorsPalette.secondaryColor, fontWeight: 'bold' }}>Completed</Text>
                                                                    </View>
                                                                </View> :
                                                                item.timer === null
                                                                    ? null
                                                                    : new Date(item.timer.end) < new Date()
                                                                        ? <View style={{
                                                                            position: 'absolute',
                                                                            right: 0,
                                                                            top: 0,
                                                                            padding: 5
                                                                        }}>
                                                                            <View style={{
                                                                                borderRadius: 5,
                                                                                padding: 10, backgroundColor: colorsPalette.errColor,
                                                                                shadowColor: colorsPalette.primaryShadowColor,
                                                                                shadowOffset: { width: 0 },
                                                                                shadowOpacity: 1,
                                                                            }}>
                                                                                <Text
                                                                                    minimumFontScale={wp(3)}
                                                                                    allowFontScaling={false}
                                                                                    style={{ fontSize: wp(3), color: colorsPalette.secondaryColor, fontWeight: 'bold' }}>Completed</Text>
                                                                            </View>
                                                                        </View> : <CountDown
                                                                            digitStyle={{ backgroundColor: colorsPalette.transparent }}
                                                                            digitTxtStyle={{ color: colorsPalette.secondaryColor }}
                                                                            timeLabelStyle={{ color: colorsPalette.secondaryColor }}
                                                                            until={moment(item.timer.end).diff(moment(new Date()), 'seconds')}
                                                                            onFinish={() => this.setState({ isFinishedContest: true })}
                                                                            onPress={() => { }}
                                                                            size={20}
                                                                        />}
                                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                                                                <Text
                                                                    minimumFontScale={wp(4)}
                                                                    allowFontScaling={false}
                                                                    style={{ color: colorsPalette.secondaryColor, left: -10, fontSize: wp(4) }}>Participants: {item.participants}</Text>
                                                            </View>
                                                        </View>
                                                    </ImageBackground>
                                                </View>
                                            </Animatable.View>
                                        </TouchableHighlight>
                                        <View>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(5), left: 20, color: colorsPalette.darkFont }}>
                                                {item.general.nameOfContest}
                                            </Text>
                                        </View>
                                    </View>
                                } /> : <DataNotFound inputText={input} />
                        : <View style={{ flex: 1, alignItems: 'center' }}><Text allowFontScaling={false} style={{ top: 30, alignSelf: 'center', textAlign: 'center', width: "90%", fontSize: wp(6), color: colorsPalette.gradientGray }}>Ooh! Apparently there are no trends, but this will not last long, some will appear!</Text></View>
                    : <PlaceholderAll />
                }
            </Container>
        );
    }
}
export default withNavigation(Trending)
import React, { Component } from 'react';
import { FlatList, RefreshControl, TouchableHighlight, ImageBackground } from 'react-native';
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
    Spinner,
    View
} from "native-base"
import _ from 'lodash'
import * as Animatable from 'react-native-animatable';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment'

// Child Components
import { DataNotFound } from "../../../../Global/emojis/index"
import PlaceholderAll from './placeholderAll'
import { MyStatusBar } from '../../../../Global/statusBar/index'

// GraphQL
import * as queries from '../../../../../src/graphql/queries'

class ShowPrizes extends Component {
    state = {
        isReady: false,
        statusBar: false,
        userData: null,
        input: "",
        prizes: null,
        refreshing: false,
        loadingImg: false,
        animationPulseId: ""
    }

    componentDidMount() {
        this.getContest()
    }

    getContest = async () => {
        const categoryPrizes = this.props.navigation.getParam('categoryPrizes');
        try {
            const contests = await API.graphql(graphqlOperation(queries.listSubmitPrizes, { filter: { category: { eq: categoryPrizes.category } } }))
            this.setState({ prizes: contests.data.listSubmitPrizes.items })
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


    _animationPulse = (item) => {
        this.setState({ animationPulseId: item.id })
    }

    render() {
        const { input, prizes, loadingImg, animationPulseId } = this.state
        const { navigation } = this.props
        const categoryPrizes = navigation.getParam('categoryPrizes');
        const userData = navigation.getParam('userData')
        let filterPrize = prizes && prizes.filter((item) => { return item.general.nameOfPrize.toLowerCase().indexOf(_.lowerCase(input)) !== -1 })
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
                                    style={{ alignSelf: "center", left: 15, color: "#FFF", fontSize: wp(9) }}>{_.truncate(_.startCase(categoryPrizes.name), { length: 17, separator: "..." })}</Title>
                            </Left>
                        </Row>
                        <Row size={50} style={{ paddingLeft: 15 }}>
                            <Header searchBar rounded style={{ height: "100%", width: 300, backgroundColor: "#D82B60", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                                <Item style={{ backgroundColor: '#fff', top: -10 }}>
                                    <Icon name="ios-search" style={{ color: !input ? "#E0E0E0" : "#333" }} />
                                    <Input
                                        autoCorrect={false}
                                        minimumFontScale={wp(9)}
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
                {prizes !== null
                    ? filterPrize.length
                        ? <FlatList
                            data={filterPrize}
                            refreshControl={<RefreshControl tintColor="#D82B60" refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}
                            keyExtractor={item => item.id}
                            initialNumToRender={2}
                            renderItem={({ item }) =>
                                <TouchableHighlight
                                    onPress={() => { this._animationPulse(item) }}
                                    underlayColor="rgba(0,0,0,0.0)">
                                    <Animatable.View
                                        animation={animationPulseId === item.id ? "pulse" : undefined}
                                        onAnimationEnd={() => { navigation.navigate('AboutThePrize', { prize: item, userData }); this.setState({ animationPulseId: "" }) }}
                                        duration={200}
                                        style={{
                                            height: 100,
                                            shadowColor: 'rgba(0,0,0,0.3)',
                                            shadowOffset: { width: 0 }, shadowOpacity: 1,
                                            width: '95%',
                                            alignSelf: 'center',
                                            marginTop: 15,
                                            borderRadius: 5
                                        }}>
                                        <ImageBackground
                                            source={{ uri: item.general.picture.url }}
                                            borderRadius={5}
                                            style={{ height: "100%", width: "100%", flex: 1 }}>
                                            <Spinner color="#FFF" animating={loadingImg} style={{ position: 'absolute', zIndex: 1 }} />
                                            <View style={{
                                                backgroundColor: 'rgba(0,0,0,0.2)',
                                                width: "100%", height: "100%",
                                                borderRadius: 5,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Text
                                                    minimumFontScale={wp(7)}
                                                    allowFontScaling={false}
                                                    style={{ color: "#FFF", fontSize: wp(7), top: 0, padding: 10 }}>
                                                    {item.general.nameOfPrize}
                                                </Text>
                                                <Text
                                                    minimumFontScale={wp(2.5)}
                                                    allowFontScaling={false}
                                                    style={{ color: "#FFF", fontSize: wp(3.5), position: "absolute", bottom: 0, padding: 10, right: 0, fontStyle: 'italic' }}>
                                                    Published by {_.startCase(item.user.name)}, at {_.lowerFirst(`${moment(item.createdAt).format('LL')}`)}.
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </Animatable.View>
                                </TouchableHighlight>
                            } /> : <DataNotFound inputText={input} />
                    : <PlaceholderAll />}
            </Container>
        )
    }
}

export default withNavigation(ShowPrizes)


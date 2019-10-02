import React, { Component } from 'react';
import { TouchableHighlight, ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, View, Text, Spinner, Tab, Tabs, Button, Content, TabHeading, Header, Item, Icon, Input } from "native-base"
import lowerFirst from "lodash/lowerFirst"
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import lowerCase from 'lodash/lowerCase'

// Component Child
import PrimaryHeader from './header'
import { DataNotFound } from '../../../global/emojis/index'

// Colors
import { MyStatusBar } from '../../../global/statusBar/'
import { colorsPalette } from '../../../global/static/colors'

class ListGeneralPrizes extends Component {
    state = {
        loadingImgYours: false,
        loadingImgCategory: false,
        openModalMyPrizes: false,
        valueKey: null,
        inputfilter: ""
    }

    setModalVisible = (action) => { this.setState({ openModalMyPrizes: action }) }

    _animation = (value) => {
        this.setState({ valueKey: value })
    }

    render() {
        const { valueKey, loadingImgYours, loadingImgCategory, inputfilter } = this.state
        const { userData, _setModalVisibleRedeemPoints, prizeCategory, navigation } = this.props
        const filterprizeCategory = prizeCategory && prizeCategory.filter(item => { return item.name.toLowerCase().indexOf(lowerCase(inputfilter)) !== -1 })
        return (
            <Container style={{ backgroundColor: colorsPalette.primaryColor }}>
                <PrimaryHeader _setModalVisibleRedeemPoints={_setModalVisibleRedeemPoints} />
                <Header searchBar rounded transparent style={{ height: 50, width: 300 }}>
                    <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
                    <Item style={{ top: -10, backgroundColor: colorsPalette.primaryColor }}>
                        <Icon name="ios-search" style={{ color: colorsPalette.secondaryColor }} />
                        <Input
                            minimumFontScale={wp(4)}
                            allowFontScaling={false}
                            selectionColor={colorsPalette.secondaryColor}
                            style={{ color: colorsPalette.secondaryColor }}
                            value={inputfilter}
                            onChangeText={(inputfilter) => this.setState({ inputfilter })}
                            placeholderTextColor={colorsPalette.secondaryColor}
                            placeholder="Search by name category" />
                    </Item>
                </Header>
                <Tabs
                    onChangeTab={() => this.setState({ inputfilter: "" })}
                    style={{ backgroundColor: colorsPalette.secondaryColor }}
                    tabBarUnderlineStyle={{ backgroundColor: colorsPalette.secondaryColor }}>
                    <Tab
                        heading={
                            <TabHeading style={{ backgroundColor: colorsPalette.primaryColor }}>
                                <Text
                                    minimumFontScale={wp(4)}
                                    allowFontScaling={false}
                                    style={{ color: colorsPalette.secondaryColor, fontSize: wp(4) }}>Categories</Text>
                            </TabHeading>
                        }
                        activeTextStyle={{ color: colorsPalette.secondaryColor }}
                        textStyle={{ color: colorsPalette.secondaryColor }}
                        tabStyle={{ backgroundColor: colorsPalette.primaryColor }}
                        activeTabStyle={{ backgroundColor: colorsPalette.primaryColor }}>
                        <Content>
                            {filterprizeCategory.length
                                ? filterprizeCategory.map((item, key) => (
                                    <TouchableHighlight
                                        key={key}
                                        underlayColor="rgba(0,0,0,0.0)"
                                        style={{
                                            padding: 10,
                                            shadowColor: 'rgba(0,0,0,0.3)',
                                            shadowOffset: { width: 0 },
                                            shadowOpacity: 1,
                                            width: "95%",
                                            alignSelf: 'center'
                                        }}
                                        onPress={() => this._animation(key)}>
                                        <Animatable.View
                                            onAnimationEnd={() => {
                                                this.setState({ valueKey: null });
                                                _setModalVisibleRedeemPoints(false);
                                                navigation.navigate('Prizes', { categoryPrizes: item, userData })
                                            }}
                                            duration={200}
                                            animation={valueKey === key ? "pulse" : undefined}>
                                            <ImageBackground
                                                onLoadStart={() => this.setState({ loadingImgCategory: true })}
                                                onLoadEnd={() => { this.setState({ loadingImgCategory: false }) }}
                                                borderRadius={5}
                                                source={{ uri: item.picture }}
                                                style={{ height: 125, width: "100%", flex: 1, justifyContent: 'center', alingItems: 'center' }}>
                                                <Spinner color={colorsPalette.secondaryColor} animating={loadingImgCategory} style={{ position: 'absolute', alignSelf: 'center' }} />
                                                <View style={{
                                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: 5
                                                }}>
                                                    <Text
                                                        minimumFontScale={wp(7)}
                                                        allowFontScaling={false}
                                                        style={{ color: "#FFF", fontSize: wp(7), position: "absolute", bottom: 0, padding: 10 }}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                            </ImageBackground>
                                        </Animatable.View>
                                    </TouchableHighlight>
                                )) : <DataNotFound inputText={inputfilter} />}
                        </Content>
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
                        activeTextStyle={{ color: colorsPalette.secondaryColor }}
                        textStyle={{ color: colorsPalette.secondaryColor }}
                        tabStyle={{ backgroundColor: colorsPalette.primaryColor }}
                        activeTabStyle={{ backgroundColor: colorsPalette.primaryColor }}>
                        {
                            userData.submitPrize.items.length
                                ? <Content>
                                    {userData.submitPrize.items.map((item, key) =>
                                        <TouchableHighlight
                                            key={key}
                                            style={{ paddingBottom: 10 }}
                                            onPress={() => { this._animation(key) }}
                                            underlayColor="rgba(0,0,0,0.0)">
                                            <Animatable.View
                                                animation={valueKey === key ? "pulse" : undefined}
                                                onAnimationEnd={() => {
                                                    this.setState({ valueKey: null });
                                                    _setModalVisibleRedeemPoints(false);
                                                    navigation.navigate('AboutThePrize', { prize: item, userData })
                                                }}
                                                duration={200}
                                                style={{
                                                    height: 100,
                                                    shadowColor: 'rgba(0,0,0,0.3)',
                                                    shadowOffset: { width: 0 }, shadowOpacity: 1,
                                                    width: '95%',
                                                    alignSelf: 'center',
                                                    marginTop: 15,
                                                    borderRadius: 15,
                                                }}>
                                                <ImageBackground
                                                    onLoadStart={() => this.setState({ loadingImgYours: true })}
                                                    onLoadEnd={() => { this.setState({ loadingImgYours: false }) }}
                                                    source={{ uri: item.general.picture.url }}
                                                    borderRadius={5}
                                                    style={{ height: "100%", width: "100%", flex: 1, justifyContent: 'center', alingItems: 'center' }}>
                                                    <Spinner color="#FFF" animating={loadingImgYours} style={{ position: 'absolute', alignSelf: 'center' }} />
                                                    <View style={{
                                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                                        width: "100%", height: "100%",
                                                        borderRadius: 5
                                                    }}>
                                                        <Text
                                                            minimumFontScale={wp(7)}
                                                            allowFontScaling={false}
                                                            style={{ color: "#FFF", fontSize: wp(7), position: "absolute", bottom: 0, padding: 10 }}>
                                                            {item.general.nameOfPrize}
                                                        </Text>
                                                        <Text
                                                            minimumFontScale={wp(3)}
                                                            allowFontScaling={false}
                                                            style={{ color: "#FFF", fontSize: wp(3), position: "absolute", bottom: 0, padding: 10, right: 0, fontStyle: 'italic' }}>
                                                            Published at {lowerFirst(`${moment(item.createdAt).format('LL')}`)}
                                                        </Text>
                                                    </View>
                                                </ImageBackground>
                                            </Animatable.View>
                                        </TouchableHighlight>
                                    )}
                                </Content>
                                : <View style={{ justifyContent: 'center', alignItems: 'center', top: 40 }}>
                                    <Text
                                        minimumFontScale={wp(5.5)}
                                        allowFontScaling={false}
                                        style={{ color: '#BDBDBD', fontSize: wp(5.5), alignSelf: 'center', textAlign: 'center' }}>You don't have prizes created yet</Text>
                                    <Button
                                        onPress={() => { _setModalVisibleRedeemPoints(false); navigation.navigate('SubmitPrize') }}
                                        style={{ alignSelf: 'center', backgroundColor: colorsPalette.secondaryColor, top: 10 }}>
                                        <Text
                                            minimumFontScale={wp(4)}
                                            allowFontScaling={false}
                                            style={{ fontSize: wp(4) }}
                                        >Create one!</Text>
                                    </Button>
                                </View>
                        }
                        {
                            userData.submitPrize.items.length
                                ? <View style={{ minHeight: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <Button
                                        onPress={() => { _setModalVisibleRedeemPoints(false); navigation.navigate('SubmitPrize') }}
                                        style={{ alignSelf: 'center', backgroundColor: colorsPalette.secondaryColor }}>
                                        <Text
                                            minimumFontScale={wp(4)}
                                            allowFontScaling={false}
                                            style={{ fontSize: wp(4) }}
                                        >Create another!</Text>
                                    </Button>
                                </View> : null
                        }
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}
export default withNavigation(ListGeneralPrizes) 
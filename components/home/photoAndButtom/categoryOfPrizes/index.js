import React, { Component } from 'react';
import { TouchableHighlight, ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, View, Text, Spinner, Tab, Tabs, Button, Content } from "native-base"
import _ from "lodash"
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'

// Component Child
import Header from './header'


class ListGeneralPrizes extends Component {
    state = {
        loadingImgYours: false,
        loadingImgCategory: false,
        openModalMyPrizes: false,
        animationPulseId: "",
        animationPulseIdCategory: ""
    }

    setModalVisible = (action) => { this.setState({ openModalMyPrizes: action }) }

    _animationPulse = (item) => {
        this.setState({ animationPulseId: item.id })
    }
    _animationPulseCategory = (item) => {
        this.setState({ animationPulseIdCategory: item.id })
    }

    render() {
        const { loadingImgYours, loadingImgCategory, animationPulseId, animationPulseIdCategory } = this.state
        const { userData, _setModalVisibleRedeemPoints, prizeCategory, navigation } = this.props
        return (
            <Container style={{ backgroundColor: '#F5F5F5' }}>
                <Header _setModalVisibleRedeemPoints={_setModalVisibleRedeemPoints} />
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#D81B60' }}>
                    <Tab
                        heading="Categories"
                        activeTextStyle={{ color: '#D81B60' }}
                        textStyle={{ color: '#D81B60' }}
                        tabStyle={{ backgroundColor: "#F5F5F5" }}
                        activeTabStyle={{ backgroundColor: '#F5F5F5' }}>
                        <Content>
                            {prizeCategory.map((item, key) =>
                                <TouchableHighlight
                                    key={key}
                                    onPress={() => { this._animationPulseCategory(item) }}
                                    underlayColor="rgba(0,0,0,0.0)">
                                    <Animatable.View
                                        onLoadStart={() => this.setState({ loadingImgCategory: true })}
                                        onLoadEnd={() => { this.setState({ loadingImgCategory: false }) }}
                                        animation={animationPulseIdCategory === item.id ? "pulse" : undefined}
                                        onAnimationEnd={() => { _setModalVisibleRedeemPoints(false); navigation.navigate('Prizes', { categoryPrizes: item, userData }) }}
                                        duration={400}
                                        style={{
                                            height: 100,
                                            shadowColor: 'rgba(0,0,0,0.3)',
                                            shadowOffset: { width: 0 }, shadowOpacity: 1,
                                            width: '90%',
                                            alignSelf: 'center',
                                            marginTop: 15,
                                            borderRadius: 15,
                                        }}>
                                        <ImageBackground
                                            source={{ uri: item.picture }}
                                            borderRadius={15}
                                            style={{ height: "100%", width: "100%", flex: 1 }}>
                                            <Spinner color="#FFF" animating={loadingImgCategory} style={{ position: 'absolute', zIndex: 1 }} />
                                            <View style={{
                                                backgroundColor: 'rgba(0,0,0,0.2)',
                                                width: "100%", height: "100%",
                                                borderRadius: 15
                                            }}>
                                                <Text style={{ color: "#FFF", fontSize: 28, position: "absolute", bottom: 0, padding: 10 }}>
                                                    {item.name}
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </Animatable.View>
                                </TouchableHighlight>)}
                        </Content>
                    </Tab>
                    <Tab
                        heading="Yours"
                        activeTextStyle={{ color: '#D81B60' }}
                        textStyle={{ color: '#D81B60' }}
                        tabStyle={{ backgroundColor: "#F5F5F5" }}
                        activeTabStyle={{ backgroundColor: '#F5F5F5' }}>
                        <Content>
                            {
                                userData.submitPrize.items.length
                                    ? userData.submitPrize.items.map((item, key) =>
                                        <TouchableHighlight
                                            key={key}
                                            onPress={() => { this._animationPulse(item) }}
                                            underlayColor="rgba(0,0,0,0.0)">
                                            <Animatable.View
                                                animation={animationPulseId === item.id ? "pulse" : undefined}
                                                onAnimationEnd={() => { _setModalVisibleRedeemPoints(false); navigation.navigate('AboutThePrize', { prize: item, userData }) }}
                                                duration={400}
                                                style={{
                                                    height: 100,
                                                    shadowColor: 'rgba(0,0,0,0.3)',
                                                    shadowOffset: { width: 0 }, shadowOpacity: 1,
                                                    width: '90%',
                                                    alignSelf: 'center',
                                                    marginTop: 15,
                                                    borderRadius: 15,
                                                }}>
                                                <ImageBackground
                                                    onLoadStart={() => this.setState({ loadingImgYours: true })}
                                                    onLoadEnd={() => { this.setState({ loadingImgYours: false }) }}
                                                    source={{ uri: item.general.picture.url }}
                                                    borderRadius={15}
                                                    style={{ height: "100%", width: "100%", flex: 1 }}>
                                                    <Spinner color="red" animating={loadingImgYours} style={{ position: 'absolute', zIndex: 1 }} />
                                                    <View style={{
                                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                                        width: "100%", height: "100%",
                                                        borderRadius: 15
                                                    }}>
                                                        <Text style={{ color: "#FFF", fontSize: 28, position: "absolute", bottom: 0, padding: 10 }}>
                                                            {item.general.nameOfPrize}
                                                        </Text>
                                                        <Text style={{ color: "#FFF", fontSize: wp(4), position: "absolute", bottom: 0, padding: 10, right: 0, fontStyle: 'italic' }}>
                                                            Published at {_.lowerFirst(`${moment(item.createdAt).format('LL')}`)}
                                                        </Text>
                                                    </View>
                                                </ImageBackground>
                                            </Animatable.View>
                                        </TouchableHighlight>
                                    )
                                    : <View style={{ justifyContent: 'center', alignItems: 'center', top: 40 }}>
                                        <Text style={{ color: '#BDBDBD', fontSize: wp(6.5), alignSelf: 'center', textAlign: 'center' }}>You don't have prizes created yet</Text>
                                        <Button
                                            onPress={() => { _setModalVisibleRedeemPoints(false); navigation.navigate('SubmitPrize') }}
                                            small style={{ alignSelf: 'center', backgroundColor: '#D81B60', top: 10 }}>
                                            <Text>Create one!</Text>
                                        </Button>
                                    </View>
                            }
                            <Button
                                onPress={() => { _setModalVisibleRedeemPoints(false); navigation.navigate('SubmitPrize') }}
                                small style={{ alignSelf: 'center', backgroundColor: '#D81B60', top: 30 }}>
                                <Text>Create another!</Text>
                            </Button>
                        </Content>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}
export default withNavigation(ListGeneralPrizes) 
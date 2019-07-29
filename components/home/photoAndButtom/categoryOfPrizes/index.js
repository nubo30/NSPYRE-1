import React, { Component } from 'react';
import { TouchableHighlight, FlatList, ImageBackground, Modal } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, View, Text, Spinner } from "native-base"
import _ from "lodash"

// Component Child
import Header from './header'
import MyPrizes from './myPrizes'


class ListGeneralPrizes extends Component {
    state = {
        animationPulse: false,
        indexItem: null,
        loadingImg: false,
        loadingImgMyPrizes: false,
        openModalMyPrizes: false
    }

    setModalVisible = (action) => { this.setState({ openModalMyPrizes: action }) }

    render() {
        const { loadingImg, loadingImgMyPrizes, openModalMyPrizes } = this.state
        const { userData, _setModalVisibleRedeemPoints, prizeCategory, navigation } = this.props
        return (
            <Container>
                <Header _setModalVisibleRedeemPoints={_setModalVisibleRedeemPoints} />
                <View style={{ height: 110 }}>
                    <TouchableHighlight
                        onPress={() => this.setState({ openModalMyPrizes: true })}
                        style={{
                            borderRadius: 10,
                            width: "90%",
                            alignSelf: "center",
                            flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.0)', shadowColor: "rgba(0,0,0,0.3)",
                            shadowOpacity: 1, shadowOffset: { width: 0 }
                        }}>
                        <ImageBackground
                            borderRadius={10}
                            onLoadStart={() => this.setState({ loadingImgMyPrizes: true })}
                            onLoadEnd={() => { this.setState({ loadingImgMyPrizes: false }) }}
                            style={{ width: "100%", height: 100, alignItems: 'center', justifyContent: 'center' }}
                            source={{ uri: "https://influencemenow-statics-files-env.s3.amazonaws.com/public/list_of_prizes/myPrizes.jpg" }}>
                            <Spinner color="#FFF" animating={loadingImgMyPrizes} style={{ position: 'absolute', zIndex: 1 }} />
                            <View style={{
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                width: "100%", height: "90%",
                                borderRadius: 10
                            }}>
                                <Text style={{ color: "#fff", fontSize: 22, bottom: 0, position: "absolute", padding: 10 }}>
                                    My Prizes
                            </Text>
                            </View>
                        </ImageBackground>
                    </TouchableHighlight>
                </View>
                <FlatList
                    data={prizeCategory}
                    renderItem={({ item }) =>
                        <TouchableHighlight
                            style={{
                                height: 100,
                                borderRadius: 10,
                                width: "90%",
                                alignSelf: "center",
                                marginBottom: 20,
                                flex: 1, top: 10,
                                flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.0)', shadowColor: "rgba(0,0,0,0.3)",
                                shadowOpacity: 1, shadowOffset: { width: 0 }
                            }}
                            underlayColor="rgba(0,0,0,0.0)"
                            onPress={() => {
                                navigation.navigate('RedeemThePrizes', { categoryPrizes: item.category });
                                _setModalVisibleRedeemPoints(false)
                            }}>
                            <ImageBackground
                                borderRadius={10}
                                onLoadStart={() => this.setState({ loadingImg: true })}
                                onLoadEnd={() => { this.setState({ loadingImg: false }) }}
                                style={{ width: "100%", height: 100, alignItems: 'center', justifyContent: 'center' }}
                                source={{ uri: item.picture }}>
                                <Spinner color="#FFF" animating={loadingImg} style={{ position: 'absolute', zIndex: 1 }} />
                                <View style={{
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    width: "100%", height: "100%",
                                    borderRadius: 10
                                }}>
                                    <Text style={{ color: "#fff", fontSize: 22, bottom: 0, position: "absolute", padding: 10 }}>
                                        {item.name}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableHighlight>}
                    keyExtractor={(item, index) => index.toString()} />
                <MyPrizes userData={userData} openModalMyPrizes={openModalMyPrizes} setModalVisible={this.setModalVisible} />
            </Container>
        )
    }
}
export default withNavigation(ListGeneralPrizes) 
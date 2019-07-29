import React, { Component } from 'react'
import { Text, View, ImageBackground, Dimensions, ScrollView, Alert, KeyboardAvoidingView } from 'react-native'
import { Video } from "expo"
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { Button, Icon, Spinner, Input, Header, Left, Title, Right, Item, Picker, Content } from 'native-base'
import Swiper from 'react-native-swiper';
import { Grid, Row, Col } from "react-native-easy-grid"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment'
import _ from 'lodash'
import Modal from "react-native-modal";

const { height, width } = Dimensions.get('window');

// Icons
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

// GRAPHQL
import * as mutations from '../../../src/graphql/mutations'

// This function show the Awards of content
export default class Prizes extends Component {
    constructor() {
        super();
        this.state = {
            indexSwiper: 0,
            thumbnailLoading: false
        }
    }

    _changeSwiper = (i) => { this.swiper.scrollBy(i) }

    render() {
        const { thumbnailLoading, indexSwiper } = this.state
        const { modalVisiblePrizes, _setModalVisiblePrizes, contest } = this.props
        return (
            <Modal
                isVisible={modalVisiblePrizes}
                onSwipeComplete={() => _setModalVisiblePrizes(false)}
                swipeDirection={['down']}>
                <View style={{ flex: 1, top: 20 }}>
                    {contest.prizes.length <= 1 ? null :
                        <View style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            zIndex: 1000,
                            bottom: 0,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Button
                                disabled={indexSwiper <= 0 ? true : false}
                                iconRight
                                transparent
                                style={{ right: "15%", top: -10 }}
                                onPress={() => this._changeSwiper(-1)}>
                                <Ionicons name='ios-arrow-back' style={{ fontSize: wp(7), color: 0 === indexSwiper ? "#E0E0E0" : "#D82B60", right: 10 }} />
                                <Text style={{ fontSize: wp(4.5), top: -1, color: 0 === indexSwiper ? "#E0E0E0" : "#D82B60" }}>Back</Text>
                            </Button>
                            <Button
                                disabled={contest.prizes.length === indexSwiper + 1}
                                iconLeft
                                transparent
                                style={{ left: "15%", top: -10 }}
                                onPress={() => this._changeSwiper(1)}>
                                <Text style={{ fontSize: wp(4.5), top: -1, color: contest.prizes.length === indexSwiper + 1 ? "#E0E0E0" : "#D82B60" }}>Next</Text>
                                <Ionicons name='ios-arrow-forward' style={{ fontSize: wp(7), color: contest.prizes.length === indexSwiper + 1 ? "#E0E0E0" : "#D82B60", left: 10 }} />
                            </Button>
                        </View>
                    }
                    <Swiper
                        scrollEnabled={false}
                        ref={(swiper) => this.swiper = swiper}
                        onIndexChanged={(value) => this.setState({ indexSwiper: value })}
                        pagingEnabled={false}
                        activeDotColor="#D82B60"
                        loop={false}>
                        {contest.prizes.map((item, key) =>
                            <View key={key} style={{
                                height: height - 150,
                                width: "100%",
                                position: 'absolute',
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#FFF',
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10
                            }}>
                                <Grid style={{ width: "100%" }}>
                                    <Row size={40} style={{
                                        borderTopLeftRadius: 10, borderTopRightRadius: 10,
                                        justifyContent: 'center',
                                        shadowColor: "rgba(0,0,0,0.3)",
                                        shadowOpacity: 1,
                                        shadowOffset: { width: 0 }
                                    }}>
                                        <Spinner color="#D82B60" size="large" animating={thumbnailLoading} style={{ position: 'absolute', alignSelf: 'center' }} />
                                        <View style={{
                                            borderTopEndRadius: 10,
                                            borderTopStartRadius: 10,
                                            overflow: 'hidden',
                                            flex: 1
                                        }}>
                                            <Swiper
                                                nextButton={<Text style={{ color: '#FFF', fontSize: wp(13) }}>›</Text>}
                                                prevButton={<Text style={{ color: '#FFF', fontSize: wp(13) }}>‹</Text>}
                                                showsButtons={true}
                                                scrollEnabled={false}
                                                loop={false}
                                                activeDotColor="#FFF">

                                                {/* VIDEO */}
                                                <View style={{
                                                    borderTopEndRadius: 10,
                                                    borderTopStartRadius: 10,
                                                    overflow: 'hidden',
                                                    flex: 1
                                                }}>
                                                    <Video
                                                        source={{ uri: item.video.localUrl }}
                                                        useNativeControls={true}
                                                        rate={1.0}
                                                        volume={1.0}
                                                        isMuted={false}
                                                        resizeMode="cover"
                                                        shouldPlay={false}
                                                        isLooping={false}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            borderTopEndRadius: 20,
                                                            borderTopStartRadius: 20,
                                                        }}
                                                    />
                                                </View>

                                                {/* IMAGEN */}
                                                <ImageBackground
                                                    onLoadStart={() => this.setState({ thumbnailLoading: true })}
                                                    onLoadEnd={() => this.setState({ thumbnailLoading: false })}
                                                    source={{ uri: item.picture.localUrl }}
                                                    style={{
                                                        borderTopLeftRadius: 10,
                                                        borderTopRightRadius: 10,
                                                        width: "100%",
                                                        flex: 1
                                                    }}>
                                                </ImageBackground>
                                            </Swiper>
                                        </View>
                                    </Row>
                                    <Row size={60} style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 0.2, alignItems: 'center' }}>
                                            <Text style={{ fontSize: wp(10), color: "#D82B60" }}>{_.truncate(_.startCase(item.name), { separator: '...', length: 15 })}</Text>
                                        </View>
                                        <View style={{ flex: 0.8, top: -10, }}>
                                            <Text style={{ fontSize: wp(5), color: "#F44336" }}>{_.replace(_.replace(_.startCase(_.lowerCase(_.replace(item.price, new RegExp("_", "g"), " "))), new RegExp("P", "g"), ""), '0 ', "0$ - ")}$</Text>
                                            <Text style={{ top: 5, fontSize: wp(7), color: "#D82B60" }}>Description</Text>
                                            <Text style={{ fontSize: wp(5), fontWeight: '100', top: 10, color:"#3333" }}>{_.truncate(item.description, { length: 200, separator: '...' })}</Text>
                                        </View>
                                    </Row>
                                </Grid>
                            </View>)}
                    </Swiper>
                </View>
            </Modal>
        )
    }
}
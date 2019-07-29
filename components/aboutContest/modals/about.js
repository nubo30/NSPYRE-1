import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { Video } from "expo"
import { Button, Spinner } from 'native-base'
import { Grid, Row } from "react-native-easy-grid"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'
import Modal from "react-native-modal";

const { height } = Dimensions.get('window');

export default class About extends Component {
    constructor() {
        super();
        this.state = {
            thumbnailLoading: false
        }
    }

    render() {
        const { thumbnailLoading } = this.state
        const { modalVisibleAboutTheContest, _setModalVisibleAboutTheContest, contest } = this.props
        return (
            <Modal
                isVisible={modalVisibleAboutTheContest}
                onSwipeComplete={() => _setModalVisibleAboutTheContest(false)}
                swipeDirection={['down']}>
                <View style={{ flex: 1, top: 20 }}>
                    <View style={{
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
                                    {/* VIDEO */}
                                    <View style={{
                                        borderTopEndRadius: 10,
                                        borderTopStartRadius: 10,
                                        overflow: 'hidden',
                                        flex: 1
                                    }}>
                                        <Video
                                            source={{ uri: contest.general.video.localUrl }}
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
                                </View>
                            </Row>
                            <Row size={60} style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, flexDirection: 'column' }}>
                                <View style={{ flex: 0.8, }}>
                                    <Text style={{ top: 5, fontSize: wp(7), color: "#D82B60" }}>Description</Text>
                                    <Text style={{ fontSize: wp(5), fontWeight: '100', top: 10, color: "#3333" }}>{_.truncate(contest.general.description, { length: 100, separator: '...' })}</Text>
                                    <Text style={{ top: 15, fontSize: wp(7), color: "#D82B60" }}>Instructions</Text>
                                    <Text style={{ fontSize: wp(5), fontWeight: '100', top: 20, color: "#3333" }}>{_.truncate(contest.general.instructions, { length: 100, separator: '...' })}</Text>
                                </View>
                                <Button style={{ backgroundColor: '#D82B60', alignSelf: 'center', top: 20, width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ letterSpacing: 2, color: '#FFF' }}>START NOW</Text>
                                </Button>
                            </Row>
                        </Grid>
                    </View>
                </View>
            </Modal>
        )
    }
}
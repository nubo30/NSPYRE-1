import React, { Component } from 'react'
import { Video } from 'expo-av';
import { Header, Text, View, Body, Title, Container } from 'native-base'
import { Grid, Col, Row } from "react-native-easy-grid"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'
import Modal from "react-native-modal";


import { colorsPalette } from '../../global/static/colors'

export default class About extends Component {
    constructor() {
        super();
        this.state = {
            thumbnailLoading: false,
        }
    }

    render() {
        const { modalVisibleAboutTheContest, _setModalVisibleAboutTheContest, contest } = this.props
        return (
            <Modal
                style={{ justifyContent: 'flex-end', margin: 0 }}
                isVisible={modalVisibleAboutTheContest}
                onSwipeComplete={() => { _setModalVisibleAboutTheContest(false); this.setState({ indexSwiper: 0 }) }}
                swipeDirection={['down']}>
                <View style={{
                    backgroundColor: colorsPalette.secondaryColor,
                    borderTopStartRadius: 10,
                    borderTopEndRadius: 10,
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                    flex: 1,
                    maxHeight: 500,
                    minHeight: 500,
                    position: 'absolute',
                    bottom: 0,
                    width: '100%'
                }}>
                    <Container style={{ borderTopEndRadius: 10, borderTopStartRadius: 10 }}>
                        <Header style={{ backgroundColor: colorsPalette.secondaryColor, borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                            <Body>
                                <Title style={{ top: -10, fontSize: wp(10), color: colorsPalette.darkFont }}>About the contest</Title>
                            </Body>
                        </Header>
                        <Grid>
                            <Row size={50}>
                                <View style={{ height: "100%", width: "100%", position: "absolute", backgroundColor: "#3333" }} />
                                <Video
                                    source={{ uri: contest.general.video.url }}
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
                                        alignItems: 'center'
                                    }}
                                />
                            </Row>
                            <Row size={50}>
                                <Grid>
                                    <Col size={50} style={{ alignItems: 'center', padding: 5 }}>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(6), color: colorsPalette.darkFont }}>Description</Text>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(3), textAlign: 'center', color: colorsPalette.darkFont, top: 10 }}>{contest.general.description}</Text>
                                    </Col>
                                    <Col size={50} style={{ alignItems: 'center', padding: 5 }}>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(6), color: colorsPalette.darkFont }}>Instructions</Text>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(3), textAlign: 'center', color: colorsPalette.darkFont, top: 10 }}>{contest.general.instructions}</Text>
                                    </Col>
                                </Grid>
                            </Row>
                        </Grid>
                    </Container>
                </View>
            </Modal>
        )
    }
}
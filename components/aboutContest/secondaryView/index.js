import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, View } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row, Col } from 'react-native-easy-grid'
import Swiper from 'react-native-swiper'

// Child Component
import { MyStatusBar } from '../../Global/statusBar/index'
import CBarChart from '../charts/CBarChart'
import CPieChart from '../charts/CPieChart'

export default class ContestDataStatistics extends Component {
    render() {
        const { swiperIndex, _changeSwiperRoot, _setModalVisibleAudience } = this.props
        return (
            <Container style={{ backgroundColor: "#F5F5F5" }}>
                <Header transparent>
                    {!swiperIndex ? <MyStatusBar backgroundColor="#FFF" barStyle="light-content" /> : null}
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button transparent onPress={() => _changeSwiperRoot(-1)}>
                            <Icon name='arrow-back' style={{ color: '#E91E63', }} />
                            <Text style={{ color: "#E91E63" }}>Principal</Text>
                        </Button>
                        <Title style={{ fontSize: wp(7.5), color: '#E91E63' }}>More of interest</Title>
                    </Left>
                </Header>
                <Content>
                    <Grid style={{ paddingTop: 10 }}>
                        <Row size={60} style={{ flexDirection: 'column', height: 300 }}>
                            <Text style={{ fontSize: wp(10), left: 10, color: "#3333" }}>Statistics</Text>
                            <Swiper showsButtons={false} showsPagination={false}>
                                <CBarChart />
                                <CPieChart />
                            </Swiper>
                        </Row>
                        <Row size={40} style={{ flexDirection: 'column', height: 200 }}>
                            <Text style={{ fontSize: wp(10), left: 10, color: "#3333" }}>Audience</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Text style={{ color: '#333', fontSize: wp(4.5), fontWeight: 'bold' }}>You don't have a selected audience yet</Text>
                                <Button
                                    onPress={() => _setModalVisibleAudience(true, false)}
                                    small style={{ alignSelf: 'center', backgroundColor: '#E91E63', top: 10 }}>
                                    <Text>Create one now!</Text>
                                </Button>
                            </View>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}
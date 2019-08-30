import React, { Component } from 'react';
import { withNavigation } from "react-navigation"
import Swiper from 'react-native-swiper';
import { Container, Content, Footer, Text, Button } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'


// Animaciones
import IntroToApp1 from '../Global/lottieJs/introApp1'

class IntroToApp extends Component {

    _changeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    render() {
        return (
            <Swiper
                ref={swiper => this.swiper = swiper}
                dotStyle={{ borderColor: '#FFF', borderWidth: 1, backgroundColor: '#D81B60' }}
                activeDotColor="#FFF"
                paginationStyle={{ bottom: 130 }}
                scrollEnabled={false}
                loop={false}>
                <Container style={{ backgroundColor: '#D81B60' }}>
                    <Content
                        contentContainerStyle={{ flex: 1 }}
                        scrollEnabled={false}>
                        <Grid>
                            <Row size={30} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(12), fontWeight: 'bold', letterSpacing: 1, color: '#FFF' }}>Lorem Ipsum</Text>
                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: '#FFF' }}>Sed ut perspiciatis</Text>
                            </Row>
                            <Row size={40}>
                                <IntroToApp1 />
                            </Row>
                            <Row size={30} style={{ justifyContent: 'center' }}>
                                <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: wp(4), width: '80%', color: "#FFF" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
                            </Row>
                        </Grid>
                    </Content>
                    <Footer style={{
                        backgroundColor: '#FFF', borderTopColor: 'rgba(0,0,0,0.0)', borderTopRightRadius: 10, borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                    }}>
                        <Button
                            onPress={() => this._changeSwiper(1)}
                            style={{
                                flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center',
                                shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { height: -1 }, shadowOpacity: 1,
                                borderTopRightRadius: 10, borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                                backgroundColor: '#FFF'
                            }}>
                            <Text allowFontScaling={false} style={{ letterSpacing: 2, fontWeight: 'bold', color: '#D81B60' }}>Next</Text>
                        </Button>
                    </Footer>
                </Container>

                <Container style={{ backgroundColor: '#D81B60' }}>
                    <Content
                        contentContainerStyle={{ flex: 1 }}
                        scrollEnabled={false}>
                        <Grid>
                            <Row size={30} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(12), fontWeight: 'bold', letterSpacing: 1, color: '#FFF' }}>Lorem Ipsum</Text>
                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: '#FFF' }}>Sed ut perspiciatis</Text>
                            </Row>
                            <Row size={40}>
                                <IntroToApp1 />
                            </Row>
                            <Row size={30} style={{ justifyContent: 'center' }}>
                                <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: wp(4), width: '80%', color: "#FFF" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
                            </Row>
                        </Grid>
                    </Content>
                    <Footer style={{
                        backgroundColor: '#FFF', borderTopColor: 'rgba(0,0,0,0.0)', borderTopRightRadius: 10, borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                    }}>
                        <Button
                            onPress={() => this._changeSwiper(1)}
                            style={{
                                flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center',
                                shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { height: -1 }, shadowOpacity: 1,
                                borderTopRightRadius: 10, borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                                backgroundColor: '#FFF'
                            }}>
                            <Text allowFontScaling={false} style={{ letterSpacing: 2, fontWeight: 'bold', color: '#D81B60' }}>Next</Text>
                        </Button>
                    </Footer>
                </Container>

                <Container style={{ backgroundColor: '#D81B60' }}>
                    <Content
                        contentContainerStyle={{ flex: 1 }}
                        scrollEnabled={false}>
                        <Grid>
                            <Row size={30} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(12), fontWeight: 'bold', letterSpacing: 1, color: '#FFF' }}>Lorem Ipsum</Text>
                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: '#FFF' }}>Sed ut perspiciatis</Text>
                            </Row>
                            <Row size={40}>
                                <IntroToApp1 />
                            </Row>
                            <Row size={30} style={{ justifyContent: 'center' }}>
                                <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: wp(4), width: '80%', color: "#FFF" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
                            </Row>
                        </Grid>
                    </Content>
                    <Footer style={{
                        backgroundColor: '#FFF', borderTopColor: 'rgba(0,0,0,0.0)', borderTopRightRadius: 10, borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                    }}>
                        <Button
                            onPress={() => this.props.navigation.navigate('Auth')}
                            style={{
                                flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center',
                                shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { height: -1 }, shadowOpacity: 1,
                                borderTopRightRadius: 10, borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                                backgroundColor: '#FFF'
                            }}>
                            <Text allowFontScaling={false} style={{ letterSpacing: 2, fontWeight: 'bold', color: '#D81B60' }}>Done</Text>
                        </Button>
                    </Footer>
                </Container>

            </Swiper>
        )
    }
}
export default withNavigation(IntroToApp)
import React, { Component } from 'react';
import { Modal, Platform } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Content, Footer, Button, Text, Left, Icon, Title, Right, Root, View } from 'native-base';
import Swiper from 'react-native-swiper'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import { AfterInteractions } from 'react-native-interactions';

// Child component
import FormAudience from './form/index'
import AudiencePlaceholder from './placeholder/index'

// Icons
import { Ionicons } from '@expo/vector-icons'

// GraphQL
import * as queries from '../../../src/graphql/queries'
export default class Audience extends Component {
    state = {
        modalVisibleAudienceSelect: false,
        swiperIndex: 0,
        noThanksAudienceUser: false,

        // Picker
        amountPeople: "NO_SELECT",
        progress: 20,

        // Actions
        swiperChildAudience: 0,
        audience: {}
    }

    componentDidMount() {
        this._getAudience()
    }

    _getAudience = async () => {
        const { contest } = this.props
        try {
            const { data } = await API.graphql(graphqlOperation(queries.getAudience, { id: contest.id }))
            this.setState({ audience: data.getAudience === null ? {} : data.getAudience })
        } catch (error) {
            console.log(error);
        }
    }

    _changeSwiper = (i) => {
        this.setState({ swiperIndex: i })
    }

    _changeSwiperChild = (i) => {
        this.swiperChild.scrollBy(i)
    }

    // Incrementar la barra
    increase = (value) => {
        this.setState({
            progress: this.state.progress + value
        });
    }

    _modalVisibleAudienceSelect = (value) => {
        this.setState({ modalVisibleAudienceSelect: value })
    }

    render() {
        const {
            modalVisibleAudienceSelect,
            swiperIndex,
            noThanksAudienceUser,

            // Data
            audience
        } = this.state
        const { _setModalVisibleAudience, contest, hideCongrastSectionAudience } = this.props

        return (
            <Container style={{ backgroundColor: '#FFF', width: "85%", borderRadius: 20, maxHeight: "50%", padding: 2 }}>
                <Header span style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.0)', borderBottomColor: 'rgba(0,0,0,0.0)', flexDirection: 'column' }}>
                    <Text allowFontScaling={false} style={{ fontSize: wp(14), letterSpacing: 3 }}>{hideCongrastSectionAudience ? '🎉' : '👍'}</Text>
                    <Text allowFontScaling={false} style={{ fontSize: wp(7), letterSpacing: 3 }}>{hideCongrastSectionAudience ? 'Congrats!' : 'Very good!'}</Text>
                    <Text allowFontScaling={false} style={{ color: "#333", fontSize: wp(5), top: 10, letterSpacing: 2 }}>{contest.user.name}</Text>
                </Header>
                <Content contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text allowFontScaling={false} style={{ textAlign: 'center', color: "#333", fontSize: wp(4), fontWeight: '100' }}>
                        Do you want to share your contest with our community or yours only?
                    </Text>
                </Content>
                <Footer style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: 'rgba(0,0,0,0.0)', borderTopColor: 'rgba(0,0,0,0.0)', height: 85 }}>
                    <Grid>
                        <Row size={70} style={{ justifyContent: 'space-evenly' }}>
                            <Button style={{ backgroundColor: '#D81B60', borderRadius: 5, width: "40%", height: "80%", justifyContent: 'center' }} onPress={() => {
                                this._modalVisibleAudienceSelect(true); this._changeSwiper(0);
                            }}>
                                <Text allowFontScaling={false} style={{ letterSpacing: 2, fontSize: wp(3.5) }}>Your only</Text>
                            </Button>
                            <Button style={{ backgroundColor: '#D81B60', borderRadius: 5, width: "40%", height: "80%", justifyContent: 'center' }} onPress={() => {
                                this._modalVisibleAudienceSelect(true); this._changeSwiper(1);
                            }}>
                                <Text allowFontScaling={false} style={{ letterSpacing: 2, fontSize: wp(3.5) }}>Ours also</Text>
                            </Button>
                        </Row>
                        <Row size={30} style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Button transparent style={{ justifyContent: 'center', top: -13 }} onPress={() => _setModalVisibleAudience(false)}>
                                <Text allowFontScaling={false} style={{ letterSpacing: 2, color: "#E0E0E0", fontSize: wp(3) }}>No, Thanks</Text>
                            </Button>
                        </Row>
                    </Grid>
                </Footer>

                {/* CREATING AUDIENCE */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisibleAudienceSelect}>
                    <AfterInteractions
                        placeholder={
                            <View style={{ flex: 1 }}>
                                <AudiencePlaceholder />
                            </View>
                        }>
                        <Swiper
                            index={swiperIndex}
                            scrollEnabled={false}
                            showsPagination={false}
                            showsButtons={false}
                            loop={false}>
                            {/* Audience of userr */}
                            <Container>
                                <Header style={{ width: "100%", borderBottomColor: "rgba(0,0,0,0.0)", backgroundColor: 'transparent', height: Platform.OS === 'ios' ? 70 : 50 }}>
                                    <Left style={{ flexDirection: 'row' }}>
                                        <Button transparent onPress={() => { this._modalVisibleAudienceSelect(false); }}>
                                            <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                            <Text allowFontScaling={false} style={{ left: 5, color: "#D81B60", fontSize: wp(4) }}>Back</Text>
                                        </Button>
                                        <Title allowFontScaling={false} style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp(6) }}>
                                            Creating your audience
                                    </Title>
                                    </Left>
                                    <Right />
                                </Header>
                                <Content contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
                                    <Grid style={{ padding: 20 }}>
                                        <Row size={40} style={{ justifyContent: 'center', alignItems: 'flex-end', top: -20 }}>
                                            <Text allowFontScaling={false} style={{ color: "#E0E0E0", fontSize: wp(9), textAlign: 'center' }}>Share your contest with yours community through social media! ✌</Text>
                                        </Row>
                                        <Row size={20} style={{ justifyContent: 'space-evenly' }}>
                                            <Button large transparent style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name='logo-facebook' style={{ fontSize: wp(12), color: '#3b5998' }} />
                                            </Button>
                                            <Button large transparent style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name='logo-twitter' style={{ fontSize: wp(12), color: '#0084b4' }} />
                                            </Button>
                                            <Button large transparent style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name='logo-instagram' style={{ fontSize: wp(12), color: '#E1306C' }} />
                                            </Button>
                                            <Button large transparent style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name='logo-snapchat' style={{ fontSize: wp(12), color: '#FFEA00' }} />
                                            </Button>
                                        </Row>
                                        <Row size={40} style={{ justifyContent: 'center' }}>
                                            <Text allowFontScaling={false} style={{ color: '#E0E0E0', fontSize: wp(4.5), textAlign: 'center' }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget tempor massa. Pellentesque ultricies ex sed odio commodo, congue facilisis nunc dignissim.
                                    </Text>
                                        </Row>
                                    </Grid>
                                </Content>
                            </Container>

                            {/* Ours Audience */}
                            <Root>
                                <Container>
                                    <Content contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
                                        <Swiper
                                            showsPagination={false}
                                            dotStyle={{ top: -40 }} activeDotStyle={{ top: -40 }}
                                            ref={(swiper) => this.swiperChild = swiper}
                                            loop={false} activeDotColor="#D81B60"
                                            scrollEnabled={false}>
                                            {/* STEP 1 */}
                                            <Container style={{ backgroundColor: '#FAFAFA' }}>
                                                <Header style={{ width: "100%", borderBottomColor: "rgba(0,0,0,0.0)", backgroundColor: 'transparent', height: Platform.OS === 'ios' ? 70 : 50 }}>
                                                    <Left style={{ flexDirection: 'row' }}>
                                                        <Button transparent onPress={() => { this.setState({ modalVisibleAudienceSelect: false }); _setModalVisibleAudience(false) }}>
                                                            <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                                            <Text allowFontScaling={false} style={{ left: 5, color: "#D81B60", fontSize: wp(4) }}>Back</Text>
                                                        </Button>
                                                        <Title allowFontScaling={false} style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp(6) }}>
                                                            Our Audience
                                                 </Title>
                                                    </Left>
                                                    <Right />
                                                </Header>
                                                <Content scrollEnabled={false} contentContainerStyle={{ padding: 10, flex: 1 }}>
                                                    <Grid>
                                                        <Row size={40} style={{ justifyContent: 'center', alignItems: 'flex-end', top: -20 }}>
                                                            <Text allowFontScaling={false} style={{ color: "#E0E0E0", fontSize: wp(7), textAlign: 'center' }}>First share you contest with your community through social media and then we will help you share with ours! 😉</Text>
                                                        </Row>
                                                        <Row size={20} style={{ justifyContent: 'space-evenly' }}>
                                                            <Button large transparent style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
                                                                <Ionicons name='logo-facebook' style={{ fontSize: wp(12), color: '#3b5998' }} />
                                                            </Button>
                                                            <Button large transparent style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
                                                                <Ionicons name='logo-twitter' style={{ fontSize: wp(12), color: '#0084b4' }} />
                                                            </Button>
                                                            <Button large transparent style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
                                                                <Ionicons name='logo-instagram' style={{ fontSize: wp(12), color: '#E1306C' }} />
                                                            </Button>
                                                            <Button large transparent style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
                                                                <Ionicons name='logo-snapchat' style={{ fontSize: wp(12), color: '#FFEA00' }} />
                                                            </Button>
                                                        </Row>
                                                        <Row size={40} style={{ justifyContent: 'center' }}>
                                                            <Button transparent style={{ justifyContent: 'center', top: -13 }} onPress={() => { this._changeSwiperChild(1); this.setState({ noThanksAudienceUser: true }) }}>
                                                                <Text allowFontScaling={false} style={{ letterSpacing: 2, color: "#E0E0E0" }}>No, Thanks</Text>
                                                            </Button>
                                                        </Row>
                                                    </Grid>
                                                </Content>
                                            </Container>
                                            {/* STEP 2 */}
                                            <Container style={{ backgroundColor: '#FAFAFA' }}>
                                                <Header style={{ width: "100%", borderBottomColor: "rgba(0,0,0,0.0)", backgroundColor: 'transparent', height: Platform.OS === 'ios' ? 70 : 50 }}>
                                                    <Left style={{ flexDirection: 'row' }}>
                                                        <Button transparent onPress={() => { this._changeSwiperChild(-1) }}>
                                                            <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                                            <Text allowFontScaling={false} style={{ left: 5, color: "#D81B60" }}>Your social...</Text>
                                                        </Button>
                                                        <Title allowFontScaling={false} style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp(6) }}>
                                                            Our Audience
                                                </Title>
                                                    </Left>
                                                    <Right />
                                                </Header>
                                                <Content scrollEnabled={false} contentContainerStyle={{ padding: 10, flex: 1 }}>
                                                    <Grid>
                                                        <Row size={40} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                            <Text allowFontScaling={false} style={{ color: "#333", fontWeight: "bold", fontSize: wp(20), textAlign: 'center' }}>{noThanksAudienceUser ? "🙌" : "🎊"}</Text>
                                                            <Text allowFontScaling={false} style={{ color: "#333", fontWeight: "bold", fontSize: wp(7), textAlign: 'center', top: 15 }}>{noThanksAudienceUser ? "OK Let's Get Started!" : "Congratulations!"}</Text>
                                                            <Text allowFontScaling={false} style={{ color: "#333", fontWeight: '400', fontSize: wp(5.5), textAlign: 'center', top: 30 }}>{contest.user.name}</Text>
                                                            <Text allowFontScaling={false} style={{ color: "#333", fontWeight: '100', fontSize: wp(5), textAlign: 'center', top: 43 }}>
                                                                Create a campain with our community for your contest!
                                                    </Text>
                                                        </Row>
                                                        <Row size={60} style={{ flexDirection: 'column' }}>
                                                            <Button transparent style={{ justifyContent: 'center', alignItems: 'center', top: 20, alignSelf: 'center' }} onPress={() => this._changeSwiperChild(1)}>
                                                                <Text allowFontScaling={false} style={{ color: "#D81B60" }}>START NOW</Text>
                                                            </Button>
                                                            <Text allowFontScaling={false} style={{ alignSelf: 'center', textAlign: 'center', top: 30, fontSize: wp(3.5), color: "#3333" }}>You will be personalizing your audience, this guarantees you a better impact at the time of the public participating in your contest.</Text>
                                                        </Row>
                                                    </Grid>
                                                </Content>
                                            </Container>
                                            {/* STEP 3 */}
                                            <FormAudience
                                                // Data
                                                contest={contest}
                                                audience={audience}

                                                // Function
                                                _setModalVisibleAudience={_setModalVisibleAudience}
                                                _modalVisibleAudienceSelect={this._modalVisibleAudienceSelect}
                                                _changeSwiperChild={this._changeSwiperChild} />
                                        </Swiper>
                                    </Content>
                                </Container>
                            </Root>
                        </Swiper>
                    </AfterInteractions>
                </Modal>
            </Container>
        );
    }
}
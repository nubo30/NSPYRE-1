import React, { Component } from 'react';
import { Modal, Platform, Dimensions } from 'react-native'
import { Container, Header, Content, Footer, Button, Text, Left, Icon, Title, Right, View, Form, Picker, Body, ListItem, Switch, List } from 'native-base';
import Swiper from 'react-native-swiper'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import ProgressBarAnimated from 'react-native-progress-bar-animated';

// Icons
import { Ionicons, MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons'

const barWidth = Dimensions.get('screen').width - 30;

export default class Audience extends Component {
    state = {
        modalVisibleAudienceSelect: false,
        swiperIndex: 0,
        noThanksAudienceUser: false,

        // Picker
        budget: 'NO_SELECT',
        amountPeople: "NO_SELECT",
        progress: 20
    }

    _changeSwiper = (i) => {
        this.setState({ swiperIndex: i })
    }

    _changeSwiperChild = (i) => {
        this.swiperChild.scrollBy(i)
    }

    // Budget
    onValueChangeBudget = (value: string) => { this.setState({ budget: value }) }


    // Incrementar la barra
    increase = (value) => {
        this.setState({
            progress: this.state.progress + value
        });
    }

    render() {
        const {
            modalVisibleAudienceSelect,
            swiperIndex,
            noThanksAudienceUser,
            progress,

            // Forms
            budget,
            amountPeople } = this.state
        const { _setModalVisibleAudience, contest } = this.props
        return (
            <Container style={{ backgroundColor: '#FFF', width: "85%", borderRadius: 20, maxHeight: "50%", padding: 2 }}>
                <Header span style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.0)', borderBottomColor: 'rgba(0,0,0,0.0)', flexDirection: 'column' }}>
                    <Text style={{ fontSize: wp(15), letterSpacing: 3 }}>🎉</Text>
                    <Text style={{ fontSize: wp(8), letterSpacing: 3 }}>Congrats!</Text>
                    <Text style={{ color: "#333", fontSize: wp(6), top: 10, letterSpacing: 2 }}>{contest.user.name}</Text>
                </Header>
                <Content contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ textAlign: 'center', color: "#333", fontSize: wp(5), fontWeight: '100' }}>
                        Do you want to share your contest with our community or yours only?
                    </Text>
                </Content>
                <Footer style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: 'rgba(0,0,0,0.0)', borderTopColor: 'rgba(0,0,0,0.0)', height: 85 }}>
                    <Grid>
                        <Row size={70} style={{ justifyContent: 'space-evenly' }}>
                            <Button style={{ backgroundColor: '#D81B60', borderRadius: "50%", width: "45%", height: "80%", justifyContent: 'center' }} onPress={() => {
                                this.setState({ modalVisibleAudienceSelect: true }); this._changeSwiper(0); _setModalVisibleAudience(true);
                            }}>
                                <Text style={{ letterSpacing: 2 }}>Your only</Text>
                            </Button>
                            <Button style={{ backgroundColor: '#D81B60', borderRadius: "50%", width: "45%", height: "80%", justifyContent: 'center' }} onPress={() => {
                                this.setState({ modalVisibleAudienceSelect: true }); this._changeSwiper(1); _setModalVisibleAudience(true);
                            }}>
                                <Text style={{ letterSpacing: 2 }}>Ours also</Text>
                            </Button>
                        </Row>
                        <Row size={30} style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Button transparent style={{ justifyContent: 'center', top: -13 }} onPress={() => _setModalVisibleAudience(false)}>
                                <Text style={{ letterSpacing: 2, color: "#E0E0E0" }}>No, Thanks</Text>
                            </Button>
                        </Row>
                    </Grid>
                </Footer>

                {/* CREATING AUDIENCE */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisibleAudienceSelect}>
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
                                    <Button transparent onPress={() => { this.setState({ modalVisibleAudienceSelect: false }); _setModalVisibleAudience(false) }}>
                                        <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                        <Text style={{ left: 5, color: "#D81B60" }}>BACK</Text>
                                    </Button>
                                    <Title style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp(6) }}>
                                        Creating your audience
                                    </Title>
                                </Left>
                                <Right />
                            </Header>
                            <Content contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
                                <Grid style={{ padding: 20 }}>
                                    <Row size={40} style={{ justifyContent: 'center', alignItems: 'flex-end', top: -20 }}>
                                        <Text style={{ color: "#E0E0E0", fontSize: wp(9), textAlign: 'center' }}>Share your contest with yours community through social media! ✌</Text>
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
                                        <Text style={{ color: '#E0E0E0', fontSize: wp(4.5), textAlign: 'center' }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget tempor massa. Pellentesque ultricies ex sed odio commodo, congue facilisis nunc dignissim.
                                    </Text>
                                    </Row>
                                </Grid>
                            </Content>
                        </Container>

                        {/* Ours Audience */}
                        <Container>
                            <Content contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
                                <Swiper
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
                                                    <Text style={{ left: 5, color: "#D81B60" }}>Back</Text>
                                                </Button>
                                                <Title style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp(6) }}>
                                                    Our Audience
                                                 </Title>
                                            </Left>
                                            <Right />
                                        </Header>
                                        <Content scrollEnabled={false} contentContainerStyle={{ padding: 10, flex: 1 }}>
                                            <Grid>
                                                <Row size={40} style={{ justifyContent: 'center', alignItems: 'flex-end', top: -20 }}>
                                                    <Text style={{ color: "#E0E0E0", fontSize: wp(7), textAlign: 'center' }}>First share you contest with your community through social media and then we will help you share with ours! 😉</Text>
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
                                                        <Text style={{ letterSpacing: 2, color: "#E0E0E0" }}>No, Thanks</Text>
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
                                                    <Text style={{ left: 5, color: "#D81B60" }}>Your social...</Text>
                                                </Button>
                                                <Title style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp(6) }}>
                                                    Our Audience
                                                </Title>
                                            </Left>
                                            <Right />
                                        </Header>
                                        <Content scrollEnabled={false} contentContainerStyle={{ padding: 10, flex: 1 }}>
                                            <Grid>
                                                <Row size={40} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                    <Text style={{ color: "#333", fontWeight: "bold", fontSize: wp(20), textAlign: 'center' }}>{noThanksAudienceUser ? "🙌" : "🎊"}</Text>
                                                    <Text style={{ color: "#333", fontWeight: "bold", fontSize: wp(7), textAlign: 'center', top: 15 }}>{noThanksAudienceUser ? "OK Let's Get Started!" : "Congratulations!"}</Text>
                                                    <Text style={{ color: "#333", fontWeight: '400', fontSize: wp(5.5), textAlign: 'center', top: 30 }}>{contest.user.name}</Text>
                                                    <Text style={{ color: "#333", fontWeight: '100', fontSize: wp(5), textAlign: 'center', top: 43 }}>
                                                        Create a campain with our community for your contest!
                                                    </Text>
                                                </Row>
                                                <Row size={60} style={{ justifyContent: 'space-evenly' }}>
                                                    <Button transparent style={{ justifyContent: 'center', alignItems: 'center', top: 20 }} onPress={() => this._changeSwiperChild(1)}>
                                                        <Text style={{ color: "#D81B60" }}>START NOW</Text>
                                                    </Button>
                                                </Row>
                                            </Grid>
                                        </Content>
                                    </Container>

                                    {/* STEP 3 */}
                                    <Container>
                                        <Header style={{ width: "100%", borderBottomColor: "rgba(0,0,0,0.0)", backgroundColor: '#FAFAFA', height: Platform.OS === 'ios' ? 70 : 50 }}>
                                            <Left style={{ flexDirection: 'row' }}>
                                                <Button transparent onPress={() => { this._changeSwiperChild(-1) }}>
                                                    <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                                    <Text style={{ left: 5, color: "#D81B60" }}>Amount P...</Text>
                                                </Button>
                                                <Title style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp(6) }}>
                                                    Our Audience
                                                </Title>
                                            </Left>
                                            <Right>
                                                <Button transparent onPress={() => null}>
                                                    <Text style={{ left: 5, color: "#D81B60" }}>Create</Text>
                                                </Button>
                                            </Right>
                                        </Header>
                                        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
                                            <Grid>
                                                <Row size={20} style={{ alignItems: 'center', flexDirection: 'column', backgroundColor: '#FAFAFA' }}>
                                                    <Text style={{ color: "#333", fontWeight: '100', fontSize: wp(5), textAlign: 'center', top: 43, paddingLeft: 40, paddingRight: 40 }}>
                                                        Based on your buget the fields ... are available for you to select from
                                                    </Text>
                                                </Row>
                                                <Row size={80}>
                                                    <Content>
                                                        <List style={{ width: "100%" }}>
                                                            <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                                                <Text style={{ color: "#BDBDBD" }}>Total Budget</Text>
                                                            </ListItem>

                                                            {/* Budget Total */}
                                                            <ListItem icon last style={{ maxHeight: 45 }}>
                                                                <Left>
                                                                    <Button style={{ backgroundColor: "#4caf50" }}>
                                                                        <MaterialIcons active name="attach-money" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                                                    </Button>
                                                                </Left>
                                                                <Body>
                                                                    <Text>Budget</Text>
                                                                </Body>
                                                                <Right>
                                                                    <Text>No select</Text>
                                                                    <Icon active name="arrow-forward" />
                                                                </Right>
                                                                <ListItem style={{ maxHeight: 45 }}>
                                                                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                                                                        <Picker
                                                                            mode="dropdown"
                                                                            iosHeader="SELECT ONE"
                                                                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                                            headerTitleStyle={{ color: "#D81B60" }}
                                                                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                                            selectedValue={budget}
                                                                            onValueChange={this.onValueChangeBudget}>
                                                                            <Picker.Item label="Music" value="MUSIC" />
                                                                            <Picker.Item label="Sport" value="SPORT" />
                                                                            <Picker.Item label="Food" value="FOOD" />
                                                                            <Picker.Item label="Amazon Sellers" value="AMAZON_SELLERS" />
                                                                            <Picker.Item label="Movies / TV Shows / OTT" value="MOVIES_TV_SHOWS_OTT" />
                                                                            <Picker.Item label="Electronics" value="ELECTRONICS" />
                                                                            <Picker.Item label="Spiritual Religious" value="SPIRITUAL_RELIGIOUS" />
                                                                            <Picker.Item label="Beverage" value="BEVERAGE" />
                                                                            <Picker.Item label="Gamer" value="GAMER" />
                                                                            <Picker.Item label="Apparel" value="APPAREL" />
                                                                            <Picker.Item label="No select" value="NO_SELECT" />
                                                                        </Picker>
                                                                    </Left>
                                                                </ListItem>
                                                            </ListItem>

                                                            <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                                                <Text style={{ color: "#BDBDBD" }}>Edit Public</Text>
                                                            </ListItem>
                                                            {/* Gender */}
                                                            <ListItem icon style={{ maxHeight: 45 }}>
                                                                <Left>
                                                                    <Button style={{ backgroundColor: "#F44336" }}>
                                                                        <MaterialCommunityIcons active name="gender-male-female" style={{ fontSize: wp(6), color: "#FFF" }} />
                                                                    </Button>
                                                                </Left>
                                                                <Body>
                                                                    <Text>Gender</Text>
                                                                </Body>
                                                                <Right>
                                                                    <Text>No select</Text>
                                                                    <Icon active name="arrow-forward" />
                                                                </Right>
                                                            </ListItem>

                                                            {/* Age */}
                                                            <ListItem icon style={{ maxHeight: 45 }}>
                                                                <Left>
                                                                    <Button style={{ backgroundColor: "#FBC02D" }}>
                                                                        <Ionicons active name="md-happy" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                                                    </Button>
                                                                </Left>
                                                                <Body>
                                                                    <Text>Age</Text>
                                                                </Body>
                                                                <Right>
                                                                    <Text>No Select</Text>
                                                                    <Icon active name="arrow-forward" />
                                                                </Right>
                                                            </ListItem>

                                                            {/* Location */}
                                                            <ListItem last icon style={{ maxHeight: 45 }}>
                                                                <Left>
                                                                    <Button style={{ backgroundColor: "#43A047" }}>
                                                                        <Entypo active name="location-pin" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                                                    </Button>
                                                                </Left>
                                                                <Body>
                                                                    <Text>Location</Text>
                                                                </Body>
                                                                <Right>
                                                                    <Text>Country, State, City</Text>
                                                                    <Icon active name="arrow-forward" />
                                                                </Right>
                                                            </ListItem>

                                                        </List>
                                                    </Content>
                                                </Row>
                                            </Grid>
                                        </Content>
                                        <Footer style={{ borderTopColor: 'rgba(0,0,0,0.0)', backgroundColor: '#FAFAFA', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "92%", top: -3 }}>
                                                <Text style={{ textAlign: 'center', color: "#333", fontSize: wp(3.5), fontWeight: 'bold' }}>90 - 260 people a day</Text>
                                                <Text style={{ textAlign: 'center', color: "#BDBDBD", fontSize: wp(3.5) }}>de 130.000.000</Text>
                                            </View>
                                            <ProgressBarAnimated
                                                {...progressCustomStyles}
                                                width={barWidth}
                                                value={progress}
                                                maxValue={100}
                                                barEasing="linear"
                                                height={20}
                                                backgroundColorOnComplete="#6CC644" />
                                        </Footer>
                                    </Container>
                                </Swiper>
                            </Content>
                        </Container>
                    </Swiper>
                </Modal>
            </Container>
        );
    }
}

const progressCustomStyles = {
    backgroundColor: '#D81B60'
};
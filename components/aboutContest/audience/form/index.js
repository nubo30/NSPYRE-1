import React, { Component } from 'react';
import { Modal, Platform, Dimensions } from 'react-native'
import { Container, Header, Content, Footer, Button, Text, Left, Icon, Title, Right, View, Form, Picker, Body, ListItem, Switch, List } from 'native-base';
import Swiper from 'react-native-swiper'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import _ from 'lodash'

// Icons
import { MaterialIcons } from '@expo/vector-icons'

const barWidth = Dimensions.get('screen').width - 30;

// Child Components
import FormOne from './formOne'

export default class Audience extends Component {
    state = {
        budget: 'NO_SELECT',
        progress: 0,
        valueSwiper: 0
    }

    // Budget
    onValueChangeBudget = (value: string) => { this.setState({ budget: value }) }

    // Incrementar la barra
    increase = (value) => {
        this.setState({
            progress: this.state.progress + value
        });
    }

    _changedSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    render() {
        const {
            // Forms
            budget,

            // Actions
            valueSwiper,
            progress,
        } = this.state
        const {
            // Data
            contest,

            // Functions
            _changeSwiperChild,
        } = this.props
        return (
            <Container>
                <Header style={{ width: "100%", height: 70, backgroundColor: '#FAFAFA', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                    <Left style={{ flexDirection: 'row' }}>
                        <Button transparent onPress={() => valueSwiper ? this._changedSwiper(-1) : _changeSwiperChild(-1)}>
                            <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                            <Text style={{ left: 5, color: "#D81B60" }}>{valueSwiper ? 'Budget' : 'Start'}</Text>
                        </Button>
                        <Title style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp(6) }}>
                            Our Audience
                        </Title>
                    </Left>
                    <Right />
                </Header>
                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                    <Swiper
                        scrollEnabled={true}
                        onIndexChanged={(index) => this.setState({ valueSwiper: index })}
                        ref={(swiper) => this.swiper = swiper}
                        showsButtons={false}
                        showsPagination={false}
                        loop={false}>

                        {/* BUDGET */}
                        <Grid>
                            <Row size={20} style={{ alignItems: 'center', flexDirection: 'column', backgroundColor: '#FAFAFA' }}>
                                <Text style={{ color: "#333", fontWeight: '100', fontSize: wp(5), textAlign: 'center', top: 43, paddingLeft: 40, paddingRight: 40 }}>
                                    Based on your buget the fields ... are available for you to select from
                                                    </Text>
                            </Row>

                            <Row size={80}>
                                <List style={{ width: "100%" }}>
                                    <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                        <Text style={{ color: "#BDBDBD" }}>Select you budget</Text>
                                    </ListItem>

                                    {/* Budget Total */}
                                    <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: "#4caf50" }}>
                                                <MaterialIcons active name="attach-money" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text>Budget</Text>
                                        </Body>
                                        <Right>
                                            <Text>{budget === "NO_SELECT" ? _.startCase(_.lowerCase(budget)) : _.replace(budget, "_", " - ")}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="SELECT ONE"
                                            style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                            headerTitleStyle={{ color: "#D81B60" }}
                                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                            textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                            selectedValue={budget}
                                            onValueChange={this.onValueChangeBudget}>
                                            <Picker.Item label="200$" value="200$" />
                                            <Picker.Item label="300$" value="300$" />
                                            <Picker.Item label="450$" value="540$" />
                                            <Picker.Item label="600$" value="600$" />
                                            <Picker.Item label="900$" value="900$" />
                                            <Picker.Item label="1000$" value="1000$" />
                                            <Picker.Item label="2500$" value="2500$" />
                                            <Picker.Item label="3000$" value="3000$" />
                                            <Picker.Item label="Other" value="Other" />
                                            <Picker.Item label="Select a field" value="NO_SELECT" />
                                        </Picker>
                                    </ListItem>
                                    <Button
                                        transparent
                                        onPress={() => this._changedSwiper(1)}
                                        disabled={budget === 'NO_SELECT' ? true : false}
                                        style={{ alignSelf: 'center', top: 20 }}>
                                        <Text style={{ letterSpacing: 2, color: budget === 'NO_SELECT' ? '#EC407A' : '#D81B60' }}>
                                            NEXT
                                    </Text>
                                    </Button>
                                    <Text style={{ top: 30, textAlign: 'center', alignSelf: 'center', fontSize: wp(3.5), color: '#3333', padding: 15 }}>
                                        You can return and change the value at any time, but keep in mind that the data you have selected later will be lost.
                                </Text>
                                </List>
                            </Row>
                        </Grid>

                        {/* FORMULARIO UNO */}
                        <FormOne contest={contest} />
                    </Swiper>
                </Content>
                <Footer style={{ borderTopColor: 'rgba(0,0,0,0.0)', backgroundColor: '#FAFAFA', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "92%", top: -3 }}>
                        <Text style={{ textAlign: 'center', color: "#333", fontSize: wp(3.5), fontWeight: 'bold' }}>{`${budget === "NO_SELECT" ? "" : _.replace(budget, "_", " - ") + ' selected'}`}</Text>
                        <Text style={{ textAlign: 'center', color: "#BDBDBD", fontSize: wp(3.5) }}>de 130.000.000</Text>
                    </View>
                    <ProgressBarAnimated
                        {...progressCustomStyles}
                        width={barWidth}
                        value={progress}
                        maxValue={100}
                        barEasing="linear"
                        height={20}
                        backgroundColorOnComplete={progress === 100 ? "#6CC644" : "#D81B60"} />
                </Footer>
            </Container>
        );
    }
}

const progressCustomStyles = {
    backgroundColor: '#D81B60'
};
import React, { Component } from 'react';
import { Modal } from 'react-native'
import { Container, Header, Tab, Tabs, ScrollableTab, Button, Text, Icon, Left, Body, Right, View, Title, TabHeading } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

import Likes from './elements/likes';
import Comments from './elements/comments';

import { colorsPalette } from '../../../global/static/colors'

export default class Statistics extends Component {
    state = { modalVisible: false }

    _modalAction = (value) =>{
        this.setState({modalVisible: value})
    }

    render() {
        const { modalVisible } = this.state
        const { contest, item } = this.props
        return (
            <View>
                <Button icon transparent
                    onPress={() => this.setState({ modalVisible: true })}>
                    <Icon type="AntDesign" name="linechart" style={{ color: colorsPalette.gradientGray }} />
                </Button>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}>
                    <Container>
                        <Header hasTabs style={{ backgroundColor: colorsPalette.secondaryColor }}>
                            <Left>
                                <Button transparent onPress={() => this.setState({ modalVisible: false })}>
                                    <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                    <Text
                                        allowFontScaling={false}
                                        minimumFontScale={wp(4)}
                                        style={{ left: 5, color: colorsPalette.primaryColor, fontSize: wp(4) }}>Back</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Title allowFontScaling={false} style={{ fontSize: wp(6), color: colorsPalette.darkFont }}>Statistics</Title>
                            </Body>
                            <Right />
                        </Header>
                        <Tabs
                            locked
                            style={{ backgroundColor: colorsPalette.secondaryColor }}
                            tabBarUnderlineStyle={{ backgroundColor: '#D82B60' }}
                            renderTabBar={() => <ScrollableTab />}>
                            <Tab
                                activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                                activeTabStyle={{ backgroundColor: '#F5F5F5' }}
                                tabStyle={{ backgroundColor: '#F5F5F5' }}
                                heading={<TabHeading style={{ backgroundColor: colorsPalette.secondaryColor }}><Icon name="heart" style={{ color: colorsPalette.primaryColor, fontSize: wp(4) }} /><Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>LIKES</Text></TabHeading>}>
                                <Likes contest={contest} item={item}  _modalAction={this._modalAction}/>
                            </Tab>
                            <Tab
                                activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                                activeTabStyle={{ backgroundColor: '#F5F5F5' }}
                                tabStyle={{ backgroundColor: '#F5F5F5' }}
                                heading={<TabHeading style={{ backgroundColor: colorsPalette.secondaryColor }}><Icon type="MaterialCommunityIcons" name="comment" style={{ color: colorsPalette.primaryColor, fontSize: wp(4) }} /><Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>COMMENTS</Text></TabHeading>}>
                                {/* <Tab2 /> */}
                            </Tab>
                            <Tab
                                activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                                activeTabStyle={{ backgroundColor: '#F5F5F5' }}
                                tabStyle={{ backgroundColor: '#F5F5F5' }}
                                heading={<TabHeading style={{ backgroundColor: colorsPalette.secondaryColor }}><Icon type="AntDesign" name="eye" style={{ color: colorsPalette.primaryColor, fontSize: wp(4) }} /><Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>VIEWS</Text></TabHeading>}>
                                {/* <Tab3 /> */}
                            </Tab>
                        </Tabs>
                    </Container>
                </Modal>
            </View>
        );
    }
}
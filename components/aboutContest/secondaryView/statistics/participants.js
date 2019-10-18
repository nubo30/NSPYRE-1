import React, { Component } from 'react';
import { FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Container, Header, Title, Content, Button, Left, Body, Icon, Text, View, ListItem, Thumbnail, Right, Tab, Tabs, ScrollableTab } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Modal from 'react-native-modal'
import UserAvatar from 'react-native-user-avatar'
import moment from 'moment'
import truncate from 'lodash/truncate'
import upperFirst from 'lodash/upperFirst'

// Child Components
import ShowLCVSimpact from './charts/showLCVSImpact'
import ShowSN from './charts/showSN'
// Colors
import { colorsPalette } from '../../../global/static/colors'

class participants extends Component {
    state = {
        participantsModalList: false,
        indexTab: 0
    }

    _closeAllModalsAndGoToProfileUser = (item) => {
        const { _participantsModal, _modalVisibleShowStatistics, navigation } = this.props
        _participantsModal(false)
        setTimeout(() => {
            _modalVisibleShowStatistics(false);
            navigation.navigate("UserProfile", { userId: item.idUserLike })
        }, 500);
    }

    render() {
        const { participantsModalList, indexTab } = this.state
        const { _participantsModal, participants } = this.props
        return (
            <Container>
                <Header style={{ backgroundColor: colorsPalette.secondaryColor }}>
                    <View style={{ position: 'absolute', width: '100%', height: "100%", justifyContent: 'center', alignItems: 'center', bottom: 0 }}>
                        <Title allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(4.5) }}>Insights</Title>
                    </View>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button transparent onPress={() => _participantsModal(false)}>
                            <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                            <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Close</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button
                            onPress={() => this.setState({ participantsModalList: true })}
                            iconLeft small style={{ backgroundColor: colorsPalette.secondaryColor, left: 30 }}>
                            <Icon type="FontAwesome" name="users" style={{ color: colorsPalette.primaryColor }} />
                            <Text allowFontScaling={false} style={{ fontSize: wp(4), right: 10, color: colorsPalette.primaryColor }}>{participants.length}</Text>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <View style={{ height: 150, padding: 10 }}>
                        <Header transparent style={{ height: 50 }}>
                            <Left>
                                <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Top submissions <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>Scroll to left to see more</Text></Text>
                            </Left>
                        </Header>
                        <FlatList
                            horizontal
                            data={participants.slice(0, 3)}
                            renderItem={({ item, index }) => (
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{index + 1}. </Text>
                                    </View>
                                    <View style={{ flex: 0.9 }}>
                                        <ListItem disabled avatar onPress={() => this._closeAllModalsAndGoToProfileUser(item)} underlayColor={colorsPalette.secondaryColor}>
                                            <Left>
                                                {item.avatar !== null
                                                    ? <Thumbnail source={{ uri: item.avatar }} />
                                                    : <UserAvatar size="55" name={item.nameUser} />}
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false}>{truncate(item.nameUser, { length: 20, separator: "..." })}<Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.gradientGray }}> {upperFirst(moment(item.createdAt).fromNow())}</Text></Text>
                                                <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon name="heart" style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.likesToParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="MaterialCommunityIcons" name="comment" style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.commentsToParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="Ionicons" name='eye' style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.viewsParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="FontAwesome" name='share-square-o' style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.shareParticipants.items.length}</Text>
                                                    </Button>
                                                </View>
                                            </Body>
                                        </ListItem>
                                    </View>
                                </View>
                            )}
                            keyExtractor={items => items.createdAt} />
                    </View>
                    <View style={{ height: 250 }}>
                        <View style={{ paddingLeft: 15, flex: 0.1 }}>
                            <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Distribution <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>Touch for more information on the colors</Text></Text>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <ShowLCVSimpact participants={participants} />
                        </View>
                        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(2.5) }}>These data are the sum of all data per participant.</Text>
                        </View>
                    </View>
                    <View style={{ height: 250 }}>
                        <View style={{ paddingLeft: 15, flex: 0.1 }}>
                            <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Social networks <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>Scroll to left to see more</Text></Text>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <ShowSN participants={participants} />
                        </View>
                        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(2.5) }}>These data are the sum of all data per participant.</Text>
                        </View>
                    </View>

                </Content>

                {/* LIST OF PARTICIANTS */}
                <Modal
                    onSwipeComplete={() => this.setState({ participantsModalList: false })}
                    swipeDirection={['down']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    isVisible={participantsModalList}>
                    <View style={{
                        backgroundColor: colorsPalette.secondaryColor,
                        justifyContent: 'center',
                        borderTopStartRadius: 10,
                        borderTopEndRadius: 10,
                        borderColor: 'rgba(0, 0, 0, 0.3)',
                        flex: 1,
                        maxHeight: 600,
                        position: 'absolute',
                        bottom: 0,
                        width: '100%'
                    }}>
                        <Header hasTabs transparent style={{ height: 30, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Icon name="minus" type="Feather" style={{ fontSize: wp(12), color: colorsPalette.darkFont, position: 'absolute' }} />
                        </Header>
                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, alignSelf: 'center' }}>Users are sorted by items</Text>
                        <Tabs

                            onChangeTab={(value) => this.setState({ indexTab: value.i })}
                            tabBarUnderlineStyle={{ backgroundColor: colorsPalette.primaryColor }}
                            renderTabBar={() => <ScrollableTab />}>
                            <Tab
                                tabStyle={{ backgroundColor: '#FFF' }}
                                textStyle={{ color: colorsPalette.gradientGray }}
                                activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                                activeTabStyle={{ backgroundColor: '#FFF' }}
                                heading="Date">
                                <FlatList
                                    contentContainerStyle={{ padding: 15 }}
                                    data={participants && participants.sort((a, b) => { return indexTab === 0 ? new Date(b.createdAt) - new Date(a.createdAt) : null })}
                                    renderItem={({ item }) => (
                                        <ListItem disabled avatar onPress={() => this._closeAllModalsAndGoToProfileUser(item)} underlayColor={colorsPalette.secondaryColor}>
                                            <Left>
                                                {item.avatar !== null
                                                    ? <Thumbnail source={{ uri: item.avatar }} />
                                                    : <UserAvatar size="55" name={item.nameUser} />}
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false}>{truncate(item.nameUser, { length: 20, separator: "..." })}<Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.gradientGray }}> {upperFirst(moment(item.createdAt).fromNow())}</Text></Text>
                                                <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon name="heart" style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.likesToParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="MaterialCommunityIcons" name="comment" style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.commentsToParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="Ionicons" name='eye' style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.viewsParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="FontAwesome" name='share-square-o' style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.shareParticipants.items.length}</Text>
                                                    </Button>
                                                </View>
                                            </Body>
                                        </ListItem>
                                    )}
                                    keyExtractor={items => items.createdAt} />
                            </Tab>

                            <Tab
                                tabStyle={{ backgroundColor: '#FFF' }}
                                textStyle={{ color: colorsPalette.gradientGray }}
                                activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                                activeTabStyle={{ backgroundColor: '#FFF' }}
                                heading="Likes">
                                <FlatList
                                    contentContainerStyle={{ padding: 15 }}
                                    data={participants && participants.sort((a, b) => { return indexTab === 1 && b.likesToParticipants.items.length - a.likesToParticipants.items.length })}
                                    renderItem={({ item }) => (
                                        <ListItem disabled avatar onPress={() => this._closeAllModalsAndGoToProfileUser(item)} underlayColor={colorsPalette.secondaryColor}>
                                            <Left>
                                                {item.avatar !== null
                                                    ? <Thumbnail source={{ uri: item.avatar }} />
                                                    : <UserAvatar size="55" name={item.nameUser} />}
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false}>{truncate(item.nameUser, { length: 20, separator: "..." })}<Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.gradientGray }}> {upperFirst(moment(item.createdAt).fromNow())}</Text></Text>
                                                <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon name="heart" style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.likesToParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="MaterialCommunityIcons" name="comment" style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.commentsToParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="Ionicons" name='eye' style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.viewsParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="FontAwesome" name='share-square-o' style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.shareParticipants.items.length}</Text>
                                                    </Button>
                                                </View>
                                            </Body>
                                        </ListItem>
                                    )}
                                    keyExtractor={items => items.createdAt} />
                            </Tab>

                            <Tab
                                tabStyle={{ backgroundColor: '#FFF' }}
                                textStyle={{ color: colorsPalette.gradientGray }}
                                activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                                activeTabStyle={{ backgroundColor: '#FFF' }}
                                heading="Comments">
                                <FlatList
                                    contentContainerStyle={{ padding: 15 }}
                                    data={participants && participants.sort((a, b) => { return indexTab === 2 && b.commentsToParticipants.items.length - a.commentsToParticipants.items.length })}
                                    renderItem={({ item }) => (
                                        <ListItem disabled avatar onPress={() => this._closeAllModalsAndGoToProfileUser(item)} underlayColor={colorsPalette.secondaryColor}>
                                            <Left>
                                                {item.avatar !== null
                                                    ? <Thumbnail source={{ uri: item.avatar }} />
                                                    : <UserAvatar size="55" name={item.nameUser} />}
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false}>{truncate(item.nameUser, { length: 20, separator: "..." })}<Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.gradientGray }}> {upperFirst(moment(item.createdAt).fromNow())}</Text></Text>
                                                <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon name="heart" style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.likesToParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="MaterialCommunityIcons" name="comment" style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.commentsToParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="Ionicons" name='eye' style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.viewsParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="FontAwesome" name='share-square-o' style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.shareParticipants.items.length}</Text>
                                                    </Button>
                                                </View>
                                            </Body>
                                        </ListItem>
                                    )}
                                    keyExtractor={items => items.createdAt} />
                            </Tab>

                            <Tab
                                tabStyle={{ backgroundColor: '#FFF' }}
                                textStyle={{ color: colorsPalette.gradientGray }}
                                activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                                activeTabStyle={{ backgroundColor: '#FFF' }}
                                heading="Views">
                                <FlatList
                                    contentContainerStyle={{ padding: 15 }}
                                    data={participants && participants.sort((a, b) => { return indexTab === 3 && b.viewsParticipants.items.length - a.viewsParticipants.items.length })}
                                    renderItem={({ item }) => (
                                        <ListItem disabled avatar onPress={() => this._closeAllModalsAndGoToProfileUser(item)} underlayColor={colorsPalette.secondaryColor}>
                                            <Left>
                                                {item.avatar !== null
                                                    ? <Thumbnail source={{ uri: item.avatar }} />
                                                    : <UserAvatar size="55" name={item.nameUser} />}
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false}>{truncate(item.nameUser, { length: 20, separator: "..." })}<Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.gradientGray }}> {upperFirst(moment(item.createdAt).fromNow())}</Text></Text>
                                                <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon name="heart" style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.likesToParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="MaterialCommunityIcons" name="comment" style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.commentsToParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="Ionicons" name='eye' style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.viewsParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="FontAwesome" name='share-square-o' style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.shareParticipants.items.length}</Text>
                                                    </Button>
                                                </View>
                                            </Body>
                                        </ListItem>
                                    )}
                                    keyExtractor={items => items.createdAt} />
                            </Tab>
                            <Tab
                                tabStyle={{ backgroundColor: '#FFF' }}
                                textStyle={{ color: colorsPalette.gradientGray }}
                                activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                                activeTabStyle={{ backgroundColor: '#FFF' }}
                                heading="Share">
                                <FlatList
                                    contentContainerStyle={{ padding: 15 }}
                                    data={participants && participants.sort((a, b) => { return indexTab === 4 && b.shareParticipants.items.length - a.shareParticipants.items.length })}
                                    renderItem={({ item }) => (
                                        <ListItem disabled avatar onPress={() => this._closeAllModalsAndGoToProfileUser(item)} underlayColor={colorsPalette.secondaryColor}>
                                            <Left>
                                                {item.avatar !== null
                                                    ? <Thumbnail source={{ uri: item.avatar }} />
                                                    : <UserAvatar size="55" name={item.nameUser} />}
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false}>{truncate(item.nameUser, { length: 20, separator: "..." })}<Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.gradientGray }}> {upperFirst(moment(item.createdAt).fromNow())}</Text></Text>
                                                <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon name="heart" style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.likesToParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="MaterialCommunityIcons" name="comment" style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.commentsToParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="Ionicons" name='eye' style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.viewsParticipants.items.length}</Text>
                                                    </Button>
                                                    <Button disabled small iconLeft transparent style={{ top: 5 }}>
                                                        <Icon type="FontAwesome" name='share-square-o' style={{ fontSize: wp(4), color: colorsPalette.primaryColor }} />
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.primaryColor, right: 10 }}>{item.shareParticipants.items.length}</Text>
                                                    </Button>
                                                </View>
                                            </Body>
                                        </ListItem>
                                    )}
                                    keyExtractor={items => items.createdAt} />
                            </Tab>
                        </Tabs>
                    </View>
                </Modal>
            </Container>
        );
    }
}

export default withNavigation(participants)
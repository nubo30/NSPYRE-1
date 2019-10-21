import React, { Component } from 'react';
import { FlatList, RefreshControl, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Container, Header, Title, Content, Button, Left, Body, Icon, Text, View, ListItem, Thumbnail, Right, Tab, Tabs, ScrollableTab, CheckBox } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Modal from 'react-native-modal'
import UserAvatar from 'react-native-user-avatar'
import moment from 'moment'
import truncate from 'lodash/truncate'
import upperFirst from 'lodash/upperFirst'
import Swiper from 'react-native-swiper'

// Child Components
import ShowLCVSimpact from './charts/showLCVSImpact'
import ShowSN from './charts/showSN'
import ShowRgions from './charts/showRgions'
import ShowGender from './charts/showGender'
import ShowSubmissionDay from './charts/showSubmissionDay'
import BasedGenderLikes from './chartsToPay/basedGenderLikes'
import BasedLocationLikes from './chartsToPay/basedLocationLikes'
import BasedAgeLikes from './chartsToPay/basedAgeLikes'
import BassedGenderComments from './chartsToPay/basedGenderComments'
import BassedLocationComments from './chartsToPay/bassedLocationComments'
import BassedAgeComments from './chartsToPay/bassedAgeComments';
import BassedGenderShare from './chartsToPay/basedGenderShare'
import BassedLocationShare from './chartsToPay/bassedLocationShare'
import BassedAgeShare from './chartsToPay/bassedAgeShare'
import BassedGenderViews from './chartsToPay/basedGenderViews'
import BassedLocationViews from './chartsToPay/bassedLocationViews'
import BassedAgeViews from './chartsToPay/bassedAgeViews'


// Colors
import { colorsPalette } from '../../../global/static/colors'
import { ScrollView } from 'react-native-gesture-handler';

const heightScreen = Dimensions.get('screen').height

class participants extends Component {
    state = {
        participantsModalList: false,
        moreChartsModal: false,
        indexTab: 0,
        refreshing: false,
        likesMoreFeatures: false,
        commentsMoreFeatures: false,
        shareMoreFeatures: false,
        viewsMoreFeatures: false,

        // Show after pay
        showLikesAfterToPay: false,
        showCommentsAfterToPay: false,
        showSharesAfterToPay: false,
        showViewsAfterToPay: false
    }

    _closeAllModalsAndGoToProfileUser = (item) => {
        const { _participantsModal, _modalVisibleShowStatistics, navigation } = this.props
        _participantsModal(false)
        setTimeout(() => {
            _modalVisibleShowStatistics(false);
            navigation.navigate("UserProfile", { userId: item.idUserLike })
        }, 500);
    }


    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.props._getContestFromAWS().then(() => {
            this.setState({ refreshing: false });
        });
    }

    _showGraphPay = () => {
        this.setState({
            moreChartsModal: false,
            showLikesAfterToPay: this.state.likesMoreFeatures,
            showCommentsAfterToPay: this.state.commentsMoreFeatures,
            showSharesAfterToPay: this.state.shareMoreFeatures,
            showViewsAfterToPay: this.state.viewsMoreFeatures
        })
    }

    render() {
        const { participantsModalList, moreChartsModal, indexTab, likesMoreFeatures, commentsMoreFeatures, shareMoreFeatures, viewsMoreFeatures } = this.state
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

                <Content refreshControl={<RefreshControl tintColor="#D82B60" refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}>
                    <View style={{ height: 150, padding: 10 }}>
                        <Header transparent style={{ height: 50 }}>
                            <Left>
                                <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Top submissions <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>Scroll to left to see more</Text></Text>
                            </Left>
                        </Header>
                        <FlatList
                            horizontal
                            data={participants.slice(0, 3).sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })}
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
                    <View style={{ height: 250 }}>
                        <View style={{ paddingLeft: 15, flex: 0.1 }}>
                            <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Submission day</Text>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <ShowSubmissionDay participants={participants} />
                        </View>
                        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(2.5) }}>These data are the sum of all data per participant.</Text>
                        </View>
                    </View>
                    
                    
                    <View style={{ height: 250 }}>
                        <View style={{ paddingLeft: 15, flex: 0.1 }}>
                            <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Top Locations</Text>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <ShowRgions participants={participants} />
                        </View>
                        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(2.5) }}>These data are the sum of all data per participant.</Text>
                        </View>
                    </View>
                    
                    
                    <View style={{ height: 250 }}>
                        <View style={{ paddingLeft: 15, flex: 0.1 }}>
                            <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Gender</Text>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <ShowGender participants={participants} />
                        </View>
                        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(2.5) }}>These data are the sum of all data per participant.</Text>
                        </View>
                    </View>
                    
                    {this.state.showLikesAfterToPay &&
                        <View style={{ height: 650 }}>
                            <View style={{ paddingLeft: 15, flex: 0.1 }}>
                                <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Likes <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>(based on gender, age and location)</Text></Text>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <View style={{ flex: 1, top: -20 }}>
                                    <BasedGenderLikes showLikesAfterToPay={this.state.showLikesAfterToPay} participants={participants} />
                                </View>
                                <View style={{ position: 'absolute', bottom: 0, width: "100%", height: 20 }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), fontWeight: 'bold', alignSelf: 'center' }}>Gender</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <View>
                                    <BasedAgeLikes showLikesAfterToPay={this.state.showLikesAfterToPay} participants={participants} action={likesMoreFeatures} />
                                </View>
                                <View style={{ flex: 0.1, position: 'absolute', bottom: 0, width: "100%" }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), fontWeight: 'bold', alignSelf: 'center' }}>Age</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <View>
                                    <BasedLocationLikes showLikesAfterToPay={this.state.showLikesAfterToPay} participants={participants} />
                                </View>
                                <View style={{ flex: 0.1, position: 'absolute', bottom: 0, width: "100%" }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), fontWeight: 'bold', alignSelf: 'center' }}>Top Location</Text>
                                </View>
                            </View>
                        </View>}
                    {this.state.showCommentsAfterToPay &&
                        <View style={{ height: 650 }}>
                            <View style={{ paddingLeft: 15, flex: 0.1 }}>
                                <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Comments <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>(based on gender, age and location)</Text></Text>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <View style={{ flex: 1, top: -20 }}>
                                    <BassedGenderComments showCommentsAfterToPay={this.state.showCommentsAfterToPay} participants={participants} />
                                </View>
                                <View style={{ position: 'absolute', bottom: 0, width: "100%", height: 20 }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), fontWeight: 'bold', alignSelf: 'center' }}>Gender</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <View>
                                    <BassedAgeComments showCommentsAfterToPay={this.state.showCommentsAfterToPay} participants={participants} action={commentsMoreFeatures} />
                                </View>
                                <View style={{ flex: 0.1, position: 'absolute', bottom: 0, width: "100%" }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), fontWeight: 'bold', alignSelf: 'center' }}>Age</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <View>
                                    <BassedLocationComments showCommentsAfterToPay={this.state.showCommentsAfterToPay} participants={participants} />
                                </View>
                                <View style={{ flex: 0.1, position: 'absolute', bottom: 0, width: "100%" }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), fontWeight: 'bold', alignSelf: 'center' }}>Top Location</Text>
                                </View>
                            </View>
                        </View>}
                    {this.state.showSharesAfterToPay &&
                        <View style={{ height: 650 }}>
                            <View style={{ paddingLeft: 15, flex: 0.1 }}>
                                <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Share <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>(based on gender, age and location)</Text></Text>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <View style={{ flex: 1, top: -20 }}>
                                    <BassedGenderShare showSharesAfterToPay={this.state.showSharesAfterToPay} participants={participants} />
                                </View>
                                <View style={{ position: 'absolute', bottom: 0, width: "100%", height: 20 }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), fontWeight: 'bold', alignSelf: 'center' }}>Gender</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <View>
                                    <BassedAgeShare showSharesAfterToPay={this.state.showSharesAfterToPay} participants={participants} action={shareMoreFeatures} />
                                </View>
                                <View style={{ flex: 0.1, position: 'absolute', bottom: 0, width: "100%" }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), fontWeight: 'bold', alignSelf: 'center' }}>Age</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <View>
                                    <BassedLocationShare showSharesAfterToPay={this.state.showSharesAfterToPay} participants={participants} />
                                </View>
                                <View style={{ flex: 0.1, position: 'absolute', bottom: 0, width: "100%" }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), fontWeight: 'bold', alignSelf: 'center' }}>Top Location</Text>
                                </View>
                            </View>
                        </View>}
                    {this.state.showViewsAfterToPay &&
                        <View style={{ height: 650 }}>
                            <View style={{ paddingLeft: 15, flex: 0.1 }}>
                                <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>View <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>(based on gender, age and location)</Text></Text>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <View style={{ flex: 1, top: -20 }}>
                                    <BassedGenderViews showViewsAfterToPay={this.state.showViewsAfterToPay} participants={participants} />
                                </View>
                                <View style={{ position: 'absolute', bottom: 0, width: "100%", height: 20 }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), fontWeight: 'bold', alignSelf: 'center' }}>Gender</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <View>
                                    <BassedAgeViews showViewsAfterToPay={this.state.showViewsAfterToPay} participants={participants} action={viewsMoreFeatures} />
                                </View>
                                <View style={{ flex: 0.1, position: 'absolute', bottom: 0, width: "100%" }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), fontWeight: 'bold', alignSelf: 'center' }}>Age</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <View>
                                    <BassedLocationViews showViewsAfterToPay={this.state.showViewsAfterToPay} participants={participants} />
                                </View>
                                <View style={{ flex: 0.1, position: 'absolute', bottom: 0, width: "100%" }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), fontWeight: 'bold', alignSelf: 'center' }}>Top Location</Text>
                                </View>
                            </View>
                        </View>}
                    {this.state.showLikesAfterToPay && this.state.showCommentsAfterToPay && this.state.showSharesAfterToPay && this.state.showViewsAfterToPay ? null : <View style={{ height: 70, justifyContent: 'center', alignItems: 'center' }}>
                        <Button transparent bordered style={{ borderColor: colorsPalette.primaryColor }} onPress={() => this.setState({ moreChartsModal: true })}>
                            <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>See more</Text>
                        </Button>
                    </View>}
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
                                    data={participants && participants.sort((a, b) => { return indexTab === 1 && b.likesToParticipants.items.length < a.likesToParticipants.items.length })}
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
                                    data={participants && participants.sort((a, b) => { return indexTab === 2 && b.commentsToParticipants.items.length > a.commentsToParticipants.items.length })}
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
                                    data={participants && participants.sort((a, b) => { return indexTab === 3 && b.viewsParticipants.items.length < a.viewsParticipants.items.length })}
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
                                    data={participants && participants.sort((a, b) => { return indexTab === 4 && b.shareParticipants.items.length > a.shareParticipants.items.length })}
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

                {/* MORE FEATURES */}
                <Modal
                    onSwipeComplete={() => this.setState({ moreChartsModal: false })}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    isVisible={moreChartsModal}>
                    <View style={{
                        backgroundColor: colorsPalette.secondaryColor,
                        justifyContent: 'center',
                        borderTopStartRadius: 10,
                        borderTopEndRadius: 10,
                        borderColor: 'rgba(0, 0, 0, 0.3)',
                        flex: 1,
                        maxHeight: heightScreen - 30,
                        position: 'absolute',
                        bottom: 0,
                        width: '100%'
                    }}>
                        <Header style={{ borderTopEndRadius: 10, borderTopStartRadius: 10, backgroundColor: colorsPalette.secondaryColor }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', width: "100%", height: "100%", bottom: 0 }}>
                                <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(5), top: -5 }}>More features</Text>
                            </View>
                            <Left style={{ top: -5 }}>
                                <Button transparent onPress={() => this.setState({
                                    moreChartsModal: false,
                                    likesMoreFeatures: this.state.showLikesAfterToPay,
                                    commentsMoreFeatures: this.state.showCommentsAfterToPay,
                                    shareMoreFeatures: this.state.showSharesAfterToPay,
                                    viewsMoreFeatures: this.state.showViewsAfterToPay,
                                })}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(3.5) }}>CLOSE</Text>
                                </Button>
                            </Left>
                            <Body />
                            <Right style={{ top: -5 }}>
                                <Button
                                    transparent
                                    onPress={() => this._showGraphPay()}
                                    disabled={
                                        likesMoreFeatures ||
                                            commentsMoreFeatures ||
                                            shareMoreFeatures ||
                                            viewsMoreFeatures
                                            ? false : true}>
                                    <Text allowFontScaling={false} style={{
                                        color: likesMoreFeatures ||
                                            commentsMoreFeatures ||
                                            shareMoreFeatures ||
                                            viewsMoreFeatures ? colorsPalette.primaryColor : colorsPalette.gradientGray,
                                        fontSize: wp(3.5)
                                    }}>SUBMIT</Text>
                                </Button>
                            </Right>
                        </Header>
                        <ScrollView>
                            {!this.state.showLikesAfterToPay && <View style={{ height: 300, padding: 10 }}>
                                <View style={{ flex: 0.2 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Likes <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>(based on gender, age and location - scroll to left)</Text></Text>
                                </View>
                                <View style={{ flex: 0.8 }}>
                                    <Swiper
                                        dotColor={colorsPalette.gradientGray}
                                        activeDotColor={colorsPalette.primaryColor}
                                        dotStyle={{ top: 35 }}
                                        activeDotStyle={{ top: 35 }}
                                        loop={false}>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 0.9 }}>
                                                <BasedGenderLikes showLikesAfterToPay={this.state.showLikesAfterToPay} participants={participants} action={likesMoreFeatures} />
                                            </View>
                                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), top: -10, fontWeight: 'bold' }}>Gender</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 0.9 }}>
                                                <BasedAgeLikes showLikesAfterToPay={this.state.showLikesAfterToPay} participants={participants} action={likesMoreFeatures} />
                                            </View>
                                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), top: -10, fontWeight: 'bold' }}>Age Range</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 0.9 }}>
                                                <BasedLocationLikes participants={participants} action={likesMoreFeatures} />
                                            </View>
                                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), top: -10, fontWeight: 'bold' }}>Top Location</Text>
                                            </View>
                                        </View>
                                    </Swiper>
                                </View>
                                <View style={{ height: "100%", width: "20%", position: 'absolute', paddingRight: 30, bottom: 0, right: 0 }}>
                                    <Button onPress={() => this.setState({ likesMoreFeatures: !likesMoreFeatures })} transparent style={{ width: 60, height: 60, position: 'absolute' }} />
                                    <CheckBox onPress={() => this.setState({ likesMoreFeatures: !likesMoreFeatures })} checked={likesMoreFeatures} style={{ alignSelf: 'flex-end', top: 20, right: 30 }} color={likesMoreFeatures ? colorsPalette.primaryColor : colorsPalette.gradientGray} />
                                </View>
                                <View style={{ height: "100%", width: "40%", position: 'absolute', bottom: 0, left: 0 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.errColor, top: 20, left: 10, fontSize: wp(4) }}>Points: 150</Text>
                                </View>
                            </View>}

                            {!this.state.showCommentsAfterToPay && <View style={{ height: 300, padding: 10 }}>
                                <View style={{ flex: 0.2 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Comments <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>(based on gender, age and location - scroll to left)</Text></Text>
                                </View>
                                <View style={{ flex: 0.8 }}>
                                    <Swiper
                                        dotColor={colorsPalette.gradientGray}
                                        activeDotColor={colorsPalette.primaryColor}
                                        dotStyle={{ top: 35 }}
                                        activeDotStyle={{ top: 35 }}
                                        loop={false}>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 0.9 }}>
                                                <BassedGenderComments showCommentsAfterToPay={this.state.showCommentsAfterToPay} participants={participants} action={commentsMoreFeatures} />
                                            </View>
                                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), top: -10, fontWeight: 'bold' }}>Gender</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 0.9 }}>
                                                <BassedLocationComments showCommentsAfterToPay={this.state.showCommentsAfterToPay} participants={participants} action={commentsMoreFeatures} />
                                            </View>
                                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), top: -10, fontWeight: 'bold' }}>Top Location</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 0.9 }}>
                                                <BassedAgeComments showCommentsAfterToPay={this.state.showCommentsAfterToPay} participants={participants} action={commentsMoreFeatures} />
                                            </View>
                                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), top: -10, fontWeight: 'bold' }}>Age Range</Text>
                                            </View>
                                        </View>
                                    </Swiper>
                                </View>
                                <View style={{ height: "100%", width: "20%", position: 'absolute', paddingRight: 30, bottom: 0, right: 0 }}>
                                    <Button onPress={() => this.setState({ commentsMoreFeatures: !commentsMoreFeatures })} transparent style={{ width: 60, height: 60, position: 'absolute' }} />
                                    <CheckBox onPress={() => this.setState({ commentsMoreFeatures: !commentsMoreFeatures })} checked={commentsMoreFeatures} style={{ alignSelf: 'flex-end', top: 20, right: 30 }} color={commentsMoreFeatures ? colorsPalette.primaryColor : colorsPalette.gradientGray} />
                                </View>
                                <View style={{ height: "100%", width: "40%", position: 'absolute', bottom: 0, left: 0 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.errColor, top: 20, left: 10, fontSize: wp(4) }}>Points: 150</Text>
                                </View>
                            </View>}

                            {!this.state.showSharesAfterToPay && <View style={{ height: 300, padding: 10 }}>
                                <View style={{ flex: 0.2 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Share <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>(based on gender, age and location - scroll to left)</Text></Text>
                                </View>
                                <View style={{ flex: 0.8 }}>
                                    <Swiper
                                        dotColor={colorsPalette.gradientGray}
                                        activeDotColor={colorsPalette.primaryColor}
                                        dotStyle={{ top: 35 }}
                                        activeDotStyle={{ top: 35 }}
                                        loop={false}>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 0.9 }}>
                                                <BassedGenderShare showSharesAfterToPay={this.state.showSharesAfterToPay} participants={participants} action={shareMoreFeatures} />
                                            </View>
                                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), top: -10, fontWeight: 'bold' }}>Gender</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 0.9 }}>
                                                <BassedLocationShare showSharesAfterToPay={this.state.showSharesAfterToPay} participants={participants} action={shareMoreFeatures} />
                                            </View>
                                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), top: -10, fontWeight: 'bold' }}>Top Location</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 0.9 }}>
                                                <BassedAgeShare showSharesAfterToPay={this.state.showSharesAfterToPay} participants={participants} action={shareMoreFeatures} />
                                            </View>
                                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), top: -10, fontWeight: 'bold' }}>Age Range</Text>
                                            </View>
                                        </View>
                                    </Swiper>
                                </View>
                                <View style={{ height: "100%", width: "20%", position: 'absolute', paddingRight: 30, bottom: 0, right: 0 }}>
                                    <Button onPress={() => this.setState({ shareMoreFeatures: !shareMoreFeatures })} transparent style={{ width: 60, height: 60, position: 'absolute' }} />
                                    <CheckBox onPress={() => this.setState({ shareMoreFeatures: !shareMoreFeatures })} checked={shareMoreFeatures} style={{ alignSelf: 'flex-end', top: 20, right: 30 }} color={shareMoreFeatures ? colorsPalette.primaryColor : colorsPalette.gradientGray} />
                                </View>
                                <View style={{ height: "100%", width: "40%", position: 'absolute', bottom: 0, left: 0 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.errColor, top: 20, left: 10, fontSize: wp(4) }}>Points: 150</Text>
                                </View>
                            </View>}

                            {!this.state.showViewsAfterToPay && <View style={{ height: 300, padding: 10 }}>
                                <View style={{ flex: 0.2 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>View <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>(based on gender, age and location - scroll to left)</Text></Text>
                                </View>
                                <View style={{ flex: 0.8 }}>
                                    <Swiper
                                        dotColor={colorsPalette.gradientGray}
                                        activeDotColor={colorsPalette.primaryColor}
                                        dotStyle={{ top: 35 }}
                                        activeDotStyle={{ top: 35 }}
                                        loop={false}>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 0.9 }}>
                                                <BassedGenderViews participants={participants} action={viewsMoreFeatures} />
                                            </View>
                                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), top: -10, fontWeight: 'bold' }}>Gender</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 0.9 }}>
                                                <BassedLocationViews participants={participants} action={viewsMoreFeatures} />
                                            </View>
                                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), top: -10, fontWeight: 'bold' }}>Top Location</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 0.9 }}>
                                                <BassedAgeViews participants={participants} action={viewsMoreFeatures} />
                                            </View>
                                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), top: -10, fontWeight: 'bold' }}>Age Range</Text>
                                            </View>
                                        </View>
                                    </Swiper>
                                </View>
                                <View style={{ height: "100%", width: "20%", position: 'absolute', paddingRight: 30, bottom: 0, right: 0 }}>
                                    <Button onPress={() => this.setState({ viewsMoreFeatures: !viewsMoreFeatures })} transparent style={{ width: 60, height: 60, position: 'absolute' }} />
                                    <CheckBox onPress={() => this.setState({ viewsMoreFeatures: !viewsMoreFeatures })} checked={viewsMoreFeatures} style={{ alignSelf: 'flex-end', top: 20, right: 30 }} color={viewsMoreFeatures ? colorsPalette.primaryColor : colorsPalette.gradientGray} />
                                </View>
                                <View style={{ height: "100%", width: "40%", position: 'absolute', bottom: 0, left: 0 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.errColor, top: 20, left: 10, fontSize: wp(4) }}>Points: 150</Text>
                                </View>
                            </View>}
                        </ScrollView>
                    </View>
                </Modal>
            </Container>
        );
    }
}

export default withNavigation(participants)
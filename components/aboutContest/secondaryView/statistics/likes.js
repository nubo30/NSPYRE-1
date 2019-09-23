import React, { Component } from 'react';
import { FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Container, Header, Title, Content, Button, Left, Body, Icon, Text, View, List, ListItem, Thumbnail } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import UserAvatar from 'react-native-user-avatar'
import moment from 'moment'

// Child Components
import CBarChart from './charts/CLineChart'

// Colors
import { colorsPalette } from '../../../global/static/colors'

class Likes extends Component {

    _closeAllModalsAndGoToProfileUser = (item) => {
        const { _usersLikesModal, _modalVisibleShowStatistics, navigation } = this.props
        _usersLikesModal(false)
        setTimeout(() => {
            _modalVisibleShowStatistics(false);
            navigation.navigate("UserProfile", { userId: item.idUserLike })
        }, 500);
    }

    render() {
        const { _usersLikesModal, contest } = this.props
        return (
            <Container>
                <Header style={{ backgroundColor: colorsPalette.secondaryColor }}>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button transparent onPress={() => _usersLikesModal(false)}>
                            <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                            <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Close</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(4.5) }}>Likes obtained by users</Title>
                    </Left>
                </Header>

                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
                    <View style={{ backgroundColor: colorsPalette.secondaryColor, flex: 0.4, shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                        <CBarChart contest={contest} />
                    </View>
                    <List style={{ flex: 0.6 }}>
                        <Content padder>
                            <Text allowFontScaling style={{ color: colorsPalette.gradientGray, fontSize: wp(4), width: "80%" }}>List of users who likes the contest - Press and hold for more information.</Text>
                            <FlatList
                                data={contest.usersLikes && contest.usersLikes.items}
                                renderItem={({ item }) => (
                                    <ListItem avatar
                                        onPress={() => this._closeAllModalsAndGoToProfileUser(item)} underlayColor={colorsPalette.secondaryColor}>
                                        <Left>
                                            {item.avatar !== null
                                                ? <Thumbnail source={{ uri: item.avatar }} />
                                                : <UserAvatar size="55" name={item.name} />}
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false}>{item.name}</Text>
                                            <Text allowFontScaling={false} note style={{ fontWeight: 'normal' }}>Likes your contest, {moment(item.createdAt).fromNow()}</Text>
                                        </Body>
                                    </ListItem>
                                )}
                                keyExtractor={items => items.createdAt} />
                        </Content>
                    </List>
                </Content>
            </Container>
        );
    }
}

export default withNavigation(Likes)
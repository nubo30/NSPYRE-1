import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { FlatList } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { Content, ListItem, Text, Left, Body, Button, Icon, Thumbnail, View } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment';
import UserAvatar from "react-native-user-avatar"
import ModalAnimated from 'react-native-modal'
import upperFirst from 'lodash/upperFirst'


// Colors
import { colorsPalette } from '../../global/static/colors'

// AWS
import * as mutations from '../../../src/graphql/mutations'

class LikesParticipations extends Component {
    state = {
        modalAnimated: false,
    }

    render() {
        const userData = this.props.navigation.getParam('userData')
        const { modalAnimated, like } = this.state
        const { item } = this.props
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        onLongPress={() => this.setState({ modalAnimated: true })}
                        //   onPress={() => { like ? this._deleteLike() : this._createLike(); this.setState({ like: !like }) }}
                        small icon style={{ backgroundColor: colorsPalette.transparent }}>
                        <Icon type="AntDesign" name="linechart" style={{ color: colorsPalette.gradientGray }} />
                    </Button>
                </View>
                <ModalAnimated
                    isVisible={modalAnimated}
                    onSwipeComplete={() => this.setState({ modalAnimated: false })}
                    swipeDirection={['left', 'right', 'down']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}>
                    <View style={{
                        backgroundColor: colorsPalette.secondaryColor,
                        padding: 15,
                        justifyContent: 'center',
                        borderRadius: 10,
                        borderColor: 'rgba(0, 0, 0, 0.3)',
                        flex: 1,
                        maxHeight: 400
                    }}>
                        <View style={{ flex: 0.1, justifyContent: 'center', top: -10 }}>
                            <Icon type="AntDesign" name="minus" style={{ alignSelf: 'center', fontSize: wp(13), top: -5 }} />
                            <Text allowFontScaling={false} style={{ fontSize: wp(3.5), alignSelf: 'center', color: colorsPalette.gradientGray }}>Users Likes</Text>
                        </View>
                        <Content contentContainerStyle={{ flex: 1 }}>
                            {item.likesToParticipants.items && item.likesToParticipants.items.length ? <FlatList
                                data={item.likesToParticipants.items && item.likesToParticipants.items}
                                renderItem={({ item }) => (
                                    <ListItem
                                        avatar
                                        underlayColor={colorsPalette.secondaryColor}>
                                        <Left>
                                            {item.avatar !== null
                                                ? <Thumbnail source={{ uri: item.avatar }} />
                                                : <UserAvatar size="55" name={item.name} />}
                                        </Left>
                                        <Body style={{ borderBottomColor: colorsPalette.transparent, top: 5 }}>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{userData.id === item.idUserLike ? "You" : item.name}</Text>
                                            <Text allowFontScaling={false} note style={{ fontSize: wp(3), fontWeight: 'normal' }}>{upperFirst(moment(item.createdAt).fromNow())}</Text>
                                        </Body>
                                    </ListItem>
                                )}
                                keyExtractor={item => item.createdAt} />
                                : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                    <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: wp(5), color: colorsPalette.gradientGray }}>Here appear the users who have given like, at the moment nobody has done it, why not you?</Text>
                                </View>}
                        </Content>
                        <Button style={{ alignSelf: 'center', backgroundColor: colorsPalette.primaryColor, top: 5 }} small onPress={() => this.setState({ modalAnimated: false })}>
                            <Text allowFontScaling={false}>CLOSE</Text>
                        </Button>
                    </View>
                </ModalAnimated>
            </View>
        );
    }
}

export default withNavigation(LikesParticipations)
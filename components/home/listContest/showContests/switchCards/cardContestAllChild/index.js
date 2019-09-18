import React, { Component } from 'react'
import { withNavigation } from "react-navigation"
import { ImageBackground, View } from 'react-native';
import UserAvatar from "react-native-user-avatar"
import * as Animatable from 'react-native-animatable';
import { Text, Left, Body, Card, CardItem, Thumbnail, Right } from "native-base"
import moment from 'moment'
import CountDown from 'react-native-countdown-component';
import _ from 'lodash'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// This function show the content of all card section
class CardContent extends Component {
    state = { isFinishedContest: false }
    render() {
        const { isFinishedContest } = this.state
        const { item, userData } = this.props
        return item.user && (
            <Card style={{
                flex: 0,
                borderRadius: 7,
                marginBottom: 10,
                width: "95%",
                alignSelf: "center",
                marginTop: 20,
                shadowColor: 'rgba(0,0,0,0.3)',
                shadowOffset: { width: 0 },
                shadowOpacity: 1
            }}>
                <CardItem style={{ borderTopEndRadius: 7, borderTopStartRadius: 7 }}>
                    <Left>
                        <Animatable.View animation="fadeIn">
                            {item && item.user.avatar === null
                                ? <UserAvatar size="40" name={item.user.name} />
                                : <Thumbnail source={{ uri: item.user.avatar }} style={{ width: 40, height: 40, borderRadius: 20 }} />}
                        </Animatable.View>
                        <Body>
                            <Text
                                onPress={() => this.props.navigation.navigate('UserProfile', { userId: item.user.id })}
                                minimumFontScale={wp(4)}
                                allowFontScaling={false}
                                style={{ fontSize: wp(4) }}>
                                {userData.id === item.user.id ? "You" : _.truncate(_.upperFirst(_.lowerCase(item.user.name)), { length: 20, separator: '...' })}
                            </Text>
                            <Text
                                onPress={() => this.props.navigation.navigate('UserProfile', { userId: item.user.id })}
                                minimumFontScale={wp(3)}
                                allowFontScaling={false}
                                note style={{ fontSize: wp(3) }}>Published {moment(item.createdAt).fromNow()}</Text>
                        </Body>
                    </Left>
                    <Right>
                        {isFinishedContest ? <View style={{
                            borderRadius: "50%",
                            backgroundColor: '#E53935',
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: 'rgba(0,0,0,0.3)',
                            shadowOffset: { width: 0 },
                            shadowOpacity: 1,
                        }}>
                            <View style={{ padding: 10 }}>
                                <Text
                                    minimumFontScale={wp(3)}
                                    allowFontScaling={false}
                                    style={{ fontSize: wp(3), color: '#FFF', fontWeight: 'bold' }}>Completed</Text>
                            </View>
                        </View> :
                            item.timer === null
                                ? null
                                : new Date(item.timer) < new Date()
                                    ? <View style={{
                                        borderRadius: "5%",
                                        backgroundColor: '#E53935',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        shadowColor: 'rgba(0,0,0,0.3)',
                                        shadowOffset: { width: 0 },
                                        shadowOpacity: 1,
                                    }}>
                                        <View style={{ padding: 10 }}>
                                            <Text style={{ fontSize: wp(4), color: '#FFF', fontWeight: 'bold' }}>Completed</Text>
                                        </View>
                                    </View> : <CountDown
                                        style={{ alignSelf: 'flex-end', top: -4 }}
                                        digitStyle={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
                                        digitTxtStyle={{ color: '#000' }}
                                        timeLabelStyle={{ color: '#333' }}
                                        until={moment(item.timer).diff(moment(new Date()), 'seconds')}
                                        onFinish={() => this.setState({ isFinishedContest: true })}
                                        onPress={() => { }}
                                        size={10}
                                    />}
                    </Right>
                </CardItem>
                <CardItem cardBody style={{ borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}>
                    <View style={{
                        borderBottomLeftRadius: 7,
                        borderBottomRightRadius: 7,
                        overflow: 'hidden', flex: 1
                    }}>
                        <Animatable.View animation="fadeIn">
                            <ImageBackground
                                source={{ uri: item.general.picture.url }}
                                style={{ height: 125, width: "100%", flex: 1 }}>
                                <View style={{
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    width: "100%", height: "100%",
                                    borderBottomLeftRadius: 7, borderLeftColor: 7,
                                }}>
                                    <Text
                                        minimumFontScale={wp(7)}
                                        allowFontScaling={false}
                                        style={{ color: "#FFF", fontSize: wp(7), position: "absolute", bottom: 0, padding: 10 }}>
                                        {_.truncate(_.upperFirst(_.lowerCase(item.general.nameOfContest)), { length: 20, separator: '...' })}
                                    </Text>
                                    <View style={{ flexDirection: 'row', bottom: 0, right: 0, position: 'absolute', padding: 7 }}>
                                        <Text
                                            minimumFontScale={wp(3)}
                                            allowFontScaling={false}
                                            style={{ color: "#FFF", left: -7, fontSize: wp(4) }}>🏆 {item.prizes.length}</Text>
                                        <Text
                                            minimumFontScale={wp(4)}
                                            allowFontScaling={false}
                                            style={{ color: "#FFF", left: -5, fontSize: wp(4) }}>👥 {item.participants.items.length}</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </Animatable.View>
                    </View>
                </CardItem>
            </Card>
        )
    }
}

export default withNavigation(CardContent)
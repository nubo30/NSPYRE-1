import React, { Component } from 'react'
import { ImageBackground, View } from 'react-native';
import UserAvatar from "react-native-user-avatar"
import * as Animatable from 'react-native-animatable';
import { Text, Left, Body, Card, CardItem, Thumbnail, Right } from "native-base"
import moment from 'moment'
import CountDown from 'react-native-countdown-component';
import _ from 'lodash'

// This function show the content of all card section
export default class CardContent extends Component {
    render() {
        const { item } = this.props
        return (
            <Card style={{
                flex: 0,
                borderRadius: 15,
                marginBottom: 10,
                width: "90%",
                alignSelf: "center",
                marginTop: 20,
                shadowColor: 'rgba(0,0,0,0.3)',
                shadowOffset: { width: 0 },
                shadowOpacity: 1
            }}>
                <CardItem style={{ borderTopEndRadius: 15, borderTopStartRadius: 15 }}>
                    <Left>
                        <Animatable.View animation="fadeIn">
                            {item.user.avatar === null
                                ? <UserAvatar size="40" name={item.user.name} />
                                : <Thumbnail source={{ uri: item.user.avatar }} style={{ width: 40, height: 40, borderRadius: 20 }} />}
                        </Animatable.View>
                        <Body>
                            <Text>
                                {_.truncate(_.upperFirst(_.lowerCase(item.user.name)), { length: 20, separator: '...' })}
                            </Text>
                            <Text note style={{ fontSize: 11 }}>Published {moment(item.createdAt).fromNow()}</Text>
                        </Body>
                    </Left>
                    <Right>
                        {item.timer === null ? null : <CountDown
                            style={{ alignSelf: 'flex-end', top: -4 }}
                            digitStyle={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
                            digitTxtStyle={{ color: '#000' }}
                            timeLabelStyle={{ color: '#333' }}
                            until={moment(item.timer).diff(moment(new Date()), 'seconds')}
                            onFinish={() => null}
                            onPress={() => null}
                            size={10}
                        />}
                    </Right>
                </CardItem>
                <CardItem cardBody style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                    <View style={{
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        overflow: 'hidden', flex: 1
                    }}>
                        <Animatable.View animation="fadeIn">
                            <ImageBackground
                                source={{ uri: item.general.picture.url }}
                                style={{ height: 125, width: "100%", flex: 1 }}>
                                <View style={{
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    width: "100%", height: "100%",
                                    borderBottomLeftRadius: 15, borderLeftColor: 15,
                                }}>
                                    <Text style={{ color: "#FFF", fontSize: 28, position: "absolute", bottom: 0, padding: 10 }}>
                                        {_.truncate(_.upperFirst(_.lowerCase(item.general.nameOfContest)), { length: 20, separator: '...' })}
                                    </Text>
                                    <View style={{ flexDirection: 'row', bottom: 0, right: 0, position: 'absolute', padding: 15 }}>
                                        <Text style={{ color: "#FFF", left: -15 }}>🏆 {item.prizes.length}</Text>
                                        <Text style={{ color: "#FFF", left: -5 }}>👥 50</Text>
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
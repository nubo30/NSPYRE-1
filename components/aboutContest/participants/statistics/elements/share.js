import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { FlatList, ScrollView } from 'react-native'
import { Container, Left, Body, Text, ListItem, Thumbnail, Button, View, Icon } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import PureChart from 'react-native-pure-chart';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import _ from 'lodash'
import lowerCase from 'lodash/lowerCase'
import flatten from 'lodash/flatten'
import ReadMore from 'react-native-read-more-text';
import UserAvatar from "react-native-user-avatar"

// Colors
import { colorsPalette } from '../../../../global/static/colors'

class Likes extends Component {
    state = {
        dataGraph: [
            {
                value: 0,
                label: 'Comments',
                icon: { name: "comment", type: "MaterialCommunityIcons" }
            }
        ],
        dataUsers: []
    }

    _applicationInWhichTheContestHasBeenShared = (value) => {
        if (typeof (value) !== 'string') {
            return value.map(item => {
                switch (item) {
                    case "ph.telegra.Telegraph.Share": return ({ appName: "Telegram", color: colorsPalette.tgColor, icon: { type: "MaterialCommunityIcons", name: "telegram" } })
                    case "net.whatsapp.WhatsApp.ShareExtension": return ({ appName: "WhatsApp", color: colorsPalette.waColor, icon: { type: "FontAwesome", name: "whatsapp" } })
                    case "com.google.hangouts.ShareExtension": return ({ appName: "Hangouts", color: colorsPalette.hgColor, icon: { type: "Entypo", name: "google-hangouts" } })
                    case "com.atebits.Tweetie2.ShareExtension": return ({ appName: "Twitter", color: colorsPalette.ttColor, icon: { type: "AntDesign", name: "twitter" } })
                    case "com.apple.UIKit.activity.PostToFacebook": return ({ appName: "Facebook", color: colorsPalette.fbColor, icon: { type: "AntDesign", name: "facebook-square" } })
                    case "com.facebook.Messenger.ShareExtension": return ({ appName: "Messenger", color: colorsPalette.mgColor, icon: { type: "FontAwesome5", name: "facebook-messenger" } })
                    case "com.tinyspeck.chatlyio.share": return ({ appName: "Slack", color: colorsPalette.scColor, icon: { type: "AntDesign", name: "slack" } })
                    case "com.google.Gmail.ShareExtension": return ({ appName: "Gmail", color: colorsPalette.glColor, icon: { type: "MaterialCommunityIcons", name: "gmail" } })
                    case "com.apple.UIKit.activity.Message": return ({ appName: "SMS", color: colorsPalette.smsColor, icon: { type: "AntDesign", name: "message1" } })
                    case "com.skype.skype.sharingextension": return ({ appName: "Skype", color: colorsPalette.spColor, icon: { type: "AntDesign", name: "skype" } })
                    default: break;
                }
            })
        } else if (typeof (value) === 'string') {
            switch (value) {
                case "ph.telegra.Telegraph.Share": return "Telegram"
                case "net.whatsapp.WhatsApp.ShareExtension": return "WhatsApp"
                case "com.google.hangouts.ShareExtension": return "Hangouts"
                case "com.atebits.Tweetie2.ShareExtension": return "Twitter"
                case "com.apple.UIKit.activity.PostToFacebook": return "Facebook"
                case "com.facebook.Messenger.ShareExtension": return "Messenger"
                case "com.tinyspeck.chatlyio.share": return "Slack"
                case "com.google.Gmail.ShareExtension": return "Gmail"
                case "com.apple.UIKit.activity.Message": return "SMS"
                case "com.skype.skype.sharingextension": return "Skype"
                default: break;
            }
        }
    }

    componentDidMount() {
        /*
            Se obtienen los días de la semana entre el intervalo de la fecha inicial
            y la fecha final del concurso (Contador).
        */
        const { item } = this.props
        const result = _(item.shareParticipants.items.map(item => ({
            avatar: item.avatar,
            createdAt: item.createdAt,
            id: item.id,
            name: item.name,
            whereItHasBeenShared: this._applicationInWhichTheContestHasBeenShared(item.whereItHasBeenShared),
            idUserSharing: item.idUserSharing
        }))).groupBy('idUserSharing').values().map(
            (group) => ({ ...group[0], repeat: group.length, group })
        );
        const dataUsers = JSON.parse(JSON.stringify(result)).map(item => ({ name: item.name, whereItHasBeenShared: item.group, createdAt: item.createdAt, id: item.id, idUserSharing: item.idUserSharing, avatar: item.avatar }))

        const shareSN = item.shareParticipants.items.map(item => item.whereItHasBeenShared)
        const dataGraph = _(this._applicationInWhichTheContestHasBeenShared(flatten(flatten(shareSN))).map(item => ({ label: item.appName, color: item.color, icon: item.icon })))
            .groupBy('label').values().map((group) => ({ ...group[0], value: group.length }));

        this.setState({ dataGraph: JSON.parse(JSON.stringify(dataGraph)), dataUsers })
    }

    render() {
        const userData = this.props.navigation.getParam('userData')
        const { dataUsers, dataGraph } = this.state
        const { item } = this.props

        return (
            <Container>
                <Grid>
                    <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Total shared: {item.shareParticipants.items && item.shareParticipants.items.length}</Text>
                    </Row>
                    <Row size={40} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ height: "100%" }}>
                            <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                                <PureChart data={dataGraph} type='pie' />
                                <Button transparent style={{ width: "100%", height: "120%", position: 'absolute', alignSelf: 'center' }} />
                            </View>
                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row', width: "100%" }}>
                                <ScrollView horizontal contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', width: "100%" }}>
                                    {dataGraph
                                        .sort((a, b) => { return b.value - a.value })
                                        .map((item, key) =>
                                            <Button iconLeft small transparent key={key} disabled>
                                                <Icon name={item.icon.name} type={item.icon.type} style={{ color: item.color }} />
                                                <Text allowFontScaling={false} style={{ left: -10, color: item.color }}>{item.value}</Text>
                                            </Button>)}
                                </ScrollView>
                            </View>
                        </View>
                    </Row>
                    <Row size={50} style={{ flexDirection: 'column' }}>
                        <FlatList
                            data={dataUsers}
                            renderItem={({ item }) => (
                                <ListItem avatar underlayColor={colorsPalette.secondaryColor}>
                                    <Left>
                                        {item.avatar !== null
                                            ? <Thumbnail small source={{ uri: item.avatar }} />
                                            : <UserAvatar size="35" name={item.name} />}
                                    </Left>
                                    <Body>
                                        <Text allowFontScaling={false}>{userData.id === item.idUserSharing ? "You" : item.name} <Text style={{ fontSize: wp(3), color: colorsPalette.gradientGray }}>Last was {lowerCase(moment(item.whereItHasBeenShared.slice(-1)[0].createdAt).calendar())}</Text></Text>
                                        <ReadMore numberOfLines={3}>
                                            <Text note allowFontScaling={false} style={{ fontWeight: 'normal' }}>
                                                Shared in {[...new Set((item.whereItHasBeenShared).map(item => item.whereItHasBeenShared[0].appName))].join(', ')}.
                                            </Text>
                                        </ReadMore>
                                    </Body>
                                </ListItem>
                            )}
                            keyExtractor={items => items.createdAt} />
                    </Row>
                </Grid>
            </Container>
        );
    }
}

export default withNavigation(Likes)
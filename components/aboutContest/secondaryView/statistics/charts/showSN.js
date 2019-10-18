import React, { Component } from 'react';
import { Button, Icon, Text, View } from 'native-base';
import PureChart from 'react-native-pure-chart';
import flatten from 'lodash/flatten'
import _ from 'lodash'
import { colorsPalette } from '../../../../global/static/colors'
import { ScrollView } from 'react-native-gesture-handler';

export default class ShowLCVSimpact extends Component {

    state = {
        data: [
            {
                value: 0,
                label: 'Comments',
                icon: { name: "comment", type: "MaterialCommunityIcons" }
            }, {
                value: 0,
                label: 'Views',
                icon: { name: 'eye', type: "Ionicons" }
            }, {
                value: 0,
                label: 'Share',
                icon: { name: 'share-square-o', type: "FontAwesome" }
            }, {
                value: 0,
                label: 'Like',
                icon: { name: "heart", type: "Ionicons" }
            }
        ]
    }

    componentDidMount() {
        const { participants } = this.props
        const shareSN = participants.map(item => item.shareParticipants.items.map(item => item.whereItHasBeenShared))
        const data = _(this._applicationInWhichTheContestHasBeenShared(flatten(flatten(shareSN))).map(item => ({ label: item.appName, color: item.color, icon: item.icon })))
            .groupBy('label').values().map((group) => ({ ...group[0], value: group.length }));
        this.setState({ data })
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

    render() {
        const { data } = this.state
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                <View style={{ flex: 0.7 }}>
                    <PureChart data={JSON.parse(JSON.stringify(data))} type='pie' />
                    <Button transparent style={{ width: "100%", height: "120%", position:'absolute', alignSelf:'center' }} />
                </View>
                <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row', width: "100%" }}>
                    <ScrollView horizontal>
                        {JSON.parse(JSON.stringify(data))
                            .sort((a, b) => { return b.value - a.value })
                            .map((item, key) =>
                                <Button iconLeft small transparent key={key} disabled>
                                    <Icon name={item.icon.name} type={item.icon.type} style={{ color: item.color }} />
                                    <Text allowFontScaling={false} style={{ left: -10, color: item.color }}>{item.value}</Text>
                                </Button>)}
                    </ScrollView>
                </View>
            </View>
        );
    }
}
import React, { Component } from 'react';
import { Button, Icon, Text, View } from 'native-base';
import PureChart from 'react-native-pure-chart';
import flatten from 'lodash/flatten'

const colors = [
    '#E91E63',
    "#ee5488",
    "#f277a1",
    "#f9bfd2"
]

export default class ShowLCVSimpact extends Component {

    state = {
        data: [
            {
                value: 10,
                label: 'Loading',
                color: '#FFF',
                icon: { name: 'share-square-o', type: "FontAwesome" }
            }
        ]
    }

    componentDidMount() {
        const { participants } = this.props
        const likes = participants.map(item => item.likesToParticipants.items)
        const comments = participants.map(item => item.commentsToParticipants.items)
        const share = participants.map(item => item.shareParticipants.items)
        const views = participants.map(item => item.viewsParticipants.items)
        let data = [
            {
                value: flatten(comments).length,
                label: 'Comments',
                icon: { name: "comment", type: "MaterialCommunityIcons" },

            }, {
                value: flatten(views).length,
                label: 'Views',
                icon: { name: 'eye', type: "Ionicons" },

            }, {
                value: flatten(share).length,
                label: 'Share',
                icon: { name: 'share-square-o', type: "FontAwesome" },
            }, {
                value: flatten(likes).length,
                label: 'Like',
                icon: { name: "heart", type: "Ionicons" }
            }
        ]
            .sort((a, b) => { return b.value - a.value })
            .map((item, key) => (Object.assign(item, { color: colors[key] })))
        this.setState({ data })
    }

    render() {
        const { data } = this.state
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                <View style={{ flex: 0.7 }}>
                    <PureChart data={data.map(items => ({ color: items.color, label: items.label, value: items.value }))} type='pie' height={160} />
                </View>
                <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row', width: "100%" }}>
                    {data.map((item, key) =>
                        <Button iconLeft small transparent key={key} disabled>
                            <Icon name={item.icon.name} type={item.icon.type} style={{ color: item.color }} />
                            <Text allowFontScaling={false} style={{ left: -10, color: item.color }}>{item.value}</Text>
                        </Button>)}
                </View>
            </View>
        );
    }
}
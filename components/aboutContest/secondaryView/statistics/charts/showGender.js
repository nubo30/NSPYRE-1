import React, { Component } from 'react';
import { Button, Icon, Text, View } from 'native-base';
import PureChart from 'react-native-pure-chart';
import _ from 'lodash'

const colors = ['#E91E63', "#f277a1"]

export default class ShowGender extends Component {

    state = {
        data: [
            {
                value: 0,
                label: 'Female',
                icon: { name: "female", type: "FontAwesome" }
            }, {
                value: 0,
                label: 'Male',
                icon: { name: 'male', type: "FontAwesome" }
            }

        ]
    }

    componentDidMount() {
        const { participants } = this.props
        const gender = participants.map(item => item.engageData && JSON.parse(item.engageData).aboutThePersonality.gender)
        const buildData = _(gender)
            .map((item, key) => ({ color: colors[key], label: item === null ? 'Female' : item, icon: item === "Male" ? { name: 'male', type: "FontAwesome" } : { name: "female", type: "FontAwesome" } }))
            .groupBy('label').values().map((group) => ({ ...group[0], value: group.length }));
        const data = JSON.parse(JSON.stringify(buildData))
        this.setState({ data })
    }

    render() {
        const { data } = this.state
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                <View style={{ flex: 0.7 }}>
                    <PureChart data={data} type='pie' height={160} />
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
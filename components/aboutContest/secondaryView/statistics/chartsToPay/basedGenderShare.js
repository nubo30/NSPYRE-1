import React, { Component } from 'react';
import { Button, Icon, Text, View } from 'native-base';
import PureChart from 'react-native-pure-chart';
import _ from 'lodash'
import flatten from 'lodash/flatten'
import lowerCase from 'lodash/lowerCase'

const activeColors = { one: '#E91E63', two: "#f277a1" }
const disableColors = { one: '#9E9E9E', two: "#E0E0E0" }
const icons = { icon: { male: 'male', female: 'female' }, type: "FontAwesome" }

export default class BassedAgeShare extends Component {

    state = {
        dataReal: [
            {
                value: 20,
                label: 'Female',
                color: disableColors.two
            }, {
                value: 80,
                label: 'Male',
                color: disableColors.one
            }

        ],
        dataFake: [
            {
                value: 20,
                label: 'Female',
                color: disableColors.two
            }, {
                value: 80,
                label: 'Male',
                color: disableColors.one
            }

        ]
    }

    componentDidMount() {
        const { participants } = this.props
        const gender = participants.map(item => item.shareParticipants.items.map(item => JSON.parse(item.engageData) && JSON.parse(item.engageData).aboutThePersonality.gender))
        const buildData = _(flatten(gender))
            .map(item => ({ label: item === null ? 'Female' : item, color: item === 'Male' ? activeColors.one : activeColors.two }))
            .groupBy('label').values().map((group) => ({ ...group[0], value: group.length }));
        this.setState({ dataReal: JSON.parse(JSON.stringify(buildData)) })
    }

    componentWillReceiveProps(nextProps) {
        const { action, showSharesAfterToPay } = nextProps
        this.setState({
            dataFake: [
                {
                    value: 67,
                    label: 'Female',
                    color: showSharesAfterToPay || action ? activeColors.two : disableColors.two
                }, {
                    value: 80,
                    label: 'Male',
                    color: showSharesAfterToPay || action ? activeColors.one : disableColors.one
                }

            ]
        })
    }

    render() {
        const { dataFake, dataReal } = this.state
        const { action, showSharesAfterToPay } = this.props
        return (
            showSharesAfterToPay
                ? <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                    <View style={{ flex: 0.7 }}>
                        <PureChart data={dataReal} type='pie' height={160} />
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row', width: "100%" }}>
                        {dataReal.map((item, key) =>
                            <Button key={key} iconLeft small transparent disabled>
                                <Icon name={lowerCase(item.label)} type="FontAwesome" style={{ color: item.color }} />
                                <Text allowFontScaling={false} style={{ left: -10, color: item.color }}>{item.value}</Text>
                            </Button>)}
                    </View>
                </View>
                : <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                    <View style={{ flex: 0.7 }}>
                        <PureChart data={dataFake} type='pie' height={160} />
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row', width: "100%" }}>
                        <Button iconLeft small transparent disabled>
                            <Icon name={icons.icon.male} type={icons.type} style={{ color: showSharesAfterToPay || action ? activeColors.one : disableColors.one }} />
                            <Text allowFontScaling={false} style={{ left: -10, color: showSharesAfterToPay || action ? activeColors.one : disableColors.one }}>67</Text>
                        </Button>
                        <Button iconLeft small transparent disabled>
                            <Icon name={icons.icon.female} type={icons.type} style={{ color: showSharesAfterToPay || action ? activeColors.two : disableColors.two }} />
                            <Text allowFontScaling={false} style={{ left: -10, color: showSharesAfterToPay || action ? activeColors.two : disableColors.two }}>80</Text>
                        </Button>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%", position: 'absolute', width: "100%" }} />
                </View>
        );
    }
}
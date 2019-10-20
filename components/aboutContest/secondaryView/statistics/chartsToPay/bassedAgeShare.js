import React, { Component } from 'react';
import { View } from 'native-base';
import PureChart from 'react-native-pure-chart';
import _ from 'lodash'
import flatten from 'lodash/flatten'
import { colorsPalette } from '../../../../global/static/colors'

export default class BasedAgeShare extends Component {
    state = {
        dataReal: [{
            seriesName: 'ageRange',
            color: "#9E9E9E",
            data: [
                { x: "13-17", y: 19 },
                { x: "18-24", y: 87 },
                { x: "25-34", y: 32 },
                { x: "35-44", y: 55 },
                { x: "45-54", y: 8 },
                { x: "55-64", y: 12 },
                { x: "65+", y: 6 },
            ]
        }],
        dataFake: [{
            seriesName: 'ageRange',
            color: "#9E9E9E",
            data: [
                { x: "13-17", y: 19 },
                { x: "18-24", y: 87 },
                { x: "25-34", y: 32 },
                { x: "35-44", y: 55 },
                { x: "45-54", y: 8 },
                { x: "55-64", y: 12 },
                { x: "65+", y: 6 },
            ]
        }]
    }

    componentDidMount() {
        const { participants } = this.props
        const age = participants.map(item => item.shareParticipants.items.map(item => JSON.parse(item.engageData) && (new Date().getFullYear() - new Date(JSON.parse(item.engageData).aboutThePersonality.birthDate).getFullYear())))
        const getRange = flatten(age).map(item => item >= 13 && item <= 17 ? "13-17" : item >= 18 && item <= 24 ? "18-24" : item >= 25 && item <= 34 ? "25-34" : item >= 35 && item <= 44 ? "35-44" : item >= 45 && item <= 54 ? "45-54" : item >= 55 && item <= 64 ? "55-64" : item >= 65 && "65+")
        const buildData = _(flatten(getRange))
            .map(item => ({ x: item === false ? 'Not specified' : item }))
            .groupBy('x')
            .values()
            .map((group) => ({ ...group[0], y: group.length }));
        this.setState({
            dataReal: [{
                seriesName: 'ageRange',
                color: colorsPalette.primaryColor,
                data: JSON.parse(JSON.stringify(buildData))
            }]
        })
    }

    componentWillReceiveProps(nextProps) {
        const { action } = nextProps
        this.setState({
            dataFake: [{
                seriesName: 'series1',
                color: action ? colorsPalette.primaryColor : "#9E9E9E",
                data: [
                    { x: "13-17", y: 19 },
                    { x: "18-24", y: 87 },
                    { x: "25-34", y: 32 },
                    { x: "35-44", y: 55 },
                    { x: "45-54", y: 8 },
                    { x: "55-64", y: 12 },
                    { x: "65+", y: 6 },
                ]
            }]
        })
    }

    render() {
        const { dataFake, dataReal } = this.state
        const { showSharesAfterToPay } = this.props
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%", left: 15 }}>
                <PureChart data={showSharesAfterToPay ? dataReal : dataFake} type="bar" height={150} />
                {!showSharesAfterToPay && <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%", position: 'absolute', width: "100%" }} />}
            </View>
        );
    }
}
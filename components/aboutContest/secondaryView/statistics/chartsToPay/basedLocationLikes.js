import React, { Component } from 'react';
import { View } from 'native-base';
import PureChart from 'react-native-pure-chart';
import _ from 'lodash'
import flatten from 'lodash/flatten'
import { colorsPalette } from '../../../../global/static/colors'

export default class BasedLocationLikes extends Component {
    state = {
        dataFake: [{
            seriesName: 'topLocation',
            color: "#9E9E9E",
            data: [
                { x: "Tokio", y: 20 },
                { x: "Brazil", y: 64 },
                { x: "Alemania", y: 42 },
                { x: "Suiza", y: 82 },
                { x: "Inglatera", y: 27 },
                { x: "Argentina", y: 30 },
                { x: "Mexico", y: 46 },
            ]
        }],
        dataReal: [{
            seriesName: 'topLocation',
            color: "#9E9E9E",
            data: [
                { x: "Tokio", y: 20 },
                { x: "Brazil", y: 64 },
                { x: "Alemania", y: 42 },
                { x: "Suiza", y: 82 },
                { x: "Inglatera", y: 27 },
                { x: "Argentina", y: 30 },
                { x: "Mexico", y: 46 },
            ]
        }]
    }

    componentWillReceiveProps(nextProps) {
        const { action } = nextProps
        this.setState({
            dataFake: [{
                seriesName: 'series1',
                color: action ? colorsPalette.primaryColor : "#9E9E9E",
                data: [
                    { x: "Tokio", y: 20 },
                    { x: "Brazil", y: 64 },
                    { x: "Alemania", y: 42 },
                    { x: "Suiza", y: 82 },
                    { x: "Inglatera", y: 27 },
                    { x: "Argentina", y: 30 },
                    { x: "Mexico", y: 46 },
                ]
            }]
        })
    }

    componentDidMount() {
        const { participants } = this.props
        const topLocation = participants.map(item => item.likesToParticipants.items.map(item => JSON.parse(item.engageData) && JSON.parse(item.engageData).aboutThePersonality.location.country))
        const buildData = _(flatten(topLocation))
            .map(item => ({ x: item === null ? "Not specified" : item }))
            .groupBy('x').values().map((group) => ({ ...group[0], y: group.length }));
        this.setState({ dataReal: [{ seriesName: 'topLocation', color: colorsPalette.primaryColor, data: JSON.parse(JSON.stringify(buildData)) }] })
    }

    render() {
        const { dataFake, dataReal } = this.state
        const { showLikesAfterToPay } = this.props
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%", left: 15 }}>
                <PureChart data={showLikesAfterToPay ? dataReal : dataFake} type="bar" height={150} />
                {!showLikesAfterToPay && <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%", position: 'absolute', width: "100%" }} />}
            </View>
        )
    }
}
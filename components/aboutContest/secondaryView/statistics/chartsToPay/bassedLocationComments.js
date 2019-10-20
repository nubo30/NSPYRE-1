import React, { Component } from 'react';
import { View } from 'native-base';
import PureChart from 'react-native-pure-chart';
import _ from 'lodash'
import flatten from 'lodash/flatten'
import { colorsPalette } from '../../../../global/static/colors'

export default class BasedLocationShare extends Component {
    state = {
        dataFake:[{
            seriesName: 'topLocation',
            color: "#9E9E9E",
            data: [
                { x: "United States", y: 69 },
                { x: "Indonesia", y: 6 },
                { x: "Italia", y: 21 },
                { x: "España", y: 69 },
                { x: "República Dominicana", y: 13 },
                { x: "Puerto Rico", y: 34 },
                { x: "Alemania", y: 54 },
            ]
        }],
        dataReal: [{
            seriesName: 'topLocation',
            color: "#9E9E9E",
            data: [
                { x: "United States", y: 69 },
                { x: "Indonesia", y: 6 },
                { x: "Italia", y: 21 },
                { x: "España", y: 69 },
                { x: "República Dominicana", y: 13 },
                { x: "Puerto Rico", y: 34 },
                { x: "Alemania", y: 54 },
            ]
        }]
    }

    componentDidMount() {
        const { participants } = this.props
        const topLocation = participants.map(item => item.commentsToParticipants.items.map(item => JSON.parse(item.engageData) && JSON.parse(item.engageData).aboutThePersonality.location.country))
        const buildData = _(flatten(topLocation))
            .map(item => ({ x: item === null ? "Not specified" : item }))
            .groupBy('x').values().map((group) => ({ ...group[0], y: group.length }));
        this.setState({ dataReal: [{ seriesName: 'topLocation', color: colorsPalette.primaryColor, data: JSON.parse(JSON.stringify(buildData)) }] })
    }


    componentWillReceiveProps(nextProps) {
        const { action } = nextProps
        this.setState({
            dataFake: [{
                seriesName: 'topLocation',
                color: action ? colorsPalette.primaryColor : "#9E9E9E",
                data: [
                    { x: "United States", y: 69 },
                    { x: "Indonesia", y: 6 },
                    { x: "Italia", y: 21 },
                    { x: "España", y: 69 },
                    { x: "República Dominicana", y: 13 },
                    { x: "Puerto Rico", y: 34 },
                    { x: "Alemania", y: 54 },
                ]
            }]
        })
    }

    render() {
        const { dataFake, dataReal } = this.state
        const { showCommentsAfterToPay } = this.props
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%", left: 15 }}>
                <PureChart data={showCommentsAfterToPay ? dataReal : dataFake} type="bar" height={150} />
                {!showCommentsAfterToPay && <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%", position: 'absolute', width: "100%" }} />}
            </View>
        );
    }
}
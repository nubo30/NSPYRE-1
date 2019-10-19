import React, { Component } from 'react';
import { View } from 'native-base';
import PureChart from 'react-native-pure-chart';
import _ from 'lodash'
import { colorsPalette } from '../../../../global/static/colors'

export default class ShowLCVSimpact extends Component {
    state = { data: [{ seriesName: 'series1', color: colorsPalette.primaryColor, data: [{ x: "0", y: 0 }] }] }

    componentDidMount() {
        const { participants } = this.props
        const countries = participants.map(item => item.engageData && JSON.parse(item.engageData).aboutThePersonality.location.country)
        const buildData = _(countries).map(item => ({ x: item === null ? 'Not specified' : item })).groupBy('x').values().map((group) => ({ ...group[0], y: group.length }));
        let data = [{ seriesName: 'series1', color: colorsPalette.primaryColor, data: JSON.parse(JSON.stringify(buildData)) }]
        this.setState({ data })
    }

    render() {
        const { data } = this.state
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%", left: 15 }}>
                <PureChart data={data} type="bar" height={150} />
            </View>
        );
    }
}
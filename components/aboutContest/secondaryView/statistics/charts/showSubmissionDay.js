import React, { Component } from 'react';
import { View } from 'native-base';
import PureChart from 'react-native-pure-chart';
import _ from 'lodash'
import { colorsPalette } from '../../../../global/static/colors'
import moment from 'moment'

export default class ShowSubmissionDay extends Component {
    state = { color: colorsPalette.primaryColor, data: [{ x: '0', y: 0 }] }

    componentDidMount() {
        const { participants } = this.props
        const date = participants.map(item => ({ date: moment(item.createdAt).format('l') }))
        const data = _(date).map(item => ({ x: item.date })).groupBy('x').values().map((group) => ({ ...group[0], y: group.length }));
        let sampleData = [{ color: colorsPalette.primaryColor, data: JSON.parse(JSON.stringify(data)) }]
        this.setState({ data: sampleData })
    }

    render() {
        const { data } = this.state
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%", left: 15 }}>
                <PureChart data={data} type="line" height={150} />
            </View>
        );
    }
}
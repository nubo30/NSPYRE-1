import React, { Component } from 'react';
import { Dimensions, ScrollView } from 'react-native'
import { View } from 'native-base';
import _ from 'lodash'
import { BarChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('screen').width


export default class ChartLineChart extends Component {
    state = { heightView: 0, data: [] }

    render() {
        const { heightView } = this.state
        const { contest } = this.props
        const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        let startDay = new Date(new Date(contest.timer.start).getFullYear(), new Date(contest.timer.start).getMonth(), new Date(contest.timer.start).getDate());
        let endDay = new Date(new Date(contest.timer.end).getFullYear(), new Date(contest.timer.end).getMonth(), new Date(contest.timer.end).getDate());
        let weekdays = [] // Días de la semana
        let arrayNumberdays = []
        while (startDay <= endDay) {
            weekdays.push(DAYS[startDay.getDay()])
            startDay = new Date(startDay.getTime() + (24 * 60 * 60 * 1000)); // Días en formato date
            arrayNumberdays.push(startDay.getDate()); // Días en formato date        
        }
        console.log(weekdays)


        const data = {
            labels: weekdays,
            datasets: [
                {
                    data: [20, 45, 28]
                }
            ]
        };
        return (
            <View
                style={{ alignItems: 'center', justifyContent: 'center', right: 10, flex: 1 }}
                onLayout={(event) => { this.setState({ heightView: { height } = event.nativeEvent.layout }) }}>
                <View style={{ backgroundColor: '#FFF', height: '100%', width: 35, position: 'absolute', zIndex: 1000, left: 0 }} />
                <ScrollView horizontal>
                    {heightView.height ?
                        <BarChart
                            withVerticalLabels={true}
                            withHorizontalLabels={false}
                            data={data}
                            width={screenWidth + (data.datasets[0].data.length > 6 ? (data.datasets[0].data.length * 25) : 0)}
                            height={heightView.height}
                            chartConfig={{
                                decimalPlaces: 0, // optional, defaults to 2dp
                                backgroundGradientFrom: '#FFF',
                                backgroundGradientTo: '#FFF',
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientToOpacity: 0,
                                color: (opacity = 1) => `rgba(216, 43, 96, ${opacity})`,// rgb(216,43,96)
                                strokeWidth: 0 // optional, default 3
                            }} /> : null}
                </ScrollView>
            </View>
        );
    }
}
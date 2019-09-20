import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Text, View } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'
import { LineChart } from 'react-native-chart-kit'

import { colorsPalette } from '../../../../global/static/colors'


const screenWidth = Dimensions.get('screen').width

const chartConfig = {
    backgroundGradientFrom: colorsPalette.secondaryColor,
    backgroundGradientTo: colorsPalette.secondaryColor,
    color: () => colorsPalette.primaryColor,
    strokeWidth: 1 // optional, default 3
}

export default class ChartLineChart extends Component {
    state = { heightView: 0, weekdays: [], arrayDataLenght: [] }

    // componentDidMount() {

    // }

    render() {
        const { heightView } = this.state
        const { contest } = this.props
        /*
        
            Se obtienen los días de la semana entre el intervalo de la fecha inicial
            y la fecha final del concurso (Contador).

        */

        const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let startDay = new Date(new Date(contest.timer.start).getFullYear(), new Date(contest.timer.start).getMonth(), new Date(contest.timer.start).getDate());
        let endDay = new Date(new Date(contest.timer.end).getFullYear(), new Date(contest.timer.end).getMonth(), new Date(contest.timer.end).getDate());
        let weekdays = [] // Días de la semana
        let arrayNumberdays = []
        while (startDay <= endDay) {
            weekdays.push(DAYS[startDay.getDay()])
            startDay = new Date(startDay.getTime() + (24 * 60 * 60 * 1000)); // Días en formato date
            arrayNumberdays.push(startDay.getDate() - 1); // Días en formato date        
        }

        const map = contest.statistics.userLikes
            .map(item => new Date(item.createdAt).getDate())
            .map(item => item)
            .reduce((prev, cur) => { prev[cur] = (prev[cur] || 0) + 1; return prev; }, {});
        const check = Object.entries(map).map((e) => ({ [e[0]]: e[1] }));
        const list = arrayNumberdays.map((item) => ({ [item]: 0 }))
        const updateList = check.reduce((acc, val) => {
            const key = Object.keys(val)[0];
            if (!acc[key]) acc[key] = 0
            acc[key] = acc[key] + val[key]
            return acc
        }, {})

        const dataToConvertToArrayOfString = list.map((val) => {
            var key = Object.keys(val)[0];
            return { [key]: val[key] + (updateList[key] || 0) }
        })
        const dataShowInTheGraph = dataToConvertToArrayOfString.map(item => (Object.values(item)[0]))

        const data = {
            labels: weekdays,
            datasets: [{
                data: dataShowInTheGraph,
                color: (opacity = 1) => `rgba(233,30,99, ${opacity})`, // optional
                strokeWidth: 1.5, // optional
                decimalPlaces: -1,
            }]
        }


        return (
            <View
                onLayout={(event) => { this.setState({ heightView: { height } = event.nativeEvent.layout }) }}
                style={{ justifyContent: 'center', alignItems: 'center', height: "100%", right: 10 }}>
                {heightView.height
                    ? <LineChart
                        data={data}
                        width={screenWidth - 10}
                        height={heightView.height - 40}
                        chartConfig={chartConfig}
                        bezier
                        withDots={true}
                        withVerticalLabels={false}
                        withHorizontalLabels={false}
                        fromZero={true}
                    /> : null}

                <Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.primaryColor }}>Total Likes: {contest.statistics.userLikes.length}</Text>
            </View>
        );
    }
}
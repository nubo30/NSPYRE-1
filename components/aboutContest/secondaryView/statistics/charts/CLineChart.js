import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Text, View } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'
import { LineChart } from 'react-native-chart-kit'
import moment from 'moment'

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
        let arrayDataLenght = [] // Indica la longitud del array que se usará en la propiedad de <data> 
        let arrayNumberdays = []
        while (startDay <= endDay) {
            weekdays.push(DAYS[startDay.getDay()])
            arrayDataLenght.push(0)
            startDay = new Date(startDay.getTime() + (24 * 60 * 60 * 1000)); // Días en formato date
            arrayNumberdays.push(startDay.getDate() - 1); // Días en formato date        
        }

        // Fakedate
        const fakeData = [
            {
                "createdAt": "2019-09-19T22:51:00.386Z",
                "name": "Yank",
            },
            {
                "createdAt": "2019-09-19T22:51:00.386Z",
                "name": "Yank",
            },
            {
                "createdAt": "2019-09-20T22:51:00.386Z",
                "name": "Yank",
            },
            {
                "createdAt": "2019-09-23T22:51:00.386Z",
                "name": "Yank",
            }
        ]

        const map = fakeData
            .map(item => new Date(item.createdAt).getDate())
            .map(item => item)
            .reduce((prev, cur) => { prev[cur] = (prev[cur] || 0) + 1; return prev; }, {});
        const arrayOfObj = Object.entries(map).map((e) => ({ [e[0]]: e[1] }));
        const newArrayWithValueCero = arrayNumberdays.map((item) => ({ [item]: 0 }))

        newArrayWithValueCero.map((items, key) => {
            const keysOfItems = Object.keys(items)[0] // 1,2,3,4,5,6,7...
            const keysOfArrayOfObj = Object.keys(arrayOfObj[key] === undefined ? { "-": "0" } : arrayOfObj[key])[0] // 1,2,3, ------....

            return keysOfItems === keysOfArrayOfObj
                ? { [Object.keys(items)[0]]: Object.values(arrayOfObj[key] === undefined ? { [[Object.keys(items)[0]][0]]: "0" } : arrayOfObj[key])[0] }
                : items
        })

        // console.log(newArrayWithValueCero, "Array original")
        // console.log(arrayOfObj, "Array que se usará para reemplazar lso datos del array original")

        const data = {
            labels: weekdays,
            datasets: [{
                data: arrayDataLenght,
                color: (opacity = 1) => `rgba(233,30,99, ${opacity})`, // optional
                strokeWidth: 1 // optional
            }]
        }


        return (
            <View
                onLayout={(event) => { this.setState({ heightView: { height } = event.nativeEvent.layout }) }}
                style={{ justifyContent: 'center', alignItems: 'center', right: 10, height: "100%" }}>
                {heightView.height
                    ? <LineChart
                        data={data}
                        width={screenWidth - 10}
                        height={heightView.height - 40}
                        chartConfig={chartConfig}
                        bezier
                    /> : null}

                <Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.primaryColor }}>Total Likes: 2000</Text>
            </View>
        );
    }
}
import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { View, Text } from 'native-base';
import _ from 'lodash'
import { BarChart } from 'react-native-chart-kit'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

const screenWidth = Dimensions.get('screen').width

export default class ProgressByUser extends Component {
    state = { heightView: 0 }

    render() {
        const { heightView } = this.state
        const { userInfo } = this.props

        const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let weekdays = [] // Días de la semana
        let arrayNumberdays = []
        userInfo.dataVideo.map(item => {
            let daysViews = new Date(new Date(JSON.parse(item).createdAt).getFullYear(), new Date(JSON.parse(item).createdAt).getMonth(), new Date(JSON.parse(item).createdAt).getDate());
            while (daysViews <= new Date()) {
                weekdays.push(DAYS[daysViews.getDay()])
                daysViews = new Date(daysViews.getTime() + (24 * 60 * 60 * 1000)); // Días en formato date
                arrayNumberdays.push(daysViews.getDate() - 1); // Días en formato date        
            }
        })

        // Se determina la cantidad de views que el usuario ha hecho en algún determinado
        const map = userInfo.dataVideo
            .map(item => new Date(JSON.parse(item).createdAt).getDate())
            .map(item => item)
            .reduce((prev, cur) => { prev[cur] = (prev[cur] || 0) + 1; return prev; }, {});
        const check = Object.entries(map).map((e) => ({ [e[0]]: e[1] }));
        const list = [...new Set(arrayNumberdays)].map((item) => ({ [item]: 0 }))
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
            labels: [...new Set(weekdays)],
            datasets: [{
                data: dataShowInTheGraph
            }]
        }
        return (
            <View
                onLayout={(event) => { this.setState({ heightView: { height } = event.nativeEvent.layout }) }}
                style={{ flex: 1, right: 40 }}>
                <View style={{ height: '100%', position: 'absolute', backgroundColor: '#FFF', zIndex: 1000, left: 25, width: 18 }} />
                <Text allowFontScaling={false} style={{ alignSelf: 'center', fontSize: wp(4) }}>Days visited</Text>
                {heightView.height ?
                    <BarChart
                        data={data}
                        width={screenWidth}
                        height={heightView.height - 20}
                        chartConfig={{
                            decimalPlaces: 0, // optional, defaults to 2dp
                            backgroundGradientFrom: '#FFF',
                            backgroundGradientTo: '#FFF',
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientToOpacity: 0,
                            color: (opacity = 1) => `rgba(216, 43, 96, ${opacity})`,// rgb(216,43,96)
                            strokeWidth: 0 // optional, default 3
                        }}
                    /> : null}
            </View>
        );
    }
}
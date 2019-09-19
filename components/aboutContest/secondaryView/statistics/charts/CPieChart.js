import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { View, Text } from 'native-base';
import _ from 'lodash'
import { PieChart } from 'react-native-chart-kit'
import numeraljs from 'numeraljs'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'


export default class Charts extends Component {
    render() {
        const { sharedCount } = this.props
        const map = sharedCount
            .map(item => JSON.stringify(item))
            .reduce((prev, cur) => { prev[cur] = (prev[cur] || 0) + 1; return prev; }, {});
        const arrayOfObj = Object.entries(map).map((e) => ({ [e[0]]: e[1] }));
        const data = arrayOfObj.map(item => ({ name: `${JSON.parse(Object.keys(item)).appName}`, color: JSON.parse(Object.keys(item)).color, legendFontColor: '#7F7F7F', legendFontSize: 15, population: Object.values(item)[0] }))
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', flex: 0.8 }}>
                    <PieChart
                        data={data}
                        width={Dimensions.get('window').width - 50} // from react-native
                        height={190}
                        chartConfig={{
                            backgroundColor: '#FFF',
                            backgroundGradientFrom: '#FFF',
                            backgroundGradientTo: '#FFF',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: () => "#D82B60",
                        }}
                        accessor="population"
                        backgroundColor="transparent" />
                </View>
                <View style={{ width: '100%', flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {data.map((item, key) =>
                        <View key={key} style={{ justifyContent: 'center', alignItems: 'center', flexShrink: 1, padding: 5 }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(3.5), textAlign: 'center' }}>{numeraljs(item.population).format()}</Text>
                            <View style={{ width: 15, height: 15, borderRadius: "50%", backgroundColor: item.color }} />
                        </View>
                    )}
                </View>
                <Text allowFontScaling={false} style={{ color: '#7F7F7F', alignSelf: 'center', fontSize: wp(3.5) }}>Total {numeraljs(sharedCount.length).format()}</Text>
            </View>
        );
    }
}
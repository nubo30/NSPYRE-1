import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Text, View } from 'native-base';
import _ from 'lodash'
import { PieChart } from 'react-native-chart-kit'

export default class Charts extends Component {
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5, flexDirection: 'column' }}>
                <Text style={{ alignSelf: 'center', padding: 10, fontWeight: 'bold' }}>Shared On Social Networks</Text>
                <PieChart
                    data={[
                        { name: 'Faceook', population: 210, color: '#3b5998', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                        { name: 'Instagram', population: 28, color: '#8a3ab9', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                        { name: 'Twitter', population: 52, color: '#1DA1F2', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                        { name: 'SnapChat', population: 83, color: '#FFFC00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                    ]}
                    style={{
                        top: -10,
                        marginVertical: 8,
                        borderRadius: 16,
                        shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0 }, shadowOpacity: 1
                    }}
                    width={Dimensions.get('window').width - 40} // from react-native
                    height={220}
                    chartConfig={{
                        backgroundColor: '#FFF',
                        backgroundGradientFrom: '#FFF',
                        backgroundGradientTo: '#FFF',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => "#D82B60",
                        style: {
                            borderRadius: 16
                        }
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            </View>
        );
    }
}
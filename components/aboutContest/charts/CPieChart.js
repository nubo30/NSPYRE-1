import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Text, View } from 'native-base';
import _ from 'lodash'
import { PieChart } from 'react-native-chart-kit'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default class Charts extends Component {
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1 }}>
                <Text
                    minimumFontScale={wp(4)}
                    allowFontScaling={false}
                    style={{ alignSelf: 'center', fontWeight: 'bold', top: -20 }}>Shared on social networks</Text>
                <PieChart
                    data={[
                        { name: 'Faceook', population: 210, color: '#3b5998', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                        { name: 'Instagram', population: 28, color: '#8a3ab9', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                        { name: 'Twitter', population: 52, color: '#1DA1F2', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                        { name: 'SnapChat', population: 83, color: '#FFFC00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                    ]}
                    width={Dimensions.get('window').width - 50} // from react-native
                    height={190}
                    chartConfig={{
                        backgroundColor: '#FFF',
                        backgroundGradientFrom: '#FFF',
                        backgroundGradientTo: '#FFF',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => "#D82B60",
                    }}
                    accessor="population"
                    backgroundColor="transparent" />
            </View>
        );
    }
}
import React, { Component } from 'react';
import { Dimensions, ScrollView } from 'react-native'
import { Video } from 'expo-av';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, View } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { BarChart } from 'react-native-chart-kit'
import Swiper from 'react-native-swiper'

const screenWidth = Dimensions.get('screen').width

// Colors
import { colorsPalette } from '../../../../global/static/colors'

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43]
        }
    ]
};

export default class ViewsVideos extends Component {
    state = { heightView: false }

    render() {
        const { heightView } = this.state
        const { item } = this.props
        return (
            <Swiper
                activeDotColor={colorsPalette.primaryColor}
                dotColor={colorsPalette.gradientGray}
                ref={r => this.swiper = r}
                loop={false}>
                <Container>
                    <Grid>
                        <Row size={40}>
                            <Video
                                source={{ uri: item.video && item.video.url }}
                                useNativeControls={true}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay={false}
                                isLooping={false}
                                style={{ width: "100%", height: "100%", alignSelf: 'center' }} />
                        </Row>
                        <Row size={10} style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.gradientGray, top: 10, width: '95%', left: 10 }}>
                                Percentage of times a user has left or finished watching the video. The percentage indicates where the video has ended, the total duration of the video is 100%
                        </Text>
                        </Row>
                        <Row size={35}>
                            <View
                                style={{ alignItems: 'center', justifyContent: 'center', right: 10 }}
                                onLayout={(event) => { this.setState({ heightView: { height } = event.nativeEvent.layout }) }}>
                                <View style={{ backgroundColor: '#FFF', height: '100%', width: 35, position: 'absolute', zIndex: 1000, left: 0, top: 10 }} />
                                <ScrollView horizontal>
                                    {heightView.height ?
                                        <BarChart
                                            // horizontalLabelRotation={0}
                                            // verticalLabelRotation={10}
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
                        </Row>
                        <Row size={15} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={{ alignSelf: 'center', fontSize: wp(3.5), color: colorsPalette.darkFont, fontWeight: 'bold', top: -20 }}>Total viwes: 540 <Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.darkFont, fontWeight: 'normal' }}>(It is calculated by user).</Text></Text>
                        </Row>
                    </Grid>
                </Container>
                <View>
                    <Text>asdasdasdasd</Text>
                </View>
            </Swiper>
        );
    }
}
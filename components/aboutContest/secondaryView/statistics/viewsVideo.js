import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { Dimensions } from 'react-native'
import { Video } from 'expo-av';
import { Container, Header, Content, Text, Left, Button, Icon, View, Title } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import _ from 'lodash'
import { Grid, Row } from 'react-native-easy-grid'
import moment from 'moment'
import PureChart from 'react-native-pure-chart';

// Colors
import { colorsPalette } from '../../../global/static/colors'

const screenWidth = Dimensions.get('screen').width

class ViewsVideo extends Component {
    state = { data: [{ x: '0', y: 0 }] }
    componentDidMount() {
        const { contest } = this.props

        const dateAllViews = contest.viewsVideo.items.map(item => ({ date: moment(item.createdAt).format('l') }))
        const dataAllViews = _(dateAllViews).map(item => ({ x: item.date })).groupBy('x').values().map((group) => ({ ...group[0], y: group.length }));
        let sampleData = [{ color: colorsPalette.primaryColor, data: JSON.parse(JSON.stringify(dataAllViews)) }]
        this.setState({ data: sampleData })
    }
    render() {
        const { contest, _usersViewsVideoModal } = this.props
        return (
            <Container>
                <Header style={{ backgroundColor: colorsPalette.secondaryColor }}>
                    <View style={{ position: 'absolute', width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center', bottom: 0 }}>
                        <Title allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(4.5) }}>Views promotional video</Title>
                    </View>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button transparent onPress={() => _usersViewsVideoModal(false)}>
                            <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                            <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Close</Text>
                        </Button>
                    </Left>
                </Header>
                <Content contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
                    <Grid>
                        <Row size={40}>
                            <View style={{ backgroundColor: '#3333', height: "100%", width: "100%", position: 'absolute', alignSelf: 'center' }} />
                            <Video
                                ref={r => this.videoRef = r}
                                source={{ uri: contest.general.video.url }}
                                useNativeControls={true}
                                usePoster={true}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay={true}
                                isLooping={false}
                                style={{ width: "100%", height: "100%" }} />
                        </Row>
                        <Row size={5} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.darkFont, fontWeight: 'bold' }}>Views are listed by days</Text>
                        </Row>
                        <Row size={35}>
                            <View style={{ width: screenWidth }}>
                                <PureChart data={this.state.data} type="line" height={180} />
                            </View>
                        </Row>
                        <Row size={10} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={{ alignSelf: 'center', fontSize: wp(3.5), color: colorsPalette.darkFont, top: -20 }}>Total viwes: {contest.viewsVideo.items && contest.viewsVideo.items.length}.</Text>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default withNavigation(ViewsVideo)
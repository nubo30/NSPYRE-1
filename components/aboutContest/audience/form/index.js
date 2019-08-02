import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Container, Header, Content, Footer, Button, Text, Left, Icon, Title, Right, View } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import _ from 'lodash'

const barWidth = Dimensions.get('screen').width - 30;

// Child Components
import FormAudience from './formAudience'

export default class Audience extends Component {
    state = {
        progress: 0,
        valueSwiper: 0,
        sendDataToAWSAction: false,
        isValidDataForAWS: false
    }

    // Incrementar la barra
    increase = (value) => {
        this.setState({
            progress: this.state.progress + value
        });
    }

    _changedSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    _isValidDataForAWS = (value) => { this.setState({ isValidDataForAWS: value }) }

    render() {
        const {
            // Actions
            sendDataToAWSAction,
            valueSwiper,
            progress,
            isValidDataForAWS
        } = this.state
        const {
            // Data
            contest,

            // Functions
            _changeSwiperChild,
        } = this.props
        return (
            <Container>
                <Header style={{ width: "100%", height: 70, backgroundColor: '#FAFAFA', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                    <Left style={{ flexDirection: 'row' }}>
                        <Button transparent onPress={() => _changeSwiperChild(-1)}>
                            <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                            <Text style={{ left: 5, color: "#D81B60" }}>{'Start'}</Text>
                        </Button>
                        <Title style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp(6) }}>
                            Our Audience
                        </Title>
                    </Left>
                    <Right>
                        <Button
                            disabled={!isValidDataForAWS}
                            transparent
                            onPress={() => this.setState({ sendDataToAWSAction: !sendDataToAWSAction })}>
                            <Text style={{ left: 5, color: !isValidDataForAWS ? "#BDBDBD" : "#D81B60" }}>Create</Text>
                        </Button>
                    </Right>
                </Header>
                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                    {/* FORMULARIO AUDIENCE*/}
                    <FormAudience contest={contest} sendDataToAWSAction={sendDataToAWSAction} _isValidDataForAWS={this._isValidDataForAWS} />
                </Content>
                <Footer style={{ borderTopColor: 'rgba(0,0,0,0.0)', backgroundColor: '#FAFAFA', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "92%", top: -3 }}>
                        <Text style={{ textAlign: 'center', color: "#333", fontSize: wp(3.5), fontWeight: 'bold' }}>5,000mil</Text>
                        <Text style={{ textAlign: 'center', color: "#BDBDBD", fontSize: wp(3.5) }}>de 130.000.000</Text>
                    </View>
                    <ProgressBarAnimated
                        {...progressCustomStyles}
                        width={barWidth}
                        value={progress}
                        maxValue={100}
                        barEasing="linear"
                        height={20}
                        backgroundColorOnComplete={progress === 100 ? "#6CC644" : "#D81B60"} />
                </Footer>
            </Container>
        );
    }
}

const progressCustomStyles = {
    backgroundColor: '#D81B60'
};
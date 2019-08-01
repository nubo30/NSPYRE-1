import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Container, Header, Content, Footer, Button, Text, Left, Icon, Title, Right, View, Picker, Body, ListItem, List } from 'native-base';
import Swiper from 'react-native-swiper'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import _ from 'lodash'

const barWidth = Dimensions.get('screen').width - 30;

// Child Components
import FormAudience from './formAudience'
import FormThree from './formThree'

export default class Audience extends Component {
    state = {
        budget: 'NO_SELECT',
        progress: 0,
        valueSwiper: 0
    }

    // Budget
    onValueChangeBudget = (value: string) => { this.setState({ budget: value }) }

    // Incrementar la barra
    increase = (value) => {
        this.setState({
            progress: this.state.progress + value
        });
    }

    _changedSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    render() {
        const {
            // Forms
            budget,

            // Actions
            valueSwiper,
            progress,
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
                        <Button transparent onPress={() => valueSwiper ? this._changedSwiper(-1) : _changeSwiperChild(-1)}>
                            <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                            <Text style={{ left: 5, color: "#D81B60" }}>{valueSwiper ? 'Budget' : 'Start'}</Text>
                        </Button>
                        <Title style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp(6) }}>
                            Our Audience
                        </Title>
                    </Left>
                    <Right>
                        <Button disabled={!valueSwiper ? true : false} transparent onPress={() => console.log('Creando!')}>
                            <Text style={{ left: 5, color: "#D81B60" }}>{valueSwiper ? 'Create' : ''}</Text>
                        </Button>
                    </Right>
                </Header>
                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                    <Swiper
                        scrollEnabled={true}
                        onIndexChanged={(index) => this.setState({ valueSwiper: index })}
                        ref={(swiper) => this.swiper = swiper}
                        showsButtons={false}
                        showsPagination={false}
                        loop={false}>

                        {/* FORMULARIO AUDIENCE*/}
                        <FormAudience contest={contest} />

                        {/* FORMULARIO TRES */}
                        <FormThree contest={contest} />
                    </Swiper>
                </Content>
                <Footer style={{ borderTopColor: 'rgba(0,0,0,0.0)', backgroundColor: '#FAFAFA', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "92%", top: -3 }}>
                        <Text style={{ textAlign: 'center', color: "#333", fontSize: wp(3.5), fontWeight: 'bold' }}>{`${budget === "NO_SELECT" ? "" : _.replace(budget, "_", " - ") + ' selected'}`}</Text>
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
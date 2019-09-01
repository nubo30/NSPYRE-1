import React, { Component } from 'react';
import { Dimensions, Alert } from 'react-native'
import { Container, Header, Content, Footer, Button, Text, Left, Icon, Title, Right, View, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import _ from 'lodash'

const barWidth = Dimensions.get('screen').width - 30;

// Child Components
import FormAudience from './formAudience'

export default class Audience extends Component {
    state = {
        progress: 0,
        sendDataToAWSAction: false,
        isValidDataForAWS: false,
        isLoading: false,
        matchProfiles: { count: 0 },

        // Funcs
        searchMatches: false
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

    _isLoading = (value) => {
        this.setState({ isLoading: value })
    }

    componentWillUnmount() {
        this.props._setModalVisibleAudience(false)
    }

    _matchProfiles = (values) => {
        this.setState({ matchProfiles: values })
    }

    render() {
        const {
            // Data
            matchProfiles,

            // Actions
            sendDataToAWSAction,
            progress,
            isValidDataForAWS,
            isLoading,

            // Funcs
            searchMatches
        } = this.state
        const {
            // Data
            contest,
            audience,
            // Functions
            _changeSwiperChild,
            _setModalVisibleAudience,
            _modalVisibleAudienceSelect
        } = this.props
        return (
            <Container>
                <Header style={{ width: "100%", height: 70, backgroundColor: '#FAFAFA', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                    <Left style={{ flexDirection: 'row' }}>
                        <Button
                            disabled={isLoading}
                            transparent
                            onPress={() => _changeSwiperChild(-1)}>
                            <Icon name='arrow-back' style={{ color: isLoading ? "#BDBDBD" : "#D81B60" }} />
                            <Text allowFontScaling={false} style={{ left: 5, color: isLoading ? "#BDBDBD" : "#D81B60" }}>{Object.keys(audience).length !== 0 ? 'Close' : 'Start'}</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ alignSelf: "center", left: 15, color: isLoading ? "#BDBDBD" : "#D81B60", fontSize: wp(5) }}>
                            Our Audience
                        </Title>
                    </Left>
                    <Right>
                        <Button
                            disabled={!isValidDataForAWS || isLoading}
                            transparent
                            onPressIn={() => this._isLoading(true)}
                            onPress={() => this.setState({ sendDataToAWSAction: !sendDataToAWSAction })}>
                            {isLoading
                                ? <Spinner size="small" color="#BDBDBD" />
                                : <Text allowFontScaling={false} style={{ left: 5, color: !isValidDataForAWS ? "#BDBDBD" : "#D81B60" }}>{Object.keys(audience).length ? 'Update' : 'Create'}</Text>
                            }
                        </Button>
                    </Right>
                </Header>
                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                    {/* FORMULARIO AUDIENCE*/}
                    <FormAudience _matchProfiles={this._matchProfiles} searchMatches={searchMatches} audience={audience} contest={contest} sendDataToAWSAction={sendDataToAWSAction} isLoading={isLoading} _setModalVisibleAudience={_setModalVisibleAudience} _modalVisibleAudienceSelect={_modalVisibleAudienceSelect} _isLoading={this._isLoading} _isValidDataForAWS={this._isValidDataForAWS} />
                </Content>
                <Footer style={{ borderTopColor: 'rgba(0,0,0,0.0)', backgroundColor: '#FAFAFA', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', minHeight: 100, padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "92%" }}>
                        <Text allowFontScaling={false} style={{ textAlign: 'center', color: "#333", fontSize: wp(3.5), fontWeight: 'bold' }}>5,000mil</Text>
                        <Button small transparent style={{ top: -5 }} onPress={() => Alert.alert(
                            'How does it work?',
                            `Your preferences are filtered with Engage profiles, then you are shown the number of users that match those preferences.`,
                            [{ text: 'Ok', onPress: () => { } }],
                            { cancelable: false },
                        )}>
                            <Text allowFontScaling={false} style={{ textAlign: 'center', color: "#BDBDBD", fontSize: wp(3.5), left: 10 }}>Matches found, {matchProfiles.count}</Text>
                        </Button>
                    </View>
                    <View style={{ top: -10 }}>
                        <ProgressBarAnimated
                            {...progressCustomStyles}
                            width={barWidth}
                            value={progress}
                            maxValue={100}
                            barEasing="linear"
                            height={20}
                            backgroundColorOnComplete={progress === 100 ? "#6CC644" : "#D81B60"} />
                    </View>
                    <Button small style={{ alignSelf: 'center', top: -5, backgroundColor: '#D81B60' }} onPress={() => this.setState({ searchMatches: !searchMatches })}>
                        <Text>Search matches</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}

const progressCustomStyles = {
    backgroundColor: '#D81B60',
};
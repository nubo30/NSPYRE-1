import React, { Component } from 'react';
import { Dimensions, Alert } from 'react-native'
import { Container, Header, Content, Footer, Button, Text, Left, Icon, Title, Right, View, Spinner, Toast } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import _ from 'lodash'
import Axios from 'axios'

const barWidth = Dimensions.get('screen').width - 30;
import { colorsPalette } from '../../../global/static/colors'

// Child Components
import FormAudience from './formAudience'

export default class Audience extends Component {
    state = {
        progress: 0,
        sendDataToAWSAction: false,
        isLoading: false,
        matchProfiles: 0,
        totalUsers: 0,
        createAction: false,
        createAntoher: false,

        // Funcs
        searchMatches: false
    }

    componentDidMount() {
        Axios.get("https://search-influencemenowtest-pirbhpqtqvcumgt6ze4spjupba.us-east-1.es.amazonaws.com/engages/_search")
            .then(res => this.setState({ totalUsers: res.data.hits.total.value })).catch(err => console.log("Error", err))
    }

    // Incrementar la barra
    increase = (value) => {
        this.setState({ progress: value });
    }

    _changedSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    _isLoading = (value) => {
        this.setState({ isLoading: value })
    }

    componentWillUnmount() {
        this.props._setModalVisibleAudience(false)
    }

    _matchProfiles = (value) => {
        this.setState({ matchProfiles: value })
        this.increase(value)
        if (value === 0) {
            Toast.show({
                text: "Your search criteria is too narrow - please expand your search for best results!",
                type: "warning",
                buttonText: "OK",
                position: "top",
                duration: value === 0 ? 10000000 : 0
            })
        }
    }

    _createAntoher = (value) => {
        this.setState({ createAntoher: value })
    }

    _createAction = (value) => {
        this.setState({ createAction: value })
    }

    render() {
        const {
            // Data
            matchProfiles,
            totalUsers,

            // Actions
            sendDataToAWSAction,
            progress,
            isLoading,
            createAction,
            createAntoher,

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
                <Header style={{ width: "100%", height: 70, backgroundColor: '#FFF', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                    <View style={{ width: "100%", height: "100%", bottom: 0, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                        <Title allowFontScaling={false} style={{ alignSelf: "center", color: isLoading ? colorsPalette.gradientGray : colorsPalette.primaryColor, fontSize: wp(5) }}>
                            Our Audience
                        </Title>
                    </View>
                    <Left style={{ flexDirection: 'row' }}>
                        <Button
                            disabled={isLoading}
                            transparent
                            onPress={() => _changeSwiperChild(-1)}>
                            <Icon name='arrow-back' style={{ color: isLoading ? colorsPalette.gradientGray : colorsPalette.primaryColor }} />
                            <Text allowFontScaling={false} style={{ left: 5, color: isLoading ? colorsPalette.gradientGray : colorsPalette.primaryColor }}>{Object.keys(audience).length !== 0 ? 'Close' : 'Start'}</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button
                            disabled={!createAction || isLoading || progress === 0}
                            transparent
                            onPress={() => this.setState({ sendDataToAWSAction: !sendDataToAWSAction })}>
                            {isLoading
                                ? <Spinner size="small" color={colorsPalette.gradientGray} />
                                : <Text allowFontScaling={false} style={{ left: 5, color: !createAction || isLoading || progress === 0 ? colorsPalette.gradientGray : colorsPalette.primaryColor }}>{createAntoher ? 'Create an...' : 'Create'}</Text>
                            }
                        </Button>
                    </Right>
                </Header>
                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, backgroundColor: '#FFF' }}>
                    {/* FORMULARIO AUDIENCE*/}
                    <FormAudience _createAntoher={this._createAntoher} _matchProfiles={this._matchProfiles} searchMatches={searchMatches} audience={audience} contest={contest} sendDataToAWSAction={sendDataToAWSAction} isLoading={isLoading} _setModalVisibleAudience={_setModalVisibleAudience} _modalVisibleAudienceSelect={_modalVisibleAudienceSelect} _isLoading={this._isLoading} _createAction={this._createAction} />
                </Content>
                <Footer style={{ borderTopColor: 'rgba(0,0,0,0.0)', backgroundColor: '#FFF', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', minHeight: 100, padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "92%" }}>
                        <Text allowFontScaling={false} style={{ textAlign: 'center', color: "#333", fontSize: wp(3.5), fontWeight: 'bold' }}>5,000mil</Text>
                        <Button small transparent style={{ top: -5 }} onPress={() => Alert.alert(
                            'How does it work?',
                            `Your preferences are filtered with Engage profiles, then you are shown the number of users that match those preferences.`,
                            [{ text: 'Ok', onPress: () => { } }],
                            { cancelable: false }
                        )}>
                            <Text allowFontScaling={false} style={{ textAlign: 'center', color: colorsPalette.gradientGray, fontSize: wp(3.5), left: 10 }}>Matches found, {matchProfiles}</Text>
                        </Button>
                    </View>
                    <View style={{ top: -40 }}>
                        <ProgressBarAnimated
                            {...progressCustomStyles}
                            width={barWidth}
                            value={100 * progress / totalUsers}
                            maxValue={100}
                            barEasing="linear"
                            height={20}
                            backgroundColorOnComplete={!isLoading ? colorsPalette.primaryColor : colorsPalette.gradientGray} />
                    </View>
                </Footer>
            </Container>
        );
    }
}

const progressCustomStyles = { backgroundColor: colorsPalette.primaryColor };
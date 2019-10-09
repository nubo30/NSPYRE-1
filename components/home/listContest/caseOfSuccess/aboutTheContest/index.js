import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { Animated, Platform, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Separator } from 'native-base';
import truncate from 'lodash/truncate'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Grid, Row } from "react-native-easy-grid"

// AWS
import * as queries from '../../../../../src/graphql/queries'

// Colors
import { colorsPalette } from '../../../../global/static/colors'
import { MyStatusBar } from '../../../../global/statusBar'

// Charts
import NumbersParticipants from './charts/numbersParticipants'

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 110;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class AboutTheContestSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contest: props.navigation.getParam('contest'),
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            activeSections: [],
            swiperIndex: 0,
            hideCongrastSectionAudience: false,

            modalVisiblePrizes: false,
            modalVisibleJoinToTheContest: false,
        };
    }

    componentDidMount() {
        this._getContest()
    }

    _getContest = async () => {
        const contest = this.props.navigation.getParam('contest')
        try {
            const { data } = await API.graphql(graphqlOperation(queries.getCreateContest, { id: contest.id }))
            this.setState({ contest: data.getCreateContest })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { contest } = this.state
        const { navigation } = this.props
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
        );
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });
        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });
        const titleScale = scrollY.interpolate({
            inputRange: [1, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.9],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        });
        const sharedCount = contest.usersSharing.items.map(item => item.whereItHasBeenShared)
        return (
            <View style={{ flex: 1 }}>

                {/* Slider / Submit a video / submit a meme */}
                <Animated.ScrollView
                    style={{ height: "100%", backgroundColor: colorsPalette.opaqueWhite2 }}
                    scrollEventThrottle={1}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], { useNativeDriver: true })}
                    contentInset={{ top: HEADER_MAX_HEIGHT }}
                    contentOffset={{ y: -HEADER_MAX_HEIGHT }}>
                    <View style={styles.scrollViewContent}>
                        <List style={{ backgroundColor: colorsPalette.secondaryColor }}>
                            <Separator bordered style={{ backgroundColor: colorsPalette.opaqueWhite2, borderTopColor: colorsPalette.opaqueWhite2 }}>
                                <Text allowFontScaling={false}
                                    allowFontScaling={false}
                                    style={{ color: colorsPalette.darkFont }}>PARTICIPATIONS STATISTICS</Text>
                            </Separator>
                            <ListItem last icon style={{ borderBottomColor: colorsPalette.transparent }}>
                                <Left>
                                    <Button style={{ backgroundColor: "#0091EA" }}>
                                        <Icon type="FontAwesome" name="users" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text
                                        allowFontScaling={false}
                                        minimumFontScale={wp(4)}
                                        style={{ fontSize: wp(4) }}
                                        allowFontScaling={false}>Number of participations collected by the contest during their lifetime</Text>
                                </Body>
                                <Right>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{sharedCount.length}</Text>
                                </Right>
                            </ListItem>
                            <View style={{ maxHeight: 190, minHeight: 190, borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 0.5 }} last>
                                <NumbersParticipants contest={contest} />
                            </View>
                            <View style={{ backgroundColor: colorsPalette.opaqueWhite2 }}>
                                <Text allowFontScaling={false} style={{ alignSelf: 'center', textAlign: 'center', fontSize: wp(2.5), color: colorsPalette.darkFont }}>Users' entries to the contest are graphed per day, while the higher the bar will sweep the more users were embedded that day.</Text>
                            </View>
                        </List>
                    </View>
                </Animated.ScrollView>

                {/* Image Background */}
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.header,
                        { transform: [{ translateY: headerTranslate }] },
                    ]}>
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            {
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }],

                            },
                        ]}
                        source={{ uri: contest.general.picture.url }}
                    />
                    <View style={{ flex: 1, left: 15 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(9), color: '#FFF', position: 'absolute', bottom: 0, left: 0 }}>{contest.aboutTheUser.companyName === null ? contest.user.name : contest.aboutTheUser.companyName}</Text>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.bar, { transform: [{ scale: titleScale }, { translateY: titleTranslate }] }]}>
                    <Header transparent style={{ width: "100%" }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Button transparent onPress={() => navigation.goBack()}>
                                <Icon name='arrow-back' style={{ color: colorsPalette.secondaryColor }} />
                                <Text
                                    minimumFontScale={wp(4)}
                                    allowFontScaling={false}
                                    style={{ left: 5, color: colorsPalette.secondaryColor, fontSize: wp(4) }}>Back</Text>
                            </Button>
                            <Title
                                minimumFontScale={wp(9)}
                                allowFontScaling={false}
                                style={{ alignSelf: "center", left: 15, color: colorsPalette.secondaryColor, fontSize: wp(9) }}>
                                {truncate(contest.general.nameOfContest, { separator: '...', length: 9 })}
                            </Title>
                        </Left>
                        <Right>
                            <View>
                                <View style={{
                                    borderRadius: 5,
                                    padding: 10,
                                    backgroundColor: '#E53935',
                                    shadowColor: colorsPalette.primaryShadowColor,
                                    shadowOffset: { width: 0 },
                                    shadowOpacity: 1,
                                }}>
                                    <Text
                                        minimumFontScale={wp(4)}
                                        allowFontScaling={false}
                                        style={{ fontSize: wp(4), color: colorsPalette.secondaryColor, fontWeight: 'bold' }}>Completed</Text>
                                </View>
                            </View>
                        </Right>
                    </Header>
                    <MyStatusBar backgroundColor={colorsPalette.secondaryColor} barStyle="light-content" />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#D82B60',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: "cover"
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 28 : 38,
        height: 32,
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 10,
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
    },
    swiperIndicator: {
        width: '30%',
        color: 'white',
        position: 'absolute',
        top: 160,
        right: 10
    }
});


export default withNavigation(AboutTheContestSuccess)
import React, { Component } from 'react'
import { withNavigation } from "react-navigation"
import { Header, Left, Right, Button, Icon, Text, Title, View } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CountDown from 'react-native-countdown-component';
import _ from 'lodash'
import moment from 'moment'

// This is a header of Scene 'About the contestes'
class HeaderContest extends Component {
    state = { isFinishedContest: false, isCounterPause: true }

    componentWillUnmount() { this.setState({ isCounterPause: false }) }

    render() {
        const { isFinishedContest, isCounterPause } = this.state
        const { contest, navigation, fromWhere } = this.props

        return (
            <Header transparent>
                <Left style={{ flexDirection: 'row' }}>
                    <Button transparent onPress={() => fromWhere === 'categoryContest' ? navigation.goBack() : navigation.navigate('Home')}>
                        <Icon name='arrow-back' style={{ color: "#FFF" }} />
                        <Text
                            minimumFontScale={wp(4)}
                            allowFontScaling={false}
                            style={{ left: 5, color: "#FFF", fontSize: wp(4) }}>Back</Text>
                    </Button>
                    {/* <Title
                        minimumFontScale={wp(9)}
                        allowFontScaling={false}
                        style={{ alignSelf: "center", left: 15, color: "#FFF", fontSize: wp(9) }}>
                        {_.truncate(contest.general.nameOfContest, { separator: '...', length: 9 })}
                    </Title> */}
                </Left>
                <Right>
                    {isFinishedContest
                        ? <View>
                            <View style={{
                                borderRadius: 10,
                                padding: 10, backgroundColor: '#E53935',
                                shadowColor: 'rgba(0,0,0,0.3)',
                                shadowOffset: { width: 0 },
                                shadowOpacity: 1,
                            }}>
                                <Text
                                    minimumFontScale={wp(3)}
                                    allowFontScaling={false}
                                    style={{ fontSize: wp(3), color: '#FFF', fontWeight: 'bold' }}>Completed</Text>
                            </View>
                        </View> :
                        contest.timer === null
                            ? null
                            : new Date(contest.timer.end) < new Date()
                                ? <View>
                                    <View style={{
                                        borderRadius: 5,
                                        padding: 10,
                                        backgroundColor: '#E53935',
                                        shadowColor: 'rgba(0,0,0,0.3)',
                                        shadowOffset: { width: 0 },
                                        shadowOpacity: 1,
                                    }}>
                                        <Text
                                            minimumFontScale={wp(4)}
                                            allowFontScaling={false}
                                            style={{ fontSize: wp(4), color: '#FFF', fontWeight: 'bold' }}>Completed</Text>
                                    </View>
                                </View> : <CountDown
                                    running={isCounterPause}
                                
                                    digitStyle={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
                                    digitTxtStyle={{ color: '#FFF' }}
                                    timeLabelStyle={{ color: '#FFF' }}
                                    until={moment(Object.keys(contest).length !== 0 ? contest.timer.end : contest.timer.end).diff(moment(new Date()), 'seconds')}
                                    onFinish={() => this.setState({ isFinishedContest: true })}
                                    onPress={() => { }}
                                    size={15}
                                />}
                </Right>
            </Header>
        )
    }
}

export default withNavigation(HeaderContest)
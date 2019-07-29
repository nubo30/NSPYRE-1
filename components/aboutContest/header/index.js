import React, { Component } from 'react'
import { Platform } from 'react-native';
import { withNavigation } from "react-navigation"
import { Header, Left, Right, Button, Icon, Text, Title } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CountDown from 'react-native-countdown-component';
import _ from 'lodash'
import moment from 'moment'

// This is a header of Scene 'About the contestes'
class HeaderContest extends Component {
    render() {
        const { contest, navigation } = this.props
        return (
            <Header style={{ width: "100%", borderBottomColor: "rgba(0,0,0,0.0)", backgroundColor: 'transparent', height: Platform.OS === 'ios' ? 70 : 50 }}>
                <Left style={{ flexDirection: 'row' }}>
                    <Button transparent onPress={() => { navigation.navigate("Home") }}>
                        <Icon name='arrow-back' style={{ color: "#FFF" }} />
                        <Text style={{ left: 5, color: "#FFF" }}>Home</Text>
                    </Button>
                    <Title style={{ alignSelf: "center", left: 15, color: "#FFF", fontSize: wp(10) }}>
                        {_.truncate(contest.general.nameOfContest, { separator: '...', length: 9 })}
                    </Title>
                </Left>
                <Right>
                    {contest.timer === null ? null :
                        <CountDown
                            style={{ left: 15 }}
                            digitStyle={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
                            digitTxtStyle={{ color: '#FFF' }}
                            timeLabelStyle={{ color: '#FFF' }}
                            until={moment(Object.keys(contest).length !== 0 ? contest.timer : contest.timer).diff(moment(new Date()), 'seconds')}
                            onFinish={() => null}
                            onPress={() => null}
                            size={15}
                        />}
                </Right>
            </Header>
        )
    }
}

export default withNavigation(HeaderContest)
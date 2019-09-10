
import React, { Component } from 'react'
import { ImageBackground, View, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation'
import * as Animatable from 'react-native-animatable';
import { Text } from "native-base"
import _ from 'lodash'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// This function show the content of all card section
class AssociatedContest extends Component {
    state = {
        animation: false,
    }

    render() {
        const { animation } = this.state
        const { item, _setModalVisibleYourContest, navigation, userData } = this.props
        return (
            <View>
                <TouchableHighlight
                    underlayColor="rgba(0,0,0,0.0)"
                    onPress={() => this.setState({ animation: true })}>
                    <Animatable.View
                        onAnimationEnd={() => {
                            this.setState({ animation: false })
                            _setModalVisibleYourContest(false)
                            navigation.navigate("AboutContest", {
                                contest: Object.assign(item.contestData.Item,
                                    {
                                        timer: null,
                                        user: {
                                            id: item.contestData.Item.createContestUserId
                                        }, participants: {
                                            items: []
                                        }
                                    }),
                                fromWhere: 'yoursContest', userData
                            })
                        }}
                        animation={animation ? "pulse" : undefined}
                        duration={200}
                        style={{
                            flex: 0,
                            borderRadius: 5,
                            marginBottom: 10,
                            width: "90%",
                            alignSelf: "center",
                            marginTop: 20,
                            shadowColor: 'rgba(0,0,0,0.3)',
                            shadowOffset: { width: 0 },
                            shadowOpacity: 1
                        }}>

                        <View style={{
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            overflow: 'hidden', flex: 1
                        }}>
                            <ImageBackground
                                borderRadius={5}
                                source={{ uri: item.contestData.Item.general.picture.url }}
                                style={{ height: 125, width: "100%", flex: 1 }}>
                                <View style={{
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    width: "100%", height: "100%",
                                    borderRadius: 5
                                }}>
                                    <Text
                                        minimumFontScale={wp(8)}
                                        allowFontScaling={false}
                                        style={{ color: "#FFF", fontSize: wp(8), position: "absolute", bottom: 0, padding: 10 }}>
                                        {_.truncate(_.upperFirst(_.lowerCase(item.contestData.Item.general.nameOfContest)), { length: 20, separator: '...' })}
                                    </Text>
                                    <View style={{ flexDirection: 'row', bottom: 0, right: 0, position: 'absolute', padding: 5 }}>
                                        <Text
                                            minimumFontScale={wp(4)}
                                            allowFontScaling={false}
                                            style={{ color: "#FFF", left: -5, fontSize: wp(4), top: -10 }}>🏆 {item.contestData.Item.prizes.length}</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </Animatable.View>
                </TouchableHighlight>
            </View>
        )
    }
}

export default withNavigation(AssociatedContest)
import React, { Component } from "react";
import { Modal, Dimensions } from 'react-native'
import { withNavigation } from "react-navigation"
import { Button, Text, Thumbnail, View } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'
import UserAvatar from "react-native-user-avatar"
import Placeholder from 'rn-placeholder'
import ModalAnimation from "react-native-modal";
import { Grid, Row } from 'react-native-easy-grid'

// Child Component
import YourContest from "./YourContest";
import CategoryOfPrizes from "./categoryOfPrizes";

const widthScreen = Dimensions.get('screen').width
const heightScreen = Dimensions.get('screen').height

// This function show the avatar/your content/render point
class UserInfo extends Component {
    state = {
        modalVisibleRedeemPoints: false,
        modalVisibleYourContests: false,
        redeemPointsDecision: false,

        fromWhere: false
    }
    _setModalVisibleRedeemPoints = (visible, fromWhere) => { this.setState({ modalVisibleRedeemPoints: visible, fromWhere }) }
    _setModalVisibleYourContest = (visible) => { this.setState({ modalVisibleYourContests: visible }) }
    _redeemPointsDecision = (visible, fromWhere) => { this.setState({ redeemPointsDecision: visible, fromWhere }) }

    render() {
        const {
            fromWhere,

            // Modals
            redeemPointsDecision,
            modalVisibleYourContests,
            modalVisibleRedeemPoints,
        } = this.state
        const { userData, isReady, prizeCategory, offLine, contestList } = this.props
        return (
            <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-around', left: '1.5%' }}>
                <Button
                    allowFontScaling={false}
                    bordered small disabled={!isReady || offLine}
                    onPress={() => this._setModalVisibleYourContest(true)}
                    style={{ borderColor: offLine ? "#3333" : "#D81B60", alignSelf: 'center' }}>
                    <Text
                        allowFontScaling={false}
                        style={{ color: offLine ? "#3333" : "#D81B60", fontSize: wp(3) }}>Your Contests</Text>
                </Button>

                {/* AVATAR */}
                <View
                    style={{ alignSelf: 'center' }}>
                    {
                        Object.keys(userData).length !== 0
                            ? userData.avatar !== null
                                ? <Thumbnail style={{ width: 105, height: 105, borderRadius: 52.5 }} source={{ uri: userData.avatar }} />
                                : <UserAvatar size="105" name={userData.name} />
                            : <Placeholder.Media animate="fade" style={{ width: 105, height: 105, borderRadius: 52.5 }} />
                    }
                </View>

                <Button disabled={!isReady || offLine} onPress={() => { this._redeemPointsDecision(true) }}
                    bordered small style={{ borderColor: offLine ? "#3333" : "#D81B60", alignSelf: 'center' }}>
                    <Text
                        allowFontScaling={false}
                        style={{ color: offLine ? "#3333" : "#D81B60", fontSize: wp(3) }}>Redeem Points</Text>
                </Button>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisibleRedeemPoints}>
                    <CategoryOfPrizes

                        _setModalVisibleRedeemPoints={this._setModalVisibleRedeemPoints}
                        prizeCategory={prizeCategory}
                        userData={userData} />
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisibleYourContests}>
                    <YourContest contestList={contestList} userData={userData} _setModalVisibleYourContest={this._setModalVisibleYourContest} />
                </Modal>

                <ModalAnimation
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    onModalHide={() => fromWhere === 'prize' ? this._setModalVisibleRedeemPoints(true) : null}
                    isVisible={redeemPointsDecision}>
                    <View style={{ width: widthScreen - 80, maxHeight: heightScreen / 2, alignSelf: 'center', backgroundColor: '#FFF', borderRadius: 15, flex: 1, padding: 10 }}>
                        <Grid>
                            <Row size={40} style={{ flexDirection: 'row', padding: 5 }}>
                                <Text
                                    minimumFontScale={wp(9)}
                                    allowFontScaling={false}
                                    style={{ color: '#3333', fontSize: wp(9), flexWrap: 'wrap', flex: 1 }}>Choose one of the two options to continue!</Text>
                            </Row>
                            <Row size={30} style={{ alignItems: 'center', justifyContent: 'center', top: -10 }}>
                                <Button transparent style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                    <Text
                                        minimumFontScale={wp(10)}
                                        allowFontScaling={false}
                                        style={{ fontWeight: 'bold', fontSize: wp(9), color: '#D81B60' }}>Glyff</Text>
                                </Button>
                                <Text
                                    minimumFontScale={wp(4)}
                                    allowFontScaling={false}
                                    style={{ fontWeight: 'bold', color: '#333', fontSize: wp(4) }}>OR</Text>
                                <Button onPress={() => { this._redeemPointsDecision(false, 'prize') }} transparent style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                    <Text
                                        minimumFontScale={wp(10)}
                                        allowFontScaling={false}
                                        style={{ fontWeight: 'bold', fontSize: wp(9), color: '#D81B60' }}>Prize</Text>
                                </Button>
                            </Row>
                            <Row size={20}>
                                <Text
                                    minimumFontScale={wp(3)}
                                    allowFontScaling={false}
                                    style={{ color: '#3333', fontSize: wp(3), flex: 1, flexWrap: 'wrap', fontWeight: '100' }}>With <Text style={{ fontWeight: 'bold', color: '#3333' }}>Glyff</Text> you can change your points in cryptocurrencies, by pressing <Text style={{ fontWeight: 'bold', color: '#3333' }}>Prize</Text> you will be going to the list of prizes we have!</Text>
                            </Row>
                            <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button transparent small onPress={() => this._redeemPointsDecision(false)} style={{ alignSelf: 'flex-end' }}>
                                    <Text
                                        minimumFontScale={wp(3)}
                                        allowFontScaling={false}
                                        style={{ color: '#3333', fontWeight: '100', fontSize: wp(3) }}>No, thanks</Text>
                                </Button>
                            </Row>
                        </Grid>
                    </View>
                </ModalAnimation>
            </View>
        )
    }
}

export default withNavigation(UserInfo)
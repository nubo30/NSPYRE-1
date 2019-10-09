import React, { Component } from "react";
import { Modal, Dimensions } from 'react-native'
import { withNavigation } from "react-navigation"
import { Button, Text, Thumbnail, View } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import UserAvatar from "react-native-user-avatar"
import { PlaceholderMedia } from 'rn-placeholder'
import ModalAnimation from "react-native-modal";
import { Grid, Row } from 'react-native-easy-grid'

// Child Component
import YourContest from "./YourContest";
import CategoryOfPrizes from "./categoryOfPrizes";

// Colors
import { colorsPalette } from '../../global/static/colors'

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
                    style={{ borderColor: offLine ? colorsPalette.thirdColor : colorsPalette.primaryColor, alignSelf: 'center', top: -5 }}>
                    <Text
                        allowFontScaling={false}
                        style={{ color: offLine ? colorsPalette.thirdColor : colorsPalette.primaryColor, fontSize: wp(3) }}>Your Contests</Text>
                </Button>

                {/* AVATAR */}
                <View
                    style={{ alignSelf: 'center' }}>
                    {
                        Object.keys(userData).length !== 0
                            ? userData.avatar !== null
                                ? <Thumbnail style={{ width: 105, height: 105, borderRadius: 52.5 }} source={{ uri: userData.avatar }} />
                                : <UserAvatar size="105" name={userData.name} />
                            : <PlaceholderMedia animate="fade" style={{ width: 105, height: 105, borderRadius: 52.5 }} />
                    }
                    <Text allowFontScaling={false} style={{ textAlign: 'center', alignSelf: 'center', top: 5, color: colorsPalette.primaryColor, fontWeight: 'bold' }}>{userData && userData.coins} <Text allowFontScaling={false} style={{ fontWeight: 'normal', color: colorsPalette.primaryColor }}>Points</Text></Text>
                </View>

                <Button disabled={!isReady || offLine} onPress={() => { this._redeemPointsDecision(true) }}
                    bordered small style={{ borderColor: offLine ? colorsPalette.thirdColor : colorsPalette.primaryColor, alignSelf: 'center', top: -5 }}>
                    <Text
                        allowFontScaling={false}
                        style={{ color: offLine ? colorsPalette.thirdColor : colorsPalette.primaryColor, fontSize: wp(3) }}>Redeem Points</Text>
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
                    onModalHide={() => fromWhere === 'prize' ? this._setModalVisibleRedeemPoints(true) : null}
                    onSwipeComplete={() => { this.setState({ redeemPointsDecision: false }) }}
                    isVisible={redeemPointsDecision}
                    swipeDirection={['down']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}>
                    <View style={{
                        backgroundColor: colorsPalette.secondaryColor,
                        padding: 15,
                        justifyContent: 'center',
                        borderTopStartRadius: 10,
                        borderTopEndRadius: 10,
                        borderColor: 'rgba(0, 0, 0, 0.3)',
                        flex: 1,
                        maxHeight: 600,
                        position: 'absolute',
                        bottom: 0,
                        width: '100%'
                    }}>
                        <Grid>
                            <Row size={40} style={{ flexDirection: 'row', padding: 5 }}>
                                <Text
                                    minimumFontScale={wp(9)}
                                    allowFontScaling={false}
                                    style={{ color: colorsPalette.gradientGray, fontSize: wp(9), flexWrap: 'wrap', flex: 1 }}>Choose one of the two options to continue!</Text>
                            </Row>
                            <Row size={30} style={{ alignItems: 'center', justifyContent: 'center', top: -10 }}>
                                <Button transparent style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                    <Text
                                        minimumFontScale={wp(10)}
                                        allowFontScaling={false}
                                        style={{ fontWeight: 'bold', fontSize: wp(9), color: colorsPalette.primaryColor }}>Glyff</Text>
                                </Button>
                                <Text
                                    minimumFontScale={wp(4)}
                                    allowFontScaling={false}
                                    style={{ fontWeight: 'bold', color: '#333', fontSize: wp(4) }}>OR</Text>
                                <Button onPress={() => { this._redeemPointsDecision(false, 'prize') }} transparent style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                    <Text
                                        minimumFontScale={wp(10)}
                                        allowFontScaling={false}
                                        style={{ fontWeight: 'bold', fontSize: wp(9), color: colorsPalette.primaryColor }}>Prize</Text>
                                </Button>
                            </Row>
                            <Row size={20}>
                                <Text
                                    minimumFontScale={wp(3)}
                                    allowFontScaling={false}
                                    style={{ color: colorsPalette.gradientGray, fontSize: wp(3), flex: 1, flexWrap: 'wrap' }}>With <Text style={{ fontWeight: 'bold', color: colorsPalette.gradientGray }}>Glyff</Text> you can change your points in cryptocurrencies, by pressing <Text style={{ fontWeight: 'bold', color: colorsPalette.gradientGray }}>Prize</Text> you will be going to the list of prizes we have!</Text>
                            </Row>
                            <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button transparent small onPress={() => this._redeemPointsDecision(false)} style={{ alignSelf: 'flex-end' }}>
                                    <Text
                                        minimumFontScale={wp(3)}
                                        allowFontScaling={false}
                                        style={{ color: colorsPalette.darkFont, fontSize: wp(3) }}>No, thanks</Text>
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
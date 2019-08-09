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

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons'

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
        const { userData, isReady, prizeCategory, offLine } = this.props
        return (
            <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-around', left: '1.5%' }}>
                <Button bordered small rounded disabled={!isReady || offLine}
                    onPress={() => this._setModalVisibleYourContest(true)}
                    style={{ borderColor: offLine ? "#3333" : "#D81B60", alignSelf: 'center' }}>
                    <Text style={{ color: offLine ? "#3333" : "#D81B60", fontSize: wp(3) }}>Your Contests</Text>
                </Button>

                {/* AVATAR */}
                <View style={{ alignSelf: 'center' }}>
                    {
                        Object.keys(userData).length !== 0
                            ? userData.avatar !== null
                                ? <Thumbnail style={{ width: 105, height: 105, borderRadius: 52.5 }} source={{ uri: userData.avatar }} />
                                : <UserAvatar size="105" name={userData.name} />
                            : <Placeholder.Media animate="fade" style={{ width: 105, height: 105, borderRadius: 52.5 }} />
                    }
                </View>

                <Button disabled={!isReady || offLine} onPress={() => { this._redeemPointsDecision(true) }}
                    bordered small rounded style={{ borderColor: offLine ? "#3333" : "#D81B60", alignSelf: 'center' }}>
                    <Text style={{ color: offLine ? "#3333" : "#D81B60", fontSize: wp(3) }}>Redeem Points</Text>
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
                    <YourContest userData={userData} _setModalVisibleYourContest={this._setModalVisibleYourContest} />
                </Modal>

                <ModalAnimation
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    onModalHide={() => fromWhere === 'prize' ? this._setModalVisibleRedeemPoints(true) : null}
                    isVisible={redeemPointsDecision}>
                    <View style={{ width: widthScreen - 80, maxHeight: heightScreen / 2, alignSelf: 'center', backgroundColor: '#FFF', borderRadius: 15, flex: 1, padding: 20 }}>
                        <Grid style={{ flex: 1 }}>
                            <Row size={40} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="coins" style={{ fontSize: wp(20), color: '#D81B60' }} />
                            </Row>
                            <Row size={40} style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={{ fontSize: wp(7), color: '#3333' }}>Redeem yours points with</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Button transparent>
                                        <Text style={{ fontSize: wp(7), right: 15, bottom: 10, color: '#D81B60' }}>Glyff</Text>
                                    </Button>
                                    <Text style={{ fontSize: wp(7), color: '#3333', right: 25 }}>or you can choose a </Text>
                                </View>
                                <View style={{ flexDirection: 'row', bottom: 15 }}>
                                    <Button transparent onPress={() => { this._redeemPointsDecision(false, 'prize') }}>
                                        <Text style={{ fontSize: wp(7), right: 15, bottom: 10, color: '#D81B60' }}>Prize</Text>
                                    </Button>
                                    <Text style={{ fontSize: wp(7), color: '#3333', right: 25 }}>from our center.</Text>
                                </View>
                            </Row>
                            <Row size={20} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button transparent small onPress={() => this._redeemPointsDecision(false)} style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: '#3333', fontWeight: '100' }}>No, thnaks</Text>
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
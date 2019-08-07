import React, { Component } from "react";
import { Modal } from 'react-native'
import { Storage } from 'aws-amplify'
import { withNavigation } from "react-navigation"
import { Button, Text, Content, Thumbnail, View } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'
import UserAvatar from "react-native-user-avatar"
import Placeholder from 'rn-placeholder'
// Child Component
import YourContest from "./YourContest";
import CategoryOfPrizes from "./categoryOfPrizes";

// This function show the avatar/your content/render point
class UserInfo extends Component {
    state = {
        modalVisibleRedeemPoints: false,
        modalVisibleYourContests: false,
    }
    _setModalVisibleRedeemPoints = (visible) => { this.setState({ modalVisibleRedeemPoints: visible }) }
    _setModalVisibleYourContest = (visible) => { this.setState({ modalVisibleYourContests: visible }) }

    render() {
        const {
            // Modals
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

                <Button disabled={!isReady || offLine} onPress={() => { this._setModalVisibleRedeemPoints(true) }}
                    bordered small rounded style={{ borderColor: offLine ? "#3333" : "#D81B60", alignSelf: 'center' }}>
                    <Text style={{ color: offLine ? "#3333" : "#D81B60", fontSize: wp(3) }}>Redeem Points</Text>
                </Button>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisibleRedeemPoints}>
                    <CategoryOfPrizes _setModalVisibleRedeemPoints={this._setModalVisibleRedeemPoints} prizeCategory={prizeCategory} userData={userData} />
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisibleYourContests}>
                    <YourContest userData={userData} _setModalVisibleYourContest={this._setModalVisibleYourContest} />
                </Modal>
            </View>
        )
    }
}

export default withNavigation(UserInfo)
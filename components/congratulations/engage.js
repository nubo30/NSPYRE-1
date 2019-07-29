import React, { Component } from "react";
import { Modal } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Button, Text, View } from 'native-base';
import { withNavigation } from "react-navigation"
import { graphqlOperation, API } from 'aws-amplify'

// Gadrient
import { colors } from "../Global/static/colors"

// Child Componente
import CategoryOfPrizes from '../home/photoAndButtom/categoryOfPrizes/index'

// GraphQL
import * as mutations from '../../src/graphql/mutations'

class ButtonsENGAGE extends Component {
    state = { modalVisibleRedeemPoints: false }

    setModalVisibleRedeemPoints = (visible) => { this.setState({ modalVisibleRedeemPoints: visible }) }

    handleNavigate = async () => {
        const { getUser } = this.props
        const input = { typeUser: 'CREATE_A_CONTEST', id: getUser.id, expectedVersion: getUser.version }
        try {
            await API.graphql(graphqlOperation(mutations.updateUser, { input }))
            this.props.navigation.navigate(input.typeUser)
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Button
                        full rounded
                        onPress={() => { this.handleNavigate() }}
                        style={{ width: wp(33), height: hp(7), backgroundColor: colors.elementPrimary }}>
                        <Text style={{ letterSpacing: 3, fontSize: wp(4) }}>Contests</Text>
                    </Button>
                </View>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Button
                        full rounded
                        onPress={() => this.setModalVisibleRedeemPoints(true)}
                        style={{ width: wp(33), height: hp(7), backgroundColor: colors.elementPrimary, alignSelf: 'flex-end' }}>
                        <Text style={{ letterSpacing: 3, fontSize: wp(4) }}>Prizes</Text>
                    </Button>
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisibleRedeemPoints}>
                    <CategoryOfPrizes setModalVisibleRedeemPoints={this.setModalVisibleRedeemPoints} />
                </Modal>
            </View>
        )
    }
}
export default withNavigation(ButtonsENGAGE)
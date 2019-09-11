import React, { Component } from "react";
import { withNavigation, NavigationActions, StackActions } from "react-navigation"
import { Button, Text, View } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { graphqlOperation, API } from 'aws-amplify'
import _ from "lodash"

// Gadrient
import { colors } from "../global/static/colors"

// GraphQL
import * as mutations from '../../src/graphql/mutations'

class SubmitAPrizeButtons extends Component {

    goToHome = async () => {
        const resetAction = await StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' })]
        });
        this.props.navigation.dispatch(resetAction);
    }

    handleNavigateCAC = async () => {
        const { getUser } = this.props
        const input = { typeUser: 'CREATE_A_CONTEST', id: getUser.id, expectedVersion: getUser.version }
        try {
            await API.graphql(graphqlOperation(mutations.updateUser, { input }))
            this.props.navigation.navigate(input.typeUser)
        } catch (error) {
            console.log(error)
        }
    }

    handleNavigateEAC = async () => {
        const { getUser } = this.props
        const input = { typeUser: 'ENGAGE', id: getUser.id, expectedVersion: getUser.version }
        try {
            await API.graphql(graphqlOperation(mutations.updateUser, { input }))
            this.props.navigation.navigate(input.typeUser)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 2 }}>
                <View style={{ flex: 1, flexDirection: 'row', top: -20 }}>
                    <View style={{ flex: 1, justifyContent: 'center', left: 2 }}>
                        <Button
                            full rounded
                            onPress={() => { this.props.navigation.navigate('SUBMIT_A_PRIZE') }}
                            style={{ width: wp(33), height: hp(6), backgroundColor: colors.elementPrimary }}>
                            <Text style={{ fontSize: wp(3.5) }}>{_.upperCase("another Prize")}</Text>
                        </Button>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', right: 2 }}>
                        <Button
                            full rounded
                            onPress={() => { this.handleNavigateCAC() }}
                            style={{ width: wp(33), height: hp(6), backgroundColor: colors.elementPrimary, alignSelf: 'flex-end' }}>
                            <Text style={{ fontSize: wp(3.3) }}>{_.upperCase("create a contest")}</Text>
                        </Button>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', left: 2 }}>
                        <Button
                            full rounded
                            onPress={() => { this.handleNavigateEAC() }}
                            style={{ width: wp(33), height: hp(6), backgroundColor: colors.elementPrimary }}>
                            <Text style={{ fontSize: wp(3.3) }}>{_.upperCase("engage a contest")}</Text>
                        </Button>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', right: 2 }}>
                        <Button
                            full rounded
                            onPress={() => { this.goToHome() }}
                            style={{ width: wp(33), height: hp(6), backgroundColor: colors.elementPrimary, alignSelf: 'flex-end' }}>
                            <Text style={{ fontSize: wp(3.5) }}>{_.upperCase("home")}</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}
export default withNavigation(SubmitAPrizeButtons)
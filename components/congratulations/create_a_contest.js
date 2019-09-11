import React, { Component } from "react";
import { withNavigation, NavigationActions, StackActions } from "react-navigation"
import { Button, Text, View } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Gadrient
import { colors } from "../global/static/colors"

class Create_A_Contest extends Component {

    goToHome = async () => {
        const resetAction = await StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' })]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Button
                        full rounded
                        onPress={() => { this.goToHome() }}
                        style={{ width: wp(33), height: hp(7), backgroundColor: colors.elementPrimary }}>
                        <Text style={{ letterSpacing: 3, fontSize: wp(4) }}>Home</Text>
                    </Button>
                </View>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Button
                        full rounded
                        onPress={() => this.props.navigation.navigate('PromoteMyContest')}
                        style={{ width: wp(33), height: hp(7), backgroundColor: colors.elementPrimary, alignSelf: 'flex-end' }}>
                        <Text style={{ letterSpacing: 3, fontSize: wp(4) }}>Promote</Text>
                    </Button>
                </View>
            </View>
        )
    }
}
export default withNavigation(Create_A_Contest)
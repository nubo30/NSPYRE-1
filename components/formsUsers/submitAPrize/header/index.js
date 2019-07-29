import React from 'react';
import { Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Header, Button, Left, Icon, Text, Body } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Placeholder from 'rn-placeholder'

// background of header
import { MyStatusBar } from '../../../Global/statusBar/index'
import { GradientTypeForm } from "../../../Global/gradients/index"

function FormSubmitAPrizeHeader(props) {
    const { formData } = props
    const isEditing = formData === null
        ? true
        : formData.phone !== "+1"
            ? true
            : Object.keys(formData.businessAddress).length !== 0
                ? true
                : formData.companyName
                    ? true
                    : formData.businessFacebook
                        ? true
                        : formData.businessTwitter
                            ? true
                            : formData.businessSnapchat
                                ? true
                                : formData.businessInstagram
                                    ? true
                                    : formData.category !== 'NO_SELECT'
                                        ? true
                                        : formData.nameOfPrize
                                            ? true
                                            : formData.companyNamePrize
                                                ? true : formData.shortDescriptionOfThePrize
                                                    ? true
                                                    : Object.keys(formData.prizeSocialMedia).length !== 0
                                                        ? true
                                                        : formData.specialInstructions ? true : false

    return (
        <Header span style={{ height: wp(50), flexDirection: "column" }}>
            <MyStatusBar backgroundColor="#1976D2" barStyle="light-content" />
            <GradientTypeForm />
            <Left style={{ width: "100%" }}>
                <Button transparent onPress={() => isEditing ? Alert.alert(
                    'Are you sure you want to go back?',
                    'You are editing your prizes, if you choose "OK" the changes you have made will be lost',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => props.navigation.goBack() },
                    ],
                    { cancelable: false },
                ) : props.navigation.goBack()}>
                    <Icon name='arrow-back' style={{ color: "#FFF" }} />
                    <Text style={{ color: "#FFF" }}>Back</Text>
                </Button>
            </Left>
            <Body style={{ width: wp(95), justifyContent: "center", alignItems: 'center' }}>
                <Placeholder.Media
                    animate="fade"
                    style={{ width: wp(28), bottom: 20, height: wp(5) }}
                    onReady={props.isReady}>
                    <Text style={{ color: "#FFF", fontSize: wp(6), bottom: 20 }}>Remember!</Text>
                </Placeholder.Media>
                <Placeholder.Media
                    animate="fade"
                    style={{ width: wp(75), bottom: 10, height: wp(4) }}
                    onReady={props.isReady}>
                    <Text style={{
                        bottom: 10,
                        textAlign: 'center',
                        color: "#FFF",
                        fontSize: wp(3.6),
                        paddingLeft: wp(7),
                        paddingRight: wp(7)
                    }}>
                        Tell us a little about yourself, what you’re sharing in our redemption center, and the instructions for those who receive it! The more you share the more exposure your brand receives! Thank you for helping reward our community!
                            </Text>
                </Placeholder.Media>
                <Placeholder.Media
                    animate="fade"
                    style={{ width: wp(65), bottom: 5, height: wp(4) }}
                    onReady={props.isReady} />
            </Body>
        </Header>
    );
}

export default withNavigation(FormSubmitAPrizeHeader)
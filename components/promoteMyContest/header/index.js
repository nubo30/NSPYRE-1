import React from 'react';
import { withNavigation } from 'react-navigation'
import { Header, Button, Left, Icon, Text, Body } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Placeholder from 'rn-placeholder'

// background of header
import { MyStatusBar } from '../../Global/statusBar/index'
import { GradientTypeForm } from "../../Global/gradients/index"

function FormPromoteContest(props) {
    return (
        <Header span style={{ height: wp(50), flexDirection: "column" }}>
            <MyStatusBar backgroundColor="#1976D2" barStyle="light-content" />
            <GradientTypeForm />
            <Left style={{ width: "100%" }}>
                <Button transparent onPress={() => props.navigation.goBack()}>
                    <Icon name='arrow-back' style={{ color: "#FFF" }} />
                    <Text style={{ color: "#FFF" }}>Back</Text>
                </Button>
            </Left>
            <Body style={{ width: wp(95), justifyContent: "center", alignItems: 'center' }}>
                <Placeholder.Media
                    animate="fade"
                    style={{ width: wp(28), bottom: 20, height: wp(5) }}
                    onReady={props.isReady}>
                    <Text style={{ color: "#FFF", fontSize: wp(6), bottom: 20 }}>Promote your contest 🙌</Text>
                </Placeholder.Media>
                <Placeholder.Media
                    animate="fade"
                    style={{ width: wp(75), bottom: 10, height: wp(4) }}
                    onReady={props.isReady}>
                    <Text style={{
                        bottom: 10,
                        textAlign: 'center',
                        color: "#FFF",
                        fontSize: wp(4),
                        paddingLeft: wp(10),
                        paddingRight: wp(10)
                    }}>
                        Tell us about the audience you want to reach!
                            </Text>
                </Placeholder.Media>
            </Body>
        </Header>
    );
}

export default withNavigation(FormPromoteContest)
import React, { Component } from "react";
import { View, Dimensions, AsyncStorage } from "react-native";
import { Button, Text } from 'native-base'
import Modal from "react-native-modal";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import truncate from 'lodash/truncate'
// Colors
import { colorsPalette } from '../../global/static/colors'

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

// Child Component
import CongratsAnimation from '../../global/lottieJs/particle_rain'

export default class WelcomeModal extends Component {
    constructor() {
        super()
        this.state = {
            isModalVisible: false
        };
        this._bootstrapWelcomeAsync()
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    _bootstrapWelcomeAsync = async () => {
        AsyncStorage.getItem('@HomeFisrtTime', async (err, result) => {
            if (result === null) {
                setTimeout(() => {
                    this.setState({ isModalVisible: true })
                }, 1000);
            }
        });
        AsyncStorage.setItem('@HomeFisrtTime', JSON.stringify({ "value": "true" }));
    }

    render() {
        return (
            <Modal
                animationIn="zoomInDown"
                animationOut="fadeOut"
                isVisible={this.state.isModalVisible}>
                <View style={{
                    minHeight: screenHeight / 2,
                    maxHeight: screenHeight / 2,
                    minWidth: screenWidth - 20,
                    maxWidth: screenWidth - 20,
                    alignSelf: 'center',
                    borderRadius: 10,
                    backgroundColor: colorsPalette.secondaryColor
                }}>
                    <View style={{ position: 'absolute', width: "100%", height: "100%", justifyContent: 'flex-end' }}>
                        <CongratsAnimation screenHeight={screenHeight} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(10), color: colorsPalette.primaryColor, textAlign: 'center' }}>{truncate('Yank Carlos Reyes Espinal', { length: 15, separator: '...' })}</Text>
                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont, textAlign: 'center', width: "90%" }}>Welcome thanks for being a part of our community!</Text>
                    </View>
                    <Button transparent style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }} onPress={() => this.setState({ isModalVisible: false })}>
                        <Text allowFontScaling={false} style={{ color: colorsPalette.gradientGray }}>CLOSE</Text>
                    </Button>
                </View>
            </Modal>
        );
    }
}
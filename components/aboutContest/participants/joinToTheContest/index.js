import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

export default class ModalTester extends Component {

    render() {
        const { modalVisibleJoinToTheContest, _setModalVisibleJoinToTheContest } = this.props
        return (
            <Modal isVisible={modalVisibleJoinToTheContest}>
                <View style={{ flex: 1 }}>
                    <Text>Hello!</Text>
                    <Button title="Hide modal" onPress={() => _setModalVisibleJoinToTheContest(false)} />
                </View>
            </Modal>
        );
    }
}
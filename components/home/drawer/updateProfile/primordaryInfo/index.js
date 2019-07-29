import React, { Component } from 'react'
import { Platform, Modal } from 'react-native';
import { Text, List, ListItem, Left, Right, View, Content, Container } from 'native-base'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Placeholder from "rn-placeholder"

// Icons
import { Feather } from '@expo/vector-icons'

// Child Component
import Avatar from './avatar'
import ModalContentName from './modalContentName'
import ModalContentLastName from './modalContentLastName'

// This function show the name, lastname and avatar of user
export default class PrimordaryInfo extends Component {
    state = {
        modalVisibleName: false,
        modalVisibleLastName: false
    }

    // Open modals name
    setModalVisibleName = (visible) => this.setState({ modalVisibleName: visible })

    // Open modals lastname    
    setModalVisibleLastName = (visible) => this.setState({ modalVisibleLastName: visible })

    render() {
        const isIOS = Platform.OS === "ios"
        const { userData, _isLoading, isLoading } = this.props
        return (
            <View style={{ flexDirection: 'row', flex: 0.8, justifyContent: "center", alignItems: 'center' }}>
                <Avatar userData={userData} isLoading={isLoading} _isLoading={_isLoading} />
                <List style={{ width: wp(65) }}>

                    {/* NOMBRE */}
                    <ListItem
                        disabled={isLoading}
                        onPress={() => { this.setState({ modalVisibleName: true }) }}
                        style={{ height: 50, borderTopColor: "#E0E0E0", borderTopWidth: 0.8 }}>
                        <Left>
                            <Text style={{ color: isLoading ? "#BDBDBD" : "#333", fontWeight: "700" }}>First Name:  </Text>
                            <Text style={{ color: isLoading ? "#BDBDBD" : "#333", fontWeight: "100" }}>{userData && userData.name}</Text>
                        </Left>
                        <Right>
                            <Feather name="edit-2" style={{ fontSize: 20, color: isLoading ? "#BDBDBD" : "#F48FB1" }} />
                        </Right>
                    </ListItem>

                    {/* APELLIDO */}
                    <ListItem
                        disabled={isLoading}
                        onPress={() => { this.setModalVisibleLastName(true) }}
                        style={{ height: 50 }}>
                        <Left>
                            <Text style={{ color: isLoading ? "#BDBDBD" : "#333", fontWeight: "700" }}>Last Name: </Text>
                            <Text style={{ color: isLoading ? "#BDBDBD" : "#333", fontWeight: "100" }}>{userData && userData.lastname}</Text>
                        </Left>
                        <Right>
                            <Feather name="edit-2" style={{ fontSize: 20, color: isLoading ? "#BDBDBD" : "#F48FB1" }} />
                        </Right>
                    </ListItem>
                </List>
                {/* Modal Name / LastName */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={this.state.modalVisibleName}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <ModalContentName
                        userData={userData}
                        isLoading={isLoading}
                        _isLoading={_isLoading}
                        modalVisibleName={this.state.modalVisibleName}
                        setModalVisibleName={this.setModalVisibleName} />
                </Modal>
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={this.state.modalVisibleLastName}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <ModalContentLastName
                        userData={userData}
                        isLoading={isLoading}
                        _isLoading={_isLoading}
                        modalVisibleLastName={this.state.modalVisibleLastName}
                        setModalVisibleLastName={this.setModalVisibleLastName} />
                </Modal>
            </View>
        )
    }
}    
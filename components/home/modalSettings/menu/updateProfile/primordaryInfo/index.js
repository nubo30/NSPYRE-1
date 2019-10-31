import React, { Component } from 'react'
import { Modal } from 'react-native';
import { Text, List, ListItem, Left, Right, View, Icon } from 'native-base'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// Child Component
import Avatar from './avatar'
import ModalContentName from './modalContentName'
import ModalContentLastName from './modalContentLastName'

// Colors
import { colorsPalette } from '../../../../../global/static/colors'

// This function show the name, lastname and avatar of user
export default class PrimordaryInfo extends Component {
    state = {
        name: null,
        lastname: null,
        modalVisibleName: false,
        modalVisibleLastName: false
    }

    // Open modals name
    setModalVisibleName = (visible) => this.setState({ modalVisibleName: visible })

    // Open modals lastname    
    setModalVisibleLastName = (visible) => {
        this.setState({ modalVisibleLastName: visible });
    }

    _updateName = (value) => {
        this.setState({ name: value })
    }

    _updateLastName = (value) => {
        this.setState({ lastname: value })
    }

    render() {
        const { name, lastname } = this.state
        const { userData, _isLoading, isLoading } = this.props
        return (
            <View style={{ flexDirection: 'row', flex: 0.8, justifyContent: "center", alignItems: 'center' }}>
                <Avatar newName={name} userData={userData} isLoading={isLoading} _isLoading={_isLoading} />
                <List style={{ width: wp(65) }}>

                    {/* NOMBRE */}
                    <ListItem
                        disabled={isLoading}
                        onPress={() => { this.setState({ modalVisibleName: true }) }}
                        style={{ height: 50, borderTopColor: "#E0E0E0", borderTopWidth: 0.8 }}>
                        <Left>
                            <Text
                                allowFontScaling={false}
                                minimumFontScale={wp(4)}
                                style={{ fontSize: wp(4), color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.darkFont, fontWeight: "700" }}>First Name:  </Text>
                            <Text
                                allowFontScaling={false}
                                minimumFontScale={wp(4)}
                                style={{ fontSize: wp(4), color: isLoading ? colorsPalette.opaqueWhite : 'rgba(0,0,0,0.4)' }}>{name === null ? userData && userData.name : name}</Text>
                        </Left>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>

                    {/* APELLIDO */}
                    <ListItem
                        disabled={isLoading}
                        onPress={() => { this.setModalVisibleLastName(true) }}
                        style={{ height: 50 }}>
                        <Left>
                            <Text
                                allowFontScaling={false}
                                minimumFontScale={wp(4)}
                                style={{ fontSize: wp(4), color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.darkFont, fontWeight: "700" }}>Last Name: </Text>
                            <Text
                                allowFontScaling={false}
                                minimumFontScale={wp(4)}
                                style={{ fontSize: wp(4), color: isLoading ? colorsPalette.opaqueWhite : 'rgba(0,0,0,0.4)' }}>{lastname === null ? userData && userData.lastname : lastname}</Text>
                        </Left>
                        <Right>
                            <Icon active name="arrow-forward" />
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
                        _updateName={this._updateName}
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
                        _updateLastName={this._updateLastName}
                        modalVisibleLastName={this.state.modalVisibleLastName}
                        setModalVisibleLastName={this.setModalVisibleLastName} />
                </Modal>
            </View>
        )
    }
}    
import React, { Component } from 'react'
import { Text, List, ListItem, Left, Right } from 'native-base'
import _ from 'lodash'


// Child Component
import ModalBasicInfo from './modal'

// This function show the basic info of user
export default class BasicInfo extends Component {
    state = {
        isDateTimePickerVisible: false,
        years: 0
    }
    render() {
        const { userData } = this.props
        return (
            <List style={{ width: "100%" }}>
                <ListItem style={{ alignItems: 'flex-end', justifyContent: 'flex-end', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                    <Text style={{ color: "#E0E0E0", fontWeight: "100" }}>Prizes {userData.formSubmitAPrizes.items.length}, Contest {userData.formCreateAContest.items.length}.</Text>
                </ListItem>

                {/* Email Address */}
                <ListItem>
                    <Left>
                        <Text style={{ color: "#333", fontWeight: "700" }}>Email Address: </Text>
                        <Text style={{ color: "#333", fontWeight: "100" }}>  {_.upperFirst(userData.email)}</Text>
                    </Left>
                    <Right />
                </ListItem>

                {/* Email Address */}
                <ListItem style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                    <Left>
                        <Text style={{ color: "#333", fontWeight: "700" }}>Username: </Text>
                        <Text style={{ color: "#333", fontWeight: "100" }}>  {_.upperFirst(userData.username)}</Text>
                    </Left>
                    <Right />
                </ListItem>


                <ModalBasicInfo
                    dataToChange={this.state.dataToChange} typeModal={this.state.typeModal}
                    headerTitle={this.state.headerTitle} dataWillChange={this.dataWillChange}
                    modalVisibleName={this.state.modalVisible}
                    setModalVisibleName={this.setModalVisible} />
            </List>
        )
    }
}
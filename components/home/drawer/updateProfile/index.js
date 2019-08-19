import React, { Component } from 'react'
import { Modal, View, Dimensions } from 'react-native'
import { Container, Content, Root } from 'native-base'
import _ from 'lodash'

// Child Component
import HeaderModifyProfile from './header'
import BasicInfo from './basicInfo/index'

const fullHeight = Dimensions.get('window').height;

// This component show the information user login
export default class ModifyProfile extends Component {
    state = { isLoading: false }

    _isLoading = (value) => {
        this.setState({ isLoading: value })
    }

    render() {
        const { isLoading } = this.state
        const { userData, modalVisibleModidfyProfile, _setModalVisibleModidfyProfile } = this.props
        return (
            <Modal
                transparent={false}
                hardwareAccelerated={true}
                transparent={false}
                visible={modalVisibleModidfyProfile}
                animationType="slide"
                presentationStyle="fullScreen"
                onRequestClose={() => null}>
                <Root>
                    <Container>
                        <HeaderModifyProfile isLoading={isLoading} userData={userData} _isLoading={this._isLoading} _setModalVisibleModidfyProfile={_setModalVisibleModidfyProfile} />

                        {/* Basic Info of User */}
                        <BasicInfo userData={userData} />
                    </Container>
                </Root>
            </Modal>
        )
    }
}

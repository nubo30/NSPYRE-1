import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { Container } from 'native-base'
import _ from 'lodash'

// Child Component
import HeaderModifyProfile from './header'
import BasicInfo from './basicInfo/index'

// This component show the information user login
class ModifyProfile extends Component {
    state = { isLoading: false }

    _isLoading = (value) => {
        this.setState({ isLoading: value })
    }

    render() {
        const { isLoading } = this.state
        const userData = this.props.navigation.getParam('userData');
        return (
            <Container>
                <HeaderModifyProfile isLoading={isLoading} userData={userData} _isLoading={this._isLoading} />

                {/* Basic Info of User */}
                <BasicInfo isLoading={isLoading} userData={userData} _isLoading={this._isLoading} />
            </Container>
        )
    }
}

export default withNavigation(ModifyProfile)

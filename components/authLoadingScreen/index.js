import React, { Component } from 'react'
import { Text, View, Spinner } from 'native-base'
import { Auth } from 'aws-amplify'

export default class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        try {
            await Auth.currentAuthenticatedUser({ bypassCache: false })
            this.props.navigation.navigate('Home');
        } catch (error) {
            this.props.navigation.navigate('Auth');
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Spinner color="#333" size="large" />
                <Text allowFontScaling={false}>Loading...</Text>
            </View>
        )
    }
}


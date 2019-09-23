import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Text, View, Spinner } from 'native-base'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { connect } from 'react-redux'


// GRAPHQL
import * as queries from "../../src/graphql/queries"

// Redux
import { isNotExistUserInTheAPI } from "../../store/actions/authActions"

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        const { isNotExistUserInTheAPI } = this.props
        AsyncStorage.getItem('@storage_Key', async (err, result) => {
            if (result === null) {
                // Se redirecciona al slide de introducción
                this.props.navigation.navigate('IntroToApp');
            } else {
                // Se redirecciona directamente a la app
                try {
                    const session = await Auth.currentAuthenticatedUser({ bypassCache: false })
                    const { data } = await API.graphql(graphqlOperation(queries.getUser, { id: session.id || session.attributes.sub }))
                    if (data.getUser !== null) {
                        this.props.navigation.navigate('Engage');
                    } else if (data.getUser === null) {
                        isNotExistUserInTheAPI(2)
                        this.props.navigation.navigate('Auth');
                    }
                } catch (error) {
                    this.props.navigation.navigate('Auth');
                }
            }
        });
        AsyncStorage.setItem('@storage_Key', JSON.stringify({ "value": "true" }));
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

const mapDispatchToProps = (dispatch) => {
    return {
        isNotExistUserInTheAPI: (isNotExistUserInTheAPIParams) => dispatch(isNotExistUserInTheAPI(isNotExistUserInTheAPIParams))
    }
}

export default connect(null, mapDispatchToProps)(AuthLoadingScreen)
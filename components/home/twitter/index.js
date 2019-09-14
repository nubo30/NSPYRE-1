import React from 'react'
import {
    View,
    Text,
    Alert,
    StyleSheet
} from 'react-native'
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Constants from 'expo-constants'

// credentials
import { twitterCredentials } from '../../global/socialNetWorksCredentials'

/* import twitter */
import twitter, { TWLoginButton } from 'react-native-simple-twitter'

export default class TwitterPermissions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisible: false,
            authUrl: null
        }
        twitter.setConsumerKey(twitterCredentials.apiKey, twitterCredentials.apiKeySecret)
    }

    onGetAccessToken = ({ oauth_token, oauth_token_secret }) => {
        this.props.dispatch({ type: "TOKEN_SET", token: oauth_token, token_secret: oauth_token_secret })
    }

    onSuccess = (user) => {
        this.props.dispatch({ type: "USER_SET", user: user })

        Alert.alert(
            "Success",
            "ログインできました",
            [{ text: 'Go HomeScreen' }]
        )
    }

    onClose = (e) => {
        console.log("press close button")
    }

    onError = (err) => {
        console.log(err)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Login</Text>
                </View>
                <TWLoginButton
                    renderHeader={(props) =>
                        <Header>
                            <Left>
                                <Button transparent onPress={() => props.onClose()}>
                                    <Icon name='arrow-back' />
                                </Button>
                            </Left>
                            <Body>
                                <Title>Header</Title>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Icon name='menu' />
                                </Button>
                            </Right>
                        </Header>}
                    children={
                        <Button onPress={(props) => props.onPress()}>
                            <Text>Open Twitter</Text>
                        </Button>
                    }
                    onGetAccessToken={this.onGetAccessToken}
                    onSuccess={this.onSuccess}
                    closeText="閉じる"
                    closeTextStyle={styles.loginCloseText}
                    onClose={this.onClose}
                    onError={this.onError}>
                    <Text>Twitter</Text>
                </TWLoginButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.manifest.primaryColor
    },
    title: {
        flex: 1,
        padding: 64
    },
    titleText: {
        textAlign: "center",
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold"
    },
    loginContainer: {
        paddingHorizontal: 32,
        marginBottom: 64,
        backgroundColor: "red"
    },
    loginButton: {
        backgroundColor: "#fff",
        paddingVertical: 16,
        borderRadius: 64,
        overflow: "hidden"
    },
    loginButtonText: {
        color: Constants.manifest.primaryColor,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
    loginCloseText: {
        color: "#fff",
        fontWeight: "bold"
    }
})

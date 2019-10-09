import React, { Component } from 'react';
import * as Facebook from 'expo-facebook';
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { withNavigation } from 'react-navigation'
import { Button, Icon, Text, View, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import _ from 'lodash'

import { fBCredentials } from "../../../global/socialNetWorksCredentials"

// colors
import { colorsPalette } from '../../../global/static/colors'

// GRPAHQL
import * as queries from '../../../../src/graphql/queries'

class FbButton extends Component {
    state = { isLoadingFb: false }

    async _openBroweserForLoginWithFacebook() {
        const { _changeSwiper, navigation, _dataUser } = this.props
        try {
            const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync(fBCredentials.appId, { permissions: ['public_profile'] });
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,picture,last_name`);
                const { email, name, picture, last_name } = await response.json()
                this.setState({ isLoadingFb: true })
                await Auth.federatedSignIn('facebook', { token, expires_at: expires })
                    .then(credentials => {
                        const input = { email, name, avatar: picture.data.url, id: credentials._identityId, last_name, tokenfb: token }
                        API.graphql(graphqlOperation(queries.getUser, { id: credentials._identityId })).then(({ data }) => {
                            if (data.getUser === null) {
                                _dataUser(input)
                                _changeSwiper(1)
                                this.setState({ isLoadingFb: false })
                            } else {
                                navigation.navigate('Home')
                            }
                        }).catch((e) => console.log('Error', e))
                    }).catch(e => {
                        console.log(e);
                    });
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    render() {
        const { isLoadingFb } = this.state
        return (
            <Button
                disabled={isLoadingFb}
                onPress={() => this._openBroweserForLoginWithFacebook()}
                iconRight style={{
                    width: "100%",
                    alignSelf: 'flex-end',
                    backgroundColor: colorsPalette.fbColor,
                    shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 1 }, shadowOpacity: 1,
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingLeft: 15 }}>
                    <Icon name='logo-facebook' style={{ color: colorsPalette.secondaryColor, fontSize: wp(8) }} />
                    <Text allowFontScaling={false} style={{ left: 10, color: colorsPalette.secondaryColor, fontWeight: 'bold', fontSize: wp(4) }}>Continue with facebook</Text>
                </View>
                {isLoadingFb ? <Spinner color={colorsPalette.secondaryColor} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
            </Button>
        );
    }
}

export default withNavigation(FbButton)
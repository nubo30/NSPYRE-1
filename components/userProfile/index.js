import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Title, Content, Button, Left, Icon, Text, View, Thumbnail } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import UserAvatar from "react-native-user-avatar"
import flatten from 'lodash/flatten'
import startCase from 'lodash/startCase'
import lowerCase from 'lodash/lowerCase'
import values from 'lodash/values'
import omitDeep from 'omit-deep'

// GRAPFQL
import * as queries from '../../src/graphql/queries'

import { MyStatusBar } from '../global/statusBar/index'

// Child Component
import UserProfilePlaceholder from './placeholder'

class UserProfile extends Component {
    static navigationOptions = { header: null };
    state = { userData: null }

    componentDidMount() {
        this._getUsetData()
    }

    _getUsetData = async () => {
        const { navigation } = this.props
        const userId = navigation.getParam('userId')
        try {
            const { data } = await API.graphql(graphqlOperation(queries.getUser, { id: userId }))
            this.setState({ userData: data.getUser })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { userData } = this.state
        const { navigation } = this.props
        return userData !== null ? (
            <Container>
                <Header transparent style={{ backgroundColor: '#E91E63' }}>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                            transparent
                            onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: '#FFF', }} />
                            <Text allowFontScaling={false} style={{ color: "#FFF", fontSize: wp(4) }}>Back</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(6), alignSelf: 'center' }}>{startCase(lowerCase(`${userData.name} ${userData.lastname}`))}</Title>
                    </Left>
                </Header>
                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
                    <Grid>
                        <Row size={25} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#E91E63' }}>
                            {userData.avatar !== null
                                ? <Thumbnail style={{ width: 105, height: 105, borderRadius: 52.5 }} source={{ uri: userData.avatar }} />
                                : <UserAvatar size="105" name={userData.name} />}
                        </Row>
                        <Row size={10} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#E91E63' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(5), color: '#FFF', fontWeight: 'bold' }}>{userData && userData.engage.items.length ? userData.engage.items[0].aboutTheOccupations.occupation : "..."}</Text>
                        </Row>
                        <Row size={10} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#E91E63' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: '#F48FB1', fontWeight: 'bold' }}>{userData && userData.engage.items.length ? `${userData.engage.items[0].aboutThePersonality.location.city}, ${userData.engage.items[0].aboutThePersonality.location.country}` : "..."}</Text>
                        </Row>
                        <Row size={65} style={{ flexDirection: 'column' }}>
                            <Content padder showsVerticalScrollIndicator={false}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(5), fontWeight: 'bold', marginBottom: 20, marginTop: 20 }}>About me</Text>
                                <View style={{ flexDirection: 'row', right: 5, flexWrap: 'wrap', width: '100%' }}>
                                    <Text>Without descriptions</Text>
                                </View>
                            </Content>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        ) : <UserProfilePlaceholder />
    }
}

export default withNavigation(UserProfile)
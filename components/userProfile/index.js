import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, View, Thumbnail } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import UserAvatar from "react-native-user-avatar"
import _ from 'lodash'
import { normalizeEmail } from 'validator'

// GRAPFQL
import * as queries from '../../src/graphql/queries'

import { MyStatusBar } from '../Global/statusBar/index'

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
            delete data.getUser.engage.items[0].interests.political
            delete data.getUser.engage.items[0].interests.vote
            await this.setState({ userData: data.getUser })
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
                        <Title allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(6), alignSelf: 'center' }}>{_.startCase(_.lowerCase(`${userData.name} ${userData.lastname}`))}</Title>
                    </Left>
                </Header>
                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
                    <Grid>
                        <Row size={25} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#E91E63' }}>
                            {userData.avatar !== null
                                ? <Thumbnail style={{ width: 105, height: 105, borderRadius: 52.5 }} source={{ uri: userData.avatar }} />
                                : <UserAvatar size="105" name={userData.name} />}
                        </Row>
                        <Row size={5} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#E91E63' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(5), color: '#FFF', fontWeight: 'bold' }}>{userData.engage.items[0].aboutTheOccupations.occupation}</Text>
                        </Row>
                        <Row size={5} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#E91E63' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: '#F48FB1', fontWeight: 'bold' }}>{`${userData.engage.items[0].aboutThePersonality.location.city}, ${userData.engage.items[0].aboutThePersonality.location.country}`}</Text>
                        </Row>

                        <Row size={10} style={{ backgroundColor: '#E91E63', justifyContent: 'center' }}>
                            <Text allowFontScaling={false} style={{ top: 5, color: '#F48FB1', fontSize: wp(3) }}>Contests {userData.createContest.items.length}, Prizes {userData.submitPrize.items.length}</Text>
                        </Row>

                        <Row size={65} style={{ paddingRight: 20, paddingLeft: 20, flexDirection: 'column' }}>
                            <Content padder contentContainerStyle={{ justifyContent: 'space-evenly' }} showsVerticalScrollIndicator={false}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(5), fontWeight: 'bold', marginTop: 10, marginBottom: 15 }}>About me</Text>
                                <Text allowFontScaling={false} style={{ fontSize: wp(4), marginBottom: 20 }}>Lorem ipsum dolor sit amet consectetur adipiscing, elit volutpat felis metus primis luctus aliquet, augue vivamus libero himenaeos maecenas. Id blandit lectus fermentum ullamcorper curabitur euismod suspendisse massa bibendu.</Text>
                                <Text allowFontScaling={false} style={{ fontSize: wp(5), fontWeight: 'bold', marginBottom: 20 }}>Hobbies and preferences</Text>
                                <View style={{ flexDirection: 'row', right: 5, flexWrap: 'wrap' }}>
                                    {_.flatten(_.values(userData.engage.items[0].interests)).map((item, key) =>
                                        <View key={key} style={{ backgroundColor: '#E0E0E0', padding: 5, borderRadius: 5, margin: 5, height: 30 }}>
                                            <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', color: '#333' }}>{item}</Text>
                                        </View>)}
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
import React, { Component } from 'react';
import { Alert, FlatList, Modal } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Title, Content, Button, Left, Icon, Text, View, ListItem, Separator, Right, Toast, List, Body } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import moment from 'moment'
import _ from 'lodash'
import truncate from 'lodash/truncate'
import replace from 'lodash/replace'

// Colors
import { colorsPalette } from '../../global/static//colors'

// Child Component
import Statistics from "./statistics/index"

import { MyStatusBar } from '../../global/statusBar/index'
// Graphql
import * as mutations from '../../../src/graphql/mutations'

export default class ContestDataStatistics extends Component {

    state = {
        isLoading: false,
        modalVisibleShowTags: false,
        modalVisibleShowStatistics: false
    }

    _deleteAudiente = async (id) => {
        const { contest } = this.props
        try {
            await API.graphql(graphqlOperation(mutations.deleteAudience, { input: { id } }))
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
            Toast.show({ text: "Successfully removed.", buttonText: "Okay", type: "success", duration: 3000, position: 'top' })
        } catch (error) {
            Toast.show({ text: "Oops! An error has occurred, try again, please!", buttonText: "Okay", type: "danger", duration: 3000, position: 'top' })
            this.setState({ isLoading: false })
        }
    }

    _modalVisibleShowStatistics = (value) =>
        this.setState({ modalVisibleShowStatistics: value })

    render() {
        const {
            // Actions
            modalVisibleShowTags,
            modalVisibleShowStatistics
        } = this.state
        const {
            // Data
            contest,
            userData,
            swiperIndex,
            _changeSwiperRoot,
            _setModalVisibleAudience,

        } = this.props
        let audience = contest.audience.items.map(item => ({ aboutTheOccupations: JSON.parse(item.aboutTheOccupations), aboutThePersonality: JSON.parse(item.aboutThePersonality), users: JSON.parse(item.usersFound).length }))
        return (
            <Container style={{ backgroundColor: colorsPalette.opaqueWhite2 }}>
                <Header style={{ backgroundColor: colorsPalette.secondaryColor }}>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button transparent onPress={() => _changeSwiperRoot(-1)}>
                            <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor, }} />
                            <Text allowFontScaling={false}
                                minimumFontScale={wp(4)}
                                allowFontScaling={false}
                                style={{ color: colorsPalette.primaryColor }}>Principal</Text>
                        </Button>
                        <Title
                            minimumFontScale={wp(6.5)}
                            allowFontScaling={false}
                            style={{ fontSize: wp(6.5), color: colorsPalette.primaryColor }}>About the contest</Title>
                    </Left>
                    <Right>
                        <Text allowFontScaling={false}
                            minimumFontScale={wp(3)}
                            allowFontScaling={false}
                            style={{ color: '#3333', fontSize: wp(3), top: 2 }}>Participants, <Text allowFontScaling={false}
                                minimumFontScale={wp(3)}
                                allowFontScaling={false}
                                style={{ fontSize: wp(3), color: colorsPalette.darkFont, fontWeight: 'bold' }}>{contest.participants.items.length}</Text></Text>
                    </Right>
                </Header>
                {swiperIndex === 1 && <MyStatusBar backgroundColor={colorsPalette.darckSB} barStyle="dark-content" />}
                <Content>
                    <List style={{ backgroundColor: colorsPalette.secondaryColor }}>
                        <Separator bordered style={{ backgroundColor: colorsPalette.opaqueWhite2, borderTopColor: colorsPalette.opaqueWhite2 }}>
                            <Text allowFontScaling={false}
                                allowFontScaling={false}
                                style={{ color: colorsPalette.darkFont }}>STATISTICS</Text>
                        </Separator>
                        <ListItem last icon onPress={() => this._modalVisibleShowStatistics(true)}>
                            <Left>
                                <Button style={{ backgroundColor: "#FF9501" }}>
                                    <Icon name="show-chart" type="MaterialIcons" />
                                </Button>
                            </Left>
                            <Body>
                                <Text allowFontScaling={false} minimumFontScale={wp(4)} style={{ fontSize: wp(4) }} allowFontScaling={false}>Look at the statistics of your contest</Text>
                            </Body>
                            <Right>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>

                        <Separator bordered style={{ backgroundColor: colorsPalette.opaqueWhite2, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text allowFontScaling={false}
                                allowFontScaling={false}
                                style={{ color: colorsPalette.darkFont }}>AUDIENCE</Text>
                            {audience.length
                                ? <Button style={{ top: -10 }} onPress={() => _setModalVisibleAudience(true, false)} transparent small>
                                    <Text allowFontScaling={false}
                                        allowFontScaling={false}
                                        minimumFontScale={wp(3)}
                                        style={{ color: colorsPalette.primaryColor }}>Create another audience</Text>
                                </Button>
                                : <View />}
                        </Separator>

                        <ListItem last icon onPress={() => this.setState({ modalVisibleShowTags: true })}>
                            <Left>
                                <Button style={{ backgroundColor: "#448AFF" }}>
                                    <Icon type="AntDesign" name="tags" />
                                </Button>
                            </Left>
                            <Body>
                                <Text allowFontScaling={false}
                                    minimumFontScale={wp(4)}
                                    style={{ fontSize: wp(4) }}
                                    allowFontScaling={false}
                                >Show the tags of the audiences created</Text>
                            </Body>
                            <Right>
                                <Text allowFontScaling={false}
                                    minimumFontScale={wp(4)}
                                    style={{ fontSize: wp(4) }}
                                    allowFontScaling={false}
                                >{audience.length} created</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </Content>

                {/* Modal para ver los tags de la audiencia */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisibleShowTags}
                    onRequestClose={() => { }}>
                    <Container>
                        <Header style={{ backgroundColor: colorsPalette.secondaryColor }}>
                            <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Button transparent onPress={() => this.setState({ modalVisibleShowTags: false })}>
                                    <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor, }} />
                                    <Text allowFontScaling={false} allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(4) }}>Back</Text>
                                </Button>
                            </Left>
                            <Right />
                        </Header>
                        {audience.length
                            ? <FlatList
                                data={audience}
                                renderItem={({ item, index }) => (
                                    <Collapse>
                                        <CollapseHeader>
                                            <Separator bordered style={{ backgroundColor: colorsPalette.primaryColor }}>
                                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                                    <View style={{ flex: 0.5, flexDirection: 'row' }}>
                                                        <Text allowFontScaling={false} style={{ color: colorsPalette.secondaryColor, fontSize: wp(3) }}>AUDIENCE TAG #{index + 1}</Text>
                                                        <Text allowFontScaling={false} style={{ color: colorsPalette.secondaryColor, fontSize: wp(3), left: 10 }}>USERS: {item.users}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                                                        <Text allowFontScaling={false} style={{ color: colorsPalette.secondaryColor, right: 10, fontSize: wp(3) }}>{`${moment(item.createdAt).format('L')}`}</Text>
                                                    </View>
                                                </View>
                                            </Separator>
                                        </CollapseHeader>

                                        <CollapseBody last>
                                            <List>
                                                {item.aboutTheOccupations.length ? item.aboutTheOccupations.map((item, key) =>
                                                    Object.keys(item).length !== 0 &&
                                                    <ListItem key={key} onPress={() => Alert.alert(
                                                        `${Object.keys(item)}`,
                                                        `${replace(Object.values(item), new RegExp(",", "g"), ", ")}`,
                                                        [{ text: 'Ok', onPress: () => { }, style: 'cancel' }],
                                                        { cancelable: false })}>
                                                        <Left>
                                                            <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>{Object.keys(item)}</Text>
                                                        </Left>
                                                        <Right>
                                                            <Text allowFontScaling={false}>{replace(truncate(Object.values(item), { length: 10, separator: '...' }), new RegExp(",", "g"), ", ")}</Text>
                                                        </Right>
                                                    </ListItem>) : null}
                                                {item.aboutThePersonality.length ? item.aboutThePersonality.map((item, key) =>
                                                    Object.keys(item).length !== 0 &&
                                                    <ListItem key={key} onPress={() => Alert.alert(
                                                        `${Object.keys(item)}`,
                                                        `${replace((Object.values(item).map(item => (JSON.stringify(Object.keys(item)) === JSON.stringify(["gte", "lte"])) ? `${item.gte} - ${item.lte}` : item)), new RegExp(",", "g"), ", ")}`,
                                                        [{ text: 'Ok', onPress: () => { }, style: 'cancel' }],
                                                        { cancelable: false })}>
                                                        <Left>
                                                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', color: colorsPalette.darkFont }}>{Object.keys(item)}</Text>
                                                        </Left>
                                                        <Right>
                                                            <Text allowFontScaling={false}>{replace(truncate((Object.values(item).map(item => (JSON.stringify(Object.keys(item)) === JSON.stringify(["gte", "lte"])) ? `${item.gte} - ${item.lte}` : item)), { length: 10, separator: '...' }), new RegExp(",", "g"), ", ")}</Text>
                                                        </Right>
                                                    </ListItem>) : null}
                                            </List>
                                        </CollapseBody>

                                    </Collapse>
                                )}
                                keyExtractor={item => item.createdAt} />
                            : <View style={{ alignItems: 'center', flex: 1, height: 200, top: 50 }}>
                                <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontSize: wp(4.5), fontWeight: 'bold' }}>You don't have a selected audience yet</Text>
                                <Button
                                    onPress={() => { this.setState({ modalVisibleShowTags: false }); _setModalVisibleAudience(true, false) }}
                                    small style={{ alignSelf: 'center', backgroundColor: colorsPalette.primaryColor, top: 10 }}>
                                    <Text allowFontScaling={false}>Create one now!</Text>
                                </Button>
                            </View>}
                    </Container>
                </Modal>

                {/* Modal de las estadisticas */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisibleShowStatistics}
                    onRequestClose={() => { }}>
                    <Statistics
                        // Data
                        contest={contest}
                        userData={userData}

                        // Functions
                        _getContestFromAWS={this.props._getContestFromAWS}
                        _modalVisibleShowStatistics={this._modalVisibleShowStatistics}
                    />
                </Modal>
            </Container>
        );
    }
}
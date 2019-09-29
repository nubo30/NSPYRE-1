import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { Dimensions, FlatList } from 'react-native'
import { Container, Left, Body, Text, ListItem, Thumbnail, Button } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { PieChart } from 'react-native-chart-kit'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import _ from 'lodash'
import lowerCase from 'lodash/lowerCase'
import flatten from 'lodash/flatten'
import ReadMore from 'react-native-read-more-text';

const screenWidth = Dimensions.get('screen').width
// Colors
import { colorsPalette } from '../../../../global/static/colors'

class Likes extends Component {
    state = { heightView: 0, data: [], dataUser: [] }

    _applicationInWhichTheContestHasBeenShared = (value) => {
        if (typeof (value) !== 'string') {
            return value.map(item => {
                switch (item) {
                    case "ph.telegra.Telegraph.Share": return ({ appName: "Telegram", color: colorsPalette.tgColor })
                    case "net.whatsapp.WhatsApp.ShareExtension": return ({ appName: "WhatsApp", color: colorsPalette.waColor })
                    case "com.google.hangouts.ShareExtension": return ({ appName: "Hangouts", color: colorsPalette.hgColor })
                    case "com.atebits.Tweetie2.ShareExtension": return ({ appName: "Twitter", color: colorsPalette.ttColor })
                    case "com.apple.UIKit.activity.PostToFacebook": return ({ appName: "Facebook", color: colorsPalette.fbColor })
                    case "com.facebook.Messenger.ShareExtension": return ({ appName: "Messenger", color: colorsPalette.mgColor })
                    case "com.tinyspeck.chatlyio.share": return ({ appName: "Slack", color: colorsPalette.scColor })
                    case "com.google.Gmail.ShareExtension": return ({ appName: "Gmail", color: colorsPalette.glColor })
                    case "com.apple.UIKit.activity.Message": return ({ appName: "SMS", color: colorsPalette.smsColor })
                    default: break;
                }
            })
        } else if (typeof (value) === 'string') {
            switch (value) {
                case "ph.telegra.Telegraph.Share": return "Telegram"
                case "net.whatsapp.WhatsApp.ShareExtension": return "WhatsApp"
                case "com.google.hangouts.ShareExtension": return "Hangouts"
                case "com.atebits.Tweetie2.ShareExtension": return "Twitter"
                case "com.apple.UIKit.activity.PostToFacebook": return "Facebook"
                case "com.facebook.Messenger.ShareExtension": return "Messenger"
                case "com.tinyspeck.chatlyio.share": return "Slack"
                case "com.google.Gmail.ShareExtension": return "Gmail"
                case "com.apple.UIKit.activity.Message": return "SMS"
                default: break;
            }
        }
    }

    componentDidMount() {
        /*
            Se obtienen los días de la semana entre el intervalo de la fecha inicial
            y la fecha final del concurso (Contador).
        */
        const { item } = this.props
        const whereItHasBeenShared = this._applicationInWhichTheContestHasBeenShared(flatten(item.shareParticipants.items.map(item => item.whereItHasBeenShared)))
        const map = whereItHasBeenShared
            .map(item => JSON.stringify(item))
            .reduce((prev, cur) => { prev[cur] = (prev[cur] || 0) + 1; return prev; }, {});
        const arrayOfObj = Object.entries(map).map((e) => ({ [e[0]]: e[1] }));
        const data = arrayOfObj.map(item => ({ name: `${JSON.parse(Object.keys(item)).appName}`, color: JSON.parse(Object.keys(item)).color, legendFontColor: '#7F7F7F', legendFontSize: 15, population: Object.values(item)[0] }))

        // USER
        const result = _(item.shareParticipants.items.map(item => ({
            avatar: item.avatar,
            createdAt: item.createdAt,
            id: item.id,
            name: item.name,
            whereItHasBeenShared: this._applicationInWhichTheContestHasBeenShared(item.whereItHasBeenShared),
            idUserSharing: item.idUserSharing
        }))).groupBy('idUserSharing').values().map(
            (group) => ({ ...group[0], repeat: group.length, group })
        );
        const dataUser = JSON.parse(JSON.stringify(result)).map(item => ({ name: item.name, whereItHasBeenShared: item.group, createdAt: item.createdAt, id: item.id, idUserSharing: item.idUserSharing, avatar: item.avatar }))

        this.setState({ data, dataUser })
    }

    render() {
        const userData = this.props.navigation.getParam('userData')
        const { dataUser, data } = this.state
        const { item, _modalAction } = this.props
        return (
            <Container>
                <Grid>
                    <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Total shared: {item.shareParticipants.items && item.shareParticipants.items.length}</Text>
                    </Row>
                    <Row size={40} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <PieChart
                            data={data}
                            width={screenWidth - 50}
                            height={200}
                            chartConfig={{
                                backgroundColor: '#FFF',
                                backgroundGradientFrom: '#FFF',
                                backgroundGradientTo: '#FFF',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: () => "#D82B60",
                            }}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="10"
                            absolute />
                    </Row>
                    <Row size={50} style={{ flexDirection: 'column' }}>
                        {/* <Text style={{ alignSelf: 'center', color: "#3333" }}>Press day of the week for more information</Text> */}
                        <FlatList
                            data={dataUser}
                            renderItem={({ item }) => (
                                <ListItem avatar underlayColor={colorsPalette.secondaryColor}>
                                    <Button transparent style={{ position: 'absolute', zIndex: 1000, width: "100%" }} onPress={() => { _modalAction(false); this.props.navigation.navigate('UserProfile', { userId: item.idUserSharing }) }} />
                                    <Left>
                                        {item.avatar !== null
                                            ? <Thumbnail small source={{ uri: item.avatar }} />
                                            : <UserAvatar size="35" name={item.name} />}
                                    </Left>
                                    <Body>
                                        <Text allowFontScaling={false}>{userData.id === item.idUserSharing ? "You" : item.name}. <Text style={{ fontSize: wp(3), color: colorsPalette.gradientGray }}>Last was {lowerCase(moment(item.whereItHasBeenShared.slice(-1)[0].createdAt).calendar())}</Text></Text>
                                        <ReadMore numberOfLines={3}>
                                            <Text note allowFontScaling={false} style={{ fontWeight: 'normal' }}>
                                                Shared in {[...new Set((item.whereItHasBeenShared).map(item => item.whereItHasBeenShared[0].appName))].join(', ')}.
                                            </Text>
                                        </ReadMore>
                                    </Body>
                                </ListItem>
                            )}
                            keyExtractor={items => items.createdAt} />
                    </Row>
                </Grid>
            </Container>
        );
    }
}

export default withNavigation(Likes)
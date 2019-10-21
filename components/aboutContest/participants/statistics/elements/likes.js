import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { Dimensions, FlatList } from 'react-native'
import { Container, Left, Body, Text, View, List, ListItem, Thumbnail, Separator, Button } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import _ from 'lodash'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import UserAvatar from "react-native-user-avatar"
import PureChart from 'react-native-pure-chart';


import { colorsPalette } from '../../../../global/static/colors'
const screenWidth = Dimensions.get('screen').width

class Likes extends Component {
    state = { dataUsers: [], dataGraph: [{ x: '0', y: 0 }] }

    componentDidMount() {
        const { contest, item } = this.props
        /*
        
            Se obtienen los días de la semana entre el intervalo de la fecha inicial
            y la fecha final del concurso (Contador).

        */

        const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        let startDay = new Date(new Date(contest.timer.start).getFullYear(), new Date(contest.timer.start).getMonth(), new Date(contest.timer.start).getDate());
        let endDay = new Date(new Date(contest.timer.end).getFullYear(), new Date(contest.timer.end).getMonth(), new Date(contest.timer.end).getDate());
        let weekdays = [] // Días de la semana
        let arrayNumberdays = []
        while (startDay <= endDay) {
            weekdays.push(DAYS[startDay.getDay()])
            startDay = new Date(startDay.getTime() + (24 * 60 * 60 * 1000)); // Días en formato date
            arrayNumberdays.push(startDay.getDate()); // Días en formato date        
        }

        const DAYSUSERS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const resultUsers = _(item.likesToParticipants.items && item.likesToParticipants.items.map(item => ({ day: `${DAYSUSERS[new Date(item.createdAt).getDay()]}`, users: item })))
            .groupBy('day').values().map(
                (group) => ({ ...group[0], group })
            );


        const dateAllLikes = item.likesToParticipants.items && item.likesToParticipants.items.map(item => ({ date: moment(item.createdAt).format('l') }))
        const dataAllLikes = _(dateAllLikes).map(item => ({ x: item.date })).groupBy('x').values().map((group) => ({ ...group[0], y: group.length }));
        let sampleData = [{ color: colorsPalette.primaryColor, data: JSON.parse(JSON.stringify(dataAllLikes)) }]
        this.setState({ dataGraph: sampleData, dataUsers: resultUsers })
    }
    render() {
        const { dataGraph, dataUsers } = this.state
        const userData = this.props.navigation.getParam('userData')
        const { item, _modalAction } = this.props
        return (
            <Container>
                <Grid>
                    <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Total Likes: {item.likesToParticipants.items && item.likesToParticipants.items.length}</Text>
                    </Row>
                    <Row size={40}>
                        <View style={{ width: screenWidth }}>
                            <PureChart data={dataGraph} type="line" height={180} />
                        </View>
                    </Row>

                    <Row size={50} style={{ flexDirection: 'column' }}>
                        <Text style={{ alignSelf: 'center', color: "#333", fontSize: wp(2.5) }}>Press the day of the week BELOW for more information</Text>
                        <FlatList
                            data={JSON.parse(JSON.stringify(dataUsers))}
                            renderItem={({ item }) => (
                                <View style={{ paddingLeft: 20 }}>
                                    <Collapse>
                                        <CollapseHeader>
                                            <Separator style={{ backgroundColor: '#FFF' }}>
                                                <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: "#333" }}>{item.day}</Text>
                                            </Separator>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            {item.group.map((item, key) =>
                                                <List key={key}>
                                                    <ListItem avatar>
                                                        <Left>
                                                            {item.users.avatar !== null
                                                                ? <Thumbnail small source={{ uri: item.users.avatar }} />
                                                                : <UserAvatar size="35" name={item.users.name} />}
                                                        </Left>
                                                        <Body style={{ top: 5 }}>
                                                            <Text allowFontScaling={false}>{userData.id === item.users.idUserLike ? "You" : item.users.name}</Text>
                                                            <Text allowFontScaling={false} note style={{ fontSize: wp(3), fontWeight: 'normal' }}>Liked your post. {moment(item.users.createdAt).calendar()}</Text>
                                                        </Body>
                                                    </ListItem>
                                                </List>)}
                                        </CollapseBody>
                                    </Collapse>
                                </View>
                            )}
                            keyExtractor={item => JSON.stringify(item)} />
                    </Row>
                </Grid>
            </Container>
        );
    }
}

export default withNavigation(Likes)
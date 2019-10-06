import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { Dimensions, ScrollView, FlatList } from 'react-native'
import { Container, Left, Body, Text, View, List, ListItem, Thumbnail, Separator, Button } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { BarChart } from 'react-native-chart-kit'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import _ from 'lodash'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import UserAvatar from "react-native-user-avatar"

const screenWidth = Dimensions.get('screen').width

class Likes extends Component {
    state = { heightView: 0 }
    render() {
        const userData = this.props.navigation.getParam('userData')
        const { heightView } = this.state
        const { contest, item, _modalAction } = this.props
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
        const map = item.likesToParticipants.items && item.likesToParticipants.items
            .map(item => new Date(item.createdAt).getDate())
            .map(item => item)
            .reduce((prev, cur) => { prev[cur] = (prev[cur] || 0) + 1; return prev; }, {});
        const check = Object.entries(map).map((e) => ({ [e[0]]: e[1] }));
        const list = arrayNumberdays.map((item) => ({ [item]: 0 }))
        const updateList = check.reduce((acc, val) => {
            const key = Object.keys(val)[0];
            if (!acc[key]) acc[key] = 0
            acc[key] = acc[key] + val[key]
            return acc
        }, {})
        const dataToConvertToArrayOfString = list.map((val) => {
            var key = Object.keys(val)[0];
            return { [key]: val[key] + (updateList[key] || 0) }
        })
        const dataShowInTheGraph = dataToConvertToArrayOfString.map(item => (Object.values(item)[0]))

        const DAYSUSERS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const resultUsers = _(item.likesToParticipants.items && item.likesToParticipants.items.map(item => ({ day: `${DAYSUSERS[new Date(item.createdAt).getDay()]}`, users: item })))
            .groupBy('day').values().map(
                (group) => ({ ...group[0], group })
            );
        const data = {
            labels: weekdays,
            datasets: [{ data: dataShowInTheGraph }]
        }
        return (
            <Container>
                <Grid>
                    <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Total Likes: {item.likesToParticipants.items && item.likesToParticipants.items.length}</Text>
                    </Row>
                    <Row size={40}>
                        <View
                            style={{ alignItems: 'center', justifyContent: 'center', right: 10 }}
                            onLayout={(event) => { this.setState({ heightView: { height } = event.nativeEvent.layout }) }}>
                            <View style={{ backgroundColor: '#FFF', height: '100%', width: 35, position: 'absolute', zIndex: 1000, left: 0 }} />
                            <ScrollView horizontal>
                                {heightView.height ?
                                    <BarChart
                                        withVerticalLabels={true}
                                        withHorizontalLabels={false}
                                        data={data}
                                        width={screenWidth + (data.datasets[0].data.length > 6 ? (data.datasets[0].data.length * 25) : 0)}
                                        height={heightView.height}
                                        chartConfig={{
                                            decimalPlaces: 0, // optional, defaults to 2dp
                                            backgroundGradientFrom: '#FFF',
                                            backgroundGradientTo: '#FFF',
                                            backgroundGradientFromOpacity: 0,
                                            backgroundGradientToOpacity: 0,
                                            color: (opacity = 1) => `rgba(216, 43, 96, ${opacity})`,// rgb(216,43,96)
                                            strokeWidth: 0 // optional, default 3
                                        }} /> : null}
                            </ScrollView>
                        </View>
                    </Row>
                    <Row size={50} style={{ flexDirection: 'column' }}>
                        <Text style={{ alignSelf: 'center', color: "#3333" }}>Press day of the week for more information</Text>
                        <FlatList
                            data={JSON.parse(JSON.stringify(resultUsers))}
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
                                                        <Button transparent style={{ position: 'absolute', zIndex: 1000, width: "100%" }} onPress={() => { _modalAction(false); this.props.navigation.navigate('UserProfile', { userId: item.users.idUserLike }) }} />
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
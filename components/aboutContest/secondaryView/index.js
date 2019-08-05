import React, { Component } from 'react';
import { Alert } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Title, Content, Button, Left, Icon, Text, View, ListItem, Separator, Right, Toast, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import Swiper from 'react-native-swiper'
import moment from 'moment'

// Child Component
import { MyStatusBar } from '../../Global/statusBar/index'
import { randomColors } from '../../Global/data/index'
import CBarChart from '../charts/CBarChart'
import CPieChart from '../charts/CPieChart'

// Icons
import { Ionicons } from '@expo/vector-icons'

// Graphql
import * as mutations from '../../../src/graphql/mutations'

export default class ContestDataStatistics extends Component {

    state = {
        isLoading: false
    }

    _deleteAudiente = async (id) => {
        const { contest } = this.props
        try {
            await API.graphql(graphqlOperation(mutations.deleteAudience, { input: { id } }))
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
            Toast.show({ text: "Successfully removed.", buttonText: "Okay", type: "success", duration: 3000, position: 'top' })
        } catch (error) {
            Toast.show({ text: "Oops! An error has occurred, try again, please!", buttonText: "Okay", type: "danger", duration: 3000, position: 'top' })
        } finally {
            this.setState({ isLoading: false })
        }
    }

    render() {
        const { isLoading } = this.state
        const {
            // Data
            contest,

            swiperIndex,
            _changeSwiperRoot,
            _setModalVisibleAudience
        } = this.props
        let audience = contest.audience.items.map(item => { delete item.audience; delete item.createContest; return item })
        return (
            <Container style={{ backgroundColor: "#F5F5F5" }}>
                <Header transparent>
                    {!swiperIndex ? <MyStatusBar backgroundColor="#FFF" barStyle="light-content" /> : null}
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button transparent onPress={() => _changeSwiperRoot(-1)}>
                            <Icon name='arrow-back' style={{ color: '#E91E63', }} />
                            <Text style={{ color: "#E91E63" }}>Principal</Text>
                        </Button>
                        <Title style={{ fontSize: wp(7.5), color: '#E91E63' }}>More of interest</Title>
                    </Left>
                </Header>
                <Content contentContainerStyle={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: wp(10), left: 10, color: "#3333" }}>Statistics</Text>
                    <Swiper loop={false} showsButtons={false} showsPagination={false} style={{ height: 250 }}>
                        <CPieChart />
                        <CBarChart />
                    </Swiper>
                    <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', paddingTop: 25 }}>
                        <Text style={{ fontSize: wp(10), left: 10, color: "#3333" }}>Audiences</Text>
                        {audience.length ? <Button style={{ top: 5 }} onPress={() => _setModalVisibleAudience(true, false)} transparent small>
                            <Text style={{ color: '#E91E63' }}>Create another audience</Text>
                        </Button> : <View />}
                    </View>
                    <Text style={{ fontSize: wp(4), left: 10, color: "#3333", fontWeight: '100', fontStyle: 'italic' }}>The contest is spreading through these tags</Text>
                    <View style={{ padding: 10 }}>
                        {audience.length
                            ? <View>
                                {audience.map((items, key) =>
                                    <View key={key}>
                                        <Collapse>
                                            <CollapseHeader>
                                                <Separator bordered style={{ height: 43, backgroundColor: '#E91E63', justifyContent: 'space-between', flexDirection: 'row', padding: 10 }}>
                                                    <Text style={{ fontSize: wp(5.5), color: '#FFF' }}>Audience tags #{key + 1}</Text>
                                                    <Text style={{ fontSize: wp(3.5), fontWeight: '100', color: '#FFF', top: 3 }}>{`created ${moment(items.createdAt).startOf('hour').fromNow()}`}</Text>
                                                </Separator>
                                            </CollapseHeader>
                                            <CollapseBody last>
                                                <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                    <Text style={{ fontSize: wp(4.5), color: "#333" }}>General</Text>
                                                </ListItem>

                                                {/* AGE */}
                                                {items.ages[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.ages.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Ages selected</Text>
                                                    </ListItem>}


                                                {/* GENDER */}
                                                {items.genders[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.genders.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Genders selected</Text>
                                                    </ListItem>}

                                                {/* CATEOGRY CONTEST */}
                                                {items.categoryContest[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.categoryContest.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Categories selected</Text>
                                                    </ListItem>}

                                                <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                    <Text style={{ fontSize: wp(4.5), color: "#333" }}>Region</Text>
                                                </ListItem>

                                                {/* NACIONALITIES */}
                                                {items.nacionalities[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.nacionalities.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Nacionalities selected</Text>
                                                    </ListItem>}


                                                {/* REGIONAL IDENTIFY*/}
                                                {items.regionalIdentity[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.regionalIdentity.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Regional identity selected</Text>
                                                    </ListItem>}


                                                {/* COUNTRIES */}
                                                {items.countries[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.countries.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Countries selected</Text>
                                                    </ListItem>}

                                                <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                    <Text style={{ fontSize: wp(4.5), color: "#333" }}>Education</Text>
                                                </ListItem>

                                                {/* ACADEMIC LEVEL ACHIEVED */}
                                                {items.academicLevelAchieved[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.academicLevelAchieved.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Academic level achieved selected</Text>
                                                    </ListItem>}

                                                {/* UNIVERSITIES */}
                                                {items.universities[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.universities.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Universities selected</Text>
                                                    </ListItem>}

                                                {/* SCHOOLS */}
                                                {items.schools[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.schools.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Schools selected</Text>
                                                    </ListItem>}

                                                <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                    <Text style={{ fontSize: wp(4.5), color: "#333" }}>Persons</Text>
                                                </ListItem>

                                                {/* SEXUALITIES */}
                                                {items.sexualities[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.sexualities.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Regional identity selected</Text>
                                                    </ListItem>}

                                                {/* MARITAL STATUS */}
                                                {items.maritalStatus[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.maritalStatus.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Marital status selected</Text>
                                                    </ListItem>}

                                                {/* PARENTS CONDITIONS */}
                                                {items.parentalCondition[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.parentalCondition.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Parents conditions selected</Text>
                                                    </ListItem>}


                                                {/* AMOUNT OF CHILDREN */}
                                                {items.amountOfChildren[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.amountOfChildren.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Amount of children selected</Text>
                                                    </ListItem>}

                                                {/* AMOUNT OF SIMBLINGS */}
                                                {items.amountOfSimblings[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.amountOfSimblings.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Amount of simblings selected</Text>
                                                    </ListItem>}

                                                {/* OCCUPATIONS */}
                                                {items.ocuppation[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.ocuppation.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Ocupations selected</Text>
                                                    </ListItem>}

                                                {/* SOCIO ECONOMIC LEVEL */}
                                                {items.socioeconomicLevel[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.socioeconomicLevel.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Socioeconomic level selected</Text>
                                                    </ListItem>}

                                                <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                    <Text style={{ fontSize: wp(4.5), color: "#333" }}>Preferences</Text>
                                                </ListItem>

                                                {/* GENRE MUSICAL */}
                                                {items.musicalGenre[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.musicalGenre.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Genre musicals selected</Text>
                                                    </ListItem>}

                                                {/* SPORTS */}
                                                {items.sports[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.sports.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Sports selected</Text>
                                                    </ListItem>}


                                                {/* POLITICAL */}
                                                {items.politicalPeople[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.politicalPeople.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Political selected</Text>
                                                    </ListItem>}

                                                {/* VOTES */}
                                                {items.peopleWhoVote[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.peopleWhoVote.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Peoplee vote selected</Text>
                                                    </ListItem>}

                                                <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                    <Text style={{ fontSize: wp(4.5), color: "#333" }}>Others</Text>
                                                </ListItem>

                                                {/* RENT HOUSE */}
                                                {items.rentOrOwnHouse[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.rentOrOwnHouse.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Rent or own house selected</Text>
                                                    </ListItem>}

                                                {/* RENT CAR */}
                                                {items.rentOrOwnCar[0] === 'none'
                                                    ? null
                                                    : <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.rentOrOwnCar.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Rent or own car selected</Text>
                                                    </ListItem>}

                                                <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                    <Text style={{ fontSize: wp(4.5), color: "#333" }}>Prizes</Text>
                                                </ListItem>


                                                {/* PRIZES CATEGORY */}
                                                {items.categoryPrizes[0] === 'none'
                                                    ? null
                                                    : <ListItem last style={{ justifyContent: 'space-between' }}>
                                                        <Content horizontal showsHorizontalScrollIndicator={false}>
                                                            {items.categoryPrizes.map((elements, key) =>
                                                                <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                                </View>
                                                            )}
                                                        </Content>
                                                        <Text style={{ color: '#BDBDBD', left: 7 }}>Cateogry prizes selected</Text>
                                                    </ListItem>}

                                                <ListItem style={{ justifyContent: 'space-between', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                    <Left>
                                                        <Text style={{ alignSelf: 'flex-end', fontSize: wp(3), color: "#3333" }}>Your contest has searched 1,400 users with these tags.</Text>
                                                    </Left>
                                                    <Right>
                                                        <Button disabled={isLoading} transparent small icon style={{ alignSelf: 'flex-end' }} onPress={() => Alert.alert(
                                                            'Do you really want to eliminate this audience?',
                                                            'If you delete this audience you will also lose all users with whom it has been possible to match',
                                                            [
                                                                { text: 'No', onPress: () => null },
                                                                { text: 'Ok', onPress: () => { this._deleteAudiente(items.id); this.setState({ isLoading: true }) } },
                                                            ],
                                                            { cancelable: false },
                                                        )}>
                                                            {isLoading ? <Spinner size="small" color="#BDBDBD" /> : <Ionicons name='md-trash' style={{ fontSize: wp(5.5), color: "#F44336" }} />}
                                                        </Button>
                                                    </Right>
                                                </ListItem>
                                            </CollapseBody>

                                        </Collapse>
                                    </View>
                                )}
                            </View>
                            : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, height: 200 }}>
                                <Text style={{ color: '#333', fontSize: wp(4.5), fontWeight: 'bold' }}>You don't have a selected audience yet</Text>
                                <Button
                                    onPress={() => _setModalVisibleAudience(true, false)}
                                    small style={{ alignSelf: 'center', backgroundColor: '#E91E63', top: 10 }}>
                                    <Text>Create one now!</Text>
                                </Button>
                            </View>}
                    </View>
                </Content>
            </Container>
        );
    }
}
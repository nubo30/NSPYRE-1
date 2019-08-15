import React, { Component } from 'react';
import { Alert, FlatList, Modal } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Title, Content, Button, Left, Icon, Text, View, ListItem, Separator, Right, Toast, Spinner, List, Body, Switch } from 'native-base';
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
        isLoading: false,
        publicStatistics: false,
        modalVisibleShowTags: false
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

    render() {
        const { isLoading, publicStatistics, modalVisibleShowTags } = this.state
        const {
            // Data
            contest,

            swiperIndex,
            _changeSwiperRoot,
            _setModalVisibleAudience,

            // Actions
        } = this.props
        let audience = contest.audience.items.map(item => { delete item.audience; delete item.createContest; return item })

        return (
            <Container style={{ backgroundColor: "#F5F5F5" }}>
                <Header style={{ backgroundColor: '#FFF' }}>
                    {!swiperIndex ? <MyStatusBar backgroundColor="#FFF" barStyle="light-content" /> : null}
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button transparent onPress={() => _changeSwiperRoot(-1)}>
                            <Icon name='arrow-back' style={{ color: '#E91E63', }} />
                            <Text style={{ color: "#E91E63" }}>Principal</Text>
                        </Button>
                        <Title style={{ fontSize: wp(7.5), color: '#E91E63' }}>About the contest</Title>
                    </Left>
                    <Right>
                        <Text style={{ color: '#3333', fontSize: wp(3), top: 2 }}>Participants, <Text style={{ fontSize: wp(3), color: '#333', fontWeight: 'bold' }}>{contest.participants.items.length}</Text></Text>
                    </Right>
                </Header>
                <Content>
                    <List style={{ backgroundColor: '#FFF' }}>
                        <Separator bordered style={{ backgroundColor: '#F5F5F5', borderTopColor: 'rgba(0,0,0,0.0)' }} />
                        <ListItem last icon>
                            <Left>
                                <Button style={{ backgroundColor: "#FF9501" }}>
                                    <Icon name="show-chart" type="MaterialIcons" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Would you like to show the contest statistics after it is completed?</Text>
                            </Body>
                            <Right>
                                <Switch
                                    value={publicStatistics}
                                    onChange={() => this.setState({ publicStatistics: !publicStatistics })} />
                            </Right>
                        </ListItem>
                        <Separator bordered style={{ backgroundColor: '#F5F5F5', borderBottomColor: '#F5F5F5', height: 50 }}>
                            <Text style={{ color: '#3333' }}>
                                The information that will be displayed will be subject to limitations,
                            </Text>
                            <Text style={{ color: '#3333' }}>
                                doing this can also encourage the participation of users in your
                            </Text>
                            <Text style={{ color: '#3333' }}>
                                next contest!
                            </Text>
                        </Separator>
                        <Separator bordered style={{ backgroundColor: '#F5F5F5', borderTopColor: '#F5F5F5' }}>
                            <Text style={{ color: '#333' }}>STATISTICS</Text>
                        </Separator>

                        <View style={{ height: 280 }}>
                            <Swiper
                                prevButton={<Text style={{ color: '#E91E63', fontSize: wp(13) }}>‹</Text>}
                                nextButton={<Text style={{ color: '#E91E63', fontSize: wp(13) }}>›</Text>}
                                scrollEnabled={true}
                                loop={false}
                                showsButtons={true}
                                showsPagination={false}>
                                <CPieChart />
                                <CBarChart />
                            </Swiper>
                        </View>

                        <Separator bordered style={{ backgroundColor: '#F5F5F5', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#333' }}>AUDIENCE</Text>
                            {audience.length
                                ? <Button style={{ top: -10 }} onPress={() => _setModalVisibleAudience(true, false)} transparent small>
                                    <Text style={{ color: '#E91E63' }}>Create another audience</Text>
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
                                <Text>Show the tags of the audiences created</Text>
                            </Body>
                            <Right>
                                <Text>{audience.length} audience created</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisibleShowTags}
                    onRequestClose={() => { }}>
                    <Container>
                        <Header style={{ backgroundColor: '#FFF' }}>
                            <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Button transparent onPress={() => this.setState({ modalVisibleShowTags: false })}>
                                    <Icon name='arrow-back' style={{ color: '#E91E63', }} />
                                    <Text style={{ color: "#E91E63" }}>Back</Text>
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
                                            <Separator bordered style={{ backgroundColor: '#E91E63', justifyContent: 'space-between', flexDirection: 'row' }}>
                                                <Text style={{ color: '#FFF' }}>Audience tags #{index + 1}</Text>
                                                <Text style={{ fontWeight: '100', color: '#FFF', right: 10 }}>{`created ${moment(item.createdAt).startOf('hour').fromNow()}`}</Text>
                                            </Separator>
                                        </CollapseHeader>

                                        <CollapseBody last>
                                            <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                <Text style={{ fontSize: wp(4.5), color: "#333" }}>General</Text>
                                            </ListItem>

                                            {/* AGE */}
                                            {item.ages[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.ages.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Ages selected</Text>
                                                </ListItem>}


                                            {/* GENDER */}
                                            {item.genders[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.genders.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Genders selected</Text>
                                                </ListItem>}

                                            {/* CATEOGRY CONTEST */}
                                            {item.categoryContest[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.categoryContest.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Categories selected</Text>
                                                </ListItem>}


                                            {/* NACIONALITIES */}
                                            {item.nacionalities[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.nacionalities.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Nacionalities selected</Text>
                                                </ListItem>}


                                            {/* REGIONAL IDENTIFY*/}
                                            {item.regionalIdentity[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.regionalIdentity.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Regional identity selected</Text>
                                                </ListItem>}


                                            {/* COUNTRIES */}
                                            {item.countries[0] === 'none'
                                                ? null
                                                : <ListItem last style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.countries.map((elements, key) =>
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
                                            {item.academicLevelAchieved[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.academicLevelAchieved.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Academic level achieved selected</Text>
                                                </ListItem>}

                                            {/* UNIVERSITIES */}
                                            {item.universities[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.universities.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Universities selected</Text>
                                                </ListItem>}

                                            {/* SCHOOLS */}
                                            {item.schools[0] === 'none'
                                                ? null
                                                : <ListItem last style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.schools.map((elements, key) =>
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
                                            {item.sexualities[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.sexualities.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Regional identity selected</Text>
                                                </ListItem>}

                                            {/* MARITAL STATUS */}
                                            {item.maritalStatus[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.maritalStatus.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Marital status selected</Text>
                                                </ListItem>}

                                            {/* PARENTS CONDITIONS */}
                                            {item.parentalCondition[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.parentalCondition.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Parents conditions selected</Text>
                                                </ListItem>}


                                            {/* AMOUNT OF CHILDREN */}
                                            {item.amountOfChildren[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.amountOfChildren.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Amount of children selected</Text>
                                                </ListItem>}

                                            {/* AMOUNT OF SIMBLINGS */}
                                            {item.amountOfSimblings[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.amountOfSimblings.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Amount of simblings selected</Text>
                                                </ListItem>}

                                            {/* OCCUPATIONS */}
                                            {item.ocuppation[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.ocuppation.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Ocupations selected</Text>
                                                </ListItem>}



                                            {/* SOCIO ECONOMIC LEVEL */}
                                            {item.socioeconomicLevel[0] === 'none'
                                                ? null
                                                : <ListItem last style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.socioeconomicLevel.map((elements, key) =>
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
                                            {item.musicalGenre[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.musicalGenre.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Genre musicals selected</Text>
                                                </ListItem>}

                                            {/* SPORTS */}
                                            {item.sports[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.sports.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Sports selected</Text>
                                                </ListItem>}


                                            {/* POLITICAL */}
                                            {item.politicalPeople[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.politicalPeople.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Political selected</Text>
                                                </ListItem>}

                                            {/* VOTES */}
                                            {item.peopleWhoVote[0] === 'none'
                                                ? null
                                                : <ListItem last style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.peopleWhoVote.map((elements, key) =>
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
                                            {item.rentOrOwnHouse[0] === 'none'
                                                ? null
                                                : <ListItem style={{ justifyContent: 'space-between', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.rentOrOwnHouse.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text style={{ color: '#BDBDBD', left: 7 }}>Rent or own house selected</Text>
                                                </ListItem>}

                                            {/* RENT CAR */}
                                            {item.rentOrOwnCar[0] === 'none'
                                                ? null
                                                : <ListItem last style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.rentOrOwnCar.map((elements, key) =>
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
                                            {item.categoryPrizes[0] === 'none'
                                                ? null
                                                : <ListItem last style={{ justifyContent: 'space-between' }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.categoryPrizes.map((elements, key) =>
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
                                                            { text: 'Ok', onPress: () => { this._deleteAudiente(item.id); this.setState({ isLoading: true }) } },
                                                        ],
                                                        { cancelable: false },
                                                    )}>
                                                        {isLoading ? <Spinner size="small" color="#BDBDBD" /> : <Ionicons name='md-trash' style={{ fontSize: wp(5.5), color: "#F44336" }} />}
                                                    </Button>
                                                </Right>
                                            </ListItem>
                                        </CollapseBody>

                                    </Collapse>
                                )}
                                keyExtractor={item => item} />
                            : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, height: 200 }}>
                                <Text style={{ color: '#333', fontSize: wp(4.5), fontWeight: 'bold' }}>You don't have a selected audience yet</Text>
                                <Button
                                    onPress={() => _setModalVisibleAudience(true, false)}
                                    small style={{ alignSelf: 'center', backgroundColor: '#E91E63', top: 10 }}>
                                    <Text>Create one now!</Text>
                                </Button>
                            </View>}
                    </Container>
                </Modal>
            </Container>
        );
    }
}
import React, { Component } from 'react';
import { Alert, FlatList, Modal } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Title, Content, Button, Left, Icon, Text, View, ListItem, Separator, Right, Toast, Spinner, List, Body, Switch } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import Swiper from 'react-native-swiper'
import moment from 'moment'
import _ from 'lodash'

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
                            <Text allowFontScaling={false}
                                minimumFontScale={wp(4)}
                                allowFontScaling={false}
                                style={{ color: "#E91E63" }}>Principal</Text>
                        </Button>
                        <Title
                            minimumFontScale={wp(6.5)}
                            allowFontScaling={false}
                            style={{ fontSize: wp(6.5), color: '#E91E63' }}>About the contest</Title>
                    </Left>
                    <Right>
                        <Text allowFontScaling={false}
                            minimumFontScale={wp(3)}
                            allowFontScaling={false}
                            style={{ color: '#3333', fontSize: wp(3), top: 2 }}>Participants, <Text allowFontScaling={false}
                                minimumFontScale={wp(3)}
                                allowFontScaling={false}
                                style={{ fontSize: wp(3), color: '#333', fontWeight: 'bold' }}>{contest.participants.items.length}</Text></Text>
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
                                <Text allowFontScaling={false}
                                    style={{ fontSize: wp(4) }}
                                    allowFontScaling={false}
                                    minimumFontScale={wp(3)}
                                >Would you like to show the contest statistics after it is completed?</Text>
                            </Body>
                            <Right>
                                <Switch
                                    value={publicStatistics}
                                    onChange={() => this.setState({ publicStatistics: !publicStatistics })} />
                            </Right>
                        </ListItem>
                        <Separator bordered style={{ backgroundColor: '#F5F5F5', borderBottomColor: '#F5F5F5', height: 50 }}>
                            <Text allowFontScaling={false}
                                allowFontScaling={false}
                                minimumFontScale={wp(3)}
                                style={{ color: '#3333' }}>
                                The information that will be displayed will be subject to limitations,
                            </Text>
                            <Text allowFontScaling={false}
                                allowFontScaling={false}
                                minimumFontScale={wp(3)}
                                style={{ color: '#3333' }}>
                                doing this can also encourage the participation of users in your
                            </Text>
                            <Text allowFontScaling={false}
                                allowFontScaling={false}
                                minimumFontScale={wp(3)}
                                style={{ color: '#3333' }}>
                                next contest!
                            </Text>
                        </Separator>
                        <Separator bordered style={{ backgroundColor: '#F5F5F5', borderTopColor: '#F5F5F5' }}>
                            <Text allowFontScaling={false}
                                allowFontScaling={false}
                                style={{ color: '#333' }}>STATISTICS</Text>
                        </Separator>

                        <View style={{ height: 280 }}>
                            <Swiper
                                prevButton={<Text allowFontScaling={false}
                                    allowFontScaling={false}
                                    minimumFontScale={wp(12)}
                                    style={{ color: '#E91E63', fontSize: wp(12) }}>‹</Text>}
                                nextButton={<Text allowFontScaling={false}
                                    allowFontScaling={false}
                                    minimumFontScale={wp(12)}
                                    style={{ color: '#E91E63', fontSize: wp(12) }}>›</Text>}
                                scrollEnabled={true}
                                loop={false}
                                showsButtons={true}
                                showsPagination={false}>
                                <CPieChart />
                                <CBarChart />
                            </Swiper>
                        </View>

                        <Separator bordered style={{ backgroundColor: '#F5F5F5', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text allowFontScaling={false}
                                allowFontScaling={false}
                                style={{ color: '#333' }}>AUDIENCE</Text>
                            {audience.length
                                ? <Button style={{ top: -10 }} onPress={() => _setModalVisibleAudience(true, false)} transparent small>
                                    <Text allowFontScaling={false}
                                        allowFontScaling={false}
                                        minimumFontScale={wp(3)}
                                        style={{ color: '#E91E63' }}>Create another audience</Text>
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
                                    <Text allowFontScaling={false} allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(4) }}>Back</Text>
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
                                            <Separator bordered style={{ backgroundColor: '#E91E63' }}>
                                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                                    <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(3) }}>Audience tags #{index + 1}</Text>
                                                    <Text allowFontScaling={false} style={{ fontWeight: '100', color: '#FFF', right: 10, fontSize: wp(3) }}>{`created ${moment(item.createdAt).startOf('hour').fromNow()}`}</Text>
                                                </View>
                                            </Separator>
                                        </CollapseHeader>

                                        <CollapseBody last>
                                            <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: "#333" }}>General</Text>
                                            </ListItem>

                                            {/* AGE */}
                                            {item.ages[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.ages.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Ages selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />

                                            {/* GENDER */}
                                            {item.genders[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.genders.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Genders selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />

                                            {/* CATEOGRY CONTEST */}
                                            {item.categoryContest[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.categoryContest.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Categories selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />


                                            {/* NACIONALITIES */}
                                            {item.nacionalities[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.nacionalities.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Nacionalities selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />


                                            {/* REGIONAL IDENTIFY*/}
                                            {item.regionalIdentity[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.regionalIdentity.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Regional identity selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />



                                            {/* COUNTRIES */}
                                            {item.countries[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.countries.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Countries selected</Text>
                                                </View>}

                                            <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: "#333" }}>Education</Text>
                                            </ListItem>

                                            {/* ACADEMIC LEVEL ACHIEVED */}
                                            {item.academicLevelAchieved[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.academicLevelAchieved.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Academic level achieved selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />

                                            {/* UNIVERSITIES */}
                                            {item.universities[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.universities.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Universities selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />


                                            {/* SCHOOLS */}
                                            {item.schools[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.schools.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Schools selected</Text>
                                                </View>}

                                            <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: "#333" }}>Persons</Text>
                                            </ListItem>

                                            {/* SEXUALITIES */}
                                            {item.sexualities[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.sexualities.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Sexualitites selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />

                                            {/* MARITAL STATUS */}
                                            {item.maritalStatus[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.maritalStatus.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Marital status selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />

                                            {/* PARENTS CONDITIONS */}
                                            {item.parentalCondition[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.parentalCondition.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Parents conditions selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />


                                            {/* AMOUNT OF CHILDREN */}
                                            {item.amountOfChildren[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.amountOfChildren.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5, width: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Amount of children selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />

                                            {/* AMOUNT OF SIMBLINGS */}
                                            {item.amountOfSimblings[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5, }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.amountOfSimblings.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5, width: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Amount of simblings selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />

                                            {/* OCCUPATIONS */}
                                            {item.occupation[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.occupation.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Ocupations selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />


                                            {/* SOCIO ECONOMIC LEVEL */}
                                            {item.socioeconomicLevel[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.socioeconomicLevel.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Socioeconomic level selected</Text>
                                                </View>}

                                            <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: "#333" }}>Preferences</Text>
                                            </ListItem>

                                            {/* GENRE MUSICAL */}
                                            {item.musicalGenre[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.musicalGenre.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Genre musicals selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />

                                            {/* SPORTS */}
                                            {item.sports[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.sports.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{elements}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Sports selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />

                                            {/* POLITICAL */}
                                            {item.politicalPeople[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.politicalPeople.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{_.upperFirst(_.lowerCase(elements))}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Political selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />

                                            {/* VOTES */}
                                            {item.peopleWhoVote[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.peopleWhoVote.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{_.upperFirst(_.lowerCase(elements))}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Peoplee vote selected</Text>
                                                </View>}

                                            <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: "#333" }}>Others</Text>
                                            </ListItem>

                                            {/* RENT HOUSE */}
                                            {item.rentOrOwnHouse[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.rentOrOwnHouse.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{_.upperFirst(_.lowerCase(elements))}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Rent or own house selected</Text>
                                                </View>}
                                            <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)' }} />

                                            {/* RENT CAR */}
                                            {item.rentOrOwnCar[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.rentOrOwnCar.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{_.upperFirst(_.lowerCase(elements))}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Rent or own car selected</Text>
                                                </View>}

                                            <ListItem itemDivider style={{ backgroundColor: '#EEEEEE' }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: "#333" }}>Prizes</Text>
                                            </ListItem>

                                            {/* PRIZES CATEGORY */}
                                            {item.categoryPrizes[0] === 'none'
                                                ? null
                                                : <View style={{ justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Content horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.categoryPrizes.map((elements, key) =>
                                                            <View key={key} style={{ backgroundColor: randomColors[key], margin: 3, padding: 5, borderRadius: '50%', flex: 1, borderColor: '#3333', borderWidth: 0.5 }}>
                                                                <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', fontSize: wp(3) }}>{_.upperFirst(_.lowerCase(elements))}</Text>
                                                            </View>
                                                        )}
                                                    </Content>
                                                    <Text allowFontScaling={false} style={{ color: '#BDBDBD', fontSize: wp(3) }}>Cateogry prizes selected</Text>
                                                </View>}

                                            <ListItem last style={{ justifyContent: 'space-between', borderBottomColor: 'rgba(0,0,0,0.0)', backgroundColor: '#EEEEEE' }}>
                                                <Left>
                                                    <Text allowFontScaling={false} style={{ alignSelf: 'flex-end', fontSize: wp(3), color: "#3333" }}>Your contest has searched 1,400 users with these tags.</Text>
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
                                keyExtractor={item => item.toString()} />
                            : <View style={{ alignItems: 'center', flex: 1, height: 200, top: 50 }}>
                                <Text allowFontScaling={false} style={{ color: '#333', fontSize: wp(4.5), fontWeight: 'bold' }}>You don't have a selected audience yet</Text>
                                <Button
                                    onPress={() => { this.setState({ modalVisibleShowTags: false }); _setModalVisibleAudience(true, false) }}
                                    small style={{ alignSelf: 'center', backgroundColor: '#E91E63', top: 10 }}>
                                    <Text allowFontScaling={false}>Create one now!</Text>
                                </Button>
                            </View>}
                    </Container>
                </Modal>
            </Container>
        );
    }
}
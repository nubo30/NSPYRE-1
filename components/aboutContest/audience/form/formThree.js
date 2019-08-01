import React, { Component } from 'react';
import { Container, Header, Content, Footer, Button, Text, Left, Icon, Title, Right, View, Form, Picker, Body, ListItem, Switch, List } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Col, Row } from 'react-native-easy-grid'
import _ from 'lodash'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Axios from 'axios'

// Icons
import { Entypo, MaterialCommunityIcons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons'

// Static Data
import { randomColors, sexualityList, levelachievedList, maritalStatusList, sportsList, musicsGenre, regionalIdentityList } from '../../../Global/data/index'

export default class FormTwo extends Component {

    state = {
        regionalIdentityChoose: [],
        // Pickers
        regionalIdentity: [],
        regionalIdentityItems: [],

    }
    componentDidMount() {
        this._getRegionalIdentity()
    }

    _getRegionalIdentity = () => {
        this.setState({ regionalIdentityList: [{ name: 'List of regional identity', id: 10 * 100, children: regionalIdentityList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    onSelectedItemsChangeRegionalIdentity = (value) => { this.setState({ regionalIdentity: value }) }

    _updateAcademicRegionalIdentity = (value) => {
        this.setState({ regionalIdentityItems: value, regionalIdentityChoose: value })
    }

    // Esta es la información que irá a AWS en una array
    // regionalIdentity

    render() {
        const {
            regionalIdentityItems,

            // Pickers
            regionalIdentity,

            // Static Data

        } = this.state
        const {
            // Data
            contest,
        } = this.props;
        return (
            <Container contentContainerStyle={{ flex: 1, backgroundColor: '#FAFAFA' }} >
                <Grid>
                    <Row size={20} style={{ alignItems: 'center', flexDirection: 'column', backgroundColor: '#FAFAFA' }}>
                        <Text style={{ color: "#333", fontWeight: '100', fontSize: wp(5), textAlign: 'center', top: 43, paddingLeft: 40, paddingRight: 40 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fringilla.
               			</Text>
                    </Row>
                    <Row size={80} style={{ backgroundColor: '#FAFAFA' }}>
                        <Content contentContainerStyle={{ paddingBottom: 70 }}>
                            <List style={{ width: "100%" }}>
                                <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                    <Text style={{ color: "#BDBDBD" }}>Fill in the following fields</Text>
                                </ListItem>

                                {/* REGIONAL INDENTITY */}
                                <ListItem itemHeader
                                    onPress={() => this.SectionedMultiSelectRegionalIdentity._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: "#80D8FF" }}>
                                            <Entypo active name="bookmark" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {regionalIdentityItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Select a academic level achieved</Text>
                                                    </View>}
                                                {regionalIdentityItems && regionalIdentityItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: `${randomColors[Math.floor(Math.random() * randomColors.length)]}`,
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{item.name}</Text>
                                                    </View>
                                                )}
                                            </Content>
                                        </View>
                                    </Body>
                                    <Right>
                                        <Text>Add more</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                    <View style={{ backgroundColor: 'red', position: 'absolute', right: '-500000%' }}>
                                        <SectionedMultiSelect
                                            parentChipsRemoveChildren={true}
                                            ref={SectionedMultiSelectRegionalIdentity => this.SectionedMultiSelectRegionalIdentity = SectionedMultiSelectRegionalIdentity}
                                            items={regionalIdentityList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeRegionalIdentity}
                                            onSelectedItemObjectsChange={(items) => this._updateAcademicRegionalIdentity(items)}
                                            primary="#D81B60"
                                            selectedItems={regionalIdentity}
                                            showDropDowns={false}
                                            dropDownToggleIconUpComponent={<Icon name="close" style={{ color: '#FFF' }} />}
                                            dropDownToggleIconDownComponent={<Icon name="close" style={{ color: '#FFF' }} />}
                                            styles={{
                                                item: {
                                                    paddingHorizontal: 10,
                                                },
                                                itemText: {
                                                    fontSize: wp(10)
                                                },
                                                subItem: {
                                                    paddingHorizontal: 10,
                                                    height: 45,
                                                },
                                                subItemText: {
                                                    fontSize: wp(5)
                                                },
                                                button: {
                                                    backgroundColor: '#D81B60',
                                                },
                                                confirmText: {
                                                    letterSpacing: 2
                                                },
                                                subSeparator: {
                                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                                }
                                            }}
                                        />
                                    </View>
                                </ListItem>

                            </List>
                        </Content>
                    </Row>
                </Grid>
            </Container>
        );
    }
}
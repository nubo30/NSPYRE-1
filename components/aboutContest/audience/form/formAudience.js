import React, { Component } from 'react';
import { Container, Content, Button, Text, Left, Icon, Right, View, Picker, Body, ListItem, List } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Axios from 'axios'

// Icons
import { Entypo, MaterialCommunityIcons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons'

// Static Data
import { randomColors, cateogryList, sexualityList, academicLevelAchievedList, maritalStatusList, musicsGenre, sportsList, nacionality, regionalIdentityList } from '../../../Global/data/index'

export default class FormTwo extends Component {

    state = {
        // Data
        age: {
            yearOne: 0,
            yearTwo: 0,
            years: ''
        },
        gender: 'NO_SELECT',
        categoryChoose: [],
        countriesChoose: [],
        regionalIdentityChoose: [],
        sexualityChoose: [],
        academicLevelAchievedChoose: [],
        schoolsChoose: [],
        universityChoose: [],
        maritalStatusChoose: [],
        musicalGenreChoose: [],
        sportsChoose: [],

        // Pickers
        category: [],
        categoryItems: [],
        country: [],
        countryItems: [],
        nacionality: [],
        nacionalityItems: [],
        regionalIdentity: [],
        regionalIdentityItems: [],
        sexuality: [],
        sexualityItems: [],
        academicLevelAchieved: [],
        academicLevelAchievedItems: [],
        levelachieved: [],
        levelachievedItems: [],
        schools: [],
        schoolsItems: [],
        university: [],
        universityItems: [],
        maritalStatus: [],
        maritalStatusItems: [],
        musicalGenre: [],
        musicalGenreItems: [],
        sports: [],
        sportsItems: [],

        // Static data
        countryList: [{ name: 'List of countries', id: 10 * 100, children: [] }],
        nacionalityList: [{ name: 'List of nacionality', id: 10 * 100, children: [] }],
        regionalIdentityList: [],
        schoolsList: [{ name: 'List of schools', id: 10 * 100, children: [] }],
        academicLevelAchievedList: [{ name: 'List of academic level achieved', id: 10 * 100, children: [] }],
        universityList: [{ name: 'List of universities', id: 10 * 100, children: [] }],
        musicalGenreList: [{ name: 'List of musics genre', id: 10 * 100, children: [] }],
        sportsList: [{ name: 'List of sports', id: 10 * 100, children: [] }],
    }

    componentDidMount() {
        this._getContry()
        this._getAcademicLevelAchieved()
        this._getNacionality()
        this._getSchools()
        this._getUniversity()
        this._getMusicGenre()
        this._getSports()
        this._getRegionalIdentity()
        const { contest } = this.props
        _.remove(cateogryList[0].children, { name: _.startCase(_.lowerCase(contest.category)) });
    }

    _getContry = async () => {
        const { contest } = this.props
        try {
            const { data } = await Axios.get('https://restcountries.eu/rest/v2/all')
            _.remove(data, { name: contest.aboutTheUser.location.country })
            this.setState({ countryList: [{ name: 'List of countries', id: 10 * 100, children: data.map((item, key) => { return { name: item.name, id: key } }) }] })
        } catch (error) {
            console.log(error);
        }
    }

    _getNacionality = () => {
        this.setState({ nacionalityList: [{ name: 'List of nacionality', id: 10 * 100, children: nacionality.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    _getRegionalIdentity = () => {
        this.setState({ regionalIdentityList: [{ name: 'List of regional identity', id: 10 * 100, children: regionalIdentityList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }


    _getAcademicLevelAchieved = () => {
        this.setState({ academicLevelAchievedList: [{ name: 'List of academic level achieved', id: 10 * 100, children: academicLevelAchievedList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    _getSchools = async () => {
        try {
            const { data } = await Axios.get('https://code.org/schools.json?results=1')
            this.setState({ schoolsList: [{ name: 'List of schools', id: 10 * 100, children: data.schools.map((item, key) => { return { name: item.name, id: key } }) }] })
        } catch (error) {
            console.log(error);
        }
    }

    _getUniversity = async () => {
        try {
            const { data } = await Axios.get('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
            this.setState({ universityList: [{ name: 'List of universities', id: 10 * 100, children: data.map((item, key) => { return { name: item.name, id: key } }) }] })
        } catch (error) {
            console.log(error);
        }
    }

    _getMusicGenre = () => {
        this.setState({ musicalGenreList: [{ name: 'List of musics genre', id: 10 * 100, children: musicsGenre.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    _getSports = () => {
        this.setState({ sportsList: [{ name: 'List of sports', id: 10 * 100, children: sportsList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })

    }

    // Pickers
    onValueChangeGender = (value) => { this.setState({ gender: value }) }
    onValueChangeYearOne = (value) => { this.setState({ age: { ...this.state.age, yearOne: value, yearTwo: value + 1, years: `${value} - ${value + 1}` } }) }
    onValueChangeYearTwo = (value) => { this.setState({ age: { ...this.state.age, yearTwo: value, years: `${this.state.age.yearOne} - ${value}` } }) }
    onSelectedItemsChangeCategory = (value) => { this.setState({ category: value }) }
    onSelectedItemsChangeCountry = (value) => { this.setState({ country: value }) }
    onSelectedItemsChangeNacionality = (value) => { this.setState({ nacionality: value }) }
    onSelectedItemsChangeRegionalIdentity = (value) => { this.setState({ regionalIdentity: value }) }
    onSelectedItemsChangeSexuality = (value) => { this.setState({ sexuality: value }) }
    onSelectedItemsChangeAcademicLevelAchieved = (value) => { this.setState({ academicLevelAchieved: value }) }
    onSelectedItemsChangeSchoolS = (value) => { this.setState({ schools: value }) }
    onSelectedItemsChangeUniversity = (value) => { this.setState({ university: value }) }
    onSelectedItemsChangeMaritalStatus = (value) => { this.setState({ maritalStatus: value }) }
    onSelectedItemsChangeMusicalGenre = (value) => { this.setState({ musicalGenre: value }) }
    onSelectedItemsChangeSports = (value) => { this.setState({ sports: value }) }

    _updateCategoryItems = (value) => {
        const { contest } = this.props
        this.setState({ categoryItems: value, categoryChoose: [...value, { id: 0, name: _.lowerCase(contest.category) }] })
    }
    _updateCountryItems = (value) => {
        const { contest } = this.props
        this.setState({ countryItems: value, countriesChoose: [...value, { id: 0, name: _.startCase(contest.aboutTheUser.location.country) }] })
    }

    _updateNacionalityItems = (value) => {
        const { contest } = this.props
        this.setState({ nacionalityItems: value, nacionalityChoose: [...value, { id: 0, name: _.lowerCase(contest.nacionality) }] })
    }


    _updateAcademicRegionalIdentity = (value) => {
        this.setState({ regionalIdentityItems: value, regionalIdentityChoose: value })
    }


    _updateSexualityItems = (value) => {
        this.setState({ sexualityItems: value, sexualityChoose: value })
    }

    _updateAcademicLevelAchieved = (value) => {
        this.setState({ academicLevelAchievedItems: value, academicLevelAchievedChoose: value })
    }

    _updateSchools = (value) => {
        this.setState({ schoolsItems: value, schoolsChoose: value })
    }

    _updateUniversity = (value) => {
        this.setState({ universityItems: value, universityChoose: value })
    }

    _updateMaritalStatus = (value) => {
        this.setState({ maritalStatusItems: value, maritalStatusChoose: value })
    }

    _updateMusicalGenre = (value) => {
        this.setState({ musicalGenreItems: value, musicalGenreChoose: value })
    }

    _updateSports = (value) => {
        this.setState({ sportsItems: value, sportsChoose: value })
    }

    // Esta es la información que irá a AWS en una array
    // categoryChoose
    // countriesChoose
    // sexualityChoose
    // academicLevelAchievedChoose
    // schoolsChoose
    // universityChoose
    // maritalStatusItems
    // musicalGenreChoose
    // sportsChoose
    // nacionalityItems
    // regionalIdentityChoose

    render() {
        const {
            gender,
            age,

            // Pickers
            category,
            categoryItems,
            country,
            countryItems,
            nacionalityItems,
            nacionality,
            regionalIdentity,
            regionalIdentityItems,
            sexuality,
            sexualityItems,
            academicLevelAchieved,
            academicLevelAchievedItems,
            schools,
            schoolsItems,
            university,
            universityItems,
            maritalStatus,
            maritalStatusItems,
            musicalGenre,
            musicalGenreItems,
            sports,
            sportsItems,

            // Static Data
            countryList,
            nacionalityList,
            schoolsList,
            universityList,
            musicalGenreList,
            sportsList,
            academicLevelAchievedList,
            regionalIdentityList
        } = this.state
        const {
            // Data
            contest,
        } = this.props;
        return (
            <Container contentContainerStyle={{ flex: 1, backgroundColor: '#FAFAFA' }} >
                <Grid>
                    <Row size={20} style={{ alignItems: 'center', flexDirection: 'column', backgroundColor: '#FAFAFA' }}>
                        <Text style={{ color: "#333", fontWeight: '100', fontSize: wp(5), textAlign: 'center', top: 20, paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: wp(5), color: '#333' }}>{contest.user.name}</Text>, according to personalities, the audience will match the entire community, just as the cost of this customization will be generated.
               			</Text>
                    </Row>
                    <Row size={80} style={{ backgroundColor: '#FAFAFA' }}>
                        <Content contentContainerStyle={{ paddingBottom: 70 }}>
                            <List style={{ width: "100%" }}>
                                <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                    <Text style={{ color: "#BDBDBD" }}>Fill in the following fields</Text>
                                </ListItem>

                                {/* GENDER*/}
                                <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                    <Left>
                                        <Button style={{ backgroundColor: "#90A4AE" }}>
                                            <MaterialCommunityIcons active name="gender-male-female" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>Identify the gender of the audience</Text>
                                    </Body>
                                    <Right>
                                        <Text>{gender === 'NO_SELECT' ? 'Not specified' : gender}</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="SELECT ONE"
                                        style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                        headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                        headerTitleStyle={{ color: "#D81B60" }}
                                        headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                        textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                        selectedValue={gender}
                                        onValueChange={this.onValueChangeGender}>
                                        <Picker.Item label="Male" value="Male" />
                                        <Picker.Item label="Famale" value="Famale" />
                                        <Picker.Item label="Both" value="Both" />
                                        <Picker.Item label="Do not specify" value="NO_SELECT" />
                                    </Picker>
                                </ListItem>

                                {/* AGE */}
                                <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: "#00C853" }}>
                                            <AntDesign active name="team" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <Text>Identify the age of the audience</Text>
                                    </Body>
                                    <Right>
                                        <Button small transparent bordered style={{ borderColor: '#9E9E9E' }}>
                                            <Text style={{ color: '#9E9E9E' }}>{age.yearOne}</Text>
                                        </Button>
                                        <Text style={{ left: -1, color: '#9E9E9E' }}> - </Text>
                                        <Button small transparent bordered style={{ borderColor: '#9E9E9E' }}>
                                            <Text style={{ color: '#9E9E9E' }}>{age.yearTwo}</Text>
                                        </Button>
                                    </Right>

                                    {/* Numbers */}
                                    <Picker
                                        mode="dialog"
                                        iosHeader="SELECT ONE"
                                        style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 70, top: -25, width: 57 }}
                                        headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                        headerTitleStyle={{ color: "#D81B60" }}
                                        headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                        textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                        selectedValue={age.yearOne}
                                        onValueChange={this.onValueChangeYearOne}>
                                        {_.range(59).map(item => <Picker.Item key={item} label={`${item + 1} year`} value={item + 1} />)}
                                    </Picker>

                                    <Picker
                                        mode="dropdown"
                                        iosHeader="SELECT ONE"
                                        style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25, width: 57 }}
                                        headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                        headerTitleStyle={{ color: "#D81B60" }}
                                        headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                        textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                        selectedValue={age.yearTwo}
                                        onValueChange={this.onValueChangeYearTwo}>
                                        {_.range(age.yearOne, 60).map(item => <Picker.Item key={item} label={`${item + 1} year`} value={item + 1} />)}
                                    </Picker>
                                </ListItem>

                                {/* CATEGORY */}
                                <ListItem
                                    itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                    <Text style={{ color: "#BDBDBD" }}>
                                        <Text style={{ color: '#BDBDBD', fontWeight: 'bold' }}>
                                            {contest.user.name}
                                        </Text>, currently they have the following options established, as a country is <Text style={{ fontWeight: 'bold', color: '#BDBDBD' }}>{contest.aboutTheUser.location.country}</Text>, as categories this
								<Text style={{ color: '#BDBDBD', fontWeight: 'bold' }}> {_.lowerCase(contest.category)} </Text>,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            you can add more options to improve contest customization.
								</Text>
                                </ListItem>
                                <ListItem itemHeader
                                    onPress={() => this.SectionedMultiSelectCategory._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: "#FB8C00" }}>
                                            <Entypo active name="documents" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                <View style={{
                                                    backgroundColor: `${randomColors[Math.floor(Math.random() * randomColors.length)]}`,
                                                    margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                    borderColor: '#3333',
                                                    borderWidth: 0.5
                                                }}>
                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{_.startCase(_.lowerCase(contest.category))}</Text>
                                                </View>
                                                {categoryItems && categoryItems.map((item, key) =>
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
                                            ref={SectionedMultiSelectCategory => this.SectionedMultiSelectCategory = SectionedMultiSelectCategory}
                                            items={cateogryList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeCategory}
                                            onSelectedItemObjectsChange={(items) => this._updateCategoryItems(items)}
                                            primary="#D81B60"
                                            selectedItems={category}
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

                                {/* COUNTRY */}
                                <ListItem
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectCountry._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: "#0091EA" }}>
                                            <MaterialCommunityIcons active name="earth" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                <View style={{
                                                    backgroundColor: `${randomColors[Math.floor(Math.random() * randomColors.length)]}`,
                                                    margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                    borderColor: '#3333',
                                                    borderWidth: 0.5
                                                }}>
                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{_.startCase(_.lowerCase(contest.aboutTheUser.location.country))}</Text>
                                                </View>
                                                {countryItems && countryItems.map((item, key) =>
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
                                    <View style={{ backgroundColor: 'red', position: 'absolute', right: '-5000%' }}>
                                        <SectionedMultiSelect
                                            parentChipsRemoveChildren={true}
                                            ref={SectionedMultiSelectCountry => this.SectionedMultiSelectCountry = SectionedMultiSelectCountry}
                                            items={countryList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeCountry}
                                            onSelectedItemObjectsChange={(items) => this._updateCountryItems(items)}
                                            primary="#D81B60"
                                            selectedItems={country}
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

                                {/* NACIONALITY */}
                                <ListItem
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectNacionality._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: "#6200EA" }}>
                                            <MaterialCommunityIcons active name="earth" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {nacionalityItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose one of the options</Text>
                                                    </View>}
                                                {nacionalityItems && nacionalityItems.map((item, key) =>
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
                                            ref={SectionedMultiSelectNacionality => this.SectionedMultiSelectNacionality = SectionedMultiSelectNacionality}
                                            items={nacionalityList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeNacionality}
                                            onSelectedItemObjectsChange={(items) => this._updateNacionalityItems(items)}
                                            primary="#D81B60"
                                            selectedItems={nacionality}
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

                                {/* REGIONAL INDENTITY */}
                                <ListItem itemHeader
                                    onPress={() => this.SectionedMultiSelectRegionalIdentity._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: "#C62828" }}>
                                            <FontAwesome active name="globe" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: -1 }} />
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


                                {/* SEXUAL ORIENTATION */}
                                <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                    <Text style={{ color: "#BDBDBD" }}>Customize the audience status.</Text>
                                </ListItem>
                                <ListItem
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectSexuality._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: "#E91E63" }}>
                                            <FontAwesome active name="intersex" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {sexualityItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose one of the options</Text>
                                                    </View>}
                                                {sexualityItems && sexualityItems.map((item, key) =>
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
                                            ref={SectionedMultiSelectSexuality => this.SectionedMultiSelectSexuality = SectionedMultiSelectSexuality}
                                            items={sexualityList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeSexuality}
                                            onSelectedItemObjectsChange={(items) => this._updateSexualityItems(items)}
                                            primary="#D81B60"
                                            selectedItems={sexuality}
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

                                {/* MARITAL STATUS */}
                                <ListItem itemHeader
                                    onPress={() => this.SectionedMultiSelectuMaritalStatus._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: "#00BCD4" }}>
                                            <Entypo active name="slideshare" style={{ fontSize: wp(5), color: "#FFF", left: 1, top: 0 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {maritalStatusItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose one of the options</Text>
                                                    </View>}
                                                {maritalStatusItems && maritalStatusItems.map((item, key) =>
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
                                            ref={SectionedMultiSelectuMaritalStatus => this.SectionedMultiSelectuMaritalStatus = SectionedMultiSelectuMaritalStatus}
                                            items={maritalStatusList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeMaritalStatus}
                                            onSelectedItemObjectsChange={(items) => this._updateMaritalStatus(items)}
                                            primary="#D81B60"
                                            selectedItems={maritalStatus}
                                            showDropDowns={false}
                                            dropDownToggleIconUpComponent={<Icon name="close" style={{ color: '#FFF' }} />}
                                            dropDownToggleIconDownComponent={<Icon name="close" style={{ color: '#FFF' }} />}
                                            headerComponent={
                                                <View style={{ backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Button small transparent iconRight>
                                                        <Text style={{ color: '#E53935', fontWeight: 'normal', fontSize: wp(3.5) }}>If you can't find the university, please let us know.</Text>
                                                        <Icon name="alert" style={{ color: '#E53935' }} />
                                                    </Button>
                                                </View>}
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

                                {/* LEVEL ACHIEVED */}
                                <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                    <Text style={{ color: "#BDBDBD" }}>Reach a much more specific audience with the following fields.</Text>
                                </ListItem>

                                {/* ACADEMIC LEVEL ACHIVIED */}
                                <ListItem itemHeader
                                    onPress={() => this.SectionedMultiSelectAcademicLevelAchieved._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: "#80D8FF" }}>
                                            <Entypo active name="bookmark" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {academicLevelAchievedItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Select a academic level achieved</Text>
                                                    </View>}
                                                {academicLevelAchievedItems && academicLevelAchievedItems.map((item, key) =>
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
                                            ref={SectionedMultiSelectAcademicLevelAchieved => this.SectionedMultiSelectAcademicLevelAchieved = SectionedMultiSelectAcademicLevelAchieved}
                                            items={academicLevelAchievedList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeAcademicLevelAchieved}
                                            onSelectedItemObjectsChange={(items) => this._updateAcademicLevelAchieved(items)}
                                            primary="#D81B60"
                                            selectedItems={academicLevelAchieved}
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

                                {/* SCHOOOL NAME (HIGHT SCHOOL) */}
                                <ListItem itemHeader
                                    onPress={() => this.SectionedMultiSelectSchoolS._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: "#757575" }}>
                                            <FontAwesome active name="university" style={{ fontSize: wp(5), color: "#FFF", left: 2, top: -1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {schoolsItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose one of the options</Text>
                                                    </View>}
                                                {schoolsItems && schoolsItems.map((item, key) =>
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
                                            ref={SectionedMultiSelectSchoolS => this.SectionedMultiSelectSchoolS = SectionedMultiSelectSchoolS}
                                            items={schoolsList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeSchoolS}
                                            onSelectedItemObjectsChange={(items) => this._updateSchools(items)}
                                            primary="#D81B60"
                                            selectedItems={schools}
                                            showDropDowns={false}
                                            dropDownToggleIconUpComponent={<Icon name="close" style={{ color: '#FFF' }} />}
                                            dropDownToggleIconDownComponent={<Icon name="close" style={{ color: '#FFF' }} />}
                                            headerComponent={
                                                <View style={{ backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Text style={{ alignSelf: 'center', textAlign: 'center', color: '#3333', fontSize: wp(3), fontWeight: '100' }}>Thanks to <Text style={{ fontWeight: 'bold', fontSize: wp(3), color: '#3333' }}> Code.org </Text> for allowing us to use the data shown here.</Text>
                                                    <Button small transparent iconRight>
                                                        <Text style={{ color: '#E53935', fontWeight: 'normal', fontSize: wp(3.5) }}>If you can't find the school, please let us know.</Text>
                                                        <Icon name="alert" style={{ color: '#E53935' }} />
                                                    </Button>
                                                </View>}
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

                                {/* UNIVERSITY */}
                                <ListItem itemHeader
                                    onPress={() => this.SectionedMultiSelectuUniversity._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: "#795548" }}>
                                            <FontAwesome active name="university" style={{ fontSize: wp(5), color: "#FFF", left: 2, top: -1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {universityItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose one of the options</Text>
                                                    </View>}
                                                {universityItems && universityItems.map((item, key) =>
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
                                            ref={SectionedMultiSelectuUniversity => this.SectionedMultiSelectuUniversity = SectionedMultiSelectuUniversity}
                                            items={universityList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeUniversity}
                                            onSelectedItemObjectsChange={(items) => this._updateUniversity(items)}
                                            primary="#D81B60"
                                            selectedItems={university}
                                            showDropDowns={false}
                                            dropDownToggleIconUpComponent={<Icon name="close" style={{ color: '#FFF' }} />}
                                            dropDownToggleIconDownComponent={<Icon name="close" style={{ color: '#FFF' }} />}
                                            headerComponent={
                                                <View style={{ backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                    <Button small transparent iconRight>
                                                        <Text style={{ color: '#E53935', fontWeight: 'normal', fontSize: wp(3.5) }}>If you can't find the university, please let us know.</Text>
                                                        <Icon name="alert" style={{ color: '#E53935' }} />
                                                    </Button>
                                                </View>}
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

                                {/* PREFERENCES */}
                                <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                    <Text style={{ color: "#BDBDBD" }}>Through what preferences, whether musical or sports, do you want to reach your audience?</Text>
                                </ListItem>

                                <ListItem itemHeader
                                    onPress={() => this.SectionedMultiSelectMusicalGenre._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: "#FFD600" }}>
                                            <Feather active name="music" style={{ fontSize: wp(5), color: "#FFF", left: 0, top: -1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {musicalGenreItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose one of the options</Text>
                                                    </View>}
                                                {musicalGenreItems && musicalGenreItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: `${randomColors[Math.floor(Math.random() * randomColors.length)]}`,
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{_.startCase(item.name)}</Text>
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
                                            ref={SectionedMultiSelectMusicalGenre => this.SectionedMultiSelectMusicalGenre = SectionedMultiSelectMusicalGenre}
                                            items={musicalGenreList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeMusicalGenre}
                                            onSelectedItemObjectsChange={(items) => this._updateMusicalGenre(items)}
                                            primary="#D81B60"
                                            selectedItems={musicalGenre}
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

                                <ListItem itemHeader
                                    onPress={() => this.SectionedMultiSelectSports._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: "#00C853" }}>
                                            <FontAwesome active name="soccer-ball-o" style={{ fontSize: wp(5.5), color: "#FFF", left: 0, top: 0 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {sportsItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose one of the options</Text>
                                                    </View>}
                                                {sportsItems && sportsItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: `${randomColors[Math.floor(Math.random() * randomColors.length)]}`,
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{_.startCase(item.name)}</Text>
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
                                            ref={SectionedMultiSelectSports => this.SectionedMultiSelectSports = SectionedMultiSelectSports}
                                            items={sportsList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeSports}
                                            onSelectedItemObjectsChange={(items) => this._updateSports(items)}
                                            primary="#D81B60"
                                            selectedItems={sports}
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

                                <Entypo name="wallet" style={{ top: 25, color: '#BDBDBD', alignSelf: 'center', fontSize: wp(6) }} />
                                <Text style={{ color: '#BDBDBD', fontWeight: '100', fontSize: wp(4), top: 30, alignSelf: 'center' }}>Increase your budget for further customization!</Text>
                            </List>
                        </Content>
                    </Row>
                </Grid>
            </Container>
        );
    }
}
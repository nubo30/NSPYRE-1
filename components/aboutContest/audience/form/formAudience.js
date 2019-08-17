import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Content, Button, Text, Left, Icon, Right, View, Picker, Body, ListItem, List, Toast } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import moment from 'moment'

// Icons
import { Entypo, MaterialCommunityIcons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons'

// Static Data
import {
    randomColors, cateogryList, sexualityList, academicLevelAchievedList, maritalStatusList, musicsGenre, sportsList, nacionality, regionalIdentityList, parentalConditionList, ocuppationList, rentOrOwnHouseList, rentOrOwnCarList, categoryPrizeList, socioeconomicLevelList
} from '../../../../assets/data/global'
import countries from '../../../../assets/data/countries.json'
import universities from '../../../../assets/data/universities.json'
import schoolJSON from '../../../../assets/data/schools.json'

// Graphql
import * as mutations from '../../../../src/graphql/mutations'

export default class FormAudience extends Component {
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
        nacionalityChoose: [],
        regionalIdentityChoose: [],
        sexualityChoose: [],
        academicLevelAchievedChoose: [],
        schoolsChoose: [],
        universityChoose: [],
        maritalStatusChoose: [],
        musicalGenreChoose: [],
        sportsChoose: [],
        parentalConditionChoose: [],
        amountOfChildren: 'NO_SELECT',
        amountOfSimblings: 'NO_SELECT',
        politicalPeople: 'NO_SELECT',
        peopleWhoVote: 'NO_SELECT',
        ocuppationChoose: [],
        socioeconomicLevel: [],
        rentOrOwnHouseChoose: [],
        rentOrOwnCarChoose: [],
        categoryPrizeChoose: [],

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
        parentalCondition: [],
        parentalConditionItems: [],
        ocuppation: [],
        ocuppationItems: [],
        rentOrOwnHouse: [],
        rentOrOwnHouseItems: [],
        rentOrOwnCar: [],
        rentOrOwnCarItems: [],
        categoryPrize: [],
        categoryPrizeItems: [],
        socioeconomicLevelItems: [],

        // Static data
        countryList: [{ name: 'List of countries', id: 10 * 100, children: [] }],
        nacionalityList: [{ name: 'List of nacionality', id: 10 * 100, children: [] }],
        regionalIdentityList: [],
        schoolsList: [{ name: 'List of schools', id: 10 * 100, children: [] }],
        academicLevelAchievedList: [{ name: 'List of academic level achieved', id: 10 * 100, children: [] }],
        universityList: [{ name: 'List of universities', id: 10 * 100, children: [] }],
        musicalGenreList: [{ name: 'List of musics genre', id: 10 * 100, children: [] }],
        sportsList: [{ name: 'List of sports', id: 10 * 100, children: [] }],
        parentalConditionList: [{ name: 'List of sports', id: 10 * 100, children: [] }],
        ocuppationList: [{ name: 'List of ocuppation', id: 10 * 100, children: [] }],
        rentOrOwnHouseList: [{ name: 'Current state to select (House)', id: 10 * 100, children: [] }],
        rentOrOwnCarList: [{ name: 'Current state to select (Car)', id: 10 * 100, children: [] }],
        categoryPrizeList: [{ name: 'List of category', id: 10 * 100, children: [] }],
        socioeconomicLevelList: [{ name: 'List socioeconomic level', id: 10 * 100, children: [] }]
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this._getContry()
            this._getAcademicLevelAchieved()
            this._getNacionality()
            this._getSchools()
            this._getUniversity()
            this._getMusicGenre()
            this._getSports()
            this._getParentalCondition()
            this._getRegionalIdentity()
            this._getOcuppation()
            this._getRentOrOwnHouse()
            this._getRentOrOwnCar()
            this._getCategoryPrize()
            this._getSocioeconomicLevel()
            const { contest } = this.props
            _.remove(cateogryList[0].children, { name: _.startCase(_.lowerCase(contest.category)) });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { } = this.props
        if (prevState.age.years !== this.state.age.years
            || prevState.gender !== this.state.gender
            || prevState.categoryChoose !== this.state.categoryChoose
            || prevState.countriesChoose !== this.state.countriesChoose
            || prevState.nacionalityChoose !== this.state.nacionalityChoose
            || prevState.regionalIdentityChoose !== this.state.regionalIdentityChoose
            || prevState.sexualityChoose !== this.state.sexualityChoose
            || prevState.academicLevelAchievedChoose !== this.state.academicLevelAchievedChoose
            || prevState.schoolsChoose !== this.state.schoolsChoose
            || prevState.universityChoose !== this.state.universityChoose
            || prevState.maritalStatusChoose !== this.state.maritalStatusChoose
            || prevState.musicalGenreChoose !== this.state.musicalGenreChoose
            || prevState.sportsChoose !== this.state.sportsChoose
            || prevState.parentalConditionChoose !== this.state.parentalConditionChoose
            || prevState.amountOfChildren !== this.state.amountOfChildren
            || prevState.amountOfSimblings !== this.state.amountOfSimblings
            || prevState.politicalPeople !== this.state.politicalPeople
            || prevState.peopleWhoVote !== this.state.peopleWhoVote
            || prevState.ocuppationChoose !== this.state.ocuppationChoose
            || prevState.socioeconomicLevel !== this.state.socioeconomicLevel
            || prevState.rentOrOwnHouseChoose !== this.state.rentOrOwnHouseChoose
            || prevState.rentOrOwnCarChoose !== this.state.rentOrOwnCarChoose
            || prevState.categoryPrizeChoose !== this.state.categoryPrizeChoose
        ) {
            this.state.age.years
                || this.state.gender !== 'NO_SELECT'
                || this.state.categoryChoose.length >= 2
                || this.state.countriesChoose.length >= 2
                || this.state.nacionalityChoose.length
                || this.state.regionalIdentityChoose.length
                || this.state.sexualityChoose.length
                || this.state.academicLevelAchievedChoose.length
                || this.state.schoolsChoose.length
                || this.state.universityChoose.length
                || this.state.maritalStatusChoose.length
                || this.state.musicalGenreChoose.length
                || this.state.sportsChoose.length
                || this.state.parentalConditionChoose.length
                || this.state.amountOfChildren !== 'NO_SELECT'
                || this.state.amountOfSimblings !== 'NO_SELECT'
                || this.state.politicalPeople !== 'NO_SELECT'
                || this.state.peopleWhoVote !== 'NO_SELECT'
                || this.state.ocuppationChoose.length
                || this.state.socioeconomicLevel.length
                || this.state.rentOrOwnHouseChoose.length
                || this.state.rentOrOwnCarChoose.length
                || this.state.categoryPrizeChoose.length
                ? prevProps._isValidDataForAWS(true)
                : prevProps._isValidDataForAWS(false)
        }
    }

    _getContry = () => {
        const { contest } = this.props
        _.remove(countries, { name: contest.aboutTheUser.location.country })
        this.setState({ countryList: [{ name: 'List of countries', id: 10 * 100, children: countries.map((item, key) => { return { name: item.name, id: key } }) }] })
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

    _getSchools = () => {
        this.setState({ schoolsList: [{ name: 'List of schools', id: 10 * 100, children: schoolJSON.schools.map((item, key) => { return { name: item.name, id: key } }) }] })
    }

    _getUniversity =  () => {
        this.setState({ universityList: [{ name: 'List of universities', id: 10 * 100, children: universities.map((item, key) => { return { name: item.name, id: key } }) }] })
    }

    _getMusicGenre = () => {
        this.setState({ musicalGenreList: [{ name: 'List of musics genre', id: 10 * 100, children: musicsGenre.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    _getSports = () => {
        this.setState({ sportsList: [{ name: 'List of sports', id: 10 * 100, children: sportsList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    _getParentalCondition = () => {
        this.setState({ parentalConditionList: [{ name: "List of parent's condition", id: 10 * 100, children: parentalConditionList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    _getOcuppation = () => {
        this.setState({ ocuppationList: [{ name: "List of ocuppation", id: 10 * 100, children: ocuppationList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    _getRentOrOwnHouse = () => {
        this.setState({ rentOrOwnHouseList: [{ name: "Current state to select (House)", id: 10 * 100, children: rentOrOwnHouseList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    _getRentOrOwnCar = () => {
        this.setState({ rentOrOwnCarList: [{ name: "Current state to select (Car)", id: 10 * 100, children: rentOrOwnCarList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    _getCategoryPrize = () => {
        this.setState({ categoryPrizeList: [{ name: "List of category", id: 10 * 100, children: categoryPrizeList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }


    _getSocioeconomicLevel = () => {
        this.setState({ socioeconomicLevelList: [{ name: "List socioeconomic level", id: 10 * 100, children: socioeconomicLevelList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
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
    onValueChangeAmountOfChildren = (value) => { this.setState({ amountOfChildren: value }) }
    onValueChangeAmountOfSimblings = (value) => { this.setState({ amountOfSimblings: value }) }
    onSelectedItemsChangeParentalCondition = (value) => { this.setState({ parentalCondition: value }) }
    onValueChangePoliticalPeople = (value) => this.setState({ politicalPeople: value })
    onValueChangePeopleWhoVote = (value) => { this.setState({ peopleWhoVote: value }) }
    onSelectedItemsChangeOcuppation = (value) => { this.setState({ ocuppation: value }) }
    onValueChangeSocioeconomicLevel = (value) => { this.setState({ socioeconomicLevel: value }) }
    onSelectedItemsChangeRentOrOwnHouse = (value) => { this.setState({ rentOrOwnHouse: value }) }
    onSelectedItemsChangeRentOrOwnCar = (value) => { this.setState({ rentOrOwnCar: value }) }
    onSelectedItemsChangeCategoryPrize = (value) => { this.setState({ categoryPrize: value }) }



    _updateCategoryItems = (value) => {
        const { contest } = this.props
        this.setState({ categoryItems: value, categoryChoose: [...value, { id: 0, name: _.lowerCase(contest.category) }] })
    }
    _updateCountryItems = (value) => {
        const { contest } = this.props
        this.setState({ countryItems: value, countriesChoose: [...value, { id: 0, name: _.startCase(contest.aboutTheUser.location.country) }] })
    }

    _updateNacionalityItems = (value) => {
        this.setState({ nacionalityItems: value, nacionalityChoose: value })
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

    _updateParentalCondition = (value) => {
        this.setState({ parentalConditionItems: value, parentalConditionChoose: value })
    }

    _updateOcuppation = (value) => {
        this.setState({ ocuppationItems: value, ocuppationChoose: value })
    }

    _updateRentOrOwnHouse = (value) => {
        this.setState({ rentOrOwnHouseItems: value, rentOrOwnHouseChoose: value })
    }
    _updateRentOrOwnCar = (value) => {
        this.setState({ rentOrOwnCarItems: value, rentOrOwnCarChoose: value })
    }

    _updateCategoryPrize = (value) => {
        this.setState({ categoryPrizeItems: value, categoryPrizeChoose: value })
    }

    _updateSocioeconomicLevel = (value) => {
        this.setState({ socioeconomicLevelItems: value, socioeconomicLevelChoose: value })
    }

    // Send Data to AWS
    componentWillReceiveProps(nextProps) {
        if (nextProps.sendDataToAWSAction !== this.props.sendDataToAWSAction) { this._validateDataForAWS() }
    }

    _validateDataForAWS = async () => {
        const { contest, _isLoading, _modalVisibleAudienceSelect } = this.props
        const audienceList = {
            audienceCreateContestId: contest.id,
            genders: this.state.gender !== 'NO_SELECT' ? [this.state.gender] : ['none'],
            ages: this.state.age.years ? [this.state.age.years] : ['none'],
            categoryContest: this.state.categoryChoose.length ? this.state.categoryChoose.map(item => item.name) : ['none'],
            countries: this.state.countriesChoose.length ? this.state.countriesChoose.map(item => item.name) : ['none'],
            nacionalities: this.state.nacionalityChoose.length ? this.state.nacionalityChoose.map(item => item.name) : ['none'],
            regionalIdentity: this.state.regionalIdentityChoose.length ? this.state.regionalIdentityChoose.map(item => item.name) : ['none'],
            sexualities: this.state.sexualityChoose.length ? this.state.sexualityChoose.map(item => item.name) : ['none'],
            maritalStatus: this.state.maritalStatusChoose.length ? this.state.maritalStatusChoose.map(item => item ? item.name : 'none') : ['none'],
            academicLevelAchieved: this.state.academicLevelAchievedChoose.length ? this.state.academicLevelAchievedChoose.map(item => item.name) : ['none'],
            schools: this.state.schoolsChoose.length ? this.state.schoolsChoose.map(item => item.name) : ['none'],
            universities: this.state.universityChoose.length ? this.state.universityChoose.map(item => item.name) : ['none'],
            musicalGenre: this.state.musicalGenreChoose.length ? this.state.musicalGenreChoose.map(item => item.name) : ['none'],
            sports: this.state.sportsChoose.length ? this.state.sportsChoose.map(item => item.name) : ['none'],
            parentalCondition: this.state.parentalConditionChoose.length ? this.state.parentalConditionChoose.map(item => item.name) : ['none'],
            amountOfChildren: this.state.amountOfChildren !== 'NO_SELECT' ? [this.state.amountOfChildren] : ['none'],
            amountOfSimblings: this.state.amountOfSimblings !== 'NO_SELECT' ? [this.state.amountOfSimblings] : ['none'],
            politicalPeople: this.state.politicalPeople !== 'NO_SELECT' ? [this.state.politicalPeople] : ['none'],
            peopleWhoVote: this.state.peopleWhoVote !== 'NO_SELECT' ? [this.state.peopleWhoVote] : ['none'],
            ocuppation: this.state.ocuppationChoose.length ? this.state.ocuppationChoose.map(item => item.name) : ['none'],
            socioeconomicLevel: this.state.socioeconomicLevelItems.length ? this.state.socioeconomicLevelItems.map(item => item.name) : ['none'],
            rentOrOwnHouse: this.state.rentOrOwnHouseChoose.length ? this.state.rentOrOwnHouseChoose.map(item => item.name) : ['none'],
            rentOrOwnCar: this.state.rentOrOwnCarChoose.length ? this.state.rentOrOwnCarChoose.map(item => item.name) : ['none'],
            categoryPrizes: this.state.categoryPrizeChoose.length ? this.state.categoryPrizeChoose.map(item => item.name) : ['none'],
            createdAt: moment().toISOString()
        }
        try {
            await API.graphql(graphqlOperation(mutations.createAudience, { input: audienceList }))
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
            await Toast.show({ text: "Audience created!", buttonText: "Okay", position: "top", type: "success", duration: 2000 })
            setTimeout(() => {
                _modalVisibleAudienceSelect(false)
                this.props._setModalVisibleAudience(false)
            }, 2000);
        } catch (error) {
            Toast.show({ text: "Oops! An error has occurred, please try again", buttonText: "Okay", position: "top", type: "danger", duration: 3000 })
            _isLoading(false)
        }
    }


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
            amountOfChildren,
            amountOfSimblings,
            parentalCondition,
            parentalConditionItems,
            politicalPeople,
            peopleWhoVote,
            ocuppation,
            ocuppationItems,
            socioeconomicLevel,
            socioeconomicLevelItems,
            rentOrOwnHouse,
            rentOrOwnHouseItems,
            rentOrOwnCar,
            rentOrOwnCarItems,
            categoryPrize,
            categoryPrizeItems,

            // Static Data
            countryList,
            nacionalityList,
            schoolsList,
            universityList,
            musicalGenreList,
            sportsList,
            academicLevelAchievedList,
            regionalIdentityList,
            parentalConditionList,
            ocuppationList,
            rentOrOwnHouseList,
            rentOrOwnCarList,
            categoryPrizeList,
            socioeconomicLevelList
        } = this.state
        const {
            // Data
            contest,

            // Actions
            isLoading
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
                        <Content scrollEnabled={!isLoading} contentContainerStyle={{ paddingBottom: 70 }}>
                            <List style={{ width: "100%" }}>
                                <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                    <Text style={{ color: "#BDBDBD" }}>Fill in the following fields</Text>
                                </ListItem>

                                {/* GENDER*/}
                                <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                    <Left>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#90A4AE" }}>
                                            <MaterialCommunityIcons active name="gender-male-female" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Identify the gender of the audience</Text>
                                    </Body>
                                    <Right>
                                        <Text>{gender === 'NO_SELECT' ? 'Not specified' : gender}</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                    {isLoading ? null :
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
                                        </Picker>}
                                </ListItem>

                                {/* AGE */}
                                <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#00C853" }}>
                                            <AntDesign active name="team" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Identify the age of the audience</Text>
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
                                    {isLoading ? null :
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
                                        </Picker>}
                                    {isLoading ? null :
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
                                        </Picker>}
                                </ListItem>

                                {/* CATEGORY */}
                                <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                    <Text style={{ color: "#BDBDBD" }}>
                                        <Text style={{ color: '#BDBDBD', fontWeight: 'bold' }}>
                                            {contest.user.name}
                                        </Text>, currently they have the following options established, as a country is <Text style={{ fontWeight: 'bold', color: '#BDBDBD' }}>{contest.aboutTheUser.location.country}</Text>, as categories this
								<Text style={{ color: '#BDBDBD', fontWeight: 'bold' }}> {_.lowerCase(contest.category)} </Text>,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   you can add more options to improve audience customization.
								</Text>
                                </ListItem>
                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectCategory._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#FB8C00" }}>
                                            <Entypo active name="documents" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                <View style={{
                                                    backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[5]}`,
                                                    margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                    borderColor: '#3333',
                                                    borderWidth: 0.5
                                                }}>
                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{_.startCase(_.lowerCase(contest.category))}</Text>
                                                </View>
                                                {categoryItems && categoryItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectCountry._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#0091EA" }}>
                                            <MaterialCommunityIcons active name="earth" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                <View style={{
                                                    backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[10]}`,
                                                    margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                    borderColor: '#3333',
                                                    borderWidth: 0.5
                                                }}>
                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{_.startCase(_.lowerCase(contest.aboutTheUser.location.country))}</Text>
                                                </View>
                                                {countryItems && countryItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectNacionality._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#6200EA" }}>
                                            <MaterialCommunityIcons active name="earth" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {nacionalityItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose some nationalities</Text>
                                                    </View>}
                                                {nacionalityItems && nacionalityItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectRegionalIdentity._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#C62828" }}>
                                            <FontAwesome active name="globe" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: -1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {regionalIdentityItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Identify the regional identity</Text>
                                                    </View>}
                                                {regionalIdentityItems && regionalIdentityItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectSexuality._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#E91E63" }}>
                                            <FontAwesome active name="intersex" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {sexualityItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose one of sexualities options</Text>
                                                    </View>}
                                                {sexualityItems && sexualityItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectuMaritalStatus._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#00BCD4" }}>
                                            <Entypo active name="slideshare" style={{ fontSize: wp(5), color: "#FFF", left: 1, top: 0 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {maritalStatusItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose marital status</Text>
                                                    </View>}
                                                {maritalStatusItems && maritalStatusItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectAcademicLevelAchieved._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#80D8FF" }}>
                                            <Entypo active name="bookmark" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {academicLevelAchievedItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose academic level achieved</Text>
                                                    </View>}
                                                {academicLevelAchievedItems && academicLevelAchievedItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectSchoolS._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#757575" }}>
                                            <FontAwesome active name="university" style={{ fontSize: wp(5), color: "#FFF", left: 2, top: -1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {schoolsItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose some schools</Text>
                                                    </View>}
                                                {schoolsItems && schoolsItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectuUniversity._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#795548" }}>
                                            <FontAwesome active name="university" style={{ fontSize: wp(5), color: "#FFF", left: 2, top: -1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {universityItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose some universities</Text>
                                                    </View>}
                                                {universityItems && universityItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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

                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectMusicalGenre._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#FFD600" }}>
                                            <Feather active name="music" style={{ fontSize: wp(5), color: "#FFF", left: 0, top: -1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {musicalGenreItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose some musical tastes</Text>
                                                    </View>}
                                                {musicalGenreItems && musicalGenreItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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

                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectSports._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#00C853" }}>
                                            <FontAwesome active name="soccer-ball-o" style={{ fontSize: wp(5.5), color: "#FFF", left: 0, top: 0 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {sportsItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose some sports tastes</Text>
                                                    </View>}
                                                {sportsItems && sportsItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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

                                {/* FAMILY */}
                                <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                    <Text style={{ color: "#BDBDBD" }}>More specifications</Text>
                                </ListItem>

                                {/* PARENT'S CONDITION */}
                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectParentalCondition._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#EF5350" }}>
                                            <Feather active name="users" style={{ fontSize: wp(5.5), color: "#FFF", left: 0, top: 0 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {parentalConditionItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose some parental condition</Text>
                                                    </View>}
                                                {parentalConditionItems && parentalConditionItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                            ref={SectionedMultiSelectParentalCondition => this.SectionedMultiSelectParentalCondition = SectionedMultiSelectParentalCondition}
                                            items={parentalConditionList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeParentalCondition}
                                            onSelectedItemObjectsChange={(items) => this._updateParentalCondition(items)}
                                            primary="#D81B60"
                                            selectedItems={parentalCondition}
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

                                {/* AMOUNT OF CHILDREN */}
                                <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                    <Left>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#1E88E5" }}>
                                            <FontAwesome active name="child" style={{ fontSize: wp(6), color: "#FFF", left: 1, }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Amount of children of a couple or single person</Text>
                                    </Body>
                                    <Right>
                                        <Text>{amountOfChildren === 'NO_SELECT' ? 'Not specified' : _.startCase(_.lowerCase(amountOfChildren))}</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                    {isLoading ? null :
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="SELECT ONE"
                                            style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                            headerTitleStyle={{ color: "#D81B60" }}
                                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                            textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                            selectedValue={amountOfChildren}
                                            onValueChange={this.onValueChangeAmountOfChildren}>
                                            {_.range(5).map(item => <Picker.Item key={item} label={`${item + 1} year`} value={item + 1} />)}
                                            <Picker.Item label="Do not specify" value="NO_SELECT" />
                                        </Picker>}
                                </ListItem>

                                {/* AMOUNT OF SIMBLINGS */}
                                <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                    <Left>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#AA00FF" }}>
                                            <Entypo active name="users" style={{ fontSize: wp(5.5), color: "#FFF", left: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Amount of simblings</Text>
                                    </Body>
                                    <Right>
                                        <Text>{amountOfSimblings === 'NO_SELECT' ? 'Not specified' : amountOfSimblings}</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                    {isLoading ? null :
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="SELECT ONE"
                                            style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                            headerTitleStyle={{ color: "#D81B60" }}
                                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                            textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                            selectedValue={amountOfSimblings}
                                            onValueChange={this.onValueChangeAmountOfSimblings}>
                                            {_.range(5).map(item => <Picker.Item key={item} label={`${item + 1}`} value={item + 1} />)}
                                            <Picker.Item label="Do not specify" value="NO_SELECT" />
                                        </Picker>}
                                </ListItem>

                                {/* POLITICAL  */}
                                <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                    <Text style={{ color: "#BDBDBD" }}></Text>
                                </ListItem>

                                {/* POLITICAL PEOPLE */}
                                <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                    <Left>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#78909C" }}>
                                            <Entypo active name="news" style={{ fontSize: wp(5.5), color: "#FFF", left: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Political people?</Text>
                                    </Body>
                                    <Right>
                                        <Text>{politicalPeople === 'NO_SELECT' ? 'Not specified' : _.startCase(_.lowerCase(politicalPeople))}</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                    {isLoading ? null :
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="SELECT ONE"
                                            style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                            headerTitleStyle={{ color: "#D81B60" }}
                                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                            textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                            selectedValue={politicalPeople}
                                            onValueChange={this.onValueChangePoliticalPeople}>
                                            <Picker.Item label="Yes" value="YES" />
                                            <Picker.Item label="No" value="NO" />
                                            <Picker.Item label="Both" value="BOTH" />
                                            <Picker.Item label="Do not specify" value="NO_SELECT" />
                                        </Picker>}
                                </ListItem>

                                {/* PLEOPLE WHO VOTE */}
                                <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                    <Left>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#424242" }}>
                                            <MaterialCommunityIcons active name="vote" style={{ fontSize: wp(5.5), color: "#FFF", left: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={{ color: isLoading ? "#BDBDBD" : null }}>People who vote?</Text>
                                    </Body>
                                    <Right>
                                        <Text>{peopleWhoVote === 'NO_SELECT' ? 'Not specified' : _.startCase(_.lowerCase(peopleWhoVote))}</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                    {isLoading ? null :
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="SELECT ONE"
                                            style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                            headerTitleStyle={{ color: "#D81B60" }}
                                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                            textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                            selectedValue={peopleWhoVote}
                                            onValueChange={this.onValueChangePeopleWhoVote}>
                                            <Picker.Item label="Yes" value="YES" />
                                            <Picker.Item label="No" value="NO" />
                                            <Picker.Item label="Both" value="BOTH" />
                                            <Picker.Item label="Do not specify" value="NO_SELECT" />
                                        </Picker>}
                                </ListItem>

                                {/* OCUPPATION OF THE AUDIENCE */}
                                <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                    <Text style={{ color: "#BDBDBD" }}></Text>
                                </ListItem>

                                {/* OCUPPATION */}
                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectoOcuppation._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#0097A7" }}>
                                            <Entypo active name="briefcase" style={{ fontSize: wp(5.5), color: "#FFF", left: 0, top: 0 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {ocuppationItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Select some occupations</Text>
                                                    </View>}
                                                {ocuppationItems && ocuppationItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                            ref={SectionedMultiSelectoOcuppation => this.SectionedMultiSelectoOcuppation = SectionedMultiSelectoOcuppation}
                                            items={ocuppationList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeOcuppation}
                                            onSelectedItemObjectsChange={(items) => this._updateOcuppation(items)}
                                            primary="#D81B60"
                                            selectedItems={ocuppation}
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

                                {/* SOCIOECONOMIC LEVEL*/}
                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectoSocioeconomicLevel._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#43A047" }}>
                                            <FontAwesome active name="money" style={{ fontSize: wp(5.5), color: "#FFF", left: 1 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {socioeconomicLevelItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Socioeconomic Level</Text>
                                                    </View>}
                                                {socioeconomicLevelItems && socioeconomicLevelItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                            ref={SectionedMultiSelectoSocioeconomicLevel => this.SectionedMultiSelectoSocioeconomicLevel = SectionedMultiSelectoSocioeconomicLevel}
                                            items={socioeconomicLevelList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onValueChangeSocioeconomicLevel}
                                            onSelectedItemObjectsChange={(items) => this._updateSocioeconomicLevel(items)}
                                            primary="#D81B60"
                                            selectedItems={socioeconomicLevel}
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

                                {/* RENT OR OWN HOUSE */}
                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectoRentOrOwnHouse._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#FB8C00" }}>
                                            <FontAwesome active name="home" style={{ fontSize: wp(5.5), color: "#FFF", left: 0, top: 0 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {rentOrOwnHouseItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Rent or own house</Text>
                                                    </View>}
                                                {rentOrOwnHouseItems && rentOrOwnHouseItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                            ref={SectionedMultiSelectoRentOrOwnHouse => this.SectionedMultiSelectoRentOrOwnHouse = SectionedMultiSelectoRentOrOwnHouse}
                                            items={rentOrOwnHouseList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeRentOrOwnHouse}
                                            onSelectedItemObjectsChange={(items) => this._updateRentOrOwnHouse(items)}
                                            primary="#D81B60"
                                            selectedItems={rentOrOwnHouse}
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

                                {/* RENT OR OWN CAR */}
                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectoRentOrOwnCar._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#BF360C" }}>
                                            <AntDesign active name="car" style={{ fontSize: wp(5.5), color: "#FFF", left: 0, top: 0 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {rentOrOwnCarItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Rent or own car</Text>
                                                    </View>}
                                                {rentOrOwnCarItems && rentOrOwnCarItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                            ref={SectionedMultiSelectoRentOrOwnCar => this.SectionedMultiSelectoRentOrOwnCar = SectionedMultiSelectoRentOrOwnCar}
                                            items={rentOrOwnCarList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeRentOrOwnCar}
                                            onSelectedItemObjectsChange={(items) => this._updateRentOrOwnCar(items)}
                                            primary="#D81B60"
                                            selectedItems={rentOrOwnCar}
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

                                {/* PRIZES */}
                                <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                                    <Text style={{ color: "#BDBDBD" }}>Specify the category of awards for the audience</Text>
                                </ListItem>

                                <ListItem
                                    disabled={isLoading}
                                    itemHeader
                                    onPress={() => this.SectionedMultiSelectoPrizeCategory._toggleSelector()}
                                    icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                    <Left style={{ right: 15 }}>
                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#FFD600" }}>
                                            <Feather active name="award" style={{ fontSize: wp(5.5), color: "#FFF", left: 0, top: 0 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ right: 15 }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                            <Content showsHorizontalScrollIndicator={false} horizontal>
                                                {categoryPrizeItems.length
                                                    ? null
                                                    : <View style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                        borderColor: '#3333',
                                                        borderWidth: 0.5
                                                    }}>
                                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose categories of your prize</Text>
                                                    </View>}
                                                {categoryPrizeItems && categoryPrizeItems.map((item, key) =>
                                                    <View key={key} style={{
                                                        backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
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
                                            ref={SectionedMultiSelectoPrizeCategory => this.SectionedMultiSelectoPrizeCategory = SectionedMultiSelectoPrizeCategory}
                                            items={categoryPrizeList}
                                            uniqueKey="id"
                                            subKey="children"
                                            selectText="Choose some things..."
                                            showDropDowns={true}
                                            readOnlyHeadings={true}
                                            onSelectedItemsChange={this.onSelectedItemsChangeCategoryPrize}
                                            onSelectedItemObjectsChange={(items) => this._updateCategoryPrize(items)}
                                            primary="#D81B60"
                                            selectedItems={categoryPrize}
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
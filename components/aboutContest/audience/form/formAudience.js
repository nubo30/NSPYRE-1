import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Content, Button, Text, Left, Icon, Right, View, Picker, Body, ListItem, List, Toast } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import moment from 'moment'
import Swiper from 'react-native-swiper'
import truncate from 'lodash/truncate'
import Axios from 'axios'

// Icons
import { Entypo, MaterialCommunityIcons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons'
import { colorsPalette } from '../../../global/static/colors'

// Static Data
import {
    sexualityList, academicLevelAchievedList, maritalStatusList, parentalConditionList, occupationList, rentOrOwnHouseList, rentOrOwnCarList, socioeconomicLevelList
} from '../../../global/data/global'

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
        countriesChoose: [],
        sexualityChoose: [],
        academicLevelAchievedChoose: [],
        schoolsChoose: [],
        universityChoose: [],
        maritalStatusChoose: [],
        parentalConditionChoose: [],
        amountOfChildren: 'NO_SELECT',
        amountOfSimblings: 'NO_SELECT',
        politicalPeople: 'NO_SELECT',
        occupationChoose: [],
        socioeconomicLevel: [],
        rentOrOwnHouseChoose: [],
        rentOrOwnCarChoose: [],

        // Pickers
        country: [],
        countryItems: [],
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
        parentalCondition: [],
        parentalConditionItems: [],
        occupation: [],
        occupationItems: [],
        rentOrOwnHouse: [],
        rentOrOwnHouseItems: [],
        rentOrOwnCar: [],
        rentOrOwnCarItems: [],
        socioeconomicLevelItems: [],

        // Static data
        countryList: [{ name: 'List of countries', id: 10 * 100, children: [] }],
        schoolsList: [{ name: 'List of schools', id: 10 * 100, children: [] }],
        academicLevelAchievedList: [{ name: 'List of academic level achieved', id: 10 * 100, children: [] }],
        universityList: [{ name: 'List of universities', id: 10 * 100, children: [] }],
        occupationList: [{ name: 'List of occupation', id: 10 * 100, children: [] }],
        rentOrOwnHouseList: [{ name: 'Current state to select (House)', id: 10 * 100, children: [] }],
        rentOrOwnCarList: [{ name: 'Current state to select (Car)', id: 10 * 100, children: [] }],
        socioeconomicLevelList: [{ name: 'List socioeconomic level', id: 10 * 100, children: [] }],

        // ADUIENCE
        usersFound: []
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this._getCountry()
            this._getAcademicLevelAchieved()
            this._getUniversityFromAPI()
            this._getSchoolsFromAPI()
            this._getParentalCondition()
            this._getOcuppation()
            this._getRentOrOwnHouse()
            this._getRentOrOwnCar()
            this._getSocioeconomicLevel()
            this._filterAudience()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { } = this.props
        if (prevState.age.years !== this.state.age.years
            || prevState.gender !== this.state.gender
            || prevState.countriesChoose !== this.state.countriesChoose
            || prevState.sexualityChoose !== this.state.sexualityChoose
            || prevState.academicLevelAchievedChoose !== this.state.academicLevelAchievedChoose
            || prevState.schoolsChoose !== this.state.schoolsChoose
            || prevState.universityChoose !== this.state.universityChoose
            || prevState.maritalStatusChoose !== this.state.maritalStatusChoose
            || prevState.parentalConditionChoose !== this.state.parentalConditionChoose
            || prevState.amountOfChildren !== this.state.amountOfChildren
            || prevState.amountOfSimblings !== this.state.amountOfSimblings
            || prevState.politicalPeople !== this.state.politicalPeople
            || prevState.occupationChoose !== this.state.occupationChoose
            || prevState.socioeconomicLevel !== this.state.socioeconomicLevel
            || prevState.rentOrOwnHouseChoose !== this.state.rentOrOwnHouseChoose
            || prevState.rentOrOwnCarChoose !== this.state.rentOrOwnCarChoose
        ) {
            this._filterAudience()
            this.state.age.years
                || this.state.gender !== 'NO_SELECT'
                || this.state.countriesChoose.length
                || this.state.sexualityChoose.length
                || this.state.academicLevelAchievedChoose.length
                || this.state.schoolsChoose.length
                || this.state.universityChoose.length
                || this.state.maritalStatusChoose.length
                || this.state.parentalConditionChoose.length
                || this.state.amountOfChildren !== 'NO_SELECT'
                || this.state.amountOfSimblings !== 'NO_SELECT'
                || this.state.politicalPeople !== 'NO_SELECT'
                || this.state.occupationChoose.length
                || this.state.socioeconomicLevel.length
                || this.state.rentOrOwnHouseChoose.length
                || this.state.rentOrOwnCarChoose.length
                ? prevProps._createAction(true)
                : prevProps._createAction(false)
        }
    }

    _getCountry = async () => {
        try {
            const response = await fetch('https://influencemenow-statics-files-env.s3.amazonaws.com/public/data/countries.json')
            response.json().then(json => this._getNameCountry(json))
        } catch (error) {
            console.log(error)
        }
    }

    _getNameCountry = (countries) => {
        this.setState({ countryList: [{ name: 'List of countries', id: 10 * 100, children: countries.map((item, key) => { return { name: item.name, id: key } }) }] })
    }

    _getUniversityFromAPI = async () => {
        try {
            const response = await fetch('https://influencemenow-statics-files-env.s3.amazonaws.com/public/data/universities.json')
            response.json().then(json => this._getUniversity(json))
        } catch (error) {
            console.log(error)
        }
    }

    _getSchoolsFromAPI = async () => {
        try {
            const response = await fetch('https://influencemenow-statics-files-env.s3.amazonaws.com/public/data/schools.json')
            response.json().then(json => this._getSchools(json))
        } catch (error) {
            console.log(error)
        }
    }

    _getAcademicLevelAchieved = () => {
        this.setState({ academicLevelAchievedList: [{ name: 'List of academic level achieved', id: 10 * 100, children: academicLevelAchievedList.map((item, key) => { return { name: item, id: key } }) }] })
    }

    _getSchools = (schoolsData) => {
        this.setState({ schoolsList: [{ name: 'List of schools', id: 10 * 100, children: schoolsData.schools.map((item, key) => { return { name: item.name, id: key } }) }] })
    }

    _getUniversity = (universities) => {
        this.setState({ universityList: [{ name: 'List of universities', id: 10 * 100, children: universities.map((item, key) => { return { name: item.name, id: key } }) }] })
    }

    _getParentalCondition = () => {
        this.setState({ parentalConditionList: [{ name: "List of parent's condition", id: 10 * 100, children: parentalConditionList.map((item, key) => { return { name: item, id: key } }) }] })
    }

    _getOcuppation = () => {
        this.setState({ occupationList: [{ name: "List of occupation", id: 10 * 100, children: occupationList.map((item, key) => { return { name: item, id: key } }) }] })
    }

    _getRentOrOwnHouse = () => {
        this.setState({ rentOrOwnHouseList: [{ name: "Current state to select (House)", id: 10 * 100, children: rentOrOwnHouseList.map((item, key) => { return { name: item, id: key } }) }] })
    }

    _getRentOrOwnCar = () => {
        this.setState({ rentOrOwnCarList: [{ name: "Current state to select (Car)", id: 10 * 100, children: rentOrOwnCarList.map((item, key) => { return { name: item, id: key } }) }] })
    }

    _getSocioeconomicLevel = () => {
        this.setState({ socioeconomicLevelList: [{ name: "List socioeconomic level", id: 10 * 100, children: socioeconomicLevelList.map((item, key) => { return { name: item, id: key } }) }] })
    }


    // Pickers
    onValueChangeGender = (value) => { this.setState({ gender: value }) }
    onValueChangeYearOne = (value) => { this.setState({ age: { ...this.state.age, yearOne: value, yearTwo: value + 1, years: `${value} - ${value + 1}` } }) }
    onValueChangeYearTwo = (value) => { this.setState({ age: { ...this.state.age, yearTwo: value, years: `${this.state.age.yearOne} - ${value}` } }) }
    onSelectedItemsChangeCountry = (value) => { this.setState({ country: value }) }
    onSelectedItemsChangeSexuality = (value) => { this.setState({ sexuality: value }) }
    onSelectedItemsChangeAcademicLevelAchieved = (value) => { this.setState({ academicLevelAchieved: value }) }
    onSelectedItemsChangeSchoolS = (value) => { this.setState({ schools: value }) }
    onSelectedItemsChangeUniversity = (value) => { this.setState({ university: value }) }
    onSelectedItemsChangeMaritalStatus = (value) => { this.setState({ maritalStatus: value }) }
    onValueChangeAmountOfChildren = (value) => { this.setState({ amountOfChildren: value }) }
    onValueChangeAmountOfSimblings = (value) => { this.setState({ amountOfSimblings: value }) }
    onSelectedItemsChangeParentalCondition = (value) => { this.setState({ parentalCondition: value }) }
    onValueChangePoliticalPeople = (value) => this.setState({ politicalPeople: value })
    onSelectedItemsChangeOcuppation = (value) => { this.setState({ occupation: value }) }
    onValueChangeSocioeconomicLevel = (value) => { this.setState({ socioeconomicLevel: value }) }
    onSelectedItemsChangeRentOrOwnHouse = (value) => { this.setState({ rentOrOwnHouse: value }) }
    onSelectedItemsChangeRentOrOwnCar = (value) => { this.setState({ rentOrOwnCar: value }) }

    _updateCountryItems = (value) => {
        this.setState({ countryItems: value, countriesChoose: value })
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

    _updateParentalCondition = (value) => {
        this.setState({ parentalConditionItems: value, parentalConditionChoose: value })
    }

    _updateOcuppation = (value) => {
        this.setState({ occupationItems: value, occupationChoose: value })
    }

    _updateRentOrOwnHouse = (value) => {
        this.setState({ rentOrOwnHouseItems: value, rentOrOwnHouseChoose: value })
    }
    _updateRentOrOwnCar = (value) => {
        this.setState({ rentOrOwnCarItems: value, rentOrOwnCarChoose: value })
    }

    _updateSocioeconomicLevel = (value) => {
        this.setState({ socioeconomicLevelItems: value, socioeconomicLevelChoose: value })
    }

    // Send Data to AWS
    componentWillReceiveProps(nextProps) {
        if (nextProps.searchMatches !== this.props.searchMatches) { this._filterAudience() }
        if (nextProps.sendDataToAWSAction !== this.props.sendDataToAWSAction) { this._sendDataToAWSAction() }
    }

    _sendDataToAWSAction = async () => {
        const { usersFound } = this.state
        const { _isLoading, contest, _createAntoher } = this.props
        _isLoading(true)
        const audience = {
            createdAt: moment().toISOString(),
            audienceCreateContestId: contest.id,
            contest: JSON.stringify({
                "category": contest.category,
                "createdAt": contest.createdAt,
                "general": {
                    "description": contest.general.description,
                    "instructions": contest.general.instructions,
                    "nameOfContest": contest.general.nameOfContest,
                    "picture": {
                        "blob": contest.general.picture.blob,
                        "localUrl": contest.general.picture.localUrl,
                        "name": contest.general.picture.name,
                        "type": contest.general.picture.type,
                        "url": contest.general.picture.url
                    },
                    "video": {
                        "blob": contest.general.video.blob,
                        "localUrl": contest.general.video.localUrl,
                        "name": contest.general.video.name,
                        "type": contest.general.video.type,
                        "url": contest.general.video.url
                    }
                },
                "id": contest.id,
                "participants": contest.participants.items.length,
                "prizes": contest.prizes.length,
                "timer": {
                    "end": contest.timer.end,
                    "start": contest.timer.start
                },
                "user": {
                    "avatar": contest.user.avatar,
                    "datetime": contest.user.datetime,
                    "email": contest.user.email,
                    "id": contest.user.id,
                    "lastname": contest.user.lastname,
                    "name": contest.user.name,
                    "notificationToken": contest.user.notificationToken,
                    "userId": contest.user.userId,
                    "username": contest.user.username
                }
            }), // Se encuenta la información del creador del concurso
            usersFound: JSON.stringify(usersFound.map(items => items._source.engages.user)),
            aboutThePersonality: JSON.stringify([
                this.state.gender !== 'NO_SELECT' ? { "Gender": this.state.gender } : null,
                this.state.sexualityChoose.length !== 0 ? { "Sexual preference": [this.state.sexualityChoose.map(item => item.name)] } : null,
                this.state.maritalStatusChoose.length !== 0 ? { "Marital status": [this.state.maritalStatusChoose.map(item => item.name)] } : null,
                this.state.parentalConditionChoose.length !== 0 ? { "Parental status": this.state.parentalConditionChoose.map(items => items.name) } : null,
                this.state.amountOfChildren !== 'NO_SELECT' ? { "Amount of children": this.state.amountOfChildren } : null,
                this.state.amountOfSimblings !== 'NO_SELECT' ? { "Amount of simblings": this.state.amountOfSimblings } : null,
                this.state.age.yearOne && this.state.age.yearTwo ? { "Ages": { "gte": this.state.age.yearOne, "lte": this.state.age.yearTwo } } : null,
                this.state.countriesChoose.length === 0 ? '' : { "Location": this.state.countriesChoose.map(item => item.name) }
            ].filter(item => item !== null)),
            aboutTheOccupations: JSON.stringify([
                this.state.academicLevelAchievedChoose.length !== 0 ? { "Academic level": this.state.academicLevelAchievedChoose.map(item => item.name) } : null,
                this.state.occupationChoose.length !== 0 ? { "Occupation": this.state.occupationChoose.map(item => item.name) } : null,
                this.state.rentOrOwnCarChoose.length !== 0 ? { "Method of transportation": this.state.rentOrOwnCarChoose.map(item => item.name) } : null,
                this.state.rentOrOwnHouseItems.length !== 0 ? { "Living arrangements": this.state.rentOrOwnHouseItems.map(item => item.name) } : null,
                this.state.schoolsChoose.length !== 0 ? { "Hight school": this.state.schoolsChoose.map(item => item.name) } : null,
                this.state.universityChoose.length !== 0 ? { "University": this.state.universityChoose.map(item => item.name) } : null,
                this.state.socioeconomicLevelItems.length !== 0 ? { "Socialeconomic": this.state.socioeconomicLevelItems.map(item => item.name) } : null,
                this.state.politicalPeople !== 'NO_SELECT' ? { "Political": this.state.politicalPeople } : null
            ].filter(item => item !== null))
        }

        try {
            await API.graphql(graphqlOperation(mutations.createAudience, { input: audience }))
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
            setTimeout(() => {
                _isLoading(false)
            }, 500);
            setTimeout(() => {
                Toast.show({
                    text: "Audience created successfully!",
                    type: "success",
                    position: "top",
                    duration: 2500
                })
                _createAntoher(true)
            }, 1000);
            setTimeout(() => {
                this.setState({
                    // Data
                    age: {
                        yearOne: 0,
                        yearTwo: 0,
                        years: ''
                    },
                    gender: 'NO_SELECT',
                    countriesChoose: [],
                    sexualityChoose: [],
                    academicLevelAchievedChoose: [],
                    schoolsChoose: [],
                    universityChoose: [],
                    maritalStatusChoose: [],
                    parentalConditionChoose: [],
                    amountOfChildren: 'NO_SELECT',
                    amountOfSimblings: 'NO_SELECT',
                    politicalPeople: 'NO_SELECT',
                    occupationChoose: [],
                    socioeconomicLevel: [],
                    rentOrOwnHouseChoose: [],
                    rentOrOwnCarChoose: [],

                    // Pickers
                    country: [],
                    countryItems: [],
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
                    parentalCondition: [],
                    parentalConditionItems: [],
                    occupation: [],
                    occupationItems: [],
                    rentOrOwnHouse: [],
                    rentOrOwnHouseItems: [],
                    rentOrOwnCar: [],
                    rentOrOwnCarItems: [],
                    socioeconomicLevelItems: [],

                    // ADUIENCE
                    usersFound: []
                })
                this._filterAudience()
            }, 2000);
        } catch (error) {
            _isLoading(false)
            Toast.show({
                text: "Error creating audience, please try again.",
                type: "danger",
                position: "top"

            })
            console.log(error)
        }
    }


    _filterAudience = () => {
        const { _matchProfiles } = this.props
        const aboutThePersonality = {
            "nested": {
                "path": "engages.aboutThePersonality",
                "query": {
                    "bool": {
                        "must": [
                            this.state.gender !== 'NO_SELECT' ? { "match": { "engages.aboutThePersonality.gender": this.state.gender } } : null,
                            this.state.sexualityChoose.length !== 0 ? { "bool": { "should": [this.state.sexualityChoose.map(item => ({ "match": { "engages.aboutThePersonality.sexuality": item.name } }))] } } : null,
                            this.state.maritalStatusChoose.length !== 0 ? { "bool": { "should": [this.state.maritalStatusChoose.map(item => ({ "match_phrase": { "engages.aboutThePersonality.maritalStatus": item.name } }))] } } : null,
                            this.state.parentalConditionChoose.length !== 0 ? { "bool": { "should": this.state.parentalConditionChoose.map(items => ({ "match": { "engages.aboutThePersonality.parentalCondition": items.name } })) } } : null,
                            this.state.amountOfChildren !== 'NO_SELECT' ? { "match": { "engages.aboutThePersonality.amountOfChildren": this.state.amountOfChildren } } : null,
                            this.state.amountOfSimblings !== 'NO_SELECT' ? { "match": { "engages.aboutThePersonality.amountOfSimblings": this.state.amountOfSimblings } } : null,
                            this.state.age.yearOne && this.state.age.yearTwo ? { "range": { "engages.aboutThePersonality.age": { "gte": this.state.age.yearOne, "lte": this.state.age.yearTwo, "boost": 2.0 } } } : null,
                            this.state.countriesChoose.length ? {
                                "nested": {
                                    "path": "engages.aboutThePersonality.location",
                                    "query": {
                                        "bool": {
                                            "should": [
                                                this.state.countriesChoose.length === 0 ? '' : this.state.countriesChoose.map(item => ({ "match_phrase": { "engages.aboutThePersonality.location.country": item.name } }))
                                            ]
                                        }
                                    }
                                }
                            } : null
                        ].filter(item => item !== null)
                    }
                }
            }
        }

        const aboutTheOccupations = {
            "nested": {
                "path": "engages.aboutTheOccupations",
                "query": {
                    "bool": {
                        "must": [
                            this.state.academicLevelAchievedChoose.length !== 0 ? { "bool": { "should": this.state.academicLevelAchievedChoose.map(item => ({ "match_phrase": { "engages.aboutTheOccupations.levelAchivied": item.name } })) } } : null,
                            this.state.occupationChoose.length !== 0 ? { "bool": { "should": this.state.occupationChoose.map(item => ({ "match_phrase": { "engages.aboutTheOccupations.occupation": item.name } })) } } : null,
                            this.state.rentOrOwnCarChoose.length !== 0 ? { "bool": { "should": this.state.rentOrOwnCarChoose.map(item => ({ "match": { "engages.aboutTheOccupations.rentOrOwnCar": item.name } })) } } : null,
                            this.state.rentOrOwnHouseItems.length !== 0 ? { "bool": { "should": this.state.rentOrOwnHouseItems.map(item => ({ "match": { "engages.aboutTheOccupations.rentOrOwnHouse": item.name } })) } } : null,
                            this.state.schoolsChoose.length !== 0 ? { "bool": { "should": this.state.schoolsChoose.map(item => ({ "match_phrase": { "engages.aboutTheOccupations.schools": item.name } })) } } : null,
                            this.state.universityChoose.length !== 0 ? { "bool": { "should": this.state.universityChoose.map(item => ({ "match_phrase": { "engages.aboutTheOccupations.university": item.name } })) } } : null,
                            this.state.socioeconomicLevelItems.length !== 0 ? { "bool": { "should": this.state.socioeconomicLevelItems.map(item => ({ "match": { "engages.aboutTheOccupations.socioeconomicLevel": item.name } })) } } : null,
                            this.state.politicalPeople !== 'NO_SELECT' ? { "match": { "engages.aboutTheOccupations.political": this.state.politicalPeople } } : null,

                        ].filter(item => item !== null)
                    }
                }
            }
        }

        const verifyRootElements = [
            this.state.age.yearOne && this.state.age.yearTwo ||
                this.state.sexualityChoose.length !== 0 ||
                this.state.maritalStatusChoose.length !== 0 ||
                this.state.parentalConditionChoose.length !== 0 ||
                this.state.amountOfChildren !== 'NO_SELECT' ||
                this.state.amountOfSimblings !== 'NO_SELECT' ||
                this.state.gender !== 'NO_SELECT' ||
                this.state.countriesChoose.length !== 0 ? aboutThePersonality : null,
            this.state.academicLevelAchievedChoose.length !== 0 ||
                this.state.occupationChoose.length !== 0 ||
                this.state.rentOrOwnCarChoose.length !== 0 ||
                this.state.rentOrOwnHouseItems.length !== 0 ||
                this.state.schoolsChoose.length !== 0 ||
                this.state.universityChoose.length !== 0 ||
                this.state.socioeconomicLevelItems.length !== 0 ||
                this.state.politicalPeople !== 'NO_SELECT' ? aboutTheOccupations : null
        ]

        const searchAudiencie = {
            "query": {
                "nested": {
                    "path": "engages",
                    "query": {
                        "bool": { "must": verifyRootElements.filter(item => item !== null) }
                    }
                }
            }
        }
        Axios.get("https://search-influencemenowtest-pirbhpqtqvcumgt6ze4spjupba.us-east-1.es.amazonaws.com/engages/_search", {
            params: {
                source: JSON.stringify(searchAudiencie),
                source_content_type: 'application/json'
            }
        }).then(res => { _matchProfiles(res.data.hits.total.value), this.setState({ usersFound: res.data.hits.hits.filter(item => item._source.engages.user.id !== this.props.contest.user.id && item) }) }).catch(err => console.log("Error", err))
    }

    render() {
        const {
            gender,
            age,

            // Pickers
            country,
            countryItems,
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
            amountOfChildren,
            amountOfSimblings,
            parentalCondition,
            parentalConditionItems,
            politicalPeople,
            occupation,
            occupationItems,
            socioeconomicLevel,
            socioeconomicLevelItems,
            rentOrOwnHouse,
            rentOrOwnHouseItems,
            rentOrOwnCar,
            rentOrOwnCarItems,

            // Static Data
            countryList,
            schoolsList,
            universityList,
            academicLevelAchievedList,
            parentalConditionList,
            occupationList,
            rentOrOwnHouseList,
            rentOrOwnCarList,
            socioeconomicLevelList
        } = this.state
        const {
            // Data
            contest,

            // Actions
            isLoading
        } = this.props;
        return (
            <Container contentContainerStyle={{ flex: 1 }} >
                <Grid>
                    <Row size={20} style={{ alignItems: 'center', flexDirection: 'column', backgroundColor: '#FFF' }}>
                        <Text allowFontScaling={false} style={{ color: "#333", fontSize: wp(4), textAlign: 'center', top: 20, paddingLeft: 20, paddingRight: 20 }}>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(4), color: '#333' }}>{contest.user.name}</Text>, Select an audience and as you build we will tell you the price so you can keep within your budget!
               			</Text>
                    </Row>
                    <Row size={80} style={{ backgroundColor: '#FFF' }}>
                        <Content scrollEnabled={false}>
                            <List style={{ width: "100%" }}>
                                <Swiper
                                    scrollEnabled={!isLoading}
                                    activeDotColor="#E91E63"
                                    style={{ height: 420 }} loop={false}>
                                    <View style={{ flex: 1 }}>
                                        {/* GENDER*/}
                                        <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#90A4AE" }}>
                                                    <MaterialCommunityIcons active name="gender-male-female" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Gender</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{gender === 'NO_SELECT' ? 'Not specified' : gender}</Text>
                                                <Icon active name="arrow-forward" />
                                            </Right>
                                            {isLoading ? null :
                                                <View style={{ position: 'absolute', width: '100%' }}>
                                                    <Picker
                                                        mode="dropdown"
                                                        iosHeader="SELECT ONE"
                                                        headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                        headerTitleStyle={{ color: "#D81B60" }}
                                                        headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                        textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                        selectedValue={gender}
                                                        onValueChange={this.onValueChangeGender}>
                                                        <Picker.Item label="Male" value="Male" />
                                                        <Picker.Item label="Female" value="Female" />
                                                        <Picker.Item label="Both" value="Both" />
                                                        <Picker.Item label="Other" value="Other" />
                                                        <Picker.Item label="Do not specify" value="NO_SELECT" />
                                                    </Picker>
                                                </View>
                                            }
                                        </ListItem>

                                        {/* AGE */}
                                        <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                                            <Left style={{ right: 15 }}>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#00C853" }}>
                                                    <AntDesign active name="team" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                                                </Button>
                                            </Left>
                                            <Body style={{ right: 15 }}>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Age</Text>
                                            </Body>
                                            <Right>
                                                <Button small transparent bordered style={{ borderColor: '#9E9E9E' }}>
                                                    <Text allowFontScaling={false} style={{ color: '#9E9E9E' }}>{age.yearOne}</Text>
                                                </Button>
                                                <Text allowFontScaling={false} style={{ left: -1, color: '#9E9E9E' }}> - </Text>
                                                <Button small transparent bordered style={{ borderColor: '#9E9E9E' }}>
                                                    <Text allowFontScaling={false} style={{ color: '#9E9E9E' }}>{age.yearTwo}</Text>
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
                                                    {_.range(11, 65).map(item => <Picker.Item key={item} label={`${item + 1} year`} value={item + 1} />)}
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
                                                    {_.range(age.yearOne, 65).map(item => <Picker.Item key={item} label={`${item + 1} year`} value={item + 1} />)}
                                                </Picker>}
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Location</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false}>
                                                    {truncate((countryItems.length ? countryItems.map(item => `${item.name}`).join(', ') : "Add more"), { length: 15, separator: "..." })}
                                                </Text>
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
                                        <Text allowFontScaling={false} style={{ alignSelf: 'center', width: "90%", textAlign: 'center', color: colorsPalette.darkFont, fontSize: wp(2.5), top: 20 }}>
                                            Customize your audience through these three simple questions, so you would be reducing the audience to which your contest will fit.
                                        <Text allowFontScaling={false} style={{ alignSelf: 'center', width: "90%", textAlign: 'center', color: colorsPalette.darkFont, fontSize: wp(2.5), top: 20, fontWeight: 'bold' }}> (Swipe left for more options)</Text>
                                        </Text>
                                    </View>

                                    <View style={{ flex: 1 }}>

                                        {/* SEXUAL ORIENTATION */}
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Sexual identity</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false}>
                                                    {truncate((sexualityItems.length ? sexualityItems.map(item => `${item.name}`).join(', ') : "Add more"), { length: 15, separator: "..." })}
                                                </Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Parental condition</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false}>
                                                    {truncate((parentalConditionItems.length ? parentalConditionItems.map(item => `${item.name}`).join(', ') : "Add more"), { length: 15, separator: "..." })}
                                                </Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Amount of children</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{amountOfChildren === 'NO_SELECT' ? 'Not specified' : _.startCase(_.lowerCase(amountOfChildren))}</Text>
                                                <Icon active name="arrow-forward" />
                                            </Right>
                                            {!isLoading &&
                                                <View style={{ width: "100%", position: 'absolute' }}>
                                                    <Picker
                                                        mode="dropdown"
                                                        iosHeader="SELECT ONE"
                                                        headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                        headerTitleStyle={{ color: "#D81B60" }}
                                                        headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                        textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                        selectedValue={amountOfChildren}
                                                        onValueChange={this.onValueChangeAmountOfChildren}>
                                                        {_.range(5).map(item => <Picker.Item key={item} label={`${item + 1} year`} value={item + 1} />)}
                                                        <Picker.Item label="Do not specify" value="NO_SELECT" />
                                                    </Picker>
                                                </View>}
                                        </ListItem>

                                        {/* AMOUNT OF SIMBLINGS */}
                                        <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#AA00FF" }}>
                                                    <Entypo active name="users" style={{ fontSize: wp(5.5), color: "#FFF", left: 1 }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Amount of siblings</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{amountOfSimblings === 'NO_SELECT' ? 'Not specified' : amountOfSimblings}</Text>
                                                <Icon active name="arrow-forward" />
                                            </Right>
                                            {!isLoading &&
                                                <View style={{ width: "100%", position: 'absolute' }}>
                                                    <Picker
                                                        mode="dropdown"
                                                        iosHeader="SELECT ONE"
                                                        headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                        headerTitleStyle={{ color: "#D81B60" }}
                                                        headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                        textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                        selectedValue={amountOfSimblings}
                                                        onValueChange={this.onValueChangeAmountOfSimblings}>
                                                        {_.range(5).map(item => <Picker.Item key={item} label={`${item + 1}`} value={item + 1} />)}
                                                        <Picker.Item label="Do not specify" value="NO_SELECT" />
                                                    </Picker>
                                                </View>
                                            }
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Marital status</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false}>
                                                    {truncate((maritalStatusItems.length ? maritalStatusItems.map(item => `${item.name}`).join(', ') : "Add more"), { length: 15, separator: "..." })}
                                                </Text>
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

                                    </View>


                                    <View style={{ flex: 1 }}>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Academic level achieved</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false}>
                                                    {truncate((academicLevelAchievedItems.length ? academicLevelAchievedItems.map(item => `${item.name}`).join(', ') : "Add more"), { length: 15, separator: "..." })}
                                                </Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>School name(s)</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false}>
                                                    {truncate((schoolsItems.length ? schoolsItems.map(item => `${item.name}`).join(', ') : "Add more"), { length: 15, separator: "..." })}
                                                </Text>
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
                                                            <Text allowFontScaling={false} style={{ alignSelf: 'center', textAlign: 'center', color: '#3333', fontSize: wp(3), fontWeight: '100' }}>Thanks to <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(3), color: '#3333' }}> Code.org </Text> for allowing us to use the data shown here.</Text>
                                                            <Button small transparent iconRight>
                                                                <Text allowFontScaling={false} style={{ color: '#E53935', fontWeight: 'normal', fontSize: wp(3.5) }}>If you can't find the school, please let us know.</Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>University name(s)</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false}>
                                                    {truncate((universityItems.length ? universityItems.map(item => `${item.name}`).join(', ') : "Add more"), { length: 15, separator: "..." })}
                                                </Text>
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
                                                                <Text allowFontScaling={false} style={{ color: '#E53935', fontWeight: 'normal', fontSize: wp(3.5) }}>If you can't find the university, please let us know.</Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Occupations</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false}>
                                                    {truncate((occupationItems.length ? occupationItems.map(item => `${item.name}`).join(', ') : "Add more"), { length: 15, separator: "..." })}
                                                </Text>
                                                <Icon active name="arrow-forward" />
                                            </Right>
                                            <View style={{ backgroundColor: 'red', position: 'absolute', right: '-500000%' }}>
                                                <SectionedMultiSelect
                                                    parentChipsRemoveChildren={true}
                                                    ref={SectionedMultiSelectoOcuppation => this.SectionedMultiSelectoOcuppation = SectionedMultiSelectoOcuppation}
                                                    items={occupationList}
                                                    uniqueKey="id"
                                                    subKey="children"
                                                    selectText="Choose some things..."
                                                    showDropDowns={true}
                                                    readOnlyHeadings={true}
                                                    onSelectedItemsChange={this.onSelectedItemsChangeOcuppation}
                                                    onSelectedItemObjectsChange={(items) => this._updateOcuppation(items)}
                                                    primary="#D81B60"
                                                    selectedItems={occupation}
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

                                        {/* POLITICAL PEOPLE */}
                                        <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#78909C" }}>
                                                    <Entypo active name="news" style={{ fontSize: wp(5.5), color: "#FFF", left: 1 }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Political</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{politicalPeople === 'NO_SELECT' ? 'Not specified' : _.startCase(_.lowerCase(politicalPeople))}</Text>
                                                <Icon active name="arrow-forward" />
                                            </Right>
                                            {!isLoading &&
                                                <View style={{ width: "100%", position: "absolute" }}>
                                                    <Picker
                                                        mode="dropdown"
                                                        iosHeader="SELECT ONE"
                                                        headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                        headerTitleStyle={{ color: "#D81B60" }}
                                                        headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                        textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                        selectedValue={politicalPeople}
                                                        onValueChange={this.onValueChangePoliticalPeople}>
                                                        <Picker.Item label="Yes" value="Yes" />
                                                        <Picker.Item label="No" value="No" />
                                                        <Picker.Item label="Both" value="Both" />
                                                        <Picker.Item label="Do not specify" value="NO_SELECT" />
                                                    </Picker>
                                                </View>
                                            }
                                        </ListItem>
                                    </View>

                                    <View style={{ flex: 1 }}>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Socio economic level</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false}>
                                                    {truncate((socioeconomicLevelItems.length ? socioeconomicLevelItems.map(item => `${item.name}`).join(', ') : "Add more"), { length: 15, separator: "..." })}
                                                </Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Living arrangements</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false}>
                                                    {truncate((rentOrOwnHouseItems.length ? rentOrOwnHouseItems.map(item => `${item.name}`).join(', ') : "Add more"), { length: 15, separator: "..." })}
                                                </Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Method of transportation</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false}>
                                                    {truncate((rentOrOwnCarItems.length ? rentOrOwnCarItems.map(item => `${item.name}`).join(', ') : "Add more"), { length: 15, separator: "..." })}
                                                </Text>
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

                                    </View>
                                </Swiper>
                            </List>
                        </Content>
                    </Row>
                </Grid>
            </Container>
        );
    }
}
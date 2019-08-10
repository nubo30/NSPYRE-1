import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { connect } from 'react-redux'
import { Container, Content, Footer, Button, Text, View, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isAscii, isMobilePhone, isNumeric } from "validator"
import _ from 'lodash'

// Components child
import FormEngageHeader from './header/index'
import FormEngage from './formEngage'

// Styles
import { colors } from "../../Global/static/colors"

// GraphQL
import * as queries from "../../../src/graphql/queries"
import * as mutations from "../../../src/graphql/mutations"

const fullHeight = Dimensions.get('window').height;

class RootFormEngage extends Component {

    state = { loading: false, isReady: false, userData: null, pointsEarned: 0, formData: null }

    async componentDidMount() {
        try {
            const { idToken } = await Auth.currentSession()
            const userData = await API.graphql(graphqlOperation(queries.getUser, { id: idToken.payload.sub }));
            this.setState({ userData, isReady: true })
        } catch (error) {
            console.log(error, 'no se ha podido obtener los datos del usuario')
        }
    }

    // System ear points
    componentWillReceiveProps(nextProps) {
        if (nextProps.engageFormData !== this.props.engageFormData) {
            const { engageFormData } = nextProps; let pointsEarn = []
            Object.entries(engageFormData.address).length !== 0 ? pointsEarn.push(200) : 0
            engageFormData.phone !== '' && isMobilePhone(engageFormData.phone) ? pointsEarn.push(120) : 0
            engageFormData.amountOfChildren >= 1 && isNumeric(engageFormData.amountOfChildren) ? pointsEarn.push(50) : 0
            engageFormData.amountOfSiblings >= 1 && isNumeric(engageFormData.amountOfSiblings) ? pointsEarn.push(50) : 0
            engageFormData.academicLevelAchieved >= 1 && isNumeric(engageFormData.academicLevelAchieved) ? pointsEarn.push(110) : 0
            engageFormData.areYouPolitical !== 'NO_SELECT' ? pointsEarn.push(50) : 0
            engageFormData.birthDate !== '' ? pointsEarn.push(50) : 0
            engageFormData.doYouVote !== 'NO_SELECT' ? pointsEarn.push(50) : 0
            engageFormData.sexualOrientation !== 'NO_SELECT' ? pointsEarn.push(100) : 0
            engageFormData.gender !== 'NO_SELECT' ? pointsEarn.push(50) : 0
            engageFormData.haveACar !== 'NO_SELECT' ? pointsEarn.push(50) : 0
            engageFormData.howDoYouIdentify !== 'NO_SELECT' ? pointsEarn.push(50) : 0
            engageFormData.levelAchieved !== 'NO_SELECT' ? pointsEarn.push(100) : 0
            engageFormData.musicYouLike.length ? pointsEarn.push(75) : 0
            engageFormData.nacionality !== 'NO_SELECT' ? pointsEarn.push(75) : 0
            engageFormData.parents !== 'NO_SELECT' ? pointsEarn.push(50) : 0
            engageFormData.phone !== '' && isMobilePhone(engageFormData.phone) ? pointsEarn.push(120) : 0
            engageFormData.name.length >= 10 && isAscii(engageFormData.name) ? pointsEarn.push(50) : 0
            engageFormData.relationshipStatus !== 'NO_SELECT' ? pointsEarn.push(100) : 0
            engageFormData.schoolNameCollege.length >= 5 && isAscii(engageFormData.schoolNameCollege) ? pointsEarn.push(110) : 0
            engageFormData.schoolNameHSchool.length >= 5 && isAscii(engageFormData.schoolNameHSchool) ? pointsEarn.push(110) : 0
            engageFormData.schoolNameOthers.length >= 5 && isAscii(engageFormData.schoolNameOthers) ? pointsEarn.push(110) : 0
            engageFormData.socioeconomicLevel !== 'NO_SELECT' ? pointsEarn.push(50) : 0
            engageFormData.sportsYouLike.length ? pointsEarn.push(75) : 0
            engageFormData.sportsYouPlay.length ? pointsEarn.push(75) : 0
            engageFormData.titleInTheCompany !== 'NO_SELECT' ? pointsEarn.push(200) : 0
            engageFormData.typeOfHousing !== 'NO_SELECT' ? pointsEarn.push(50) : 0
            engageFormData.whatKindOfPrizeDoYouLike !== 'NO_SELECT' ? pointsEarn.push(50) : 0
            this.setState({ pointsEarned: _.sum(pointsEarn), formData: engageFormData })
        }
    }

    // send data to amazon aws
    sendDataToAWS = async () => {
        const { formData, pointsEarned, userData } = this.state
        const input = {
            userId: userData.data.getUser.id,
            formEngageUserId: userData.data.getUser.id,
            category: formData === null ? 'NO_SELECT' : formData.category.toUpperCase(),
            phone: formData === null ? null : formData.phone === "" ? null : formData.phone,
            address: formData === null ? null : formData.address,
            amountOfChildren: formData === null ? null : parseInt(formData.amountOfChildren, 10),
            amountOfSiblings: formData === null ? null : parseInt(formData.amountOfSiblings, 10),
            areYouPolitical: formData === null ? null : formData.areYouPolitical === "" ? 'NO_SELECT' : formData.areYouPolitical.toUpperCase(),
            doYouVote: formData === null ? null : formData.doYouVote === "" ? 'NO_SELECT' : formData.doYouVote.toUpperCase(),
            birthDate: formData === null ? null : formData.birthDate === "" ? null : formData.birthDate,
            gender: formData === null ? null : formData.gender === "" ? 'NO_SELECT' : formData.gender.toUpperCase(),
            academicLevelAchieved: formData === null ? null : parseInt(formData.academicLevelAchieved, 10),
            haveACar: formData === null ? null : formData.haveACar === "NO_SELECT" ? null : formData.haveACar.toUpperCase(),
            howDoYouIdentify: formData === null ? null : formData.howDoYouIdentify === "" ? 'NO_SELECT' : formData.howDoYouIdentify.toUpperCase(),
            levelAchieved: formData === null ? null : formData.levelAchieved === "" ? 'NO_SELECT' : formData.levelAchieved.toUpperCase(),
            musicYouLike: formData && formData.musicYouLike,
            nacionality: formData === null ? null : formData.nacionality === "" ? 'NO_SELECT' : formData.nacionality.toUpperCase(),
            parents: formData === null ? null : formData.parents === "" ? 'NO_SELECT' : formData.parents.toUpperCase(),
            relationshipStatus: formData === null ? null : formData.relationshipStatus === "" ? 'NO_SELECT' : formData.relationshipStatus.toUpperCase(),
            schoolNameCollege: formData === null ? null : formData.schoolNameCollege === "" ? null : formData.schoolNameCollege,
            schoolNameHSchool: formData === null ? null : formData.schoolNameHSchool === "" ? null : formData.schoolNameHSchool,
            schoolNameOthers: formData === null ? null : formData.schoolNameOthers === "" ? null : formData.schoolNameOthers,
            sexualOrientation: formData === null ? null : formData.sexualOrientation === "" ? 'NO_SELECT' : formData.sexualOrientation.toUpperCase(),
            socioeconomicLevel: formData === null ? null : formData.socioeconomicLevel === "" ? 'NO_SELECT' : formData.socioeconomicLevel.toUpperCase(),
            sportsYouLike: formData && formData.sportsYouLike,
            sportsYouPlay: formData && formData.sportsYouPlay,
            titleInTheCompany: formData === null ? null : formData.titleInTheCompany === "" ? null : formData.titleInTheCompany,
            typeOfHousing: formData === null ? null : formData.typeOfHousing === "" ? 'NO_SELECT' : formData.typeOfHousing.toUpperCase(),
            whatKindOfPrizeDoYouLike: formData === null ? null : formData.whatKindOfPrizeDoYouLike === "" ? 'NO_SELECT' : formData.whatKindOfPrizeDoYouLike.toUpperCase(),
            pointsEarned: pointsEarned === null ? null : pointsEarned,
        }
        try {
            await API.graphql(graphqlOperation(mutations.createFormEngage, { input }));
        } catch (error) {
            console.log(error)
        } finally {
            this.setState({ loading: false })
        }
    }

    render() {
        const { userData } = this.state
        return (
            <Container>
                <FormEngageHeader isReady={this.state.isReady} pointsEarned={this.state.pointsEarned} />
                <Content showsVerticalScrollIndicator={false}>
                    <View style={{ backgroundColor: colors.BOTTOM_COLOR, height: fullHeight, position: 'absolute', top: -fullHeight, left: 0, right: 0 }} />
                    <FormEngage isReady={this.state.isReady} userData={userData} />
                </Content>
                <Footer style={{ padding: 10, marginBottom: 10, backgroundColor: '#fff', borderTopColor: 'rgba(0,0,0,0.0)' }}>
                    <Button style={{
                        backgroundColor: colors.elementPrimary,
                        width: wp(60), justifyContent: "center",
                        borderRadius: wp(50),
                        shadowOpacity: 10,
                        shadowOffset: { width: 0, height: 0 },
                        shadowColor: "#9E9E9E",
                    }}
                        onPress={() => { this.sendDataToAWS(); this.setState({ loading: true }) }}>
                        <Text style={{ color: "#fff", left: 10, letterSpacing: 3 }}>SUBMIT</Text>
                        <Spinner color='#FFF' size="small" hidesWhenStopped={true} animating={this.state.loading} />
                    </Button>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        engageFormData: state.project.engageFormData
    }
}
export default connect(mapStateToProps)(RootFormEngage)
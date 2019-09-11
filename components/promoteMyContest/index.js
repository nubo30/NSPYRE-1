import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { Container, Content, Footer, Button, Text, Spinner, View, Toast } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'

// component child
import HeaderPromoteContest from './header/index'
import FormPromoteContest from './formPromoteMyContest'

// Styles
import { colors } from "../global/static/colors"

// GraphQL
import * as queries from "../../src/graphql/queries"
import * as mutations from "../../src/graphql/mutations"

const fullHeight = Dimensions.get('window').height;

class PromoteContest extends Component {
    state = {
        userData: null,
        isReady: false,
        loading: false,
        formData: null,
        otherPromote: false
    }

    async componentDidMount() {
        try {
            const { idToken } = await Auth.currentSession()
            const userData = await API.graphql(graphqlOperation(queries.getUser, { id: idToken.payload.sub }));
            this.setState({ userData: userData.data.getUser, isReady: true })
        } catch (error) {
            console.log(error, 'no se ha podido obtener los datos del usuario')
        }
    }

    // System ear points
    componentWillReceiveProps(nextProps) {
        if (nextProps.audienceReachData !== this.props.audienceReachData) {
            const { audienceReachData } = nextProps;
            this.setState({ formData: audienceReachData })
        }
    }

    sendDataToAWS = async () => {
        const { formData, userData } = this.state
        const input = {
            age: formData === null ? null : formData.age,
            amountOfPeople: formData === null ? null : formData.amountOfPeople.toUpperCase(),
            demographicRegion: formData === null ? null : formData.demographicRegion.toUpperCase(),
            education: formData === null ? null : formData.education,
            gender: formData === null ? null : formData.gender.toUpperCase(),
            location: formData === null ? null : formData.location,
            formPromoteContestUserId: userData && userData.id
        }
        try {
            await API.graphql(graphqlOperation(mutations.createFormPromoteContest, { input }))
            this.setState({ loading: false, otherPromote: true })
            Toast.show({
                type: "success",
                position: "top",
                text: "The promotion was successfully completed   🎉"
            })
        } catch (error) {
            console.log(error)
            this.setState({ loading: false })
            Toast.show({
                type: "danger",
                position: "top",
                text: "An error has occurred",
                buttonText: "Okay",
            })
        }
    }

    render() {
        return (
            <Container>
                <HeaderPromoteContest isReady={this.state.isReady} />
                <Content showsVerticalScrollIndicator={false}>
                    <View style={{ backgroundColor: colors.BOTTOM_COLOR, height: fullHeight, position: 'absolute', top: -fullHeight, left: 0, right: 0 }} />
                    <FormPromoteContest />
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
                        <Text style={{ color: "#fff", left: 10, letterSpacing: 3 }}>{this.state.otherPromote ? 'SUBMIT AGAIN' : 'SUBMIT'}</Text>
                        <Spinner color='#FFF' size="small" hidesWhenStopped={true} animating={this.state.loading} />
                    </Button>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => { return { audienceReachData: state.project.audienceReachData } }

export default connect(mapStateToProps)(withNavigation(PromoteContest))
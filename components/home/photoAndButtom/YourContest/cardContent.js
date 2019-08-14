import React, { Component } from 'react'
import { ImageBackground, Platform, TouchableHighlight, Alert } from 'react-native'
import { Text, View, Button, Spinner } from "native-base"
import { API, graphqlOperation } from "aws-amplify"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash'
import { withNavigation } from "react-navigation"
import moment from 'moment'
import CountDown from 'react-native-countdown-component';


// Icons
import { Ionicons } from '@expo/vector-icons'

// GraphQL
import * as mutations from '../../../../src/graphql/mutations'

class CardContent extends Component {
    state = { animation: false, deleteContest: false, loadingDel: false }

    // Esta funcion elimina el concurso seleccionado
    _deleteContest = async (item) => {
        const { userData } = this.props
        try {
            await API.graphql(graphqlOperation(mutations.deleteCreateContest, { input: { id: item.id } }))
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id } }))
        } catch (error) {
            console.log(error)
        } finally {
            this.setState({ loadingDel: false })
        }
    }

    render() {
        const { animation, loadingDel } = this.state
        const { item, _setModalVisibleYourContest, userData } = this.props
        return (
            <View>
                <TouchableHighlight
                    underlayColor="rgba(0,0,0,0.0)"
                    onPress={() => this.setState({ animation: true })}>
                    <Animatable.View
                        onAnimationEnd={() => {
                            this.setState({ animation: false })
                            _setModalVisibleYourContest(false)
                            this.props.navigation.navigate("AboutContest", { contest: item, fromWhere: 'yoursContest', userData })
                        }}
                        animation={animation ? "pulse" : undefined}
                        duration={200}
                        style={{
                            flex: 0,
                            borderRadius: 15,
                            elevation: Platform.OS === 'ios' ? 10 : 5,
                            marginBottom: 70,
                            width: "90%", height: 200,
                            alignSelf: "center",
                            marginTop: 30,
                        }}>
                        <Text style={{ color: "#333", fontSize: wp(7), top: -10 }}>
                            {_.startCase(item.general.nameOfContest)}
                        </Text>
                        <Text style={{ color: "#333", fontSize: wp(5), top: -10, color: "#BDBDBD", fontWeight: '100' }}>
                            {`The category is ${_.lowerCase(item.category)}`}
                        </Text>
                        <Text style={{ color: "#333", fontSize: wp(4), top: -10, color: "#BDBDBD", fontWeight: '100', fontStyle: 'italic' }}>
                            {`Published ${moment(item.createdAt).fromNow()}`}
                        </Text>
                        <View style={{
                            borderRadius: 15,
                            shadowColor: 'rgba(0,0,0,0.3)',
                            shadowOffset: { width: 0 }, shadowOpacity: 1
                        }}>
                            <ImageBackground
                                borderRadius={15}
                                source={{ uri: item.general.picture.url }}
                                style={{ height: 200, width: "100%" }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: "100%", height: "100%", borderRadius: 15, alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    {item.timer === null ? null : <CountDown
                                        digitStyle={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
                                        digitTxtStyle={{ color: '#FFF' }}
                                        timeLabelStyle={{ color: '#FFF' }}
                                        until={moment(item.timer).diff(moment(new Date()), 'seconds')}
                                        onFinish={() => null}
                                        onPress={() => null}
                                        size={20}
                                    />}
                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text style={{ color: "#FFF", left: -10 }}>🏆 {item.prizes.length}</Text>
                                        <Text style={{ color: "#FFF", left: 10 }}>👥 {item.participants.items.length}</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </Animatable.View>
                </TouchableHighlight>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: "90%", alignSelf: 'center' }}>

                    <View style={{ flex: 0.5, alignSelf: 'center', flexDirection: 'row' }}>
                        <Button transparent style={{ alignSelf: 'flex-start', left: 15, paddingRight: 30 }}>
                            <Ionicons name='logo-facebook' style={{ fontSize: 30, color: "#0D47A1" }} />
                        </Button>
                        <Button transparent style={{ alignSelf: 'flex-start', paddingRight: 15 }}>
                            <Ionicons name='logo-twitter' style={{ fontSize: 30, color: "#1E88E5" }} />
                        </Button>
                        <Button transparent style={{ alignSelf: 'flex-start', paddingRight: 15 }}>
                            <Ionicons name='logo-instagram' style={{ fontSize: 30, color: "#E91E63" }} />
                        </Button>
                    </View>

                    <View style={{ flex: 0.5, alignSelf: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Button transparent style={{ alignSelf: 'flex-end', paddingRight: 15 }} onPress={() => Alert.alert(
                            `${item.general.nameOfContest}`,
                            'Do you really want to delete this contest?',
                            [
                                {
                                    text: 'No',
                                    style: 'cancel',
                                },
                                { text: 'YES', onPress: () => { this.setState({ loadingDel: true }); this._deleteContest(item) } },
                            ],
                            { cancelable: false },
                        )}>{!loadingDel
                            ? <Ionicons name='md-trash' style={{ fontSize: 25, color: "#EF5350" }} />
                            : <Spinner color='#EF5350' size="small" hidesWhenStopped={true} animating={this.state.loadingDel} />}
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

export default withNavigation(CardContent)
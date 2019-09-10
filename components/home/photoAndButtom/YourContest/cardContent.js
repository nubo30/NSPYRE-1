import React, { Component } from 'react'
import { ImageBackground, Platform, TouchableHighlight, Alert, Share } from 'react-native'
import { Text, View, Button, Spinner, Icon } from "native-base"
import { API, graphqlOperation } from "aws-amplify"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import startCase from 'lodash/startCase'
import lowerCase from 'lodash/lowerCase'
import { withNavigation } from "react-navigation"
import moment from 'moment'
import CountDown from 'react-native-countdown-component';


// GraphQL
import * as mutations from '../../../../src/graphql/mutations'

class CardContent extends Component {
    state = { animation: false, deleteContest: false, loadingDel: false, isFinishedContest: false }

    // Esta funcion elimina el concurso seleccionado
    _deleteContest = async (item) => {
        const { userData } = this.props
        try {
            await API.graphql(graphqlOperation(mutations.deleteCreateContest, { input: { id: item.id } }))
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id } }))
            this.setState({ loadingDel: false })
        } catch (error) {
            alert(error)
            this.setState({ loadingDel: false })
        }
    }

    componentWillUnmount() {
        this.setState({ isFinishedContest: false })
    }

    _share = async (item) => {
        try {
            const result = await Share.share({
                message: item.general.description,
                title: item.general.nameOfContest,
            }, {
                    excludedActivityTypes: [
                        'com.apple.UIKit.activity.PostToWeibo',
                        'com.apple.UIKit.activity.Print',
                        'com.apple.UIKit.activity.CopyToPasteboard',
                        'com.apple.UIKit.activity.AssignToContact',
                        'com.apple.UIKit.activity.SaveToCameraRoll',
                        'com.apple.UIKit.activity.AddToReadingList',
                        'com.apple.UIKit.activity.PostToFlickr',
                        'com.apple.UIKit.activity.PostToVimeo',
                        'com.apple.UIKit.activity.PostToTencentWeibo',
                        'com.apple.UIKit.activity.AirDrop',
                        'com.apple.UIKit.activity.OpenInIBooks',
                        'com.apple.UIKit.activity.MarkupAsPDF',
                        'com.apple.reminders.RemindersEditorExtension',
                        'com.apple.mobilenotes.SharingExtension',
                        'com.apple.mobileslideshow.StreamShareService',
                        'com.linkedin.LinkedIn.ShareExtension',
                        'pinterest.ShareExtension',
                        'com.google.GooglePlus.ShareExtension',
                        'com.tumblr.tumblr.Share-With-Tumblr',
                        'net.whatsapp.WhatsApp.ShareExtension'
                    ]
                });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(result)
                    // shared with activity type of result.activityType
                } else {
                    // shared
                    console.log(result)
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
                console.log(result)
            }
        } catch (error) {
            alert(error.message);
        }
    };


    render() {
        const { animation, loadingDel, isFinishedContest } = this.state
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
                            borderRadius: 5,
                            elevation: Platform.OS === 'ios' ? 10 : 5,
                            marginBottom: 10,
                            width: "90%", height: 100,
                            alignSelf: "center",
                            marginTop: 30,
                        }}>
                        <View style={{
                            borderRadius: 5,
                            shadowColor: 'rgba(0,0,0,0.3)',
                            shadowOffset: { width: 0 }, shadowOpacity: 1
                        }}>
                            <ImageBackground
                                borderRadius={5}
                                source={{ uri: item.general.picture.url }}
                                style={{ height: 100, width: "100%" }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: "100%", height: "100%", borderRadius: 5, alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    {isFinishedContest
                                        ? <View style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            padding: 5
                                        }}>
                                            <View style={{
                                                borderRadius: 5,
                                                padding: 10, backgroundColor: '#E53935',
                                                shadowColor: 'rgba(0,0,0,0.3)',
                                                shadowOffset: { width: 0 },
                                                shadowOpacity: 1,
                                            }}>
                                                <Text
                                                    minimumFontScale={wp(3)}
                                                    allowFontScaling={false}
                                                    style={{ fontSize: wp(3), color: '#FFF', fontWeight: 'bold' }}>Completed</Text>
                                            </View>
                                        </View> :
                                        item.timer === null
                                            ? null
                                            : new Date(item.timer) < new Date()
                                                ? <View style={{
                                                    position: 'absolute',
                                                    right: 0,
                                                    top: 0,
                                                    padding: 5
                                                }}>
                                                    <View style={{
                                                        borderRadius: 5,
                                                        padding: 10, backgroundColor: '#E53935',
                                                        shadowColor: 'rgba(0,0,0,0.3)',
                                                        shadowOffset: { width: 0 },
                                                        shadowOpacity: 1,
                                                    }}>
                                                        <Text
                                                            minimumFontScale={wp(3)}
                                                            allowFontScaling={false}
                                                            style={{ fontSize: wp(3), color: '#FFF', fontWeight: 'bold' }}>Completed</Text>
                                                    </View>
                                                </View> : <CountDown
                                                    digitStyle={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
                                                    digitTxtStyle={{ color: '#FFF' }}
                                                    timeLabelStyle={{ color: '#FFF' }}
                                                    until={moment(item.timer).diff(moment(new Date()), 'seconds')}
                                                    onFinish={() => this.setState({ isFinishedContest: true })}
                                                    onPress={() => { }}
                                                    size={20}
                                                />}
                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text
                                            minimumFontScale={wp(4)}
                                            allowFontScaling={false}
                                            style={{ color: "#FFF", left: -10, fontSize: wp(4) }}>🏆 {item.prizes.length}</Text>
                                        <Text
                                            minimumFontScale={wp(4)}
                                            allowFontScaling={false}
                                            style={{ color: "#FFF", left: 10, fontSize: wp(4) }}>👥 {item.participants.items.length}</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </Animatable.View>
                </TouchableHighlight>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: "90%", alignSelf: 'center' }}>
                    <View style={{ flex: 0.5 }}>
                        <Text
                            minimumFontScale={wp(6)}
                            allowFontScaling={false}
                            style={{ color: "#333", fontSize: wp(6), top: -10 }}>
                            {startCase(item.general.nameOfContest)}
                        </Text>
                        <Text
                            minimumFontScale={wp(4)}
                            allowFontScaling={false}
                            style={{ color: "#333", fontSize: wp(4), top: -10, color: "#BDBDBD", fontWeight: '100' }}>
                            The category is <Text style={{ color: "#333", fontSize: wp(4), top: -10, color: "#BDBDBD", fontWeight: 'bold' }}>{lowerCase(item.category)}</Text>
                        </Text>
                        <Text
                            minimumFontScale={wp(3)}
                            allowFontScaling={false}
                            style={{ color: "#333", fontSize: wp(3), top: -10, color: "#BDBDBD", fontWeight: '100', fontStyle: 'italic' }}>
                            {`Published ${moment(item.createdAt).fromNow()}`}
                        </Text>
                    </View>
                    <View style={{ flex: 0.5, alignSelf: 'center', flexDirection: 'row', justifyContent: "flex-end" }}>
                        <Button transparent style={{ alignSelf: 'flex-end' }} onPress={() => Alert.alert(
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
                            ? <Icon type="Ionicons" name='md-trash' style={{ fontSize: 25, color: "#E0E0E0" }} />
                            : <Spinner color='#E0E0E0' size="small" hidesWhenStopped={true} animating={this.state.loadingDel} />}
                        </Button>
                        <Button icon transparent onPress={() => this._share(item)}>
                            <Icon type="FontAwesome" name='share-square-o' style={{ color: "#D81B60" }} />
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

export default withNavigation(CardContent)
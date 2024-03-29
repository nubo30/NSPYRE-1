import React, { Component } from 'react';
import { Share } from 'react-native';
import { withNavigation } from 'react-navigation'
import { API, graphqlOperation } from 'aws-amplify'
import { Button, Icon } from "native-base"
import moment from 'moment'

// AWS
import * as mutations from '../../../src/graphql/mutations'
import * as queries from '../../../src/graphql/queries'

// Colors
import { colorsPalette } from '../../global/static/colors'

class SharesParticipations extends Component {

    state = { userSharing: {} }

    _share = async () => {
        const userData = this.props.navigation.getParam('userData')
        const { item } = this.props
        // this._isThisUserSharingBefore()  
        try {
            const result = await Share.share({
                message: item.comment,
                title: "Compartido!",
            }, {
                tintColor: "red",
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.Print',
                    'com.apple.UIKit.activity.CopyToPasteboard',
                    'com.apple.UIKit.activity.SaveToCameraRoll',
                    'com.apple.UIKit.activity.AirDrop',
                    'com.apple.UIKit.activity.PostToWeibo',
                    'com.apple.UIKit.activity.AssignToContact',
                    'com.apple.UIKit.activity.AddToReadingList',
                    'com.apple.UIKit.activity.PostToFlickr',
                    'com.apple.UIKit.activity.PostToVimeo',
                    'com.apple.UIKit.activity.PostToTencentWeibo',
                    'com.apple.UIKit.activity.OpenInIBooks',
                    'com.apple.UIKit.activity.MarkupAsPDF',
                    'com.apple.reminders.RemindersEditorExtension',
                    'com.apple.mobilenotes.SharingExtension',
                    'com.apple.mobileslideshow.StreamShareService',
                    'com.linkedin.LinkedIn.ShareExtension',
                    'pinterest.ShareExtension',
                    'com.google.GooglePlus.ShareExtension',
                    'com.tumblr.tumblr.Share-With-Tumblr',
                    'net.whatsapp.WhatsApp.ShareExtension',
                ],

            });

            const share = {
                name: userData.name,
                idUserSharing: userData.id,
                whereItHasBeenShared: result.activityType, // aplicacion donde se ha compartido el concurso
                createdAt: moment().toISOString(),
                avatar: userData.avatar,
                shareParticipantsParticipantsId: item.id,
                engageData: JSON.stringify(userData.engage.items[0])
            }
            if (result.action === Share.sharedAction) {
                if (this.state.userSharing !== null) {
                    // Se crean modelos en AWS, estos harán referencias al contenido que un usaurio genera cuando comparte la participación
                    await API.graphql(graphqlOperation(mutations.createShareParticipants, { input: share }))
                    this._createNotification()
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
                console.log(result, "No se ha compartido")
            }
        } catch (error) {
            console.log(error);
        }
    };

    _createNotification = async () => {
        const userData = this.props.navigation.getParam('userData')
        const { contest, item } = this.props
        try {
            const respose = await API.graphql(graphqlOperation(queries.getUser, { id: item.participantId }))
            const input = {
                createdAt: moment().toISOString(),
                expirationDateWeek: new Date(new Date().setDate(new Date().getDate() + 7)),
                avatar: userData.avatar === null ? null : userData.avatar,
                idUSerFrom: userData.id,
                idUserTo: item.participantId,
                userFrom: userData.name,
                userTo: item.nameUser,
                expoPushToken: respose.data.getUser.notificationToken === null ? 'none' : respose.data.getUser.notificationToken,
                messageTitle: `Hey ${item.nameUser}!`,
                messageBody: `${userData.name} shared your participation in the contest ${contest.general.nameOfContest}!, take a look!`,
                nameOfcontest: contest.general.nameOfContest,
                JSONdata: JSON.stringify({
                    "type": 'shareParticipants',
                    "rute": "AboutContest",
                    "userData": { id: userData.id },
                    "contest": {
                        "id": contest.id,
                        "user": { id: contest.user.id },
                        "prizes": [],
                        "participants": { items: [] },
                        "general": {
                            "nameOfContest": contest.general.nameOfContest,
                            "picture": { url: contest.general.picture.url },
                            "video": { url: contest.general.video.url }
                        }
                    }
                }),
            }
            const { data } = await API.graphql(graphqlOperation(mutations.createNotifications, { input }))
            await API.graphql(graphqlOperation(queries.sendNotification, { notificationId: data.createNotifications.id }))
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <Button icon transparent onPress={() => this._share()}>
                <Icon type="FontAwesome" name='share-square-o' style={{ color: colorsPalette.primaryColor }} />
            </Button>
        );
    }
}

export default withNavigation(SharesParticipations)
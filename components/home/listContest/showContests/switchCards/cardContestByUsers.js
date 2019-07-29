import React, { Component } from 'react';
import { ImageBackground, Dimensions, FlatList, TouchableHighlight } from 'react-native';
import { withNavigation } from "react-navigation"
import { graphqlOperation } from 'aws-amplify'
import { Connect } from 'aws-amplify-react-native'
import * as Animatable from 'react-native-animatable';
import _ from 'lodash'
import {
    Text,
    Card,
    CardItem,
    View,
} from "native-base"
import moment from "moment"
// Dimensions of screen
const { width } = Dimensions.get("window")

// Child Component
import { PlaceholderContest } from '../placeholderByUser'

// Graphql
import * as queries from '../../../../../src/graphql/queries'

class CardContestUsers extends Component {
    state = {
        activeAnimation: false,
        indexItem: null,
        isReady: false,
        loadingImg: false
    }
    _handleExtractIndex = (item) => {
        this.setState({ indexItem: item.id, activeAnimation: true })
    }
    render() {
        const { item, categoryListContest } = this.props
        return (
            <Connect query={graphqlOperation(queries.listFormCreateAContests, { filter: { userId: { eq: item.id } } })}>
                {({ data: { listFormCreateAContests }, loading, error }) => {
                    if (error) return (<Text>Error</Text>);
                    if (loading || !listFormCreateAContests) return <PlaceholderContest />
                    let filterItems =
                        listFormCreateAContests.items.filter((item) => {
                            return _.upperCase(item.contest.category).indexOf(_.upperCase(categoryListContest.category)) !== -1
                        })
                    return (
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 10 }}
                            horizontal
                            initialNumToRender={2}
                            data={filterItems}
                            keyExtractor={item => item.key}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableHighlight
                                    onPress={() => { this._handleExtractIndex(item) }}
                                    underlayColor="rgba(0,0,0,0.0)">
                                    <Animatable.View
                                        duration={500}
                                        animation={this.state.activeAnimation
                                            ? (item.id === this.state.indexItem ? 'pulse' : undefined)
                                            : undefined}
                                        onAnimationEnd={() => {
                                            this.setState({ activeAnimation: false });
                                            // this.props.navigation.navigate("AboutContest")
                                        }}>
                                        <Card style={{
                                            borderRadius: 15,
                                            elevation: 2,
                                            width: width - 50,
                                            marginRight: 15,
                                            left: 10,
                                            shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1
                                        }}>
                                            <Animatable.View animation="fadeIn">
                                                <CardItem cardBody style={{ borderRadius: 15 }}>
                                                    <ImageBackground
                                                        source={{
                                                            uri: item.contest.picture
                                                        }}
                                                        borderRadius={15}
                                                        style={{ height: 150, width: "100%", flex: 1 }}>
                                                        <View style={{
                                                            backgroundColor: 'rgba(0,0,0,0.2)',
                                                            width: "100%", height: "100%",
                                                            borderRadius: 15
                                                        }}>
                                                            <Text style={{ color: "#fff", fontSize: 22, padding: 15, position: "absolute", bottom: 0 }}>
                                                                {item.contest.title}
                                                                <Text style={{ color: "#fff", fontStyle: "italic", fontSize: 12 }}>
                                                                    {`  Published ${moment(item.contest.createdAt).fromNow()}`}
                                                                </Text>
                                                            </Text>
                                                        </View>
                                                    </ImageBackground>
                                                </CardItem>
                                            </Animatable.View>
                                        </Card>
                                    </Animatable.View>
                                </TouchableHighlight>
                            )}
                        />
                    );
                }}
            </Connect>
        )
    }
}

export default (withNavigation(CardContestUsers))
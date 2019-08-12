import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { View, FlatList, TouchableHighlight, ImageBackground, Text, Alert } from 'react-native';
import { withNavigation, withNavigationFocus } from "react-navigation"
import * as Animatable from 'react-native-animatable';
import Placeholder from 'rn-placeholder'
import _ from 'lodash'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// GraphQL
import * as queries from '../../../src/graphql/queries'

class ListContest extends Component {
  state = {
    dataSource: {},
    animationPulse: false,
    isReady: false,
    loadingImg: false,
    indexItem: null,
    categories: null,
    isScreenChange: false
  }

  async componentDidMount() {
    try {
      const categories = await API.graphql(graphqlOperation(queries.listContestCategorys))
      this.setState({ categories: categories.data.listContestCategorys.items, isReady: true })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      setTimeout(() => {
        this.setState({ isScreenChange: false })
      }, 1000);
    }
  }

  _redirect = (item) => {
    const { userData, navigation } = this.props
    userData.engage.items.length
      ? navigation.navigate('Contests', { categoryContest: item, userData })
      : Alert.alert(
        `${userData.name}`,
        'To see the available contests, please create a engage profile',
        [
          {
            text: 'Ok',
            onPress: () => { navigation.navigate('Engage'); this.setState({ isScreenChange: false }) },
            style: 'cancel',
          },
          { text: 'Cancel', onPress: () => { } },
        ],
        { cancelable: false },
      )
  }

  render() {
    const { categories, isReady, isScreenChange } = this.state
    const { offLine } = this.props

    return isReady ? (
      <FlatList
        style={{ backgroundColor: 'rgba(0,0,0,0.0)', padding: 4 }}
        showsVerticalScrollIndicator={false}
        data={categories}
        renderItem={({ item }) =>
          <TouchableHighlight
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: 'rgba(0,0,0,0.0)',
              shadowColor: "rgba(0,0,0,0.3)",
              shadowOpacity: 1,
              shadowOffset: { width: 0 }
            }}
            disabled={offLine || isScreenChange}
            underlayColor="rgba(0,0,0,0.0)"
            onPress={() => { this.setState({ animationPulse: true, indexItem: item.id }) }}>
            <Animatable.View
              style={{
                width: "95%",
                alignSelf: "center",
                marginBottom: 10,
                height: 100,
                borderRadius: 10,
                elevation: 5
              }}
              duration={200}
              onAnimationEnd={() => {
                this.setState({ animationPulse: false });
                this._redirect(item)
              }}
              animation={this.state.animationPulse ? (item.id === this.state.indexItem ? 'pulse' : undefined) : undefined}>
              <ImageBackground
                borderRadius={10}
                onLoadStart={() => this.setState({ loadingImg: true })}
                onLoadEnd={() => { this.setState({ loadingImg: false }) }}
                style={{ width: "100%", height: 100 }}
                source={{ uri: item.picture }}>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: "100%", height: "100%", borderRadius: 10 }}>
                  <Text style={{ color: "#fff", fontSize: wp(8), bottom: 0, position: "absolute", padding: 10 }}>
                    {_.startCase(item.name)}
                  </Text>
                </View>
              </ImageBackground>
            </Animatable.View>
          </TouchableHighlight>
        }
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    ) : <FlatList
        showsVerticalScrollIndicator={false}
        data={_.times(9, () => [{ id: 1 }])}
        renderItem={() =>
          <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.0)' }}>
            <Placeholder.Media
              style={{ width: "95%", alignSelf: "center", marginBottom: 10, height: 100, borderRadius: 10 }}
              hasRadius={false} animate="fade" />
          </View>
        }
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
  }
}

export default withNavigationFocus(withNavigation(ListContest))
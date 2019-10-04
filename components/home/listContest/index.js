import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { View, FlatList, TouchableHighlight, ImageBackground, Text, Alert } from 'react-native';
import { withNavigation, withNavigationFocus } from "react-navigation"
import * as Animatable from 'react-native-animatable';
import { PlaceholderMedia } from 'rn-placeholder'
import _ from 'lodash'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Header, Item, Icon, Input, Button, Container } from 'native-base'
import Modal from 'react-native-modal'

// GraphQL
import * as queries from '../../../src/graphql/queries'

import { colorsPalette } from "../../global/static/colors"
import { DataNotFound } from "../../global/emojis/index"
import { MyStatusBar } from '../../global/statusBar/index'

class ListContest extends Component {
  state = {
    dataSource: {},
    animationPulse: false,
    isReady: false,
    loadingImg: false,
    indexItem: null,
    categories: null,
    isScreenChange: false,
    modalAction: false,
    categoryName: "Music"
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
    userData.engage && userData.engage.items.length
      ? navigation.navigate('Contests', { categoryContest: item, userData })
      : Alert.alert(
        `${userData.name}`,
        'To see the available contests, please create a engage profile',
        [
          {
            text: 'Ok',
            onPress: () => { navigation.navigate('Engage', { userData }); this.setState({ isScreenChange: false }) },
            style: 'cancel',
          },
          { text: 'Cancel', onPress: () => { } },
        ],
        { cancelable: false },
      )
  }

  render() {
    const { categories, isReady, isScreenChange, modalAction, categoryName } = this.state
    const { offLine, userData } = this.props
    const filterCategories = categories && categories.filter(item => { return item.name.indexOf(categoryName) !== -1 })
    return isReady && Object.keys(userData).length !== 0 ? (
      <View>
        <Header searchBar rounded transparent style={{ justifyContent: 'center', alignItems: 'center', top: -20 }}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search category" />
          </Item>
        </Header>
        <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
        <Button transparent style={{ position: 'absolute', top: 0, width: "100%", }} onPress={() => this.setState({ modalAction: true })} />
        <FlatList
          style={{ backgroundColor: 'rgba(0,0,0,0.0)', padding: 4, top: -20 }}
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
                  borderRadius: 5,
                }}
                duration={200}
                onAnimationEnd={() => {
                  this.setState({ animationPulse: false });
                  this._redirect(item)
                }}
                animation={this.state.animationPulse ? (item.id === this.state.indexItem ? 'pulse' : undefined) : undefined}>
                <ImageBackground
                  borderRadius={5}
                  onLoadStart={() => this.setState({ loadingImg: true })}
                  onLoadEnd={() => { this.setState({ loadingImg: false }) }}
                  style={{ width: "100%", height: 100 }}
                  source={{ uri: item.picture }}>
                  <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: "100%", height: "100%", borderRadius: 5 }}>
                    <Text
                      allowFontScaling={false}
                      style={{ color: "#fff", fontSize: wp(7), bottom: 0, position: "absolute", padding: 10 }}>
                      {_.startCase(item.name)}
                    </Text>
                  </View>
                </ImageBackground>
              </Animatable.View>
            </TouchableHighlight>
          }
          numColumns={2}
          keyExtractor={(item) => item.id} />
        <Modal
          isVisible={modalAction}
          onSwipeComplete={() => this.setState({ modalAction: false, categoryName: "Music" })}
          swipeDirection={['down']}
          style={{ justifyContent: 'flex-end', margin: 0 }}>
          <View style={{
            backgroundColor: colorsPalette.secondaryColor,
            justifyContent: 'center',
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            borderColor: 'rgba(0, 0, 0, 0.3)',
            flex: 1,
            maxHeight: 600
          }}>
            <Container style={{
              borderTopStartRadius: 10,
              borderTopEndRadius: 10
            }}>
              <Header searchBar rounded style={{
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
                backgroundColor: colorsPalette.secondaryColor
              }}>
                <Icon type="AntDesign" name="minus" style={{ alignSelf: 'center', fontSize: wp(13), position: 'absolute', top: -10 }} />
                <Item>
                  <Icon name="ios-search" />
                  <Input
                    selectionColor={colorsPalette.primaryColor}
                    onChangeText={(t) => this.setState({ categoryName: t })}
                    value={categoryName} placeholder="Search category" />
                </Item>
              </Header>
              <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
              {filterCategories.length ?
                <FlatList
                  style={{ backgroundColor: 'rgba(0,0,0,0.0)', padding: 4, top: 20 }}
                  showsVerticalScrollIndicator={false}
                  data={filterCategories}
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
                      onPress={() => {
                        this.setState({ modalAction: false })
                        setTimeout(() => {
                          this.setState({ animationPulse: true, indexItem: item.id })
                        }, 500);
                      }}>
                      <Animatable.View
                        style={{
                          width: "95%",
                          alignSelf: "center",
                          marginBottom: 10,
                          height: 100,
                          borderRadius: 5,
                        }}
                        duration={200}
                        onAnimationEnd={() => {
                          this.setState({ animationPulse: false });
                          this._redirect(item)
                        }}
                        animation={this.state.animationPulse ? (item.id === this.state.indexItem ? 'pulse' : undefined) : undefined}>
                        <ImageBackground
                          borderRadius={5}
                          onLoadStart={() => this.setState({ loadingImg: true })}
                          onLoadEnd={() => { this.setState({ loadingImg: false }) }}
                          style={{ width: "100%", height: 100 }}
                          source={{ uri: item.picture }}>
                          <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: "100%", height: "100%", borderRadius: 5 }}>
                            <Text
                              allowFontScaling={false}
                              style={{ color: "#fff", fontSize: wp(7), bottom: 0, position: "absolute", padding: 10 }}>
                              {_.startCase(item.name)}
                            </Text>
                          </View>
                        </ImageBackground>
                      </Animatable.View>
                    </TouchableHighlight>
                  }
                  numColumns={2}
                  keyExtractor={(item) => item.id} /> : <DataNotFound inputText={categoryName} />}
            </Container>
          </View>
        </Modal>
      </View>
    ) : <FlatList
        showsVerticalScrollIndicator={false}
        data={_.times(9, () => [{ id: 1 }])}
        renderItem={() =>
          <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.0)' }}>
            <PlaceholderMedia
              style={{ width: "95%", alignSelf: "center", marginBottom: 10, height: 100, borderRadius: 5 }}
              hasRadius={false} animate="fade" />
          </View>
        }
        numColumns={2}
        keyExtractor={(item, index) => index.toString()} />
  }
}

export default withNavigationFocus(withNavigation(ListContest))
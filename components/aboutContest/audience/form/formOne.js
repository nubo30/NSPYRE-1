import React, { Component } from 'react';
import { Container, Header, Content, Footer, Button, Text, Left, Icon, Title, Right, View, Form, Picker, Body, ListItem, Switch, List } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Col, Row } from 'react-native-easy-grid'
import _ from 'lodash'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Axios from 'axios'

// Icons
import { Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'

export default class FormOne extends Component {

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

    // Pickers
    category: [],
    categoryItems: [],
    country: [],
    countryItems: [],

    // Static data
    colorsElementCategory: [
      '#1E88E5',
      '#3949AB',
      '#5E35B1',
      '#D32F2F',
      '#E91E63',
      '#009688',
      '#43A047',
      '#F4511E',
      '#9575CD',
      '#2979FF',
      '#004D40',
      '#33691E',
      '#EF5350',
      '#F44336',
      '#E53935',
      '#D32F2F',
      '#E53935',
      '#D32F2F',
      '#C62828',
      '#B71C1C',
      '#FF1744',
      '#D50000',
      '#E91E63',
      '#D81B60',
      '#C2185B',
      '#AD1457',
      '#880E4F',
      '#FF4081',
      '#F50057',
      '#C51162',
      '#BA68C8',
      '#AB47BC',
      '#9C27B0',
      '#8E24AA',
      '#7B1FA2',
      '#6A1B9A',
      '#4A148C',
      '#E040FB',
      '#D500F9',
      '#AA00FF',
      '#9575CD',
      '#7E57C2',
      '#673AB7',
      '#5E35B1',
      '#512DA8',
      '#4527A0',
      '#311B92',
      '#7C4DFF',
      '#651FFF',
      '#3F51B5',
      '#3949AB',
      '#303F9F',
      '#283593',
      '#1A237E',
      '#536DFE',
      '#3D5AFE',
      '#304FFE',
      '#1E88E5',
      '#1976D2',
      '#1565C0',
      '#0D47A1',
      '#448AFF',
      '#2979FF',
      '#2962FF',
      '#0288D1',
      '#0277BD',
      '#01579B',
      '#0091EA',
      '#0097A7',
      '#00838F',
      '#006064',
      '#009688',
      '#00897B',
      '#00796B',
      '#00695C',
      '#004D40',
      '#43A047',
      '#388E3C',
      '#2E7D32',
      '#1B5E20',
      '#558B2F',
      '#33691E',
      '#827717',
      '#A1887F',
      '#8D6E63',
      '#795548',
      '#6D4C41',
      '#5D4037',
      '#4E342E',
      '#3E2723',
      '#757575',
      '#616161',
      '#424242',
      '#212121',
      '#78909C',
      '#607D8B',
      '#546E7A',
      '#455A64',
      '#37474F',
      '#263238',
      '#E65100',
      '#F4511E',
      '#F4511E',
      '#E64A19',
      '#D84315',
      '#BF360C',
      '#FF3D00',
      '#DD2C00'
    ],
    countryList: [{ name: 'Countries', id: 10 * 100, children: [] }],
    cateogryPickerToShow: [
      {
        name: 'Categories',
        id: 10000,
        children: [
          {
            name: 'Music',
            id: 0,
          },
          {
            name: 'Sport',
            id: 1,
          },
          {
            name: 'Technology',
            id: 2,
          },
          {
            name: 'Food',
            id: 3,
          },
          {
            name: 'Gamer',
            id: 5,
          },
          {
            name: 'Movies',
            id: 6,
          },
        ],
      },
    ]
  }

  componentDidMount() {
    this._getContry()
    const { cateogryPickerToShow } = this.state
    const { contest } = this.props
    _.remove(cateogryPickerToShow[0].children, { name: _.startCase(_.lowerCase(contest.category)) });
  }

  _getContry = async () => {
    try {
      const { data } = await Axios.get('https://restcountries.eu/rest/v2/all')
      this.setState({ countryList: [{ name: 'Countries', id: 10 * 100, children: data.map((item, key) => { return { name: item.name, id: key } }) }] })
    } catch (error) {
      console.log(error);
    }
  }

  // Pickers
  onValueChangeGender = (value) => { this.setState({ gender: value }) }
  onValueChangeYearOne = (value) => { this.setState({ age: { ...this.state.age, yearOne: value, yearTwo: value + 1, years: `${value} - ${value + 1}` } }) }
  onValueChangeYearTwo = (value) => { this.setState({ age: { ...this.state.age, yearTwo: value, years: `${this.state.age.yearOne} - ${value}` } }) }
  onSelectedItemsChange = (value) => { this.setState({ category: value }) }
  onSelectedItemsChangeCountry = (value) => { this.setState({ country: value }) }
  _openMultiselect = (value) => { this.SectionedMultiSelect._toggleSelector() }

  _updateCategoryItems = (value) => {
    const { contest } = this.props
    this.setState({ categoryItems: value, categoryChoose: [...value, { id: 0, name: _.lowerCase(contest.category) }] })
  }
  _updateCountryItems = (value) => {
    this.setState({ countryItems: value, countriesChoose: [...value, { id: 0, name: _.lowerCase('Rep. Dom') }] })
  }


  // Esta es la información que irá a AWS en una array
  // categoryChoose
  // countriesChoose

  render() {
    const {
      gender,
      age,

      // Pickers
      category,
      categoryItems,
      country,
      countryItems,

      // Static Data
      countryList,

      colorsElementCategory,
      cateogryPickerToShow
    } = this.state
    const {
      // Data
      contest,
    } = this.props

    return (
      <Container contentContainerStyle={{ flex: 1, backgroundColor: '#FAFAFA' }} >
        <Grid>
          <Row size={20} style={{ alignItems: 'center', flexDirection: 'column', backgroundColor: '#FAFAFA' }}>
            <Text style={{ color: "#333", fontWeight: '100', fontSize: wp(5), textAlign: 'center', top: 43, paddingLeft: 40, paddingRight: 40 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fringilla.
               </Text>
          </Row>
          <Row size={80} style={{ backgroundColor: '#FAFAFA' }}>
            <List style={{ width: "100%" }}>
              <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                <Text style={{ color: "#BDBDBD" }}>Fill in the following fields</Text>
              </ListItem>

              {/* GENDER*/}
              <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                <Left>
                  <Button style={{ backgroundColor: "#90A4AE" }}>
                    <MaterialCommunityIcons active name="gender-male-female" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                  </Button>
                </Left>
                <Body>
                  <Text>Identify the gender of the audience</Text>
                </Body>
                <Right>
                  <Text>{gender === 'NO_SELECT' ? 'Not specified' : gender}</Text>
                  <Icon active name="arrow-forward" />
                </Right>
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
                </Picker>
              </ListItem>

              {/* AGE */}
              <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                <Left style={{ right: 15 }}>
                  <Button style={{ backgroundColor: "#00C853" }}>
                    <AntDesign active name="team" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                  </Button>
                </Left>
                <Body style={{ right: 15 }}>
                  <Text>Identify the age of the audience</Text>
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
                </Picker>

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
                </Picker>
              </ListItem>

              {/* CATEGORY */}
              <ListItem itemHeader first style={{ backgroundColor: '#FAFAFA' }}>
                <Text style={{ color: "#BDBDBD" }}>
                  <Text style={{ color: '#BDBDBD', fontWeight: 'bold' }}>
                    {contest.user.name}
                  </Text>, you currently have the
                  <Text style={{ color: '#BDBDBD', fontWeight: 'bold' }}> {_.lowerCase(contest.category)} </Text>
                  category selected, it is the root category, you can add other categories if you wish. Thus the search will be much more specific.
                  </Text>
              </ListItem>
              <ListItem itemHeader
                onPress={() => this._openMultiselect(true)}
                icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                <Left style={{ right: 15 }}>
                  <Button style={{ backgroundColor: "#FB8C00" }}>
                    <Entypo active name="documents" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                  </Button>
                </Left>
                <Body style={{ right: 15 }}>
                  <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                    <Content showsHorizontalScrollIndicator={false} horizontal>
                      <View style={{
                        backgroundColor: `${colorsElementCategory[Math.floor(Math.random() * colorsElementCategory.length)]}`,
                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                        borderColor: '#3333',
                        borderWidth: 0.5
                      }}>
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{_.startCase(_.lowerCase(contest.category))}</Text>
                      </View>
                      {categoryItems && categoryItems.map((item, key) =>
                        <View key={key} style={{
                          backgroundColor: `${colorsElementCategory[Math.floor(Math.random() * colorsElementCategory.length)]}`,
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
                <View style={{ backgroundColor: 'red', position: 'absolute', right: '-500%' }}>
                  <SectionedMultiSelect
                    parentChipsRemoveChildren={true}
                    ref={SectionedMultiSelect => this.SectionedMultiSelect = SectionedMultiSelect}
                    items={cateogryPickerToShow}
                    uniqueKey="id"
                    subKey="children"
                    selectText="Choose some things..."
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={this.onSelectedItemsChange}
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
              <ListItem itemHeader
                onPress={() => this.SectionedMultiSelectCountry._toggleSelector()}
                icon last style={{ maxHeight: 45, backgroundColor: '#fff', width: '99.9%', left: 15 }}>
                <Left style={{ right: 15 }}>
                  <Button style={{ backgroundColor: "#0091EA" }}>
                    <MaterialCommunityIcons active name="earth" style={{ fontSize: wp(6), color: "#FFF", left: 1, top: 1 }} />
                  </Button>
                </Left>
                <Body style={{ right: 15 }}>
                  <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                    <Content showsHorizontalScrollIndicator={false} horizontal>
                      <View style={{
                        backgroundColor: `${colorsElementCategory[Math.floor(Math.random() * colorsElementCategory.length)]}`,
                        margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                        borderColor: '#3333',
                        borderWidth: 0.5
                      }}>
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{_.startCase(_.lowerCase('Rep. Dom'))}</Text>
                      </View>
                      {countryItems && countryItems.map((item, key) =>
                        <View key={key} style={{
                          backgroundColor: `${colorsElementCategory[Math.floor(Math.random() * colorsElementCategory.length)]}`,
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
            </List>
          </Row>
        </Grid>
      </Container>
    );
  }
}
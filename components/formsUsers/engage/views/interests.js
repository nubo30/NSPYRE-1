import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Spinner, Picker, Separator } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

// Gradients
import { GadrientsAuth } from '../../../Global/gradients'
import { MyStatusBar } from '../../../Global/statusBar'

// Data
import { randomColors, musicsGenre, sportsList, categoryPrizeList, categoryContestList } from '../../../Global/data/index'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class Interests extends PureComponent {
    state = {
        // Data
        musicalGenreChoose: [],
        sportsChoose: [],
        categoryPrizeChoose: [],
        categoryContestChoose: [],
        political: 'Not specified',
        vote: 'Not specified',
        // Inputs

        // Pickers
        musicalGenre: [],
        musicalGenreItems: [],
        sports: [],
        sportsItems: [],
        categoryPrize: [],
        categoryPrizeItems: [],
        categoryContest: [],
        categoryContestItems: [],

        isvalidFormAnimation: false,
        isLoading: false,
        messageFlash: { cognito: null },

        // Modal
        visibleModalLocation: false,
        datePickerAction: false,

        // Data API
        musicalGenreList: [{ name: 'List of musics genre', id: 10 * 100, children: [] }],
        sportsList: [{ name: 'List of sports', id: 10 * 100, children: [] }],
        categoryPrizeList: [{ name: 'categories of your preferences prize', id: 10 * 100, children: [] }],
        categoryContestList: [{ name: 'categories of your preferences contest', id: 10 * 100, children: [] }],
    }

    componentDidMount() {
        this._getMusicGenre()
        this._getSports()
        this._getCategoryPrize()
        this._getCategoryContest()
    }

    _getMusicGenre = () => {
        this.setState({ musicalGenreList: [{ name: 'List of musics genre', id: 10 * 100, children: musicsGenre.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    _getSports = () => {
        this.setState({ sportsList: [{ name: 'List of sports', id: 10 * 100, children: sportsList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    _getCategoryPrize = () => {
        this.setState({ categoryPrizeList: [{ name: "Categories of your preferences prize", id: 10 * 100, children: categoryPrizeList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    _getCategoryContest = () => {
        this.setState({ categoryContestList: [{ name: "Categories of your preferences contest", id: 10 * 100, children: categoryContestList.map((item, key) => { return { name: _.startCase(item), id: key } }) }] })
    }

    // Pickers
    onSelectedItemsChangeMusicalGenre = (value) => { this.setState({ musicalGenre: value }) }
    onSelectedItemsChangeSports = (value) => { this.setState({ sports: value }) }
    onSelectedItemsChangeCategoryPrize = (value) => { this.setState({ categoryPrize: value }) }
    onSelectedItemsChangeCategoryContest = (value) => { this.setState({ categoryContest: value }) }

    _updateMusicalGenre = (value) => {
        this.setState({ musicalGenreItems: value, musicalGenreChoose: value })
    }
    _updateSports = (value) => {
        this.setState({ sportsItems: value, sportsChoose: value })
    }

    _updateCategoryPrize = (value) => {
        this.setState({ categoryPrizeItems: value, categoryPrizeChoose: value })
    }

    _updateCategoryContest = (value) => {
        this.setState({ categoryContestItems: value, categoryContestChoose: value })
    }

    // Send Data to AWS
    _submit = async () => {
        const { _indexChangeSwiper, _dataFromForms } = this.props
        const { musicalGenreChoose, sportsChoose, categoryPrizeChoose, categoryContestChoose, political, vote } = this.state
        const data = {
            interests: {
                musicalGenre: musicalGenreChoose.map(item => item.name),
                sports: sportsChoose.map(item => item.name),
                categoryPrize: categoryPrizeChoose.map(item => item.name),
                categoryContest: categoryContestChoose.map(item => item.name),
                political, vote
            }
        }
        try {
            await _dataFromForms(data)
            this.setState({ isLoading: false, messageFlash: { cognito: { message: "" } } })
            await _indexChangeSwiper(1)
        } catch (error) {
            alert(error)
            this.setState({ isLoading: false, messageFlash: { cognito: { message: "" } } })
        }
    }

    _validateForm = () => {
        const { musicalGenreChoose, sportsChoose, categoryPrizeChoose, categoryContestChoose, political, vote } = this.state
        this.setState({ isLoading: true })
        setTimeout(() => {
            musicalGenreChoose.length !== 0
                ? sportsChoose.length !== 0
                    ? categoryPrizeChoose.length !== 0
                        ? categoryContestChoose.length !== 0
                            ? political !== 'Not specified'
                                ? vote !== 'Not specified'
                                    ? this._submit()
                                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid vote" } } })
                                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid political" } } })
                            : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid categories of contest" } } })
                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid categories of prizes" } } })
                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid sports" } } })
                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid genres of musics" } } })
        }, 500);
    }

    render() {
        const {
            // Pickers
            musicalGenre,
            musicalGenreItems,
            sports,
            sportsItems,
            categoryPrize,
            categoryPrizeItems,
            categoryContest,
            categoryContestItems,
            political,
            vote,

            isvalidFormAnimation,
            isLoading,
            messageFlash,

            // modal

            // API
            musicalGenreList,
            sportsList,
            categoryPrizeList,
            categoryContestList,
        } = this.state
        const { userData, _indexChangeSwiper } = this.props

        // Filter universities
        return (
            <Container>
                <GadrientsAuth />
                <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />

                <Header style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                            disabled={isLoading}
                            transparent
                            onPress={() => _indexChangeSwiper(-1)}>
                            <Icon name='arrow-back' style={{ color: isLoading ? '#EEEEEE' : '#FFF', }} />
                            <Text style={{ color: isLoading ? "#EEEEEE" : "#FFF" }}>Formation</Text>
                        </Button>
                        <Title style={{ color: isLoading ? '#EEEEEE' : '#FFF', fontSize: wp(7) }}>Interests</Title>
                    </Left>
                </Header>

                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text style={{ fontSize: wp(4.5), color: isLoading ? '#EEEEEE' : '#FFF', fontWeight: '100' }}>
                            <Text style={{ fontSize: wp(11), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>Last thing</Text> {'\n'}Tell us about your interests, so we could recommend much better things we have for you!
                        </Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -10 }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            <Content
                                scrollEnabled={!isLoading}
                                contentContainerStyle={{ paddingTop: 10 }}
                                keyboardShouldPersistTaps={'always'}>
                                <List>

                                    {/* GENRE MUSICALS */}
                                    <ListItem
                                        disabled={isLoading}
                                        itemHeader
                                        onPress={() => this.SectionedMultiSelectMusicalGenre._toggleSelector()}
                                        icon style={{ maxHeight: 45, backgroundColor: '#fff' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#FFD600" }}>
                                                <Icon type="Feather" name="music" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                                <Content showsHorizontalScrollIndicator={false} horizontal>
                                                    {musicalGenreItems.length
                                                        ? null
                                                        : <View style={{
                                                            backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                            margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                            borderColor: '#3333',
                                                            borderWidth: 0.5
                                                        }}>
                                                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose some musical tastes</Text>
                                                        </View>}
                                                    {musicalGenreItems && musicalGenreItems.map((item, key) =>
                                                        <View key={key} style={{
                                                            backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
                                                            margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                            borderColor: '#3333',
                                                            borderWidth: 0.5
                                                        }}>
                                                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{_.startCase(item.name)}</Text>
                                                        </View>
                                                    )}
                                                </Content>
                                            </View>
                                        </Body>
                                        <Right>
                                            <Text>Add more</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        <View style={{ backgroundColor: 'red', position: 'absolute', right: '-500000%' }}>
                                            <SectionedMultiSelect
                                                parentChipsRemoveChildren={true}
                                                ref={SectionedMultiSelectMusicalGenre => this.SectionedMultiSelectMusicalGenre = SectionedMultiSelectMusicalGenre}
                                                items={musicalGenreList}
                                                uniqueKey="id"
                                                subKey="children"
                                                selectText="Choose some things..."
                                                showDropDowns={true}
                                                readOnlyHeadings={true}
                                                onSelectedItemsChange={this.onSelectedItemsChangeMusicalGenre}
                                                onSelectedItemObjectsChange={(items) => this._updateMusicalGenre(items)}
                                                primary="#D81B60"
                                                selectedItems={musicalGenre}
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

                                    {/* SPORT LIKE */}
                                    <ListItem
                                        disabled={isLoading}
                                        itemHeader
                                        onPress={() => this.SectionedMultiSelectSports._toggleSelector()}
                                        icon style={{ maxHeight: 45, backgroundColor: '#fff' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#00C853" }}>
                                                <Icon type="FontAwesome" name="soccer-ball-o" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', width: '97%' }}>
                                                <Content showsHorizontalScrollIndicator={false} horizontal>
                                                    {sportsItems.length
                                                        ? null
                                                        : <View style={{
                                                            backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                            margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                            borderColor: '#3333',
                                                            borderWidth: 0.5
                                                        }}>
                                                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose some sports tastes</Text>
                                                        </View>}
                                                    {sportsItems && sportsItems.map((item, key) =>
                                                        <View key={key} style={{
                                                            backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
                                                            margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                            borderColor: '#3333',
                                                            borderWidth: 0.5
                                                        }}>
                                                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{_.startCase(item.name)}</Text>
                                                        </View>
                                                    )}
                                                </Content>
                                            </View>
                                        </Body>
                                        <Right>
                                            <Text>Add more</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        <View style={{ backgroundColor: 'red', position: 'absolute', right: '-500000%' }}>
                                            <SectionedMultiSelect
                                                parentChipsRemoveChildren={true}
                                                ref={SectionedMultiSelectSports => this.SectionedMultiSelectSports = SectionedMultiSelectSports}
                                                items={sportsList}
                                                uniqueKey="id"
                                                subKey="children"
                                                selectText="Choose some things..."
                                                showDropDowns={true}
                                                readOnlyHeadings={true}
                                                onSelectedItemsChange={this.onSelectedItemsChangeSports}
                                                onSelectedItemObjectsChange={(items) => this._updateSports(items)}
                                                primary="#D81B60"
                                                selectedItems={sports}
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

                                    {/* CATEGORY PRIZE */}
                                    <ListItem
                                        disabled={isLoading}
                                        itemHeader
                                        onPress={() => this.SectionedMultiSelectoPrizeCategory._toggleSelector()}
                                        icon style={{ maxHeight: 45, backgroundColor: '#fff' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#1E88E5" }}>
                                                <Icon type="Feather" name="award" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row' }}>
                                                <Content showsHorizontalScrollIndicator={false} horizontal>
                                                    {categoryPrizeItems.length
                                                        ? null
                                                        : <View style={{
                                                            backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                            margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                            borderColor: '#3333',
                                                            borderWidth: 0.5
                                                        }}>
                                                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose categories of your prize</Text>
                                                        </View>}
                                                    {categoryPrizeItems && categoryPrizeItems.map((item, key) =>
                                                        <View key={key} style={{
                                                            backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
                                                            margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                            borderColor: '#3333',
                                                            borderWidth: 0.5
                                                        }}>
                                                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{_.startCase(item.name)}</Text>
                                                        </View>
                                                    )}
                                                </Content>
                                            </View>
                                        </Body>
                                        <Right>
                                            <Text>Add more</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        <View style={{ backgroundColor: 'red', position: 'absolute', right: '-500000%' }}>
                                            <SectionedMultiSelect
                                                parentChipsRemoveChildren={true}
                                                ref={SectionedMultiSelectoPrizeCategory => this.SectionedMultiSelectoPrizeCategory = SectionedMultiSelectoPrizeCategory}
                                                items={categoryPrizeList}
                                                uniqueKey="id"
                                                subKey="children"
                                                selectText="Choose some things..."
                                                showDropDowns={true}
                                                readOnlyHeadings={true}
                                                onSelectedItemsChange={this.onSelectedItemsChangeCategoryPrize}
                                                onSelectedItemObjectsChange={(items) => this._updateCategoryPrize(items)}
                                                primary="#D81B60"
                                                selectedItems={categoryPrize}
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

                                    {/* CATEGORY CONTEST */}
                                    <ListItem
                                        disabled={isLoading}
                                        itemHeader
                                        onPress={() => this.SectionedMultiSelectoContestCategory._toggleSelector()}
                                        icon last style={{ maxHeight: 45, backgroundColor: '#fff' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#EF5350" }}>
                                                <Icon type="Feather" name="star" style={{ top: -1, left: 1 }} />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row' }}>
                                                <Content showsHorizontalScrollIndicator={false} horizontal>
                                                    {categoryContestItems.length
                                                        ? null
                                                        : <View style={{
                                                            backgroundColor: isLoading ? "#BDBDBD" : '#E0E0E0',
                                                            margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                            borderColor: '#3333',
                                                            borderWidth: 0.5
                                                        }}>
                                                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Choose categories of your preferences contest</Text>
                                                        </View>}
                                                    {categoryContestItems && categoryContestItems.map((item, key) =>
                                                        <View key={key} style={{
                                                            backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
                                                            margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                            borderColor: '#3333',
                                                            borderWidth: 0.5
                                                        }}>
                                                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{_.startCase(item.name)}</Text>
                                                        </View>
                                                    )}
                                                </Content>
                                            </View>
                                        </Body>
                                        <Right>
                                            <Text>Add more</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        <View style={{ backgroundColor: 'red', position: 'absolute', right: '-500000%' }}>
                                            <SectionedMultiSelect
                                                parentChipsRemoveChildren={true}
                                                ref={SectionedMultiSelectoContestCategory => this.SectionedMultiSelectoContestCategory = SectionedMultiSelectoContestCategory}
                                                items={categoryContestList}
                                                uniqueKey="id"
                                                subKey="children"
                                                selectText="Choose some things..."
                                                showDropDowns={true}
                                                readOnlyHeadings={true}
                                                onSelectedItemsChange={this.onSelectedItemsChangeCategoryContest}
                                                onSelectedItemObjectsChange={(items) => this._updateCategoryContest(items)}
                                                primary="#D81B60"
                                                selectedItems={categoryContest}
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

                                    <Separator bordered />

                                    {/* POLITICAL */}
                                    <ListItem icon style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#78909C" }}>
                                                <Icon type="Entypo" name="news" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Are you political?</Text>
                                        </Body>
                                        <Right>
                                            <Text>{political === 'Not specified' ? 'Not specified' : _.startCase(_.lowerCase(political))}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <Picker
                                                mode="dropdown"
                                                iosHeader="SELECT ONE"
                                                style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                headerTitleStyle={{ color: "#D81B60" }}
                                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                selectedValue={political}
                                                onValueChange={(value) => this.setState({ political: value })}>
                                                <Picker.Item label="Yes" value="YES" />
                                                <Picker.Item label="No" value="NO" />
                                            </Picker>}
                                    </ListItem>

                                    {/* VOTE */}
                                    <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#424242" }}>
                                                <Icon type="MaterialCommunityIcons" name="vote" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Are you vote?</Text>
                                        </Body>
                                        <Right>
                                            <Text>{vote === 'Not specified' ? 'Not specified' : _.startCase(_.lowerCase(vote))}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <Picker
                                                mode="dropdown"
                                                iosHeader="SELECT ONE"
                                                style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                headerTitleStyle={{ color: "#D81B60" }}
                                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                selectedValue={vote}
                                                onValueChange={(value) => this.setState({ vote: value })}>
                                                <Picker.Item label="Yes" value="YES" />
                                                <Picker.Item label="No" value="NO" />
                                            </Picker>}
                                    </ListItem>

                                </List>
                            </Content>
                        </View>
                        <Text style={{ color: '#F44336', fontSize: wp(4), top: 10 }}>
                            {messageFlash.cognito && messageFlash.cognito.message}
                        </Text>
                    </Row>
                </Grid>

                {/* SUBMIT DATA TO AWS */}
                <Footer style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderTopColor: 'rgba(0,0,0,0.0)' }}>
                    <Animatable.View
                        animation={isvalidFormAnimation ? "shake" : undefined}
                        onAnimationEnd={() => this.setState({ isvalidFormAnimation: false })}
                        duration={1000}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: "80%",
                            shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                        }}>
                        <Button
                            disabled={isLoading || Object.keys(userData).length === 0}
                            onPress={() => { this._validateForm() }}
                            iconRight style={{
                                width: "100%",
                                alignSelf: 'center',
                                backgroundColor: '#E91E63'
                            }}>
                            <Text style={{ fontWeight: 'bold', letterSpacing: 2, color: isLoading ? "#EEEEEE" : "#FFF" }}>Continue</Text>
                            {isLoading ? <Spinner color={isLoading ? "#EEEEEE" : "#FFF"} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                        </Button>
                    </Animatable.View>
                </Footer>
            </Container>
        );
    }
}

export default Interests
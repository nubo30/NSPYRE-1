import React, { Component } from 'react'
import { Text, View, Platform } from 'react-native'
import { withNavigationFocus } from "react-navigation";
import { connect } from 'react-redux'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { List, ListItem, Left, Right, Picker, Icon } from "native-base"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// redux
import { audienceReachData } from "../../store/actions/projectsActions"

// Style
import { colors } from '../global/static/colors'
import { Ionicons } from '@expo/vector-icons'

class FormPromoteMyContest extends Component {
    state = {
        demographicRegion: "NO_SELECT",
        location: [],
        age: "NO_SELECT",
        gender: "NO_SELECT",
        education: [],
        amountOfPeople: "NO_SELECT"
    }

    componentWillUpdate(none, prevState) { this.props.audienceReachData(prevState) }

    // Picker Region
    onValueChangeDRegion = () => { this.setState({ demographicRegion: value, location: [] }) }

    // Picker Age
    onValueChangeAge = () => { this.setState({ age: value }) }

    // Picker Gender
    onValueChangeGender = () => { this.setState({ gender: value }) }

    // Picker Education
    onValueChangeEducation = (education) => { this.setState({ education }) }

    // Picker Location
    onValueChangeLocation = (location) => { this.setState({ location }) }

    // Picker Select amount of people
    onValueChangeAmountOfPeople = () => { this.setState({ amountOfPeople: value }) }

    render() {
        const { demographicRegion } = this.state
        let filerlocation = Location.filter((data) => { return data.name.toLowerCase().indexOf(demographicRegion.toLowerCase()) !== -1 })
        return (
            <List style={{ width: "100%", backgroundColor: colors.fontPrimary }}>
                <ListItem itemDivider>
                    <Text style={{ color: colors.fontPlaceholder, fontSize: 12 }}>INFORMATION</Text>
                </ListItem>

                {/* REGION */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Demographic Region: </Text>
                    <Picker
                        mode="dropdown"
                        iosHeader="SELECT ONE"
                        headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                        headerTitleStyle={{ color: "#D81B60" }}
                        headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                        textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.demographicRegion === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                        selectedValue={this.state.demographicRegion}
                        onValueChange={this.onValueChangeDRegion}>
                        <Picker.Item label="Asia" value="asia" />
                        <Picker.Item label="Africa" value="africa" />
                        <Picker.Item label="Europe" value="europe" />
                        <Picker.Item label="Latin America" value="latinAmerica" />
                        <Picker.Item label="Northern America" value="northernAmerica" />
                        <Picker.Item label="Oceania" value="oceania" />
                        <Picker.Item label="No select" value="NO_SELECT" />
                    </Picker>
                </ListItem>

                {/* LOCATION */}
                <ListItem style={{ maxHeight: 45 }} onPress={() => this.location._toggleSelector()}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>
                            Location: <Text style={{ fontWeight: '100', fontSize: 17, color: this.state.location.length ? colors.fontTitle : colors.fontPlaceholder }}>{` ${this.state.location.length
                                ? this.state.location.join(', ').substr(0, 30)
                                : `No select`}`}</Text>
                        </Text>
                        <SectionedMultiSelect
                            items={filerlocation}
                            uniqueKey='name'
                            subKey='children'
                            iconKey='icon'
                            noItemsComponent={
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ top: 20 }}>First select a <Text style={{ fontWeight: "bold" }}>Demographic Region</Text>!</Text>
                                </View>
                            }
                            selectText='Choose some things...'
                            showDropDowns={false}
                            animateDropDowns={false}
                            showChips={false}
                            modalAnimationType="slide"
                            readOnlyHeadings={true}
                            ref={location => this.location = location}
                            onSelectedItemsChange={this.onValueChangeLocation}
                            selectedItems={this.state.location} />
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        {Platform.OS === 'android' ?
                            <Ionicons name="md-arrow-dropdown" style={{ fontSize: 20, right: 16, color: "#757575" }} />
                            : null}
                    </Right>
                </ListItem>

                {/* AGE */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Age: </Text>
                    <Picker
                        mode="dropdown"
                        iosHeader="SELECT ONE"
                        headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                        headerTitleStyle={{ color: "#D81B60" }}
                        headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                        textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.age === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                        selectedValue={this.state.age}
                        onValueChange={this.onValueChangeAge}>
                        <Picker.Item label="12 - 18" value="AGE_12_18" />
                        <Picker.Item label="18 - 24" value="AGE_18_24" />
                        <Picker.Item label="24 - 30" value="AGE_24_30" />
                        <Picker.Item label="30 - 40" value="AGE_30_40" />
                        <Picker.Item label="Others" value="OTHERS" />
                        <Picker.Item label="No select" value="NO_SELECT" />
                    </Picker>
                </ListItem>

                {/* Gender */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Gender: </Text>
                    <Picker
                        mode="dropdown"
                        iosHeader="SELECT ONE"
                        headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                        headerTitleStyle={{ color: "#D81B60" }}
                        headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                        textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.age === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                        selectedValue={this.state.gender}
                        onValueChange={this.onValueChangeGender}>
                        <Picker.Item label="Male" value="MALE" />
                        <Picker.Item label="Famale" value="FAMALE" />
                        <Picker.Item label="Famale/Male" value="FAMALE_MALE" />
                        <Picker.Item label="Others" value="OTHERS" />
                        <Picker.Item label="No select" value="NO_SELECT" />
                    </Picker>
                </ListItem>

                {/* Education */}
                <ListItem style={{ maxHeight: 45 }} onPress={() => this.SectionedMultiSelectEducation._toggleSelector()}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>
                            Education: <Text style={{ fontWeight: '100', fontSize: 17, color: this.state.education.length ? colors.fontTitle : colors.fontPlaceholder }}>{` ${this.state.education.length
                                ? this.state.education.join(', ').substr(0, 30)
                                : `No select`}`}</Text>
                        </Text>
                        <SectionedMultiSelect
                            items={SystemEducation}
                            uniqueKey='name'
                            subKey='children'
                            iconKey='icon'
                            selectText='Choose some things...'
                            showDropDowns={true}
                            animateDropDowns={false}
                            showChips={false}
                            modalAnimationType="slide"
                            readOnlyHeadings={true}
                            ref={SectionedMultiSelectEducation => this.SectionedMultiSelectEducation = SectionedMultiSelectEducation}
                            onSelectedItemsChange={this.onValueChangeEducation}
                            selectedItems={this.state.education} />
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        {Platform.OS === 'android' ?
                            <Ionicons name="md-arrow-dropdown" style={{ fontSize: 20, right: 16, color: "#757575" }} />
                            : null}
                    </Right>
                </ListItem>

                {/* Amount of People */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Amount of People: </Text>
                    <Picker
                        mode="dropdown"
                        iosHeader="SELECT ONE"
                        headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                        headerTitleStyle={{ color: "#D81B60" }}
                        headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                        textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.amountOfPeople === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                        selectedValue={this.state.amountOfPeople}
                        onValueChange={this.onValueChangeAmountOfPeople}>
                        <Picker.Item label="100" value="AMOUNT_PEOPLE_100" />
                        <Picker.Item label="200" value="AMOUNT_PEOPLE_200" />
                        <Picker.Item label="300" value="AMOUNT_PEOPLE_300" />
                        <Picker.Item label="400" value="AMOUNT_PEOPLE_400" />
                        <Picker.Item label="500" value="AMOUNT_PEOPLE_500" />
                        <Picker.Item label="No select" value="NO_SELECT" />
                    </Picker>
                </ListItem>
            </List>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        audienceReachData: (audienceReachParams) => dispatch(audienceReachData(audienceReachParams))
    }
}

export default connect(null, mapDispatchToProps)(withNavigationFocus(FormPromoteMyContest))
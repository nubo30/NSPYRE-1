import React, { Component } from 'react'
import { Platform, Modal } from 'react-native'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker';
import PhoneInput from 'react-native-phone-input'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Placeholder from 'rn-placeholder';
import replaceAll from 'replaceall';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { List, ListItem, Input, Left, Right, Picker, Icon, Text, Header, Button } from "native-base"
import { isAscii } from "validator"
import moment from 'moment'
import _ from 'lodash'

// data
import { Nacionality } from '../../Global/static/countriesNacionality'
import { Sports } from '../../Global/static/sports'
import { Musics } from '../../Global/static/music'

// Style
import { colors } from "../../Global/static/colors"
import { fontSize } from "../../Global/static/fontSize"

// Redux
import { engageFormData } from "../../../store/actions/projectsActions"

class EngageForm extends Component {
    state = {
        address: {},
        amountOfChildren: "0",
        amountOfSiblings: "0",
        areYouPolitical: "NO_SELECT",
        birthDate: "",
        category: "NOSELECT",
        doYouVote: "NO_SELECT",
        gender: "NO_SELECT",
        academicLevelAchieved: "0",
        haveACar: "NO_SELECT",
        howDoYouIdentify: "NO_SELECT",
        levelAchieved: "NO_SELECT",
        musicYouLike: [],
        nacionality: "NO_SELECT",
        name: "",
        parents: "NO_SELECT",
        phone: "+1",
        relationshipStatus: "NO_SELECT",
        schoolNameCollege: '',
        schoolNameHSchool: '',
        schoolNameOthers: '',
        sexualOrientation: "NO_SELECT",
        socioeconomicLevel: "NO_SELECT",
        sportsYouLike: [],
        sportsYouPlay: [],
        titleInTheCompany: "NO_SELECT",
        typeOfHousing: "NO_SELECT",
        whatKindOfPrizeDoYouLike: "NO_SELECT",

        isDateTimePickerVisible: false,
        yearsBirdthDay: null,

        modalVisibleAddress: false,

        maxName: 40,
        maxLengthAddress: 60,
        maxLengthacademicLevelAchieved: 2,
        maxLengthlevelAchieved: 20,
        maxLengthAmountOfChildren: 2,
        maxLengthAmountOfSiblings: 2,
        maxLengthschoolNameHSchool: 30,
        maxLengthschoolNameCollege: 30,
        maxLengthschoolNameOthers: 30,

        // others
        phoneErr: null,
        loading: false,
    }

    componentWillUpdate(none, prevState) { this.props.engageFormData(prevState) }

    // Number Phone
    handlePhone = () => { this.phone.isValidNumber() ? this.setState({ phoneErr: true }) : this.setState({ phoneErr: false }); this.setState({ phone: this.phone.getValue() }) }

    // Show picker Birdthday
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    // close datepiker Birdthday
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    // show format date piker Birdthday
    _handleDatePicked = (birdthday) => {
        const formatBirdthday = moment(birdthday).format("l")
        const yearsBirdthDay = moment(new Date()).format("YYYY") - moment(birdthday).format("YYYY")
        this.setState({ birthDate: formatBirdthday, yearsBirdthDay: yearsBirdthDay - 1 });
        this._hideDateTimePicker();
    };

    // Picker 'Category'
    onValueChangeCategory = (value: string) => { this.setState({ category: value }) }

    // Picker 'Genger user'
    onValueChangeGenger = (value: string) => { this.setState({ gender: value }) }

    // Picker 'Orientation Sexual of the user'
    onValueChangeOSexual = (value: string) => { this.setState({ sexualOrientation: value }) }

    // Picker 'Level achivied'
    onValueChangeLevelAchieved = (value: string) => { this.setState({ levelAchieved: value }) }

    // Picker 'State user'
    onValueChangeState = (value: string) => { this.setState({ relationshipStatus: value }); }

    // Picker 'Nacionality'
    onValueChangeNacionality = (value: string) => { this.setState({ nacionality: value }); }

    // Picker 'Race'
    onValueChangeRace = (value: string) => { this.setState({ howDoYouIdentify: value }); }

    // Picker 'Parent'
    onValueChangeParent = (value: string) => { this.setState({ parents: value }); }

    // Picker 'Political'
    onValueChangePolitical = (value: string) => { this.setState({ areYouPolitical: value }); }

    // Picker 'Vote'
    onValueChangeVote = (value: string) => { this.setState({ doYouVote: value }); }

    // Picker 'Socioeconomic Level'
    onValueChangeSocioeconomicLevel = (value: string) => { this.setState({ socioeconomicLevel: value }); }

    // Picker 'Socioeconomic Level'
    onValueChangeOccupation = (value: string) => { this.setState({ titleInTheCompany: value }); }

    // Picker 'Rent or Own'
    onValueChangeRentOrOwn = (value: string) => { this.setState({ typeOfHousing: value }); }

    // Picker 'Car'
    onValueChangeCar = (value: string) => { this.setState({ haveACar: value }); }

    // Picker 'WKFTCDL'
    onValueChangeWKOPDYL = (value: string) => { this.setState({ whatKindOfPrizeDoYouLike: value }); }

    // Picker 'Sport play'
    onSelectedItemsChangeSportPlay = (sportsYouPlay) => { sportsYouPlay.length ? this.setState({ sportsYouPlay }) : this.setState({ sportsYouPlay }) }

    // Picker 'Sport Like'
    onSelectedItemsChangeSportLike = (sportsYouLike) => { sportsYouLike.length ? this.setState({ sportsYouLike }) : this.setState({ sportsYouLike }) }

    // Picker 'Music Like'
    onSelectedItemsChangeMusicLike = (musicYouLike) => { musicYouLike.length ? this.setState({ musicYouLike }) : this.setState({ musicYouLike }) }

    render() {
        const { userData } = this.props
        return (
            <List style={{ width: "100%", backgroundColor: colors.fontPrimary }}>
                <ListItem itemDivider>
                    <Text style={{ color: colors.fontSecondary, fontSize: fontSize.subHeader }}>BASIC INFORMATION</Text>
                </ListItem>

                {/* Email of the users */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left>
                        <Text style={{ fontWeight: "700", color: colors.fontTitle, fontSize: 17 }}>Email:  </Text>
                        <Placeholder.Media
                            animate="fade"
                            style={{ width: wp(55), height: wp(4.5) }}
                            onReady={this.props.isReady}>
                            <Text style={{ fontWeight: "100", fontSize: wp(4.5) }}>{userData && _.upperFirst(userData.data.getUser.email)}</Text>
                        </Placeholder.Media>
                    </Left>
                </ListItem>

                {/* name of the users */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left>
                        <Text style={{ fontWeight: "700", color: colors.fontTitle, fontSize: 17 }}>Name:  </Text>
                        <Placeholder.Media
                            animate="fade"
                            style={{ width: wp(38), height: wp(4.5) }}
                            onReady={this.props.isReady}>
                            <Text style={{ fontWeight: "100", fontSize: wp(4.5) }}>{userData && _.startCase(userData.data.getUser.name)}</Text>
                        </Placeholder.Media>
                    </Left>
                </ListItem>

                {/* Category */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Category: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.category === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.category}
                            onValueChange={this.onValueChangeCategory}>
                            <Picker.Item label="Music" value="MUSIC" />
                            <Picker.Item label="Food" value="FOOD" />
                            <Picker.Item label="Amazon Sellers" value="AMAZON_SELLERS" />
                            <Picker.Item label="Movies / TV Shows / OTT" value="MOVIESTVSHOWSOTT" />
                            <Picker.Item label="Electronics" value="ELECTRONICS" />
                            <Picker.Item label="Spiritual Religious" value="SPIRITUALRELIGIOUS" />
                            <Picker.Item label="Beverage" value="BEVERAGE" />
                            <Picker.Item label="Gamer" value="GAMER" />
                            <Picker.Item label="Apparel" value="APPAREL" />
                            <Picker.Item label="No select" value="NOSELECT" />
                        </Picker>
                    </Left>
                </ListItem>

                {/* Phone of the user */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            color: this.state.phoneErr === null ? colors.fontTitle
                                : this.state.phoneErr
                                    ? colors.fontTitle
                                    : colors.textError,
                            fontWeight: "700"
                        }}>Phone: </Text>
                        <PhoneInput
                            ref={ref => { this.phone = ref }}
                            textStyle={{
                                fontSize: 17,
                                fontWeight: '100',
                                color: this.state.phoneErr
                                    ? colors.fontTitle
                                    : this.state.phone === "+1"
                                        ? colors.fontPlaceholder : colors.textError
                            }}
                            style={{ width: "80%" }}
                            initialCountry='us' cancelText='CANCEL' confirmText='CONFIRM'
                            onChangePhoneNumber={this.handlePhone}
                            value={this.state.phone}
                        />
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17, fontWeight: "100",
                            color: this.state.phoneErr === null ? colors.fontTitle
                                : this.state.phoneErr
                                    ? colors.fontTitle
                                    : colors.textError,
                        }}> (+120)</Text>
                    </Right>
                </ListItem>

                {/* Birhtday of the user */}
                <ListItem style={{ maxHeight: 45 }} onPress={this._showDateTimePicker}>
                    <Left>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Birthdate:  <Text style={{ fontSize: 17, color: this.state.birthDate ? colors.fontTitle : "#E0E0E0", fontWeight: "100" }}>
                            {this.state.birthDate ? this.state.birthDate : "4/28/2019"}
                        </Text>
                        </Text>
                        <DateTimePicker
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"spinner"}
                            titleIOS="Born Day"
                            textStyle={{ color: colors.fontTitle, fontWeight: '100' }}
                            placeHolderTextStyle={{ color: colors.fontTitle }}
                            minimumDate={new Date(1970, 1, 1)}
                            maximumDate={new Date()}
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+120)</Text>
                    </Right>
                </ListItem>

                {/* Genger of the user */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Gender: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.gender === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.gender}
                            onValueChange={this.onValueChangeGenger}>
                            <Picker.Item label="Male" value="MALE" />
                            <Picker.Item label="Female" value="FEMALE" />
                            <Picker.Item label="Others" value="OTHERS" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text>{` `}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+100)</Text>
                    </Right>
                </ListItem>

                {/* Orientation Sexual of the user */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Sexual Orientation: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.sexualOrientation === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.sexualOrientation}
                            onValueChange={this.onValueChangeOSexual}>
                            <Picker.Item label="Heterosexual" value="heterosexual" />
                            <Picker.Item label="Homosexual" value="homosexual" />
                            <Picker.Item label="Bisexual" value="bisexual" />
                            <Picker.Item label="Transsexual" value="transsexual" />
                            <Picker.Item label="Asexual" value="asexual" />
                            <Picker.Item label="Pansexual" value="pansexual" />
                            <Picker.Item label="Antrosexual" value="antrosexual" />
                            <Picker.Item label="Demisexual" value="demisexual" />
                            <Picker.Item label="Sapiosexual" value="sapiosexual" />
                            <Picker.Item label="Grissexual" value="grissexual" />
                            <Picker.Item label="Metrosexual" value="metrosexual" />
                            <Picker.Item label="Lumbersexual" value="lumbersexual" />
                            <Picker.Item label="Spornosexual" value="spornosexual" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text>{` `}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+100)</Text>
                    </Right>
                </ListItem>

                {/* Address of the users */}
                <ListItem style={{ maxHeight: 45 }} onPress={() => this.setState({ modalVisibleAddress: true })}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "700",
                        }}>Address: </Text>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "100",
                            color: Object.entries(this.state.address).length !== 0
                                ? colors.fontTitle
                                : colors.fontPlaceholder
                        }}> Street, City, State, Country, Po...</Text>
                    </Left>
                    <Right style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        backgroundColor: "#fff"
                    }}>
                        <Text style={{
                            fontSize: 17, fontWeight: "100",
                        }}> (+200)</Text>
                    </Right>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisibleAddress}>
                        <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                            <Left style={{ flexDirection: 'row' }}>
                                <Button transparent onPress={() => {
                                    this.setState({
                                        modalVisibleAddress: false,
                                        address: {},
                                        street: "",
                                        city: "",
                                        addressState: "",
                                        country: "",
                                        postalCode: ""
                                    })
                                }}>
                                    <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                    <Text style={{ left: 5, color: "#D81B60" }}>CANCEL</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button transparent
                                    disabled={this.state.street && this.state.city && this.state.addressState && this.state.country && this.state.postalCode ? false : true}
                                    onPress={() => {
                                        this.setState({
                                            modalVisibleAddress: false,
                                            address: {
                                                street: this.state.street,
                                                city: this.state.city,
                                                addressState: this.state.addressState,
                                                country: this.state.country,
                                                postalCode: this.state.postalCode
                                            }
                                        })
                                    }}>
                                    <Text style={{
                                        fontSize: wp(5),
                                        color: this.state.street && this.state.city && this.state.addressState && this.state.country && this.state.postalCode ? colors.elementPrimary : colors.elementPrimaryDisabled
                                    }}>OK</Text>
                                </Button>
                            </Right>
                        </Header>

                        {/* Street */}
                        <ListItem style={{ maxHeight: 45 }}>
                            <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 17,
                                    color: colors.fontTitle,
                                    fontWeight: "700"
                                }}>Street: </Text>
                                <Input
                                    placeholder="Quisqueya nueva, calle 31" autoFocus={true}
                                    autoCapitalize="words" keyboardType="ascii-capable" maxLength={60}
                                    placeholderTextColor={colors.fontPlaceholder}
                                    style={{ fontWeight: "100" }}
                                    value={this.state.street}
                                    onChangeText={(street) => this.setState({ street })}
                                />
                            </Left>
                            <Right />
                        </ListItem>

                        {/* City */}
                        <ListItem style={{ maxHeight: 45 }}>
                            <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 17,
                                    color: colors.fontTitle,
                                    fontWeight: "700"
                                }}>City: </Text>
                                <Input
                                    placeholder="La Romana"
                                    autoCapitalize="words" keyboardType="ascii-capable" maxLength={60}
                                    placeholderTextColor={colors.fontPlaceholder}
                                    style={{ fontWeight: "100" }}
                                    value={this.state.city} onChangeText={(city) => this.setState({ city })} />
                            </Left>
                            <Right />
                        </ListItem>

                        {/* State */}
                        <ListItem style={{ maxHeight: 45 }}>
                            <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 17,
                                    color: colors.fontTitle,
                                    fontWeight: "700"
                                }}>State: </Text>
                                <Input
                                    placeholder="La Romana"
                                    autoCapitalize="words" keyboardType="ascii-capable" maxLength={60}
                                    placeholderTextColor={colors.fontPlaceholder}
                                    style={{ fontWeight: "100" }}
                                    value={this.state.addressState} onChangeText={(addressState) => this.setState({ addressState })} />
                            </Left>
                            <Right />
                        </ListItem>

                        {/* Country */}
                        <ListItem style={{ maxHeight: 45 }}>
                            <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 17,
                                    color: colors.fontTitle,
                                    fontWeight: "700"
                                }}>Country: </Text>
                                <Input
                                    placeholder="República Dominicana"
                                    autoCapitalize="words" keyboardType="ascii-capable" maxLength={60}
                                    placeholderTextColor={colors.fontPlaceholder}
                                    style={{ fontWeight: "100" }}
                                    value={this.state.country} onChangeText={(country) => this.setState({ country })} />
                            </Left>
                            <Right />
                        </ListItem>

                        {/* Postal Code */}
                        <ListItem style={{ maxHeight: 45 }}>
                            <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 17,
                                    color: colors.fontTitle,
                                    fontWeight: "700"
                                }}>Postal Code: </Text>
                                <Input
                                    placeholder="07985"
                                    keyboardType="numeric" maxLength={5}
                                    placeholderTextColor={colors.fontPlaceholder}
                                    style={{ fontWeight: "100" }}
                                    value={this.state.postalCode} onChangeText={(postalCode) => this.setState({ postalCode })} />
                            </Left>
                            <Right />
                        </ListItem>
                    </Modal>
                </ListItem>

                {/* Level achieved of the users */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Level Achieved: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.levelAchieved === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.levelAchieved}
                            onValueChange={this.onValueChangeLevelAchieved}>
                            <Picker.Item label="Undergraduate Degrees" value="undergraduate_degrees" />
                            <Picker.Item label="Associate's Degrees" value="associate's_degrees" />
                            <Picker.Item label="Bachelor's Degrees" value="achelor's_degrees" />
                            <Picker.Item label="Graduate Degrees" value="graduate_degrees" />
                            <Picker.Item label="Master's Degrees" value="master's_degrees" />
                            <Picker.Item label="Doctoral Degrees" value="doctoral_degrees" />
                            <Picker.Item label="Professional Degrees" value="professional_degrees" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text>{` `}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+110)</Text>
                    </Right>
                </ListItem>

                {/* Academic Level Achieved */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "700"
                        }}>Academic Level Achieved: </Text>
                        <Input
                            placeholder="12, 10"
                            autoCapitalize="words" keyboardType="number-pad" maxLength={2}
                            placeholderTextColor={colors.fontPlaceholder}
                            style={{ fontWeight: "100" }}
                            value={this.state.academicLevelAchieved} onChangeText={(academicLevelAchieved) => this.setState({ academicLevelAchieved })} />
                    </Left>
                    <Right style={{ alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+110)</Text>
                    </Right>
                </ListItem>

                {/* School Name (Hight School) */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "700",
                            color: this.state.schoolNameHSchool === "" ? null : isAscii(this.state.schoolNameHSchool) && this.state.schoolNameHSchool.length >= 5 ? colors.fontTitle : colors.textError
                        }}>School Name (Hight School): </Text>
                        <Input
                            placeholder="Monument Mountain Hight School"
                            autoCapitalize="words" keyboardType="ascii-capable" maxLength={30}
                            placeholderTextColor={colors.fontPlaceholder}
                            style={{
                                color: this.state.schoolNameHSchool === "" ? null : isAscii(this.state.schoolNameHSchool) && this.state.schoolNameHSchool.length >= 5 ? colors.fontTitle : colors.textError,
                                height: 45, fontWeight: "100"
                            }}
                            value={this.state.schoolNameHSchool} onChangeText={(schoolNameHSchool) => this.setState({ schoolNameHSchool })} />
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        {this.state.schoolNameHSchool
                            ? <Text style={{
                                marginLeft: 5,
                                color: this.state.schoolNameHSchool === "" ? null : isAscii(this.state.schoolNameHSchool) && this.state.schoolNameHSchool.length >= 5 ? colors.fontTitle : colors.textError,
                            }}>
                                {this.state.maxLengthschoolNameHSchool - this.state.schoolNameHSchool.length}</Text>
                            : <Text style={{
                                marginLeft: 5,
                                color: this.state.schoolNameHSchool === "" ? null : isAscii(this.state.schoolNameHSchool) && this.state.schoolNameHSchool.length >= 5 ? colors.fontTitle : colors.textError,
                            }}>30</Text>
                        }
                        <Text style={{
                            color: this.state.schoolNameHSchool === "" ? null : isAscii(this.state.schoolNameHSchool) && this.state.schoolNameHSchool.length >= 5 ? colors.fontTitle : colors.textError,
                            fontSize: 17, fontWeight: "100"
                        }}> (+110)</Text>
                    </Right>
                </ListItem>

                {/* School Name (college) */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            color: this.state.schoolNameCollege === "" ? null : isAscii(this.state.schoolNameCollege) && this.state.schoolNameCollege.length >= 5 ? colors.fontTitle : colors.textError,
                            fontWeight: "700"
                        }}>School Name (college): </Text>
                        <Input
                            placeholder="UCLA"
                            autoCapitalize="words" keyboardType="ascii-capable" maxLength={30}
                            placeholderTextColor={colors.fontPlaceholder}
                            style={{
                                color: this.state.schoolNameCollege === "" ? null : isAscii(this.state.schoolNameCollege) && this.state.schoolNameCollege.length >= 5 ? colors.fontTitle : colors.textError,
                                height: 45, fontWeight: "100"
                            }}
                            value={this.state.schoolNameCollege} onChangeText={(schoolNameCollege) => this.setState({ schoolNameCollege })} />
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        {this.state.schoolNameCollege
                            ? <Text style={{
                                marginLeft: 5,
                                color: this.state.schoolNameCollege === "" ? null : isAscii(this.state.schoolNameCollege) && this.state.schoolNameCollege.length >= 5 ? colors.fontTitle : colors.textError,
                            }}>
                                {this.state.maxLengthschoolNameCollege - this.state.schoolNameCollege.length}</Text>
                            : <Text style={{
                                marginLeft: 5,
                                color: this.state.schoolNameCollege === "" ? null : isAscii(this.state.schoolNameCollege) && this.state.schoolNameCollege.length >= 5 ? colors.fontTitle : colors.textError,
                            }}>30</Text>
                        }
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+110)</Text>
                    </Right>
                </ListItem>

                {/* School Name (others) */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "700",
                            color: this.state.schoolNameOthers === "" ? null : isAscii(this.state.schoolNameOthers) && this.state.schoolNameOthers.length >= 5 ? colors.fontTitle : colors.textError,
                        }}>School Name (Others): </Text>
                        <Input
                            placeholder="Calazans"
                            autoCapitalize="words" keyboardType="ascii-capable" maxLength={30}
                            placeholderTextColor={colors.fontPlaceholder}
                            style={{
                                color: this.state.schoolNameOthers === "" ? null : isAscii(this.state.schoolNameOthers) && this.state.schoolNameOthers.length >= 5 ? colors.fontTitle : colors.textError,
                                height: 45, fontWeight: "100"
                            }}
                            value={this.state.schoolNameOthers} onChangeText={(schoolNameOthers) => this.setState({ schoolNameOthers })} />
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        {this.state.schoolNameOthers
                            ? <Text style={{
                                marginLeft: 5,
                                color: this.state.schoolNameOthers === "" ? null : isAscii(this.state.schoolNameOthers) && this.state.schoolNameOthers.length >= 5 ? colors.fontTitle : colors.textError,
                            }}>
                                {this.state.maxLengthschoolNameOthers - this.state.schoolNameOthers.length}</Text>
                            : <Text style={{
                                marginLeft: 5,
                                color: this.state.schoolNameOthers === "" ? null : isAscii(this.state.schoolNameOthers) && this.state.schoolNameOthers.length >= 5 ? colors.fontTitle : colors.textError,
                            }}>30</Text>
                        }
                        <Text style={{
                            fontSize: 17, fontWeight: "100",
                            color: this.state.schoolNameOthers === "" ? null : isAscii(this.state.schoolNameOthers) && this.state.schoolNameOthers.length >= 5 ? colors.fontTitle : colors.textError,
                        }}> (+110)</Text>
                    </Right>
                </ListItem>

                {/* Relationship Status */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Relationship status: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.relationshipStatus === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.relationshipStatus}
                            onValueChange={this.onValueChangeState}>
                            <Picker.Item label="Single" value="single" />
                            <Picker.Item label="Married" value="married" />
                            <Picker.Item label="Dating" value="dating" />
                            <Picker.Item label="Poly" value="poly" />
                            <Picker.Item label="It's complicated" value="its_complicated" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text>{` `}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+100)</Text>
                    </Right>
                </ListItem>

                {/* Nacionality  of the users */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Nacionality: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.nacionality === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.nacionality}
                            onValueChange={this.onValueChangeNacionality}>
                            {Nacionality.map((data, key) => {
                                let replace1 = replaceAll(", ", "_", data.nationality)
                                let replace2 = replaceAll(" ", "_", replace1)
                                let replace3 = replaceAll("-", "_", replace2)
                                let replace4 = replaceAll(".", "", replace3)
                                let replace5 = replaceAll("Å", "A", replace4)
                                let replace = replaceAll("Ç", "C", replace5)
                                let replaceLabel = replaceAll("NO_SELECT", "No select", data.nationality)
                                return <Picker.Item key={key} label={replaceLabel} value={replace} />
                            })
                            }
                        </Picker>
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text>{` `}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+50)</Text>
                    </Right>
                </ListItem>

                {/*How do you identify */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>How do you identify: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.howDoYouIdentify === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.howDoYouIdentify}
                            onValueChange={this.onValueChangeRace}>
                            <Picker.Item label="White (For example: German, Irish, English, Italian, etc..)" value="WHITE" />
                            <Picker.Item label="Hispanic, Latino, or Spanish Origin (For example: Mexican, Dominican, etc...)" value="HISPANIC" />
                            <Picker.Item label="Black or African Am (For example: African, American, Jamaican, etc...)" value="BLACK_OR_AFRICAN" />
                            <Picker.Item label="Asian (For example: Chinese, Filipino, Asian, etc..)" value="ASIATIC" />
                            <Picker.Item label="American Indian or Alaska native (For example: Navajo Nation etc..)" value="AMERICAN_INDIAN_OR_ALASKANATIVE" />
                            <Picker.Item label="Middle Eastern or North African (For example: Lebanese, Iranian, Egyptian, etc..)" value="MIDDLE_EASTERN_OR_NORHTAFRICAN" />
                            <Picker.Item label="Native Hawaiian or Other Pacific Islander (For example: Native hawaiian, Samoan, etc..)" value="NATIVE_HAWAIIAN_OR_PACIFICISLANDER" />
                            <Picker.Item label="Some other race, ethnicity, or origin" value="SOMEOTHERRACE" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", left: 20, backgroundColor: '#FFF' }}>
                        <Text>{` `}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100", backgroundColor: '#FFF', right: 20 }}> (+50)</Text>
                    </Right>
                </ListItem>

                {/* Amount of children  of the users */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 17, fontWeight: "700" }}>Amount of children: </Text>
                        <Input
                            placeholder="1, 2, 3..."
                            autoCapitalize="words" keyboardType="number-pad"
                            placeholderTextColor={colors.fontPlaceholder} maxLength={2}
                            style={{ height: 45, fontWeight: "100" }}
                            value={this.state.amountOfChildren} onChangeText={(amountOfChildren) => this.setState({ amountOfChildren })} />
                    </Left>
                    <Right style={{ alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+50)</Text>
                    </Right>
                </ListItem>

                {/* Amount of siblings (gender)  of the users */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 17, fontWeight: "700" }}>Amount of siblings (gender): </Text>
                        <Input
                            placeholder="1, 2, 3..."
                            autoCapitalize="words" keyboardType="number-pad"
                            placeholderTextColor={colors.fontPlaceholder} maxLength={2}
                            style={{ height: 45, fontWeight: "100" }}
                            value={this.state.amountOfSiblings} onChangeText={(amountOfSiblings) => this.setState({ amountOfSiblings })} />
                    </Left>
                    <Right style={{ alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+75)</Text>
                    </Right>
                </ListItem>

                {/* State Parents the users */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Parents: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.howDoYouIdentify === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.parentalCondition}
                            onValueChange={this.onValueChangeParent}>
                            <Picker.Item label="Divorced" value="DIVORCED" />
                            <Picker.Item label="Foster" value="FOSTER" />
                            <Picker.Item label="Married" value="married" />
                            <Picker.Item label="Separated" value="SEPARATED" />
                            <Picker.Item label="Single Parent Home" value="SINGLE_PARENT" />
                            <Picker.Item label="Orphan" value="ORPHAN" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text>{` `}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+50)</Text>
                    </Right>
                </ListItem>

                <ListItem itemDivider>
                    <Text style={{ color: colors.fontSecondary, fontSize: fontSize.subHeader }}>INTERESTS/HOBBIES</Text>
                </ListItem>

                {/* Sport play users */}
                <ListItem style={{ maxHeight: 45 }} onPress={() => this.SectionedMultiSelectSportPlay._toggleSelector()}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center", height: "100%" }}>
                        <Text style={{ fontWeight: "700", fontSize: 17 }}>
                            Sport You Play: <Text style={{ fontWeight: '100', fontSize: 17, color: this.state.sportsYouPlay.length ? colors.fontTitle : colors.fontPlaceholder }}>{` ${this.state.sportsYouPlay.length
                                ? this.state.sportsYouPlay.join(', ').substr(0, 30).replace(/\b\w/g, l => l.toUpperCase())
                                : 'No select'}`}</Text>
                        </Text>
                        <SectionedMultiSelect
                            items={Sports}
                            uniqueKey='name'
                            subKey='children'
                            iconKey='icon'
                            selectText='Choose some things...'
                            showDropDowns={true}
                            animateDropDowns={false}
                            showChips={false} loading={false}
                            modalAnimationType="slide"
                            readOnlyHeadings={true} style={{ width: "100%" }}
                            ref={SectionedMultiSelectSportPlay => this.SectionedMultiSelectSportPlay = SectionedMultiSelectSportPlay}
                            onSelectedItemsChange={this.onSelectedItemsChangeSportPlay}
                            selectedItems={this.state.sportsYouPlay} />
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 17, fontWeight: "100", left: 10 }}>{this.state.sportsYouPlay.length}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+75)</Text>
                    </Right>
                </ListItem>

                {/* Sport like users */}
                <ListItem style={{ maxHeight: 45 }} onPress={() => this.SectionedMultiSelectSportLike._toggleSelector()}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center", height: "100%" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>
                            Sport You Like: <Text style={{
                                fontWeight: '100', fontSize: 17, color: this.state.sportsYouLike.length ? colors.fontTitle : colors.fontPlaceholder
                            }}>
                                {` ${this.state.sportsYouLike.length
                                    ? this.state.sportsYouLike.join(', ').substr(0, 30).replace(/\b\w/g, l => l.toUpperCase())
                                    : `No select`}`}
                            </Text>
                        </Text>
                        <SectionedMultiSelect
                            items={Sports}
                            uniqueKey='name'
                            subKey='children'
                            iconKey='icon'
                            selectText='Choose some things...'
                            showDropDowns={true}
                            animateDropDowns={false}
                            showChips={false}
                            modalAnimationType="slide"
                            readOnlyHeadings={true}
                            ref={SectionedMultiSelectSportLike => this.SectionedMultiSelectSportLike = SectionedMultiSelectSportLike}
                            onSelectedItemsChange={this.onSelectedItemsChangeSportLike}
                            selectedItems={this.state.sportsYouLike} />
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 17, fontWeight: "100", left: 10 }}>{this.state.sportsYouLike.length}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+75)</Text>
                    </Right>
                </ListItem>

                {/* Music like users */}
                <ListItem style={{ maxHeight: 45 }} onPress={() => this.SectionedMultiSelectMusicLike._toggleSelector()}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center", height: "100%" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>
                            Music You Like: <Text style={{ fontWeight: '100', fontSize: 17, color: this.state.musicYouLike.length ? colors.fontTitle : colors.fontPlaceholder }}>{` ${this.state.musicYouLike.length
                                ? this.state.musicYouLike.join(', ').substr(0, 30).replace(/\b\w/g, l => l.toUpperCase())
                                : `No select`}`}</Text>
                        </Text>
                        <SectionedMultiSelect
                            items={Musics}
                            uniqueKey='name'
                            subKey='children'
                            iconKey='icon'
                            selectText='Choose some things...'
                            showDropDowns={true}
                            animateDropDowns={false}
                            showChips={false}
                            modalAnimationType="slide"
                            readOnlyHeadings={true}
                            ref={SectionedMultiSelectMusicLike => this.SectionedMultiSelectMusicLike = SectionedMultiSelectMusicLike}
                            onSelectedItemsChange={this.onSelectedItemsChangeMusicLike}
                            selectedItems={this.state.musicYouLike} />
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 17, fontWeight: "100", left: 10 }}>{this.state.musicYouLike.length}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+75)</Text>
                    </Right>
                </ListItem>

                <ListItem itemDivider>
                    <Text style={{ color: colors.fontSecondary, fontSize: fontSize.subHeader }}>OTHERS</Text>
                </ListItem>

                {/* Political user */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Are You Political: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.areYouPolitical === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.areYouPolitical}
                            onValueChange={this.onValueChangePolitical}>
                            <Picker.Item label="Yes" value="YES" />
                            <Picker.Item label="No" value="NO" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                    <Right style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+50)</Text>
                    </Right>
                </ListItem>

                {/* Political user vote */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Do You Vote: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.doYouVote === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.doYouVote}
                            onValueChange={this.onValueChangeVote}>
                            <Picker.Item label="Yes" value="yes" />
                            <Picker.Item label="No" value="no" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                    <Right style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+50)</Text>
                    </Right>
                </ListItem>

                {/* Socioeconomic level user */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Socioeconomic Level: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.socioeconomicLevel === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.socioeconomicLevel}
                            onValueChange={this.onValueChangeSocioeconomicLevel}>
                            <Picker.Item label="Yes" value="yes" />
                            <Picker.Item label="No" value="no" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text>{` `}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+50)</Text>
                    </Right>
                </ListItem>

                {/* Occupation of the users */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Title in the Company: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.titleInTheCompany === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.titleInTheCompany}
                            onValueChange={this.onValueChangeOccupation}>
                            <Picker.Item label="Actors" value="ACTORS" />
                            <Picker.Item label="Engineers" value="EGINEERS" />
                            <Picker.Item label="Musicians" value="MUSICIANS" />
                            <Picker.Item label="Scientists" value="SCIENTISTS" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text>{` `}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+200)</Text>
                    </Right>
                </ListItem>

                {/* Rent or own of the users (Home) */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Type of housing: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.typeOfHousing === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.typeOfHousing}
                            onValueChange={this.onValueChangeRentOrOwn}>
                            <Picker.Item label="Rent" value="RENT" />
                            <Picker.Item label="Own" value="OWN" />
                            <Picker.Item label="Live with parents" value="LIVE_WITH_PARENTS" />
                            <Picker.Item label="Dorn room" value="DORN_ROOM" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text>{` `}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+50)</Text>
                    </Right>
                </ListItem>

                {/* Rent or own of the users (Car) */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Have a car: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.haveACar === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.haveACar}
                            onValueChange={this.onValueChangeCar}>
                            <Picker.Item label="Rent" value="RENT" />
                            <Picker.Item label="Lease" value="LEASE" />
                            <Picker.Item label="Own" value="OWN" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text>{` `}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100" }}> (+50)</Text>
                    </Right>
                </ListItem>

                {/* What kind of prizes do you like */}
                <ListItem last style={{ maxHeight: 45, borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>What kind of prizes do you like? </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.whatKindOfPrizeDoYouLike === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.whatKindOfPrizeDoYouLike}
                            onValueChange={this.onValueChangeWKOPDYL}>
                            <Picker.Item label="Amazon products" value="AMAZON_PRODUCTS" />
                            <Picker.Item label="Apparel(clothing)" value="APPAREL_CLOTHING" />
                            <Picker.Item label="Bags" value="BAGS" />
                            <Picker.Item label="Cars" value="CARS" />
                            <Picker.Item label="Coupon codes" value="COUPON_CODES" />
                            <Picker.Item label="Cryptocurrency" value="CRYPTOCURRENC" />
                            <Picker.Item label="Electronics" value="ELECTRONICS" />
                            <Picker.Item label="Gaming" value="GAMING" />
                            <Picker.Item label="Hats" value="HATS" />
                            <Picker.Item label="Miles" value="MILES" />
                            <Picker.Item label="Shoes" value="SHOES" />
                            <Picker.Item label="Tickets(sports - music - film - etc)" value="TICKETS_SPORTS" />
                            <Picker.Item label="Trips" value="TRIPS" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                    <Right style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", left: 20, backgroundColor: '#FFF' }}>
                        <Text>{` `}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "100", backgroundColor: '#FFF', right: 20 }}> (+50)</Text>
                    </Right>
                </ListItem>
            </List>
       
       )
    }
}

const mapDispatchToProps = (dispatch) => { return { engageFormData: (engageFormDataParams) => dispatch(engageFormData(engageFormDataParams)) } }

export default connect(null, mapDispatchToProps)(EngageForm)
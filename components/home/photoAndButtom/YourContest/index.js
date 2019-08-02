import React, { Component } from 'react';
import { FlatList, Platform } from 'react-native';
import { Container, View } from "native-base"
import SearchBar from 'react-native-searchbar';
import _ from 'lodash'

// childComponents
import HeaderContest from "./header"
import CardContent from "./cardContent"
import { DataNotFound } from "../../../Global/emojis/index"

// Gradients
import { GadrientsListContenst } from "../../../Global/gradients/index"

class UserContest extends Component {
    static navigationOptions = { header: null }
    state = { input: "" }

    _emptySearchInput = () => {
        this.setState({ input: "" })
        this.searchBar._clearInput()
    }

    _openSearchBar = () => {
        this.searchBar.show()
    }

    render() {
        const { userData, _setModalVisibleYourContest } = this.props
        const { input } = this.state

        // Filtra por el nombre del concurso
        let filterContest = []; filterContest = userData.createContest.items.filter((item) => { return item.general.nameOfContest.toLowerCase().indexOf(_.lowerCase(input)) !== -1 })
        
        return (
            <Container>
                <GadrientsListContenst />

                {/* Search Bar */}
                <View style={Platform.OS === "ios" ? { position: "absolute", zIndex: 1 } : { position: "absolute" }}>
                    <SearchBar
                        ref={(ref) => this.searchBar = ref}
                        handleChangeText={(input) => this.setState({ input })}
                        placeholder={`Filter by name...`}
                        animate={false}
                        iconColor="#D81B60"
                        backgroundColor="#F5F5F5"
                        heightAdjust={-5}
                        autoCorrect={true}
                    />
                </View>

                {/* Header */}
                <HeaderContest _openSearchBar={this._openSearchBar} _setModalVisibleYourContest={_setModalVisibleYourContest} />

                {
                    filterContest.length
                        ? <FlatList
                            data={filterContest}
                            renderItem={({ item, index }) =>
                                <View key={index}>
                                    <CardContent userData={userData} item={item} inputText={input} _setModalVisibleYourContest={_setModalVisibleYourContest} />
                                    <View style={{ borderBottomColor: '#BDBDBD', borderBottomWidth: 0.5, width: "90%", alignSelf: 'center', top: 5 }} />
                                </View>
                            }
                            keyExtractor={(item, index) => index.toString()} />
                        : <DataNotFound inputText={input} />
                }
            </Container>

        )
    }
}
export default UserContest
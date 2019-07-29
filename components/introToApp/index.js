import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
// import AppIntro from 'rn-app-intro-screen';
import { LinearGradient } from 'expo'
import { withNavigation } from "react-navigation"

// styles
import { colors } from "../Global/static/colors"
const styles = StyleSheet.create({
    buttonTextStyle: {
        color: colors.elementPrimary
    },
    activeDotStyle: {
        backgroundColor: colors.elementPrimary
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    image: {
        width: 320,
        height: 320,
    },
    text: {
        color: colors.fontTitle,
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 22,
        color: colors.fontTitle,
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
    }
});

const slides = [
    {
        key: 'somethun',
        title: 'Slide 1',
        titleStyle: styles.title,
        text: `Lorem ipsum dolor sit ame,\nconsectetur adipiscing elit.`,
        textStyle: styles.text,
        image: "https://i.pinimg.com/564x/d1/3d/db/d13ddbefb111132b26db743fbd39caba.jpg",
        imageStyle: { width: 300, height: 300 },
        colors: colors.backgroundColors
    },
    {
        key: 'somethun-dos',
        title: 'Slide 2',
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed viverra elit id quam imperdiet, euismod imperdiet erat ullamcorper.\nMaecenas ornare consectetur elit vel consectetur.`,
        image: "https://i.pinimg.com/564x/de/0f/65/de0f6529d0a462dec25f4e20fc8b148d.jpg",
        imageStyle: { width: 300, height: 300 },
        colors: colors.backgroundColors
    },
    {
        key: 'somethun-tres',
        title: 'Slide 3',
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nMaecenas ornare consectetur elit vel consectetur.`,
        image: "https://i.pinimg.com/564x/f1/1b/ce/f11bceac91b11a3fd958770eb07ff96c.jpg",
        imageStyle: { width: 300, height: 300 },
        colors: colors.backgroundColors
    },
];

class Slides extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        showRealApp: false
    }
    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
        this.props.navigation.navigate("Auth")

    }

    _renderItem = props => (
        <LinearGradient
            style={[styles.mainContent, {
                paddingTop: props.topSpacer,
                paddingBottom: props.bottomSpacer,
                width: props.width,
                height: props.height,
            }]}
            colors={props.colors}
            start={{ x: 0, y: .6 }} end={{ x: .0, y: 1 }}
        >
            <Image
                style={props.imageStyle}
                source={{ uri: props.image }}
            />
            <View>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </LinearGradient>
    );

    render() {
        return null
        // return n (
        // <AppIntro
        //     onSkip={this._onDone}
        //     showSkipButton={true}
        //     slides={slides}
        //     onDone={this._onDone}
        //     renderItem={this._renderItem}
        //     buttonTextStyle={styles.buttonTextStyle}
        //     activeDotStyle={styles.activeDotStyle}
        // />
        // )
    }
}

export default withNavigation(Slides)
import React, { Component } from 'react';
import { Button, Icon, Text, View } from 'native-base';
import PureChart from 'react-native-pure-chart';
import _ from 'lodash'

const activeColors = { one: '#E91E63', two: "#f277a1" }
const disableColors = { one: '#9E9E9E', two: "#E0E0E0" }
const icons = { icon: { male: 'male', female: 'female' }, type: "FontAwesome" }

export default class BasedLikesGender extends Component {

    state = {
        data: [
            {
                value: 50,
                label: 'Female',
                color: disableColors.two
            }, {
                value: 50,
                label: 'Male',
                color: disableColors.one
            }

        ]
    }

    componentWillReceiveProps(nextProps) {
        const { action } = nextProps
        this.setState({
            data: [
                {
                    value: 50,
                    label: 'Female',
                    color: action ? activeColors.two : disableColors.two
                }, {
                    value: 50,
                    label: 'Male',
                    color: action ? activeColors.one : disableColors.one
                }

            ]
        })
    }

    render() {
        const { data } = this.state
        const { action } = this.props
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                <View style={{ flex: 0.7 }}>
                    <PureChart data={data} type='pie' height={160} />
                </View>
                <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row', width: "100%" }}>
                    <Button iconLeft small transparent disabled>
                        <Icon name={icons.icon.male} type={icons.type} style={{ color: action ? activeColors.one : disableColors.one }} />
                        <Text allowFontScaling={false} style={{ left: -10, color: action ? activeColors.one : disableColors.one }}>50</Text>
                    </Button>
                    <Button iconLeft small transparent disabled>
                        <Icon name={icons.icon.female} type={icons.type} style={{ color: action ? activeColors.two : disableColors.two }} />
                        <Text allowFontScaling={false} style={{ left: -10, color: action ? activeColors.two : disableColors.two }}>50</Text>
                    </Button>
                </View>
            </View>
        );
    }
}
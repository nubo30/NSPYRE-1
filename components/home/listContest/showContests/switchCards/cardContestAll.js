import React, { Component } from 'react';
import { withNavigation } from "react-navigation"
import { TouchableHighlight } from 'react-native';
import * as Animatable from 'react-native-animatable';

// Component child
import CardContent from "./cardContestAllChild/index"

class cardContestAll extends Component {
    state = { activeAnimation: false }
    render() {
        const { item, userData } = this.props
        return (
            <TouchableHighlight
                onPress={() => {
                    this.setState({ activeAnimation: true });
                }}
                underlayColor="rgba(0,0,0,0.0)">
                <Animatable.View
                    duration={200}
                    animation={this.state.activeAnimation ? 'pulse' : undefined}
                    onAnimationEnd={() => {
                        this.setState({ activeAnimation: false });
                        this.props.navigation.navigate("AboutContest", { contest: item, fromWhere: 'categoryContest', userData })
                    }}>
                    <CardContent userData={userData} item={item} />
                </Animatable.View>
            </TouchableHighlight>
        )
    }
}

export default withNavigation(cardContestAll)
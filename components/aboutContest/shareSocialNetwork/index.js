import React, { Component } from 'react';
import { Button, View } from 'native-base';

// Icons
import { Feather } from "@expo/vector-icons"

// Icon share with social network 
export default class SocialNetwork extends Component {
    render() {
        return (
            <View style={{ backgroundColor: "rgba(0,0,0,0.0)", flexDirection: 'row' }}>
                <Button color="#fff" style={{
                    top: 5,
                    borderRadius: 100,
                    backgroundColor: "#D82B60",
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5
                }}>
                    <Feather name='facebook' color="#FFF" size={20} />
                </Button>
                <Button color="#fff" style={{
                    top: 5,
                    borderRadius: 100,
                    backgroundColor: "#D82B60",
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5
                }}>
                    <Feather name='instagram' color="#FFF" size={20} />
                </Button>
                <Button color="#fff" style={{
                    top: 5,
                    borderRadius: 100,
                    backgroundColor: "#D82B60",
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5
                }}>
                    <Feather name='twitter' color="#FFF" size={20} />
                </Button>
            </View>
        );
    }
}
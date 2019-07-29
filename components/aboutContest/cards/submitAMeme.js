import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { Button, Card, CardItem } from 'native-base';

// Submit a Meme in the contest
export default function SubmitAMeme() {
    return (
        <Card style={{ borderRadius: 15, width: "95%", elevation: 15 }}>
            <CardItem cardBody style={{ borderRadius: 15 }}>
                <ImageBackground
                    borderRadius={15}
                    style={{ height: 130, width: "100%" }}
                    source={{ uri: "https://wallpapercave.com/wp/mdyJFkA.jpg" }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        width: "100%",
                        height: "100%",
                        borderRadius: 15
                    }}>
                        <Button bordered style={{ alignSelf: "center", padding: 5, borderRadius: 10, borderColor: "#fff" }}>
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                                Submit a Meme
                            </Text>
                        </Button>
                    </View>
                </ImageBackground>
            </CardItem>
        </Card>
    );
}
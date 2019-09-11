import React from 'react';
import { View, StatusBar } from 'react-native'

// Status bar for ios
export const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[{ height: 0 }, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);
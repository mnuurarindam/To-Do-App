import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigator from './src/Navigator.jsx';

class App extends Component {
    render() {
        return (
            <View style={st.container}>
                <StatusBar style="auto" />
                <Navigator />
            </View>
        );
    }
}

const st = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: '100%',
    },
});

export default App;
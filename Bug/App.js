/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import {Panel} from "./components/Panel.js";

export default class App extends Component {
  render() {
    return (
      <Panel
      containerStyle={style.container}
      title={`Exceeded your limit`}
      titleStyle={style.titleStyle}
    >
      <Text style={style.bodyStyle}>
        {`Every count will cost you 10 bucks. It's really 10 bucks. We will and will definitely charge you for it.`}
      </Text>
    </Panel>
    );
  }
}

const style = StyleSheet.create( {
  bodyStyle: {
    color: "white",
    marginHorizontal: 30,
    marginVertical: 10,
  },
  container: {
    backgroundColor: "rgb(168, 46, 47)",
    borderColor: "rgb(101,101,101)",
    borderWidth: 2,
  },
  titleStyle: {
    padding: 20,
    paddingLeft: 30,
  },
});

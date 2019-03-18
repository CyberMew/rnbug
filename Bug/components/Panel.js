/**
 * Panel.ts
 */
import React, { Component } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

export class Panel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: true, // Set this to false to see another Animation bug.
      heightAnimation: new Animated.Value(-1),
      isInitialStateSet: false,
      isVisible: true,
      maxHeight: -1,
      minHeight: -1,
      title: props.title,
    };
  }
   toggle = () => {
    const initialValue = this.state.expanded
      ? this.state.minHeight
      : this.state.maxHeight + this.state.minHeight;
    const finalValue = this.state.expanded
      ? this.state.maxHeight + this.state.minHeight
      : this.state.minHeight;
    this.setState(
      {
        expanded: !this.state.expanded,
      },
      () => {
        this.state.heightAnimation.setValue(initialValue);
        Animated.timing(this.state.heightAnimation, {
          duration: 200,
          easing: Easing.ease,
          toValue: finalValue, // +4 here to compensate border for onLayout bug.
        }).start();
      },
    );
  }
   render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            overflow: "hidden",
            height: this.state.heightAnimation,
          },
          this.props.containerStyle,
        ]}
      >
        <View onLayout={this.setMinHeight}>
          <TouchableHighlight
            onPress={this.toggle}
            underlayColour="#f1f1f1"
          >
            <View style={[styles.titleContainer]}>
              <Text style={[styles.title, this.props.titleStyle]}>
                {this.state.title}
              </Text>
            </View>
          </TouchableHighlight>
        </View>

        <View
          style={[
            styles.body, 
          ]}
          onLayout={this.setMaxHeight}
        >
          {this.props.children}
        </View>
      </Animated.View>
    );
  }

   setMaxHeight = (event) => {
    // Need to track the highest layout height because when we shrink the height
    // of the view, the layout will change back to the smaller value e.g. 27
    // before the layout calculates the original highest height e.g. 60,
    // resulting in us not being able to get back the original maxheight value
    // during toggle action since the layout is not done.
    // tldr: don't overwrite existing height if given height is lower.
    if (event.nativeEvent.layout.height < this.state.maxHeight) {
      return;
    }

    this.setState(
      {
        maxHeight: event.nativeEvent.layout.height,
      },
      () => {
        // We want to hide the content if expanded was initially set to false
        // and once we got the correct layout height.
        if (
          !this.state.isInitialStateSet &&
          (this.state.minHeight > 0 && this.state.maxHeight > 0) &&
          !this.state.expanded
        ) {
          this.setState({ isInitialStateSet: true }, () => this.toggle());
        }
      },
    );
  }

   setMinHeight = (event) => {
    this.setState(
      {
        minHeight: event.nativeEvent.layout.height,
      },
      () => {
        // We want to hide the content if expanded was initially set to false
        // and once we got the correct layout height.
        if (
          !this.state.isInitialStateSet &&
          (this.state.minHeight > 0 && this.state.maxHeight > 0) &&
          !this.state.expanded
        ) {
          this.setState({ isInitialStateSet: true }, () => this.toggle());
        }
      },
    );
  }
}
const styles = StyleSheet.create({
  body: {
  },
  button: {},
  buttonImage: {
    aspectRatio: 2,
    height: 8,
    marginHorizontal: 10,
    tintColor: "white",
    width: 16,
  },
  container: {
  },
  title: {
    color: "white",
    flex: 1,
    fontFamily: "AvenirNext-DemiBold", // "avenir_next_lt_pro_demi" on android, not tested bug on android.
    fontWeight: "bold",
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
});

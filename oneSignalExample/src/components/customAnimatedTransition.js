/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window')

export default class MyComponent extends Component {
  constructor(){
    super()
    this.animatedOpacity = new Animated.Value(0)
    this.animatedY = new Animated.Value(width)
    this.animatedX = new Animated.Value(height)
  }

  componentDidMount(){
    Animated.parallel([
      Animated.timing(this.animatedOpacity, {
        toValue:1,
        duration:this.props.duration*2.5,
        nativeDriver:true
      }),
      Animated.timing(this.animatedY, {
        toValue:0,
        duration:this.props.duration*1.5,
      }),
      Animated.timing(this.animatedX, {
        toValue:0,
        duration:this.props.duration*1.5,
      })
    ]).start();

  }

  render() {
    const animatedStyleOpacity = {opacity:this.animatedOpacity}
    const animatedXY = this.props.type == 'modal' ? {top:this.animatedX} : {left:this.animatedY}
    // const animatedY = {left:this.animatedY}
    return (
      <Animated.View style={[styles.container,animatedStyleOpacity,animatedXY]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

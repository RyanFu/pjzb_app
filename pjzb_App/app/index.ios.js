/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
    ImageEditor,
    CameraRoll,
    Image,
} from 'react-native';
 import App from './app/app';
 // import App from './app/components/VersionUpdate.js';

AppRegistry.registerComponent('app', () => App);


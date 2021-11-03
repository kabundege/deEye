import React, { Component } from "react";
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";
import { Asset } from 'expo-asset';
import Routes from "./src/routes";

const customFonts  = {
  Black: require('./src/assets/fonts/Montserrat-Black.ttf'),
  Bold: require('./src/assets/fonts/Montserrat-Bold.ttf'),
  Thin: require('./src/assets/fonts/Montserrat-Thin.ttf'),
  Light: require('./src/assets/fonts/Montserrat-Light.ttf'),
  Medium: require('./src/assets/fonts/Montserrat-Medium.ttf'),
  Regular: require('./src/assets/fonts/Montserrat-Regular.ttf'),
  SemiBold: require('./src/assets/fonts/Montserrat-SemiBold.ttf'),
  ExtraBold: require('./src/assets/fonts/Montserrat-ExtraBold.ttf'),
  ExtraLight: require('./src/assets/fonts/Montserrat-ExtraLight.ttf'),
};


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}


class AppContainer extends Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./src/assets/images/Saly-31.png'),
    ]);

    await Promise.all([...imageAssets]);

    await Font.loadAsync(customFonts)
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return <Routes/>
  }
}

export default AppContainer

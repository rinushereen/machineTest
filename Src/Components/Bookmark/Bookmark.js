import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {setStories} from '../../Redux/Action';
import {connect} from 'react-redux';
import {Header, ListItem, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {color} from 'react-native-reanimated';
import {StoriesItem} from '../Home/Home';

class Bookmark extends React.Component {
  render() {
    return (
      <>
        <View>
          <Header
            containerStyle={{backgroundColor: 'transparent'}}
            centerComponent={{text: 'Bookmarks', style: {fontSize: 20}}}
          />
          <View style={styles.container}>
            <FlatList
              data={this.props.bookmarks}
              renderItem={({item}) => <StoriesItem item={item} />}
            />
          </View>
        </View>
      </>
    );
  }
}
const mapStateToProps = state => {
  console.log('th', state);
  return {
    bookmarks: state.bookmarks,
  };
};

export default connect(mapStateToProps)(Bookmark);

const styles = StyleSheet.create({
  avatar: {
    width: 35,
    height: 35,
  },
  container: {
    flexDirection: 'row',
  },
  viewOuter: {
    flexDirection: 'row',
  },
  view1: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '75%',
  },
  view2: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '25%',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  text: {
    paddingRight: 10,
    paddingLeft: 10,
    padding: 5,
    fontSize: 14,
    // width:'100%'
  },
  header: {
    backgroundColor: 'blue',
  },
  v1: {
    height: 50,
  },
  button: {
    backgroundColor: 'transparent',
    marginLeft: 10,
    //width: 40,
  },
  collectionButton: {
    backgroundColor: 'transparent',
    marginRight: 10,
    //width: 40,
  },
  commentButton: {
    color: '#707070',
    marginLeft: 10,
    marginTop: 5,
    fontSize: 15,
    marginBottom: 10,
  },
});

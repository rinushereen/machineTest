import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {setStories, saveBookmarks} from '../../Redux/Action';
import {connect} from 'react-redux';
import {Header, ListItem, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getAllStories} from '../../Networking/NetworkService';

class Home extends React.Component {
  componentDidMount() {
    this.fetchApiCall();
    this.getData();
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@bookmarks');

      jsonValue != null
        ? this.props.saveBookmarks(JSON.parse(jsonValue))
        : null;
    } catch (e) {
      // error reading value
    }
  };
  fetchApiCall = () => {
    getAllStories()
      .then(response => {
        console.log(response);
        const stories = response.data;
        this.props.setStories(stories);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <View>
          <Header
            containerStyle={{backgroundColor: 'transparent'}}
            leftComponent={<Icon name="camera" size={20} />}
            centerComponent={{text: 'Instagram', style: {fontSize: 20}}}
            rightComponent={
              <View style={{flexDirection: 'row'}}>
                <Icon name="television" size={20} style={{marginRight: 20}} />
                <Icon name="paper-plane-o" size={20} />
              </View>
            }
          />
          <View style={styles.container}>
            {/* <Icon name="times" color='red'></Icon> */}
            <FlatList
              data={this.props.data}
              renderItem={({item}) => (
                <StoriesItem item={item} {...this.props} />
              )}
            />
          </View>
        </View>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.stories,
  };
};

const mapDispatchToProps = {setStories, saveBookmarks};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export function StoriesItem({item, ...props}) {
  const [showMore, setShowMore] = useState(false);

  const bookMarktap = async id => {
    try {
      const jsonValue = await AsyncStorage.getItem('@bookmarks');

      if (jsonValue != null) {
        let allValues = JSON.parse(jsonValue);
        const newValue = allValues.concat(id);
        console.log('new value', newValue);
        //set data to redux
        storeData(newValue);
      } else {
        storeData([id]);
      }
    } catch (e) {
      // error reading value
    }
  };
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@bookmarks', jsonValue);
      props.saveBookmarks(value);
    } catch (e) {
      // saving error
    }
  };
  const goToComments = () => {
    props.navigation.navigate('comment');
  };
  return (
    <>
      <View>
        <ListItem
          containerStyle={{height: 50}}
          roundAvatar
          title="varun"
          leftAvatar={
            <Image
              source={require('../../Assets/Images/placeholder.jpeg')}
              style={styles.avatar}
            />
          }
          rightAvatar={<Icon name="ellipsis-v" size={25} color="grey" />}
          bottomDivider
        />
        <Image
          style={styles.image}
          source={{
            uri: item['high thumbnail'],
          }}
        />
        <View style={styles.viewOuter}>
          <View style={styles.view1}>
            <Button
              icon={<Icon name="heart-o" size={25} color="black" />}
              buttonStyle={styles.button}
            />
            <Button
              icon={<Icon name="comment-o" size={25} color="black" />}
              buttonStyle={styles.button}
            />
            <Button
              icon={<Icon name="paper-plane-o" size={25} color="black" />}
              buttonStyle={styles.button}
            />
            <View />
          </View>
          {/* <Text style={styles.text}>{item.Title}</Text>
        <Text style={styles.text}>{item.Year}</Text> */}
          <View style={styles.view2}>
            <Button
              onPress={() => bookMarktap(item)}
              icon={<Icon name="bookmark-o" size={25} color="black" />}
              buttonStyle={styles.collectionButton}
            />
          </View>
        </View>
        <View>
          <Text style={styles.text}>liked by shibu and 666 others</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.text, {fontSize: 12}]}>
            {showMore ? item.title : showLessContent(item.title)}
          </Text>
          {!showMore && item.title.length > 50 && (
            <Text
              style={[styles.text, {color: '#707070'}]}
              onPress={() => setShowMore(true)}>
              show more
            </Text>
          )}
        </View>
      </View>
      <Text style={styles.commentButton} onPress={goToComments}>
        view all 931 comments
      </Text>
    </>
  );
}

function showLessContent(value) {
  if (value.length <= 50) {
    return value;
  } else {
    return value.substring(0, 50) + '...';
  }
}

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

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getAllComments} from '../../Networking/NetworkService';

function Comments(props) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetchApiCall();
  }, []);
  const renderSeparator = () => {
    return <View style={styles.seperator} />;
  };
  const fetchApiCall = () => {
    getAllComments()
      .then(response => {
        console.log(response);
        const com = response.data;
        setComments(com);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <View>
      <Header
        leftComponent={
          <Icon
            onPress={() => props.navigation.goBack()}
            name="chevron-left"
            size={25}
            color="grey"
          />
        }
        containerStyle={{backgroundColor: 'transparent'}}
        centerComponent={{text: 'Comments', style: {fontSize: 20}}}
      />

      {comments.length === 0 && <Text>No comments</Text>}
      <FlatList
        data={comments}
        renderItem={({item}) => (
          <ListItem
            leftAvatar={<Icon name="user-circle" size={25} color="grey" />}
            title={item.username}
            subtitle={item.comments}
          />
        )}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

Comments.propTypes = {};

export default Comments;

const styles = StyleSheet.create({
  seperator: {
    height: 0.5,
    backgroundColor: 'grey',
    width: '100%',
  },
});

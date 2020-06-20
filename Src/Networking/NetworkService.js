import axios from 'axios';
import {StoriesUrl, CommentsUrl} from './Constants';

export function getAllStories() {
  return axios.get(StoriesUrl);
}
export function getAllComments() {
  return axios.get(CommentsUrl);
}

import axios from 'axios';
import { API_ERROR, API_PEOPLE, API_SEARCH } from '../constants/api';

export default class PeopleService {
  static async getAll() {
    return await axios.get(API_PEOPLE);
  }

  static async getPersonById(id) {
    return await axios.get(API_PEOPLE + id);
  }

  static async getAllWithSearch(query: string) {
    return await axios.get(API_SEARCH + query);
  }

  static async getError() {
    return await axios.get(API_ERROR);
  }
}

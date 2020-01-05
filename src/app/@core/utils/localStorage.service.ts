import { Injectable } from '@angular/core';
import _ from 'lodash';
@Injectable()
// Api Service is config of any view
// API Methods, It'll eliminate the duplicate
// by view's
export class LocalStorageService {

  // imported HttpService for single entry all the views
  constructor() {
  }

  // Set the Values into the LocalStorage
  setValues(values: any) {
    _.each(values, (value: any, key: any) => {
        localStorage[key.toLowerCase()] = value;
    });
  }

  // Get Value from LocalStorage
  getValue(propertyValue: string) {
    return localStorage[propertyValue.toLowerCase()];
  }

  // Remove the Values into the LocalStorage
  removeItems(values: any) {
    _.each(values, (item: any) => {
      localStorage.removeItem(item.toLowerCase());
    });
  }

  // Clear all the LocalStorage
  clearLocalStorage() {
    return localStorage.clear();
  }

}

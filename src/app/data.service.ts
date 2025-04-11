import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private formData: any = {
    page1: null,
    page2: null,
    page3: null,
  };

  setPageData(page: string, data: any) {
    this.formData[page] = data;
  }

  getFormData() {
    return this.formData;
  }

}

import { of } from "rxjs";

export class StoreServiceMock {
  constructor() {
  }

  select() {
    return of('')
  }

  dispatch() {
    return '';
  }
}
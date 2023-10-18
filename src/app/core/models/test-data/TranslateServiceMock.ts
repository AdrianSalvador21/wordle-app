import { of } from "rxjs";

export class TranslateServiceMock {
  constructor() {
  }

  setDefaultLang() {}
  use() {}
  setTranslation() {}
  get(key: any): any {
    return of(key);
  }
}
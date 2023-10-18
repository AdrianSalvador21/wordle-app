import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from 'src/app/modules/theme/theme.service';
import { Store } from '@ngrx/store';
import { setAllWords, setWord } from 'src/app/core/actions/words.actions';
import { setLanguage } from 'src/app/core/actions/language.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

declare const window: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {
  @ViewChildren('row') row: QueryList<any> | undefined;
  public isDarkTheme = false;
  public language = 'es';
  public totalGames = 0;
  public gamesWon = 0;


  constructor(
    public router: Router,
    private http: HttpClient,
    private themeService: ThemeService,
    private _snackBar: MatSnackBar,
    public translateService: TranslateService,
    private store: Store<any>
  ) {
  }

  public selectedWord = '';

  ngOnInit() {
    this.store.select('appReducer').subscribe(state => {
      const { statistics, words } = state;

      this.totalGames = statistics.statisticsData.totalGames;
      this.gamesWon = statistics.statisticsData.gamesWon;

      this.selectedWord = words.selectedWord;
    });
  }

  ngAfterViewInit(): void {
    this.http.get('assets/words.txt', { responseType: 'text' }).subscribe(data => {
      const words: any = data.split(/\r\n|\r|\n/, -1).filter((word) => word.length === 5);
      this.store.dispatch(setAllWords({ words }));
      this.store.dispatch(setWord(null));
    });

    if (!localStorage.getItem('selectedTheme')) {
      this.isDarkTheme = false;
    } else {
      this.isDarkTheme = !!localStorage.getItem('selectedTheme') ? localStorage.getItem('selectedTheme') !== 'light' : true;
    }

    const instructionsModal: any = new window.bootstrap.Modal(document.getElementById('instructionsModal'))
    instructionsModal.show()
  }

  changeLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
    this.store.dispatch( setLanguage({language: this.language}) );
    this.translateService.getTranslation(this.language).subscribe((data:any)=> {
      this._snackBar.open(data.home.snack, 'X', {
        duration: 2000
      })
     });
  }

  toggle() {
    const active = this.themeService.getActiveTheme();
    if (active.name === 'light') {
      localStorage.setItem('selectedTheme', 'dark');
      this.themeService.setTheme('dark');
      this.isDarkTheme = true;
    } else {
      localStorage.setItem('selectedTheme', 'light');
      this.themeService.setTheme('light');
      this.isDarkTheme = false;
    }
  }
}

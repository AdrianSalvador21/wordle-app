import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { SEOService } from './core/providers/seo.service';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wordleChallenge';

  constructor(public translateService: TranslateService, private store: Store<any>, private seoService: SEOService, private router: Router) {
  }

  ngOnInit(): void {
    this.updateMetadata();
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');
    this.translateService.setTranslation('es', '../assets/i18n/es.json');

    this.store.select('appReducer').subscribe(state => {
      this.translateService.use(state.language);
    });
  }

  updateMetadata() {
    this.router.events
      .pipe(
        filter((eventa: any) => eventa instanceof ActivationEnd),
        filter((eventb: ActivationEnd) => eventb.snapshot.firstChild === null),
        map((eventc: ActivationEnd) => eventc.snapshot.data)
      )
      .subscribe((event: any) => {
        this.seoService.updateTitle(event.title);
        this.seoService.updateDescription(event.description);
        this.seoService.updateKeywords(event.keywords);
        this.seoService.updateOgUrl();
      });
  }
}

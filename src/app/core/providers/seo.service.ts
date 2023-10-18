import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class SEOService {
  constructor(
    private title: Title, private meta: Meta,
    @Inject(DOCUMENT) private dom: any
  ) { }

  createCanonicalURL() {
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', this.dom.URL);
  }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }


  updateOgUrl() {
    const ogURL = document.querySelector('meta[property="og:url"]') as any;
    ogURL.setAttribute('content', this.dom.URL);
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
  }

  updateKeywords(keywords: string) {
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }
}
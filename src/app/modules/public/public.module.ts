import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { InputGridComponent } from './components/input-grid/input-grid.component';

@NgModule({
  declarations: [HomePageComponent, InputGridComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: HomePageComponent,
        data: {
          title: 'Wordle | Home',
          description: 'Wordle game'
        },
      },
    ]),
    TranslateModule,
  ],
  exports: [InputGridComponent],
  providers: [],
})
export class PublicModule { }

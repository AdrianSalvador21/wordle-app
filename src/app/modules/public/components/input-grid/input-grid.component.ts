import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setGame, setVictory } from 'src/app/core/actions/statistics.actions';
import { setWord } from 'src/app/core/actions/words.actions';

declare const window: any;

@Component({
  selector: 'app-input-grid',
  templateUrl: './input-grid.component.html',
  styleUrls: ['./input-grid.component.scss']
})
export class InputGridComponent implements OnInit {
  @ViewChildren('row') row: QueryList<any> | undefined;

  @Input() selectedWord = '';
  public actualInput: any;
  public actualId: any = 'code1-0';

  public userWords = [
    { word: '' },
    { word: '' },
    { word: '' },
    { word: '' },
    { word: '' },
  ];

  constructor(
    public router: Router, private store: Store<any>) {
  }

  ngOnInit() {
    this.setTimer();
  }

  processInput(event: any, input: number, rowNumber: number) {
    const statisticsModal: any = new window.bootstrap.Modal(document.getElementById('statisticsModal'));
    const inputRegex = new RegExp(/^[a-zA-z]$/);
    this.actualInput = document.getElementById(`code${input}-${rowNumber}`);

    if (this.actualInput.readOnly) {
      return;
    }

    this.actualId = this.actualInput.id;
    if (!inputRegex.test(event.key)) {
      this.actualInput.value = '';
      return;
    }

    this.userWords[rowNumber].word = this.userWords[rowNumber].word.concat(event.key);
    let next_input: any = document.getElementById(`code${input + 1}-${rowNumber}`);

    if (input >= 5) {
      next_input = document.getElementById(`code1-${rowNumber + 1}`);

      if (this.userWords[rowNumber].word.toUpperCase() === this.selectedWord.toUpperCase()) {
        next_input = document.getElementById(`code1-0`);
        this.actualId = next_input.id;
        this.store.dispatch(setVictory(null));
        this.store.dispatch(setGame(null));
        this.resetValues();

        statisticsModal.show();
        return;
      } else {
        if (rowNumber >= 4) {
          next_input = document.getElementById(`code1-0`);
          this.actualId = next_input.id;
          this.store.dispatch(setGame(null));
          statisticsModal.show();
          this.resetValues();
          return;
        }
      }
    } else {
      next_input = document.getElementById(`code${input + 1}-${rowNumber}`);
    }

    this.actualId = next_input.id;
    next_input?.focus();
  }

  resetValues() {
    const next_input:any = document.getElementById(`code1-0`);
    this.actualId = next_input.id;
    let inputs = document.getElementsByTagName('input');
    for (var ii = 0; ii < inputs.length; ii++) {
      if (inputs[ii].type == 'text') {
        inputs[ii].value = '';
        inputs[ii].className = 'main-game__input';
      }
    }

    this.userWords = [
      { word: '' },
      { word: '' },
      { word: '' },
      { word: '' },
      { word: '' },
    ];
  }

  processValid(input: number, rowNumber: number) {
    const selectedRow = this.userWords[rowNumber];
    const letter = selectedRow.word[input];
    if (!!letter && letter.toUpperCase() === this.selectedWord[input].toUpperCase()) {
      return true;
    }

    return false;
  }

  processWarning(input: number, rowNumber: number) {
    const selectedRow = this.userWords[rowNumber];
    const letter = selectedRow.word[input];
    if (!!letter && this.selectedWord.toUpperCase().includes(letter.toUpperCase())) {
      return true;
    }

    return false;
  }

  processInvalid(input: number, rowNumber: number) {
    const selectedRow = this.userWords[rowNumber];
    const letter = selectedRow.word[input];
    if (!!letter && !this.selectedWord.toUpperCase().includes(letter.toUpperCase())) {
      return true;
    }

    return false;
  }

  goToCharacters() {
    this.router.navigate(['/characters'])
  }

  isSelected(input: number, rowNumber: number) {
    return `code${input}-${rowNumber}` === this.actualId;
  }

  setTimer() {
    setInterval(() => {
      let d: any = new Date();
      let seconds: any = d.getMinutes() * 60 + d.getSeconds(); //convet 00:00 to seconds for easier caculation
      let fiveMin: any = 60 * 5; //five minutes is 300 seconds!
      let timeleft: any = fiveMin - seconds % fiveMin; // let's say 01:30, then current seconds is 90, 90%300 = 90, then 300-90 = 210. That's the time left!
      let result: any = parseInt(String(timeleft / 60)) + ':' + timeleft % 60; //formart seconds into 00:00 
      const test: any = document.getElementById('timer');

      if (test === 0) {
        this.resetValues();
        this.store.dispatch(setWord(null));
      }

      test.innerHTML = result
    }, 500)
  }
}

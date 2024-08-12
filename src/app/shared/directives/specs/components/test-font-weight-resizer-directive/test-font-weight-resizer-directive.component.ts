import { Component } from '@angular/core';
import { FontWeightResizer } from '../../../fontWeightResizer.directive';

@Component({
  standalone: true,
  imports: [FontWeightResizer],
  template:`<h2 fontWeightResizer="bold" >Test Directive</h2>`
})
export class TestFontWeightResizerDirectiveComponent {}

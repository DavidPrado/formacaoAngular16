import { FontWeightResizer } from './../../../fontWeightResizer.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestFontWeightResizerDirectiveComponent } from './test-font-weight-resizer-directive.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TestFontWeightResizerDirectiveComponent', () => {
  let component: TestFontWeightResizerDirectiveComponent;
  let fixture: ComponentFixture<TestFontWeightResizerDirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestFontWeightResizerDirectiveComponent, FontWeightResizer],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(TestFontWeightResizerDirectiveComponent);
    fixture.detectChanges();
  });

  it('should font-weight to be bold', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const fontWeight = h2.style.fontWeight;

    expect(fontWeight).toEqual('bold');
  });
});

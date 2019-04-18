import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlCodeComponent } from './html-code.component';

describe('HtmlCodeComponent', () => {
  let component: HtmlCodeComponent;
  let fixture: ComponentFixture<HtmlCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

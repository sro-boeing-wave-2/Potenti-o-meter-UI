import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionmcqComponent } from './questionmcq.component';

describe('QuestionmcqComponent', () => {
  let component: QuestionmcqComponent;
  let fixture: ComponentFixture<QuestionmcqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionmcqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionmcqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

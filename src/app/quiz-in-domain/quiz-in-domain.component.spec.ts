import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInDomainComponent } from './quiz-in-domain.component';

describe('QuizInDomainComponent', () => {
  let component: QuizInDomainComponent;
  let fixture: ComponentFixture<QuizInDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizInDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizInDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

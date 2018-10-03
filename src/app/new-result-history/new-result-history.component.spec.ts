import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResultHistoryComponent } from './new-result-history.component';

describe('NewResultHistoryComponent', () => {
  let component: NewResultHistoryComponent;
  let fixture: ComponentFixture<NewResultHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewResultHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewResultHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

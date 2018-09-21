import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultdomainComponent } from './resultdomain.component';

describe('ResultdomainComponent', () => {
  let component: ResultdomainComponent;
  let fixture: ComponentFixture<ResultdomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultdomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultdomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

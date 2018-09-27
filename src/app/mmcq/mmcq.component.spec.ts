import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmcqComponent } from './mmcq.component';

describe('MmcqComponent', () => {
  let component: MmcqComponent;
  let fixture: ComponentFixture<MmcqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmcqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmcqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

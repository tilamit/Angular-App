import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComDetailsComponent } from './com-details.component';

describe('ComDetailsComponent', () => {
  let component: ComDetailsComponent;
  let fixture: ComponentFixture<ComDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

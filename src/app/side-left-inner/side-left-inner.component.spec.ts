import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideLeftInnerComponent } from './side-left-inner.component';

describe('SideLeftInnerComponent', () => {
  let component: SideLeftInnerComponent;
  let fixture: ComponentFixture<SideLeftInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideLeftInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideLeftInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

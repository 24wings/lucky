import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberQueryComponent } from './member-query.component';

describe('MemberQueryComponent', () => {
  let component: MemberQueryComponent;
  let fixture: ComponentFixture<MemberQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

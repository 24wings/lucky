import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagePageComponent } from './user-manage-page.component';

describe('UserManagePageComponent', () => {
  let component: UserManagePageComponent;
  let fixture: ComponentFixture<UserManagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

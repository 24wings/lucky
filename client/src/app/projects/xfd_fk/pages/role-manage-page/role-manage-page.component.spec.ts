import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagePageComponent } from './role-manage-page.component';

describe('RoleManagePageComponent', () => {
  let component: RoleManagePageComponent;
  let fixture: ComponentFixture<RoleManagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

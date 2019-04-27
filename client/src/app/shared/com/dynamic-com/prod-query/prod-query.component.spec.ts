import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdQueryComponent } from './prod-query.component';

describe('ProdQueryComponent', () => {
  let component: ProdQueryComponent;
  let fixture: ComponentFixture<ProdQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

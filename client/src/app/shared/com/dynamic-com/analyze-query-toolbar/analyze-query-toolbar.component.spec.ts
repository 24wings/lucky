import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeQueryToolbarComponent } from './analyze-query-toolbar.component';

describe('AnalyzeQueryToolbarComponent', () => {
  let component: AnalyzeQueryToolbarComponent;
  let fixture: ComponentFixture<AnalyzeQueryToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeQueryToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeQueryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

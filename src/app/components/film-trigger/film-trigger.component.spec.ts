import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmTriggerComponent } from './film-trigger.component';

describe('FilmTriggerComponent', () => {
  let component: FilmTriggerComponent;
  let fixture: ComponentFixture<FilmTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

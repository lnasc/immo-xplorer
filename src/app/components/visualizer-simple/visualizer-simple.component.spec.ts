import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizerSimpleComponent } from './visualizer-simple.component';

describe('VisualizerSimpleComponent', () => {
  let component: VisualizerSimpleComponent;
  let fixture: ComponentFixture<VisualizerSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizerSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizerSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

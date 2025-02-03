import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElaspedTimeComponent } from './elasped-time.component';

describe('ElaspedTimeComponent', () => {
  let component: ElaspedTimeComponent;
  let fixture: ComponentFixture<ElaspedTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElaspedTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElaspedTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

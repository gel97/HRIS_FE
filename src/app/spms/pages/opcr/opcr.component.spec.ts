import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcrComponent } from './opcr.component';

describe('OpcrComponent', () => {
  let component: OpcrComponent;
  let fixture: ComponentFixture<OpcrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpcrComponent]
    });
    fixture = TestBed.createComponent(OpcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

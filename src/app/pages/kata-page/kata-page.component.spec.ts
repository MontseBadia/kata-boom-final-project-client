import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KataPageComponent } from './kata-page.component';

describe('KataPageComponent', () => {
  let component: KataPageComponent;
  let fixture: ComponentFixture<KataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAutomationComponent } from './setting-automation.component';

describe('SettingAutomationComponent', () => {
  let component: SettingAutomationComponent;
  let fixture: ComponentFixture<SettingAutomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAutomationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

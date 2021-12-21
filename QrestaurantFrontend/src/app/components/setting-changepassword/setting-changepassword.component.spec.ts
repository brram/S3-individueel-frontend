import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingChangepasswordComponent } from './setting-changepassword.component';

describe('SettingChangepasswordComponent', () => {
  let component: SettingChangepasswordComponent;
  let fixture: ComponentFixture<SettingChangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingChangepasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

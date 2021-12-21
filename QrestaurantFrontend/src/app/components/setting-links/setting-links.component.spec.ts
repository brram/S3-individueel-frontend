import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingLinksComponent } from './setting-links.component';

describe('SettingLinksComponent', () => {
  let component: SettingLinksComponent;
  let fixture: ComponentFixture<SettingLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

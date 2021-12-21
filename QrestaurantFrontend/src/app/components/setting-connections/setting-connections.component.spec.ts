import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingConnectionsComponent } from './setting-connections.component';

describe('SettingConnectionsComponent', () => {
  let component: SettingConnectionsComponent;
  let fixture: ComponentFixture<SettingConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingConnectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

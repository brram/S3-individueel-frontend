import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Location} from '@angular/common';
import { LoginsService } from 'src/app/services/logins.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  showGeneral = false;
  showChangePassword = false;
  showAccountInfo = false;
  showSocialLinks = false;
  showConnections = false;
  showNotifications = false;
  showAutomation = false;
  id : any;

  constructor(private location: Location, private route: ActivatedRoute, private router: Router, private loginsService: LoginsService) { }

  ngOnInit(): void {
    this.loginsService.validate().subscribe();

    this.id = window.location.pathname.split('/')[2];
    if(this.id == "notifications"){this.showNotifications = true;}
    else if(this.id == "automation"){this.showAutomation = true;}
    else{this.showGeneral = true;}
  }

  makeFalse(){
    this.showGeneral = false;
    this.showChangePassword = false;
    this.showAccountInfo = false;
    this.showSocialLinks = false;
    this.showConnections = false;
    this.showNotifications = false;
    this.showAutomation = false;
  }

  cancel(){
    this.router.navigate(['/dashboard']);  
  }
}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  loggedIn: any = false;

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  signOut(){
    localStorage.removeItem('JWT');
    this.toastr["success"]("Successfully logged out", "", {
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    });
  }

  open(){
    this.loggedIn = localStorage.getItem('JWT');
  }
}

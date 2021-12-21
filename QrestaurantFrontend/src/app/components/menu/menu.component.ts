import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuDish } from 'src/app/model/menudish';
import { MenusService } from 'src/app/services/menus.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menudishs$ : MenuDish[] = [];
  menudish : MenuDish = new MenuDish();
  baseUrl : string = environment.baseUrl;

  constructor(private menusService: MenusService, private toastr: ToastrService, private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.get();
    this.statisticsService.startConnection().then(data =>{this.errorToast("Could not establish connection with orderserver")});
  }

  get() {
    this.menusService.get().subscribe(data =>{this.menudishs$ = data; this.changeImagePath();},err =>{this.errorToast("Something went wrong getting the data")});

  }

  changeImagePath(){
    this.menudishs$.forEach(element => {
    element.images.forEach(image => {
      if(image.url != ""){
      image.url = this.baseUrl + image.url;
    }
    else{
      image.url = "";
    }
    });

    element.ingredients.forEach(ingredient => {
      if(ingredient.ingredient.image != ""){
        ingredient.ingredient.image = this.baseUrl + ingredient.ingredient.image;
    }
    else{
      ingredient.ingredient.image = "";
    }
    });
  });
  }


  getById(rnd: string){
      this.menudishs$.forEach(element => {
      if(element.rnd == rnd){
        const index = this.menudishs$.indexOf(element);
        this.menudish = this.menudishs$[index];
      }
      });
  }

  errorToast(message: string){
    this.toastr["error"](message, "", {
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    });
  }

  placeOrder(){
    this.statisticsService.post(1);
  }
}

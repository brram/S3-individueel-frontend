import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { Ingredient } from 'src/app/model/ingredient';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import Cropper from 'cropperjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  ingredients$ : Ingredient[] = [];
  formValue!: FormGroup;
  formValue2!: FormGroup;
  ingredient : Ingredient = new Ingredient();
  base64: string = "";
  imageUrl: string = "";
  baseUrl: string = environment.baseUrl;
  cropper!: Cropper;
  cropper2!: Cropper;
  loadedEverything = false;

  constructor(private ingredientsService: IngredientsService, private formbuilder: FormBuilder, private domSanitizer: DomSanitizer, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.get();

    this.formValue = this.formbuilder.group({
       name : [''],
       calories : [0],
       image : ['']
    });

    this.formValue2 = this.formbuilder.group({
      name2 : [''],
      calories2 : [0],
      image2 : ['']
   });
   this.cropImage();
   this.cropImage2();
  }

  get() {
    this.loadedEverything = false;
    this.ingredientsService.get().subscribe(data =>
      {this.ingredients$ = data.slice(0, 6);}
      ,err =>{this.errorToast("Something went wrong getting the data")});
  }

  getById(id: number) {
    this.ingredient.ingredientId = id;
    this.ingredientsService.getById(id).subscribe(data =>{
      this.formValue2.controls['name2'].setValue(data.name);
      this.formValue2.controls['calories2'].setValue(data.calories);
      if(data.image != ""){
        this.imageUrl = this.baseUrl + data.image;
        const toDataURL = fetch(this.imageUrl)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            this.base64 = reader.result as string;
          }
        }))
      }
      else{
        this.imageUrl = "";
      }
    },
    error=>{
      this.errorToast("Something went wrong getting the data");
  });
  }

  post() {
    this.ingredient.name = this.formValue.value.name;
    this.ingredient.calories = this.formValue.value.calories;
    this.ingredient.image = this.base64;

    this.ingredientsService.post(this.ingredient).subscribe(data=>{
      let ref = document.getElementById('cancel');
      ref?.click();
      this.get();
      this.formValue.controls['name'].setValue('');
      this.formValue.controls['calories'].setValue(0);
      this.formValue.controls['image'].setValue('');
      this.base64 = "";
      this.cropper.replace(" ");
      this.successToast("Successfully posted the data");
    },
    error=>{
      this.errorToast("Something went wrong posting the data");
    });
  }

  put() {
    this.ingredient.name = this.formValue2.value.name2;
    this.ingredient.calories = this.formValue2.value.calories2;
    this.ingredient.image = this.base64;

    this.ingredientsService.put(this.ingredient).subscribe(data=>{
      let ref = document.getElementById('cancel2');
      ref?.click();
      this.get();
      this.base64 = "";
      this.formValue2.controls['image2'].setValue('');
      this.cropper2.replace(" ");
      this.successToast("Successfully updated the data");
    },
    error=>{
      this.errorToast("Something went wrong updating the data");
    });
  }

  delete(id: number) {
    this.ingredientsService.delete(id).subscribe(data=>{
      this.get();
      this.successToast("Successfully deleted the data");
    },
    error=>{
      if(error?.status == 500){
        this.errorToast("Could not delete. Ingredient is still used on menu.");
      }
      else{
        this.errorToast("Something went wrong deleting the data");
      }
    });
  }

  convertToBase64(event: any){
    if (event.target.files?.length == 0) return;
    const fileSelected = (event.target.files as FileList)[0];
    const imageUrl = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileSelected)) as string;
    let reader = new FileReader();
    reader.readAsDataURL(fileSelected as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
      const image = document.getElementById('image') as HTMLImageElement;
      image.src = this.base64;
      this.cropper.replace(this.base64);
    }

  }

  convertToBase642(event: any){
    this.imageUrl = "";
    if (event.target.files?.length == 0) return;
    const fileSelected = (event.target.files as FileList)[0];
    const imageUrl = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileSelected)) as string;
    let reader = new FileReader();
    reader.readAsDataURL(fileSelected as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
      const image = document.getElementById('image2') as HTMLImageElement;
      image.src = this.base64;
      this.cropper2.replace(this.base64);
    }

  }

  cropImage(){
    const image = document.getElementById('image') as HTMLImageElement;
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      zoomable: false,
      scalable: false,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.base64 = canvas.toDataURL("image/png");
    }
    });
  }

  cropImage2(){
    const image = document.getElementById('image2') as HTMLImageElement;
    this.cropper2 = new Cropper(image, {
      aspectRatio: 1,
      zoomable: false,
      scalable: false,
      crop: () => {
        const canvas = this.cropper2.getCroppedCanvas();
        this.base64 = canvas.toDataURL("image/png");
    }
    });
  }

  onScroll() {
    this.spinner.show();
    setTimeout(() => {
      this.loadNextPost();
    }, 500);
    }

    // load th next 6 posts
  loadNextPost() {
    this.ingredientsService.get()
    .subscribe( (data: any) => {
      this.spinner.hide();
      if(data.length == this.ingredients$?.length){
        this.loadedEverything = true;
      }
      else{
        this.ingredients$?.push(data[this.ingredients$.length]);
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

  successToast(message: string){
    this.toastr["success"](message, "", {
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    });
  }
}

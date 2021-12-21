import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish } from 'src/app/model/dish';
import { Image } from 'src/app/model/image';
import { DishsService } from 'src/app/services/dishs.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import Cropper from 'cropperjs';
import { Ingredient } from 'src/app/model/ingredient';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  dishs$ : Dish[] | undefined;
  formValue!: FormGroup;
  formValue2!: FormGroup;
  dish : Dish = new Dish();
  image : Image = new Image();
  cropper!: Cropper;
  cropper2!: Cropper;
  ingredients$ : Ingredient[] | undefined;
  ingredientSelect : number[] = [1];
  ingredientSelect2 : number[] = [];
  images! : Image[];
  baseUrl: string = environment.baseUrl;
  ingredientsCounter!: number[];

  constructor(private dishsService: DishsService, private formbuilder: FormBuilder, private domSanitizer: DomSanitizer, private ingredientsService: IngredientsService, private renderer: Renderer2, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.get();
    this.getIngredients();
    this.formValue = this.formbuilder.group({
       name : [''],
       description : [''],
       allergies : [''],
       price : [15.99],
       ingredients : [''],
       gram : ['250']
    });

    this.formValue2 = this.formbuilder.group({
      name2 : [''],
      description2 : [''],
      allergies2 : [''],
      price2 : [],
      ingredients2 : [''],
      gram2 : [250]
    });
   this.cropImage();
   this.cropImage2();
   this.dish.images = [];
   this.dish.ingredients = [];
   this.images = [];
  }

  get() {
    this.dishsService.get().subscribe(data =>{this.dishs$ = data},err =>{this.errorToast("Something went wrong getting the data")});
  }

  getById(id: number) {
    this.dish.id = id;
    this.dishsService.getById(id).subscribe(data =>{
      this.formValue2.controls['name2'].setValue(data.name);
      this.formValue2.controls['description2'].setValue(data.description);
      this.formValue2.controls['allergies2'].setValue(data.allergies);
      this.formValue2.controls['price2'].setValue(data.price);
      this.images = data.images;
      this.images.forEach(element => {
        element.url = this.baseUrl + element.url;
        const toDataURL = fetch(element.url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            element.url = reader.result as string;
          }
        }))
      });
      this.ingredientSelect2 = [];
      this.ingredientsCounter = [];

      const selectContainer = document.getElementById("ingredientSelectContainer") as HTMLDivElement;
        const inputContainer = document.getElementById("ingredientInputContainer") as HTMLDivElement;
        selectContainer.innerHTML = "";
        inputContainer.innerHTML = "";
        let i = 0;

      data.ingredients.forEach(element => {
        this.addToIngredientCounter();
        i++;

        const select: HTMLSelectElement = this.renderer.createElement('select');
        select.className = "form-select";
        select.id = "ingredientSelect" + i;
        this.ingredients$?.forEach(element2 => {
          const option: HTMLOptionElement = this.renderer.createElement('option');
          option.value = element2.ingredientId.toString();
          option.text = element2.name;
          this.renderer.appendChild(select, option);
        });

        const input: HTMLInputElement = this.renderer.createElement('input');
        input.type = "number";
        input.id = "ingredientInput" + i;
        input.className = "form-control";

        select.value = element.ingredient.ingredientId.toString();
        input.value = element.amount.toString();

        this.renderer.appendChild(selectContainer, select);
        this.renderer.appendChild(inputContainer, input);
      });
    },
    error=>{
      this.errorToast("Something went wrong getting the data");
  });
  }

  post() {
    this.dish.name = this.formValue.value.name;
    this.dish.description = this.formValue.value.description;
    this.dish.allergies = this.formValue.value.allergies;
    this.dish.price = this.formValue.value.price;
    this.getIngredientIds();

    this.dishsService.post(this.dish).subscribe(data=>{
      let ref = document.getElementById('cancel');
      ref?.click();
      this.get();
      this.formValue.controls['name'].setValue('');
      this.formValue.controls['description'].setValue('');
      this.formValue.controls['allergies'].setValue('');
      this.formValue.controls['price'].setValue(15.99);
      this.formValue.controls['ingredients'].setValue('');
      this.formValue.controls['gram'].setValue('250');
      this.ingredientSelect = [1];
      this.dish.images = [];
      this.dish.ingredients = [];
      this.successToast("Successfully posted the data");
    },
    error=>{
      this.errorToast("Something went wrong posting the data");
    });
  }

  put() {
    this.dish.name = this.formValue2.value.name2;
    this.dish.description = this.formValue2.value.description2;
    this.dish.allergies = this.formValue2.value.allergies2;
    this.dish.price = this.formValue2.value.price2;
    this.dish.images = this.images;
    this.getIngredientIds2();
    console.log(this.ingredientsCounter);

    this.dishsService.put(this.dish).subscribe(data=>{
      let ref = document.getElementById('cancel2');
      ref?.click();
      this.get();
      this.dish.ingredients = [];
      this.successToast("Successfully updated the data");
    },
    error=>{
      this.errorToast("Something went wrong updating the data");
    });
  }

  delete(id: number) {
    this.dishsService.delete(id).subscribe(data=>{
      this.get();
      this.successToast("Successfully deleted the data");
    },
    error=>{
      this.errorToast("Something went wrong deleting the data");
    });
  }

  convertToBase64(event: any){
    if (event.target.files?.length == 0) return;
    const fileSelected = (event.target.files as FileList)[0];
    const imageUrl = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileSelected)) as string;
    let reader = new FileReader();
    reader.readAsDataURL(fileSelected as Blob);
    reader.onloadend = () => {
      this.cropper.replace(reader.result as string);
    }
  }

  cropImage(){
    const image = document.getElementById('image') as HTMLImageElement;
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      zoomable: false,
      scalable: false,
      crop: () => {


      }
    });
  }

  cropImage2(){
    const image2 = document.getElementById('image2') as HTMLImageElement;
    this.cropper2 = new Cropper(image2, {
      aspectRatio: 1,
      zoomable: false,
      scalable: false,
      crop: () => {


      }
    });
  }

  crop(){
    let spot = 1;
    if(this.dish.images.length > 0){
      spot = Math.max.apply(Math, this.dish.images.map(function(o) { return o.imageId; })) + 1;
    }
    const canvas = this.cropper.getCroppedCanvas();
    this.dish.images.push( this.image = {
      url: canvas.toDataURL("image/png"),
      imageId: 0,
      spot: spot
    });
    this.cropper.replace(" ");
  }

  crop2(){
    let spot = 1;
    if(this.dish.images.length > 0){
      spot = Math.max.apply(Math, this.dish.images.map(function(o) { return o.imageId; })) + 1;
    }
    const canvas = this.cropper2.getCroppedCanvas();
    this.images.push( this.image = {
      url: canvas.toDataURL("image/png"),
      imageId: 0,
      spot: spot
    });
    this.cropper2.replace(" ");
  }

  getIngredients(){
    this.ingredientsService.get().subscribe(data =>{this.ingredients$ = data},err =>{});
  }

  addToIngredientSelect(){
    const number = Math.max(...this.ingredientSelect) + 1;
    this.ingredientSelect.push(number);
  }

  addToIngredientSelect2(){
    let number = 1;
    if(this.ingredientSelect2.length > 0){number = Math.max(...this.ingredientSelect2) + 1;}
    this.ingredientSelect2.push(number);
  }

  addToIngredientCounter(){
    let number = 1;
    if(this.ingredientsCounter.length > 0){number = Math.max(...this.ingredientsCounter) + 1;}
    this.ingredientsCounter.push(number);
  }

  getIngredientIds(){
    this.ingredientSelect.forEach(element => {
      const select = document.getElementById("ingredient" + element) as HTMLSelectElement;
      if(!select.value){return}
      const gram = document.getElementById("gram" + element) as HTMLInputElement;

      const ingredient : Ingredient = {
        ingredientId: parseInt(select.value),
        name: "",
        image: "",
        calories: 0,
        euroPerKilogram: 0,
        amountInStock: 0
      };

      this.dish.ingredients.push({ingredient: ingredient, amount: gram.valueAsNumber});
    });
  }

  getIngredientIds2(){
    this.ingredientSelect2.forEach(element => {
      const select = document.getElementById("2ingredient" + element) as HTMLSelectElement;
      if(!select.value){return}
      const gram = document.getElementById("2gram" + element) as HTMLInputElement;

      const ingredient : Ingredient = {
        ingredientId: parseInt(select.value),
        name: "",
        image: "",
        calories: 0,
        euroPerKilogram: 0,
        amountInStock: 0
      };

      this.dish.ingredients.push({ingredient: ingredient, amount: gram.valueAsNumber});
    });

    this.ingredientsCounter.forEach(element => {
      const select = document.getElementById("ingredientSelect" + element) as HTMLSelectElement;
      const gram = document.getElementById("ingredientInput" + element) as HTMLInputElement;

      const ingredient : Ingredient = {
        ingredientId: parseInt(select.value),
        name: "",
        image: "",
        calories: 0,
        euroPerKilogram: 0,
        amountInStock: 0
      };

      this.dish.ingredients.push({ingredient: ingredient, amount: gram.valueAsNumber});
    });
  }

  convertToBase642(event: any){
    if (event.target.files?.length == 0) return;
    const fileSelected = (event.target.files as FileList)[0];
    const imageUrl = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileSelected)) as string;
    let reader = new FileReader();
    reader.readAsDataURL(fileSelected as Blob);
    reader.onloadend = () => {
      this.cropper2.replace(reader.result as string);
    }
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

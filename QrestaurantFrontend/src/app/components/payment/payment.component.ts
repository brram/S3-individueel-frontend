import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { ToastrService } from 'ngx-toastr';
import { MenuDish } from 'src/app/model/menudish';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input() menuDish!: MenuDish;

  constructor(private toastr: ToastrService) {
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.renderPaymentButtons();
  }

  renderPaymentButtons(){
    document.getElementById("myPaypalButtons")!.innerHTML = '';
    render(
      {
        id: "#myPaypalButtons",
        currency: "USD",
        value: this.menuDish.price.toString(),
        onApprove: (details) => {
          this.transActionSuccessful();
        }
      }
    );
  }

  transActionSuccessful(){
    // api call
    this.successToast("Transaction successfull");
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

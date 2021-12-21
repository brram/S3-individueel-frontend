import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { LoginsService } from 'src/app/services/logins.service';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  doughnutChart: any = [];
  lineChart: any = [];
  sales: number = 0;

  constructor(private loginsService: LoginsService, private statisticsService: StatisticsService, private toastr: ToastrService) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.loginsService.validate().subscribe();

    this.statisticsService.startConnection().then(data =>{this.errorToast("Could not get real-time data")});
    this.getSales();

    this.createDoughnutGraph();
    this.createLineGraph();
  }

  getSales(){
    this.statisticsService.get().then(data => {
      this.sales = data;
      
      this.lineChart.destroy();
      this.createLineGraph();
      this.getSales();
    });
  }

  sendToServer(sale: number){
    this.statisticsService.post(sale);
  }

  errorToast(message: string){
    this.toastr["error"](message, "", {
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    });
  }

  getPreviousDate(days: number){
    var yesterday = new Date(new Date().getTime() - 24*60*60*1000*days);
    var yesterdayDate = yesterday.getDate()+'-'+(yesterday.getMonth()+1)+'-'+yesterday.getFullYear();
    return yesterdayDate;
  }

  createLineGraph(){
    const lineData = {
      labels: [this.getPreviousDate(3),this.getPreviousDate(2),"Yesterday","Today"],
      datasets: [
        {
          label: 'Sales',
          data: [50,26,38,this.sales],
          backgroundColor: "blue",
          borderColor: "white",
        }
      ]
    };

    this.lineChart = new Chart('canvas2', {
      type: 'line',
      data: lineData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            display: false,
          },
          title: {
            display: true,
            text: 'Total sales'
          }
        }
      }
    })
  }

  createDoughnutGraph(){
   const doughnutData = {
      labels: [1,1,1,1],
      datasets: [
        {
          label: 'Dataset 1',
          data: [1,1,1,1],
          backgroundColor: "green",
        }
      ]
    };

    this.doughnutChart = new Chart('canvas', {
      type: 'doughnut',
      data: doughnutData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            display: false,
          },
          title: {
            display: true,
            text: 'Overall inventory'
          }
        }
      }
    });
  }
}

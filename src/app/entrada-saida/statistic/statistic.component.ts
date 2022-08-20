import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-reducer';
import { EntradaSaida } from 'src/app/models/input-output.model';

import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
   entrada: number =0;
   saida: number =0;
   totalEntrada: number =0;
   totalSaida: number =0;
  constructor(private store: Store<AppState>) { }

  public doughnutChartLabels: string[] = [ 'Entrada', 'Saida' ];
  public doughnutChartData: any;

  ngOnInit(): void {
    this.store.select('entradasSaidas').subscribe(items => {
      if(items.entradasSaidas.length > 0){
        this.estatistica(items.entradasSaidas);
      }
    })
  }

  estatistica(items: EntradaSaida[]){
    this.entrada =0;
    this.saida =0;
    this.totalEntrada =0;
    this.totalSaida =0;
    for (const item of items) {
      if(item.type === 'entrada'){
        this.totalEntrada += item.amount;
        this.entrada++;
      }else{
        this.totalSaida += item.amount;
        this.saida++;
      }
    }
    this.doughnutChartDataFuncao(this.totalEntrada, this.totalSaida )
  }

  doughnutChartDataFuncao(totalEntrada: number, totalSaida: number){
  const doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ totalEntrada, totalSaida ] },

    ]
  };
  this.doughnutChartData = doughnutChartData;
}

}

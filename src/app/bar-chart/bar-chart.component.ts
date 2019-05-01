import { Component, OnInit } from "@angular/core";
import multiYearLaptopSales from "../../multiYearLaptopSales";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnInit {
  chartType = "bar";
  chartData = [];
  chartLabels = [];

  constructor() {}

  ngOnInit() {
    // multiYearLaptopSales : Transaction []

    //   [{
    //     "transactionDate": "Sun Feb 25 2018 19:41:51 GMT+0800 (Malaysia Time)",
    //     "monthSold": 1,
    //     "yearSold": 2018,
    //     "model": "latitude",
    //     "cost": 2500,
    //     "salesPrice": 6000
    // },]

    let monthlyProfits = {};
    // {
    //   month: {
    //     model: profit
    //   }
    // }
    for (let transaction of multiYearLaptopSales) {
      if (!monthlyProfits[transaction.monthSold]) {
        monthlyProfits[transaction.monthSold] = {};
      }
      if (!monthlyProfits[transaction.monthSold][transaction.model]) {
        monthlyProfits[transaction.monthSold][transaction.model] = 0;
      }
      const transactionProfit = transaction.salesPrice - transaction.cost;
      monthlyProfits[transaction.monthSold][
        transaction.model
      ] += transactionProfit;
    }

    let aggregateModelProfits = {};
    // {
    //   inspiron: [profits, profits, profits],
    //   xps: [profits, profits, profits],
    //   latitude: [profits, profits, profits]
    // }
    this.chartLabels = Object.keys(monthlyProfits);
    for (let month of Object.keys(monthlyProfits)) {
      for (let model in monthlyProfits[month]) {
        if (!aggregateModelProfits[model]) {
          aggregateModelProfits[model] = [];
        }
        aggregateModelProfits[model].push(monthlyProfits[month][model]);
      }
    }

    let dataset = [];

    for (let model in aggregateModelProfits) {
      dataset.push({
        data: aggregateModelProfits[model],
        label: model
      });
    }

    this.chartData = dataset;
  }
}

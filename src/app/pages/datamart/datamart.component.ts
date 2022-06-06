import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from "chart.js";
import DatalabelsPlugin from "chartjs-plugin-datalabels";
import { BaseChartDirective } from "ng2-charts";
import { MessageService } from "primeng/api";
import { Datamart } from "src/app/interfaces/Datamart";
import { DatamartService } from "src/app/service/datamart.service";

@Component({
  selector: "app-datamart",
  templateUrl: "./datamart.component.html",
  styleUrls: ["./datamart.component.scss"],
  providers: [MessageService],
})
export class DatamartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  data: Datamart[] = [];
  loading: boolean = true;

  public pieChartData: ChartData<"pie", number[], string | string[]>;
  // Pie
  public pieChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartType: ChartType = "pie";
  public pieChartPlugins = [DatalabelsPlugin];

  constructor(
    private datamartService: DatamartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getDatamart();
  }

  getDatamart() {
    let descripcion: string[] = [];
    let calificacion: number[] = [];
    this.datamartService.getDataDatamart().subscribe({
      next: (data) => {
        this.data = data;
        data.forEach((info) => {
          descripcion.push(info.nombre_servicio);
          calificacion.push(info.pon_calificacion);
        });
        this.pieChartData = {
          labels: descripcion,
          datasets: [{ data: calificacion }],
        };
        this.loading = false;
      },
      error: (error) => console.log("ERROR", error),
    });
  }

  sync() {
    this.datamartService.sycDatamart().subscribe({
      next: (response) => {
        if (response.message) {
          this.messageService.add({
            severity: "success",
            summary: response.message,
          });
          this.getDatamart();
        }
      },
      error: (error) => console.log(error),
    });
  }

  clear(table) {
    table.clear();
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}

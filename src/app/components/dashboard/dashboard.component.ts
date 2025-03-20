import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { ApiService } from 'src/app/base-setup/services/api-setup.service';
import { AppService } from 'src/app/base-setup/services/app.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle
};

interface Provider {
  title: string,
  value: string,
  bgColor: string,
  charts: any
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  headerTitle: string = "Dashboard"
  headerDeatils: Array<Provider> = [
    {
      title: 'No Of Assets',
      value: '20',
      bgColor: 'gray',
      charts: {}
    }, {
      title: 'Purchase Cost',
      value: '₹200000',
      bgColor: 'pink',
      charts: {}
    }, {
      title: 'Sales Cost',
      value: '₹250000',
      bgColor: 'yellow',
      charts: {}
    }, {
      title: 'Revenue',
      value: '₹50000',
      bgColor: 'green',
      charts: {}
    }
  ]
  showCharts: boolean;
  chartOptions: any = [];

  constructor(private router: Router, private appservice: AppService, public apiService: ApiService) {

  }

  ngOnInit() {
    this.appservice.updateHeader(this.headerTitle);
    this.setChartData();
    this.setheaderChart();
    this.showCharts = true;
  }
  setheaderChart() {
    this.headerDeatils[0].charts = {
      series: [{
        name: 'Assets',
        data: [30, 10, 30, 100, 50, 30, 10, 30, 200, 70, 30, 40, 300, 60, 50, 30, 10, 30, 100, 50]
      }],
      chart: {
        type: 'area',
        height: 100,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3,
      },
      yaxis: {
        min: 0
      },
      colors: ['#DCE6EC'],
      title: {
        text: '500',
        offsetX: 0,
        style: {
          fontSize: '24px',
        }
      },
      subtitle: {
        text: 'No of Assets',
        offsetX: 0,
        style: {
          fontSize: '14px',
        }
      }
    }
    this.headerDeatils[1].charts = {
      series: [{
        name: 'Rupees',
        data: [30, 10, 30, 100, 50, 70, 30, 40, 300, 30, 10, 30, 100, 50]
      }],
      chart: {
        type: 'area',
        height: 100,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3,
      },
      yaxis: {
        min: 0
      },
      colors: ['#DCE6EC'],
      title: {
        text: '$424,652',
        offsetX: 0,
        style: {
          fontSize: '24px',
        }
      },
      subtitle: {
        text: 'Investment',
        offsetX: 0,
        style: {
          fontSize: '14px',
        }
      }
    }
    this.headerDeatils[2].charts = {
      series: [{
        name: 'Rupees',
        data: [3000, 10, 30, 1000, 500, 70, 3000, 40, 3000, 30, 10, 3000, 100, 50]
      }],
      chart: {
        type: 'area',
        height: 100,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3,
      },
      yaxis: {
        min: 0
      },
      colors: ['#DCE6EC'],
      title: {
        text: '$524,652',
        offsetX: 0,
        style: {
          fontSize: '24px',
        }
      },
      subtitle: {
        text: 'Sales',
        offsetX: 0,
        style: {
          fontSize: '14px',
        }
      }
    }
    this.headerDeatils[3].charts = {
      series: [{
        name: 'Rupees',
        data: [300, 10, 200, 20, 3200, 300, 4000, 400, 300, 3000, 100, 3000, 500, 50]
      }],
      chart: {
        type: 'area',
        height: 100,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3
      },
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      yaxis: {
        min: 0
      },
      title: {
        text: '$135,965',
        offsetX: 0,
        style: {
          fontSize: '24px',
        }
      },
      subtitle: {
        text: 'Profits',
        offsetX: 0,
        style: {
          fontSize: '14px',
        }
      }
    }
  }
  setChartData() {
    //chart One with over all revenue percentage of each Asset
    this.chartOptions.push({
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Stock', 'Real Estate', 'Mutual Funds', 'Cash Investments', 'Alternative Investments'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    });
    //chart two invest, sales and revenue of each month
    this.chartOptions.push({
      series: [{
        name: 'Income',
        type: 'column',
        data: [1.4, 2, 2.5]
      }, {
        name: 'Cashflow',
        type: 'column',
        data: [1.1, 3, 3.1]
      }, {
        name: 'Revenue',
        type: 'line',
        data: [20, 29, 37]
      }],
      chart: {
        height: 250,
        width: 380,
        type: 'line',
        stacked: false,
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar'],
      },
      yaxis: [
        {
          seriesName: 'Income',
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB',
            }
          },
          title: {
            text: "Income (thousand crores)",
            style: {
              color: '#008FFB',
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: 'Cashflow',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396'
          },
          labels: {
            style: {
              colors: '#00E396',
            }
          },
        },
        {
          seriesName: 'Revenue',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              colors: '#FEB019',
            },
          },
          title: {
            text: "Revenue (thousand crores)",
            style: {
              color: '#FEB019',
            }
          }
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40
      }
    });
    //chart 3 no of items Sales vs purchase difference
    this.chartOptions.push({
      series: [
        {
          name: "Saled - 2025",
          data: [28, 29, 33]
        },
        {
          name: "Purchased - 2025",
          data: [12, 11, 14]
        }
      ],
      chart: {
        height: 250,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.5
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar'],
        title: {
          text: '2025'
        }
      },
      yaxis: {
        min: 5,
        max: 40
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    });
    //chart 4 revenue % pear asset for every month
    this.chartOptions.push({
      series: [{
      name: 'Stock',
      data: [44, 55, 41]
    }, {
      name: 'Real Estate',
      data: [53, 32, 33]
    }, {
      name: 'Mutual Funds',
      data: [12, 17, 11]
    }, {
      name: 'Cash Investments',
      data: [9, 7, 5]
    }, {
      name: 'Alternative Investments',
      data: [25, 12, 19]
    }],
      chart: {
      type: 'bar',
      height: 250,
      stacked: true,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: 'Revenue Per Asset'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar'],
      labels: {
        formatter: function (val: string) {
          return val + "K"
        }
      }
    },
    yaxis: {
      title: {
        text: undefined
      },
    },
    tooltip: {
      y: {
        formatter: function (val: string) {
          return val + "K"
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
    });
    //chart 5 sales % of every asset every month
    this.chartOptions.push({
      series: [{
      name: 'Stock',
      data: [44, 55, 41]
    }, {
      name: 'Real Estate',
      data: [13, 23, 20]
    }, {
      name: 'Mutual Fund',
      data: [11, 17, 15]
    }, {
      name: 'Cash Investment',
      data: [21, 7, 25]
    }, {
      name: 'ALternative Investment',
      data: [5, 2, 15]
    }],
      chart: {
      type: 'bar',
      height: 250,
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: 'end', // 'around', 'end'
        borderRadiusWhenStacked: 'last', // 'all', 'last'
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    xaxis: {
      type: 'month',
      categories: ['Jan', 'Feb', 'Mar'],
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
    });
    //chart 6 purchase vs sale
    this.chartOptions.push({
      series: [
      {
        data: [
          {
            x: 'Real Estate',
            y: [2800, 4500]
          },
          {
            x: 'Mutual Funds',
            y: [3200, 4100]
          },
          {
            x: 'Stock',
            y: [2950, 7800]
          },
          {
            x: 'Cash Investments',
            y: [3000, 4600]
          },
          {
            x: 'Alternative Investment',
            y: [3500, 4100]
          }
        ]
      }
    ],
      chart: {
      height: 250,
      type: 'rangeBar',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#EC7D31', '#36BDCB'],
    plotOptions: {
      bar: {
        horizontal: true,
        isDumbbell: true,
        dumbbellColors: [['#EC7D31', '#36BDCB']]
      }
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'top',
      horizontalAlign: 'left',
      customLegendItems: ['Purchase', 'Sale']
    },
    fill: {
      type: 'gradient',
      gradient: {
        gradientToColors: ['#36BDCB'],
        inverseColors: false,
        stops: [0, 100]
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    }
    });
  }
  backtoHome() {
    this.router.navigate(['/home'])
  }
}

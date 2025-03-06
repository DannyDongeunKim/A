import './style.css';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

$(document).ready(function() {

  loadPage('home.html');

  function loadPage(page) {
      const contentDiv = $('#content');

    $.get(page, function(data) {
          contentDiv.html(data);

      if (page === 'home.html') {
        initializeHomePage();
      }

      if(page === 'template_dashboard.html'){
        initializeTemplateDashboard();
      }

      if(page === 'automation_dashboard.html'){
        initializeAutomationDashboard();
      }

      if(page === 'renewal_report.html'){
        initializeRenewalReport();
      }

      if(page === 'info_report.html'){
        initializeInfoReport();
      }
    });
  }

    function initializeHomePage() {
        // Pie Chart
        var ctxPie = document.getElementById('pieChart').getContext('2d');
        var myPieChart = new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [{
                    data: [10, 20, 30],
                    backgroundColor: ['red', 'blue', 'yellow']
                }]
            },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          height: 100
        }
        });

        // Bar Graph
        var ctxBar = document.getElementById('barGraph').getContext('2d');
        var myBarGraph = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Sales',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
          responsive: true,
          maintainAspectRatio: false,
          height: 150
            }
        });

			    // Load header and sidebar
    $('#header-container').load('header.html');
    $('#sidebar').load('sidebar.html');
    }

  function initializeTemplateDashboard() {
    $('#myTable').DataTable({
      responsive: true,
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json"
      },
      "columnDefs": [
        { "orderable": false, "targets": 4 } // Disable sorting for the "Action" column
      ]
    });
  }

  function initializeAutomationDashboard() {
    $('#myTable').DataTable({
      responsive: true,
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json"
      },
      "columnDefs": [
        { "orderable": false, "targets": 7 } // Disable sorting for the "Action" column
      ]
    });

    initializeAutomationProcessTable();
  }

  function initializeAutomationProcessTable() {
    $('#automationProcessTable').DataTable({
      responsive: true,
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json"
      },
      "columnDefs": [
        { "orderable": false, "targets": 4 } // Disable sorting for the "Action" column
      ]
    });
  }

  function initializeRenewalReport() {
    $('#myTable').DataTable({
      responsive: true,
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json"
      },
      "columnDefs": [
        { "orderable": false, "targets": [10, 11] } // Disable sorting for the "Action" and "미리보기" columns
      ]
    });

    $('#companyTable').DataTable({
      responsive: true,
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json"
      },
      "columnDefs": [
        { "orderable": false, "targets": 10 } // Disable sorting for the "Action" column
      ]
    });

    $('#renewalItemTable').DataTable({
      responsive: true,
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json"
      }
    });

    $('#actionTable').DataTable({
      responsive: true,
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json"
      }
    });

    // Renewal Pie Chart
    var ctxRenewalPie = document.getElementById('renewalPieChart').getContext('2d');
    var myRenewalPieChart = new Chart(ctxRenewalPie, {
        type: 'pie',
        data: {
            labels: ['미진행', '성공', '거부', '오류'],
            datasets: [{
                data: [10, 80, 5, 5], // 임의의 값
                backgroundColor: ['lightgray', 'green', 'red', 'yellow']
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          width: 100,
          height: 100
        }
    });

      // Monthly Bar Graph
      var ctxMonthlyBar = document.getElementById('monthlyBarGraph').getContext('2d');
      var myMonthlyBarGraph = new Chart(ctxMonthlyBar, {
          type: 'bar',
          data: {
              labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
              datasets: [{
                  label: '대상건수',
                  data: [50, 60, 70, 80, 90, 100, 80, 90, 100, 70, 80, 90], // 임의의 값
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  borderColor: 'rgb(54, 162, 235)',
                  borderWidth: 1
              },
              {
                  label: '성공',
                  data: [40, 50, 60, 70, 80, 90, 70, 80, 90, 60, 70, 80], // 임의의 값
                  backgroundColor: 'rgba(75, 192, 192, 0.5)',
                  borderColor: 'rgb(75, 192, 192)',
                  borderWidth: 1
              },
              {
                  label: '재계약',
                  data: [30, 40, 50, 60, 70, 80, 60, 70, 80, 50, 60, 70], // 임의의 값
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  borderColor: 'rgb(255, 99, 132)',
                  borderWidth: 1
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  }

  function initializeInfoReport() {
    $('#myTable').DataTable({
      responsive: true,
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json"
      },
      "columnDefs": [
        { "orderable": false, "targets": [6, 7] } // Disable sorting for the "Action" and "미리보기" columns
      ]
    });

    $('#errorTable').DataTable({
      responsive: true,
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json"
      }
    });

    $('#actionTable').DataTable({
      responsive: true,
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json"
      }
    });
  }


    $(document).on('click', '#sidebar a', function(e) {
        e.preventDefault();
        var page = $(this).attr('href');
        loadPage(page);
    });

    // Load header and sidebar
    $('#header-container').load('header.html');
    $('#sidebar').load('sidebar.html');
});

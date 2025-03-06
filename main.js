import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css';
import './style.css';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-responsive';
import 'datatables.net-responsive-bs5';
import 'datatables.net-buttons';
import 'datatables.net-buttons-bs5';
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
                }
            }
        });
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

    $(document).on('click', '#sidebar a', function(e) {
        e.preventDefault();
        var page = $(this).attr('href');
        loadPage(page);
    });

    // Load header and sidebar
    $('#header-container').load('header.html');
    $('#sidebar').load('sidebar.html');
});

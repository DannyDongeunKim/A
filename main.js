import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'; // DataTables Bootstrap 5 CSS import
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css'; // DataTables Responsive Bootstrap 5 CSS import
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css'; // DataTables Buttons Bootstrap 5 CSS import
import './style.css'; // Custom CSS import
import $ from 'jquery'; // jQuery import
import 'datatables.net'; // DataTables import
import 'datatables.net-bs5'; // DataTables Bootstrap 5 integration import
import 'datatables.net-responsive'; // DataTables Responsive extension import
import 'datatables.net-responsive-bs5'; // DataTables Responsive Bootstrap 5 integration import
import 'datatables.net-buttons'; // DataTables Buttons extension import
import 'datatables.net-buttons-bs5'; // DataTables Buttons Bootstrap 5 integration import
import { Chart, registerables } from 'chart.js'; // Chart.js import and registerables registration

Chart.register(...registerables); // Chart.js registerables 등록 (Chart.js v3+ requires this)

$(document).ready(function() { // jQuery document ready function (DOM fully loaded)

  function loadPage(page) { // loadPage function definition (page: HTML page to load)
      const contentDiv = $('#content'); // Get content div element by ID

    $.get(page, function(data) { // jQuery AJAX GET request to fetch page content
          contentDiv.html(data); // Set fetched HTML data to content div

      if (page === 'home.html') { // Check if loaded page is home.html
        initializeHomePage(); // Initialize home page specific scripts
      }

      if(page === 'template_dashboard.html'){ // Check if loaded page is template_dashboard.html
        initializeTemplateDashboard(); // Initialize template dashboard specific scripts
      }

      // Load header and sidebar AFTER the main content is loaded
      $('#header-container').load('header.html', function() { // Load header.html into header-container div
        $('#sidebar').load('sidebar.html'); // Load sidebar.html into sidebar div after header is loaded
      });
    });
  }

    function initializeHomePage() { // initializeHomePage function definition (for home.html)
        // Pie Chart
        var ctxPie = document.getElementById('pieChart').getContext('2d'); // Get pie chart canvas context
        var myPieChart = new Chart(ctxPie, { // Create new Chart.js pie chart instance
            type: 'pie', // Chart type: pie
            data: { // Chart data configuration
                labels: ['Red', 'Blue', 'Yellow'], // Pie chart labels
                datasets: [{ // Datasets array
                    data: [10, 20, 30], // Data values for each slice
                    backgroundColor: ['red', 'blue', 'yellow'] // Background colors for each slice
                }]
            }
        });

        // Bar Graph
        var ctxBar = document.getElementById('barGraph').getContext('2d'); // Get bar graph canvas context
        var myBarGraph = new Chart(ctxBar, { // Create new Chart.js bar graph instance
            type: 'bar', // Chart type: bar
            data: { // Chart data configuration
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Bar graph labels (months)
                datasets: [{ // Datasets array
                    label: 'Sales', // Dataset label
                    data: [12, 19, 3, 5, 2, 3], // Data values for each bar (sales figures)
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar background color (RGBA with transparency)
                    borderColor: 'rgba(75, 192, 192, 1)', // Bar border color (RGBA)
                    borderWidth: 1 // Bar border width
                }]
            },
            options: { // Chart options configuration
                scales: { // Scales configuration
                    y: { // Y-axis configuration
                        beginAtZero: true // Start Y-axis from zero
                    }
                }
            }
        });
    }

  function initializeTemplateDashboard() { // initializeTemplateDashboard function definition (for template_dashboard.html)
    $('#myTable').DataTable({ // Initialize DataTable on table with ID 'myTable'
      responsive: true, // Enable responsive extension
      "language": { // Language settings
        "url": "//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json" // Korean language localization file URL
      },
      "columnDefs": [ // Column definitions
        { "orderable": false, "targets": 4 } // Disable sorting for the 5th column (index 4, Action column)
      ]
    });
  }

    $(document).on('click', '#sidebar a', function(e) { // jQuery event handler for click events on sidebar links
        e.preventDefault(); // Prevent default link behavior (page navigation)
        var page = $(this).attr('href'); // Get the href attribute value of the clicked link (page to load)
        loadPage(page); // Call loadPage function to load the selected page
    });

    loadPage('index.html'); // Initial page load: load home.html on document ready
});

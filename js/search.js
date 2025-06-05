// const city_ul = $("#cities_list")


var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))

var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl)
})


function generateString(shahar) {
    const lang = document.getElementById("locale").value;
    return '<li>' +
        `<a onclick="window.location.href='/${lang}/shahar/${shahar.link}';" class="btn btn-outline-success" >${shahar.name}</a>` +
        `<a class="badge bg-secondary" onclick="window.location.href='/${lang}/viloyat/${shahar.viloyat.link}';">${shahar.viloyat.name}</a>` +
        '</li>';
}

function escapeHtml(str) {
    var map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
    return str.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}

$("#city_search").on("keyup", () => {
    const city_ul = $("#cities_list")
    city_ul.html('')
    let val = escapeHtml($("#city_search").val()).toLowerCase();
    if (val.length > 0) {
        shahars.filter(shahar => {
            if (shahar.name.toLowerCase().indexOf(val) === 0) {
                city_ul.append(generateString(shahar))
            }
        })
    } else if (val.length === 0) {
        shahars.forEach(item =>
            city_ul.append(generateString(item))
        )
    }
})

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

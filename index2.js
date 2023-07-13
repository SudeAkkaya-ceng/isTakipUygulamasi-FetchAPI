getEmployeeList();
findProjectOrEmployee();

//API'dan çekilen veriler tabloya yerleştirilmeli.
function getEmployeeList(){
    const table = document.getElementById("dataTable");
    fetch("https://reqres.in/api/users?page=2")
    .then(response=>response.json())
    .then(data=>{
        
        for(user of data.data){
            table.innerHTML+=
            ` <tr>
            <td><button class="btn me-2" onclick="openInfoModal('${user.email}')"><i class="fa-solid fa-info"></i></button>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td class="text-warning">${user.avatar}</td>
            </tr>`
        }
    })
}

//İletişim bilgilerini içeren modal oluşturulur.
function openInfoModal(userMail) {
    var modalContent = `
        <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="infoModalLabel">İletişim Bilgileri</h5>
                    </div>
                    <div class="modal-body">
                        <div class="fw-bold">E-mail:<span class="ms-2 fw-normal">${userMail}</span></div>
                        <hr>
                        <div class="fw-bold">Telefon:<span class="ms-2 fw-normal">${userMail}</span></div>
                    </div>
                </div>
            </div>
        </div>
    `;
   // Önceki modalı kaldırma
   var previousModal = document.getElementById("infoModal");
   if (previousModal) {
       previousModal.remove();
   }

    document.body.insertAdjacentHTML("beforeend", modalContent);
    var modal = new bootstrap.Modal(document.getElementById("infoModal"));
    modal.show();
}

//Arama çubuğu ile çalışanlar ve projeler arasında filtreleme yapılır.
function findProjectOrEmployee(){
var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", searchTable);

    function searchTable() {
        var input = searchInput.value.toLowerCase();
        var table = document.getElementById("dataTable");
        var rows = table.getElementsByTagName("tr");

        for (var i = 1; i < rows.length; i++) {
            var employeeCell = rows[i].getElementsByTagName("td")[0];
            var projectCell = rows[i].getElementsByTagName("td")[1];

            var employeeContent = employeeCell.textContent || employeeCell.innerText;
            var projectContent = projectCell.textContent || projectCell.innerText;

            var employeeMatch = employeeContent.toLowerCase().startsWith(input);
            var projectMatch = projectContent.toLowerCase().startsWith(input);

            if (input === "") {
                rows[i].style.display = "";
            } else if (employeeMatch || projectMatch) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";   
            }
        }
    }
}
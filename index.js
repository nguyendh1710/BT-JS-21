// Danh sách staff
let staffs = [];

// Biến kiểm tra xem form đã được submit hay chưa
let isSubmitted = false;
// Gọi hàm init để khởi tạo danh sách sinh viên (nếu có) -------->lưu vào localstorage
init();

function init() {
  staffs = JSON.parse(localStorage.getItem("staffs")) || [];
  staffs = staffs.map((value) => {
    return new Staff(
      value.acc,
      value.name,
      value.email,
      value.password,
      value.dateOfWork,
      value.salary,
      value.position,
      value.hour,
      
    );
  });
  display(staffs);
}

function addStaff() {
  // B1 + B2: Gọi tới hàm validate để kiểm tra form và tạo đối tượng staff
  isSubmitted = true;
  let staff = validate();
  if (!staff) {
    return;
  }



  // B3: Thêm đối tượng staff vừa tạo vào danh sách
  staffs.push(staff);
  localStorage.setItem("staffs", JSON.stringify(staffs));

  // B4: Hiển thị danh sách staff ra giao diện
  display(staffs);

 
}


// Hàm nhận vào mảng students và hiển thị ra giao diện table
function display(staffs) {
  let html = staffs.reduce((result, value) => {
    return (
      result +
      `
        <tr>
          <td>${value.acc}</td>
          <td>${value.name}</td>
          <td>${value.email}</td>
          <td>${value.dateOfWork}</td>
          <td>${value.position}</td>
          <td>${value.calcSalary()}</td>
          <td>${value.getRank()}</td>
          <td>
          <button
              class="btn btn-warning"
              onclick="selectStudent('${value.acc}')"
            >
              Chỉnh sửa
          </button>
          </br>
          <button
            class="btn btn-danger"
            onclick="removeStaff('${value.acc}')"                      
          >
            Xoá
          </button>
          
        </td>
        </tr>
      `
    );
  }, "");
// lưu ý phải có dấu nháy đơn chỗ '${value.acc}' thì nó mới hiểu
  document.getElementById("tableDanhSach").innerHTML = html;
}

//----------------------------------- Phần xác thực---------------------------------------------------------------------

// Hàm dùng kiểm tra giá trị có rỗng hay không
function isRequired(value) {
  if (!value.trim()) {
    // Chuỗi rỗng
    return false;
  }
  return true;
}
// Hàm dùng kiểm tra tài khoản: tối đa 4-6 kí số 
function isAcc(value) {
  let regex =
    /^(?=.*[0-9]).{4,6}$/;

  return regex.test(value);
}
// Hàm dùng kiểm tra tên: phải là chữ
function isName(value) {
 // let regex = /^[a-zA-Z ]+$/;
  //let regex = /^[0-9]+$/;
 // return regex.test(value);                                           // Hàm test dùng để kiểm tra
 let regex =/^[0-9]/;
 let regex2=/^[!&%\\/()=\?\^\*\+\]\[#><;:,\._-|@]/;
 if(!isNaN(value)){
       
  return  false;
    
  }
  if(regex.test(value)){
       
    return  false;  
     
   }
   if(regex2.test(value)){                                               // Hàm test dùng để kiểm tra
       
    return  false;  
     
   }
   
  return value;

}
 
  
  
  



// Hàm dùng kiểm tra lương cơ bản có hợp lệ hay không
function isSalary(value) {
  if (isNaN(value)) {
    return false;
  }
  if (20000000>=value && value >= 1000000) {
    return true;
  }
  return false;
}
// Hàm dùng kiểm tra giờ làm có hợp lệ hay không
function isHour(value) {
  if (isNaN(value)) {
    return false;
  }
  if (value < 200 || value > 80) {
    return false;
  }
  return true;
}

// Hàm dùng kiểm tra mật khẩu: ít nhất 8 kí tự, có ít nhất 1 chử hoa, 1 chử thường, 1 số, 1 kí tự đặc biệt có hợp lệ hay không
function isPassword(value) {
  let regex =
    /^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{6,10}$/;

  return regex.test(value);
}
// Hàm dùng kiểm tra email có hợp lệ hay không
function isEmail(value) {
  let regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(value);
}

// Hàm dùng kiểm tra chức vụ có hợp lệ hay không
function isPosition(value) {
  if (value === "Chọn chức vụ") {
    return false;
  }
  else if (value === "Sếp" || value ==="Trưởng phòng" || value === "Nhân viên" ) {
    return true;
  }
  return false;
}
// Hàm dùng kiểm tra số giờ có hợp lệ hay không
function isHour(value) {
  if (isNaN(value)) {
    return false;
  }
  if (200>=value && value >= 80) {
    return true;
  }
  return false;
}


// Hàm kiểm tra xác thực thông tin của staff có hợp lệ hay không
function validate() {
  let acc = document.getElementById("tknv").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dateOfWork = document.getElementById("datepicker").value;
  let salary = document.getElementById("luongCB").value;        // ép kiểu ở đây sớm quá thì hầm sẽ báo lỗi do không phải chuỗi
  let position = document.getElementById("chucvu").value;
  let hour = document.getElementById("gioLam").value;
 
 
  // Đặt biến cờ hiệu isValid dùng để tạo đối tượng new staff
  let isValid = true;
  
  // Điều kiện xác thực cho tài khoản
  if (!isRequired(acc)) {
    // Không hợp lệ
    isValid = false;
    document.getElementById("tbTKNV").innerHTML = "Tài khoản không được để trống";
  }
  else if (!isAcc(acc)) {
    isValid = false;
  document.getElementById("tbTKNV").innerHTML = "Tài khoản không hợp lệ";
  }




  //Điều kiện xác thực cho tên
  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "Tên không được để trống";
  }
  else if (!isName(name)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "Tên không hợp lệ";
  }

  //Điều kiện xác thực cho email


  
if (!isRequired(email)) {
  isValid = false;
  document.getElementById("tbEmail").innerHTML = "Email không được để trống";
} else if (!isEmail(email)) {
  isValid = false;
  document.getElementById("tbEmail").innerHTML = "Email không hợp lệ";
}



//Điều kiện xác thực cho password 




if (!isRequired(password)) {
  isValid = false;
  document.getElementById("tbMatKhau").innerHTML = "Mật khẩu không được để trống";
} else if (!isPassword(password)) {
  isValid = false;
  document.getElementById("tbMatKhau").innerHTML = "Mật khẩu không hợp lệ";
}


//Điều kiện xác thực cho ngày vào làm 

if (!isRequired(dateOfWork)) {
  isValid = false;
  document.getElementById("tbNgay").innerHTML =
    "Ngày vào làm không được để trống";
}

//Điều kiện xác thực cho lương căn bản


if (!isRequired(salary)) {
  isValid = false;
  document.getElementById("tbLuongCB").innerHTML = "Lương cơ bản không được để trống";
} else if (!isSalary(+salary)) {                       // ép kiểu để tính đúng 
  isValid = false;
  document.getElementById("tbLuongCB").innerHTML = "Lương cơ bản không hợp lệ";
}


//Điều kiện xác thực chức vụ

let positionSpan = document.getElementById("tbChucVu");
if (!isRequired(position)) {
  isValid = false;
  positionSpan.innerHTML = "Chức vụ không được để trống";
} else if (!isPosition(position)) {
  isValid = false;
  positionSpan.innerHTML = "Chức vụ không hợp lệ";
}

//Điều kiện xác thực giờ làm 

let hourSpan = document.getElementById("tbGiolam");
if (!isRequired(hour)) {
  isValid = false;
  hourSpan.innerHTML = "Giờ làm không được để trống";
} else if (!isHour(+hour)) {
  isValid = false;
  hourSpan.innerHTML = "Giờ làm không hợp lệ";
}

// Tất cả các xác thực đều đúng ==> trả kết quả









  if (isValid) {
    // Form hợp lệ, tạo ra trả về đối tượng student
    let staff = new Staff(
      acc,
      name,
      email,
      password,
      dateOfWork,
      +salary,
      position,
      +hour,
    
    );

    return staff;
  }

  // Form không hợp lệ => Không tạo đối tượng student
  return undefined;
}
//--------------------------------------Nhập để biến mất lỗi khi  người dùng đã nhập vào input với event------------------------------------------------






  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện


  // Nhập để biến mất lỗi khi  người dùng đã nhập vào input  tài khoản
  document.getElementById("tknv").oninput = (event) => {
    if (!isSubmitted) return;

  let accSpan = document.getElementById("tbTKNV");
  if (isRequired(event.target.value)) {
    accSpan.innerHTML = "";
  } else {
    accSpan.innerHTML = "Tài khoản không được để trống";
  }
};


// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  tên


document.getElementById("name").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let nameSpan = document.getElementById("tbTen");
  if (isRequired(event.target.value)) {
    nameSpan.innerHTML = "";
  } else {
    nameSpan.innerHTML = "Họ và Tên không được để trống";
  }
};

// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  email


document.getElementById("email").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let emailSpan = document.getElementById("tbEmail");
  if (isRequired(event.target.value)) {
    emailSpan.innerHTML = "";
  } else {
    emailSpan.innerHTML = "Email không được để trống";
  }
};

// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  password


document.getElementById("password").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let passwordSpan = document.getElementById("tbMatKhau");
  if (isRequired(event.target.value)) {
    passwordSpan.innerHTML = "";
  } else {
    emailSpanpasswordSpan.innerHTML = "Mật khẩu không được để trống";
  }
};
// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  ngày vào làm 


document.getElementById("datepicker").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let dateOfWorkSpan = document.getElementById("tbNgay");
  if (isRequired(event.target.value)) {
    dateOfWorkSpan.innerHTML = "";
  } else {
    dateOfWorkSpan.innerHTML = "Ngày vào làm không được để trống";
  }
};
// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  lương căn bản 


document.getElementById("luongCB").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let salarySpan = document.getElementById("tbLuongCB");
  if (isRequired(event.target.value)) {
    salarySpan.innerHTML = "";
  } else if (!isSalary(+salary)){
    salarySpan.innerHTML = "Lương căn bản không không hợp lệ";
  }
  else{

    salarySpan.innerHTML = "Lương căn bản không được để trống";

  }
};
// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  chức vụ 


document.getElementById("chucvu").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let positionSpan = document.getElementById("tbChucVu");
  if (isRequired(event.target.value)) {
    positionSpan.innerHTML = "";
  } else if (!isPosition(position)){
    positionSpan.innerHTML = "Chức vụ không hợp lệ";
  }
  else{

    positionSpan.innerHTML = "Chức vụ không được để trống";

  }
};
// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  giờ làm 


document.getElementById("gioLam").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let hourSpan = document.getElementById("tbGiolam");
  if (isRequired(event.target.value)) {
    hourSpan.innerHTML = "";
  } else if (!isHour(+hour)){
    hourSpan.innerHTML = " Giờ làm không hợp lệ";
  }
  else{

    hourSpan.innerHTML = " Giờ làm không được để trống";

  }
};

//---------------------------------------------------Xóa nhân viên----------------------------------------------------------------

// Hàm xóa nhân viên
function removeStaff(staffAcc) {
  // // Tìm index của phần tử student có id khớp với giá trị của studentId
  
  // // Dựa vào index để xoá phần tử đó khỏi mảng
 

  staffs = staffs.filter((value) => {
    return value.acc !== staffAcc;
  });
  localStorage.setItem("staffs", JSON.stringify(staffs));

  display(staffs);
}
//----------------------------------------------Cập nhật-------------------------------------------------------------------
// Đầu tiên bấm nút chỉnh sửa để fill lại tất cả thông tin cần cập nhật
function selectStudent(staffAcc) {
  // Tìm phần tử staff có id khớp với giá trị của staffAcc
  let staff = staffs.find((value) => {
    return value.acc === staffAcc;
  });

  // Fill thông tin của staff lên giao diện
  document.getElementById("tknv").value = staff.acc;
  document.getElementById("name").value = staff.name;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.password;
  document.getElementById("datepicker").value = staff.dateOfWork;
  document.getElementById("luongCB").value = staff.salary;
  document.getElementById("chucvu").value = staff.position;
  document.getElementById("gioLam").value = staff.hour;

  // disable input tài khoản nhân viên và button thêm nhân viên
  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
}

// Hàm cập nhật thông tin mới

function updateStaff() {
  isSubmitted = true;
  let staff = validate();
  if (!staff) {
    return;
  }

  // B3: Tìm index của phần tử staff cần cập nhật
  let index = staffs.findIndex((value) => {
    return value.acc === staff.acc;
  });
  // Thay thế phần tử thứ index cho object staff mới tạo
  staffs[index] = staff;
  localStorage.setItem("staffs", JSON.stringify(staffs));

  // B4: Hiển thị
  display(staffs);

 
}
//-----------------------------------------------------Tìm nhân viên -----------------------------------------------------

// Tìm nhân viên theo loại

function findStaff() {
  // B1: DOM
  let search = document.getElementById("searchName").value;
  search = search.trim().toLowerCase();

  // B2: Lọc các sinh viên có tên khớp với giá trị tìm kiếm
  let newStaffs = staffs.filter((value) => {
    let rank = value.getRank().trim().toLowerCase();
    return rank.includes(search);
  });

  // B3: Hiển thị các sinh viên được tìm thấy ra giao diện
  display(newStaffs);
}


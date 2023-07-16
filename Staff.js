// Định nghĩa Staff constructor
function Staff(
    acc,
    name,
    email,
    password,
    dateOfWork,
    salary,
    position,
    hour,
    
    
  ) {
    this.acc = acc;
    this.name = name;
    this.email = email;
    this.password = password;
    this.dateOfWork = dateOfWork;
    this.salary = salary;
    this.position = position;
    this.hour = hour;
    
  }
   // Phương thức
 Staff.prototype.calcSalary = function () {

         let position=this.position;
         let salary=this.salary;
         let sumSalary= 0;
          if (position == "Sếp") {
              
            sumSalary = salary*3;
            return sumSalary;
            
          }
          if (position == "Trưởng phòng") {
            sumSalary = salary*2;
             
             return sumSalary;
          }
          if (position == "Nhân viên") {
            sumSalary = salary*1;
            
            return sumSalary;
          }
          
             
 },
 
 Staff.prototype.getRank = function () {
     
      let hour=this.hour;
   
      if (hour < 160) {
        return "Nhân viên trung bình";
      }
      if (hour < 176 ) {
        return "Nhân viên khá";
      }
      if (hour < 192) {
        return "Nhân viên giỏi";
      }
    
      return "Nhân viên xuất sắc";
    }
 
  
  
  
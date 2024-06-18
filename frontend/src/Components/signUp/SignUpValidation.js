export default function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.firstname === "") {
    error.firstname = "name should not be empty";
  } else {
    error.firstname = "";
  }
  if (values.lastname === "") {
    error.lastname = "name should not be empty";
  } else {
    error.lastname = "";
  }

  if (values.NationalID === "") {
    error.NationalID = "NationalId should not be empty";
  } else {
    error.NationalID = "";
  }

  if (values.telephone === "") {
    error.telephone = "telephone should not be empty";
  } else {
    error.telephone = "";
  }

  if (values.email === "") {
    error.email = "email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "email didn't match";
  } else {
    error.email = "";
  }

  if (values.Department === "") {
    error.Department = "Department should not be empty";
  } else {
    error.Department = "";
  }

  if (values.Position === "") {
    error.Position = "Position should not be empty";
  } else {
    error.Position = "";
  }

  if (values.Manufacturer === "") {
    error.Manufacturer = "Manufacturer should not be empty";
  }  else {
    error.Manufacturer = "";
  }

  if (values.Model === "") {
    error.Model = "Model should not be empty";
  }  else {
    error.Model = "";
  }

  if (values.SerialNumber === "") {
    error.SerialNumber = "SerialNumber should not be empty";
  }  else {
    error.SerialNumber = "";
  }

  if (values.ID === "") {
    error.ID = "Id should not be empty";
  }  else {
    error.ID = "";
  }


  if (values.password === "") {
    error.password = "password should not be empty";
  } else {
    error.password = "";
  }
  return error;
}

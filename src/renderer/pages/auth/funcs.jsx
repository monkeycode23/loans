export const initFields2 = {
  username: {
    value: "",
    isValid: true,
    error: "",
  },
  email: {
    value: "",
    isValid: true,
    error: "",
  },
  password: {
    value: "",
    isValid: true,
    error: "",
  },
  rpassword: {
    value: "",
    isValid: true,
    error: "",
  },
};

export const validateRules2 = {
  username: {
    required: {
      param: true,
      message: "Este campo es requerido",
    },
    minLength: {
      param: 3,
      message: "No puede ser menor a 3",
    },
    maxLength: {
      param: 15,
      message: "No puede ser mayor a 15",
    },
  },
  email: {
    required: {
      param: true,
      message: "Este campo es requerido",
    },
    minLength: {
      param: 3,
      message: "No puede ser menor a 3",
    },
    maxLength: {
      param: 40,
      message: "No puede ser mayor a 40",
    },
    email: {
      param: true,
      message: "No es un formato de email valido",
    },
  },
  password: {
    required: {
      param: true,
      message: "Este campo es requerido",
    },
    minLength: {
      param: 8,
      message: "No puede ser menor a 8",
    },
    maxLength: {
      param: 20,
      message: "No puede ser mayor a 20",
    },
  },
  rpassword: {
    required: {
      param: true,
      message: "Este campo es requerido",
    },
    minLength: {
      param: 8,
      message: "No puede ser menor a 8",
    },
    maxLength: {
      param: 20,
      message: "No puede ser mayor a 20",
    }
    
  },
};

export const initFields = {
  username: {
    value: "",
    isValid: true,
    error: "",
  },
  password: {
    value: "",
    isValid: true,
    error: "",
  },
};

export const validateRules = {
  username: {
    required: {
      param: true,
      message: "Este campo es requerido",
    },
    minLength: {
      param: 3,
      message: "No puede ser menor a 3",
    },
    maxLength: {
      param: 15,
      message: "No puede ser mayor a 15",
    },
  },
  password: {
    required: {
      param: true,
      message: "Este campo es requerido",
    },
    minLength: {
      param: 6,
      message: "No puede ser menor a 6",
    },
    maxLength: {
      param: 20,
      message: "No puede ser mayor a 20",
    },  
  },
};

export async function validateUserName(fields) {
  //const user= await window.sqlite.query("SELECT * FROM users WHERE username=?",fields.username.value)
  const user = await window.database.models.User.getUser({username:fields.username.value}  );

  console.log(user)
  if (user.length == 0) {
    return false;
  }
  return user[0];
}

export async function validateUserEmail(fields) {
  const user = await window.database.models.User.getUser({email:fields.email.value});
  if (user.length == 0) {
    return false;
  }
  return user[0];
}
export async function generateToken(user) {
  const token = await window.api.generateToken(user);
  return token;
}

export async function comparePassword(password, userPassword) {
  const hash = await window.api.hash(password);

  const compare = await window.api.compare(password, userPassword);

  return hash == userPassword;
}



export async function insertUser(data){
    
    const hash =await window.api.hash(data.password)
       
  const user = await window.database.models.User.createUser({
    username:data.username,
    email:data.email,
    password:hash,
    rol:"admin"
  });

  if(user)return user;
  return false;
}

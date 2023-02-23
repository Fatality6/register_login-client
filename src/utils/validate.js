export const validate = (username,email,password,birthdate,gender) => {
  const errors = {};

  // Validate username
  if (!username.trim()) {
    errors.username = "Поле имени не должно быть пустым";
  }

  // Validate email
  if (!email.trim()) {
    errors.email = "Поле email не должно быть пустым";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Проверьте правильность email";
  }

  // Validate password
  if (!password.trim()) {
    errors.password = "Поле password не должно быть пустым";
  } else if (password.length < 6) {
    errors.password = "Пароль должен быть не короче 6 символов";
  }

  // Validate birthdate
  if (!birthdate) {
    errors.birthdate = "Не выбрана дата рождения";
  }

  // Validate gender
  if (!gender) {
    errors.gender = "Выберите свой пол";
  }

  return errors;
};
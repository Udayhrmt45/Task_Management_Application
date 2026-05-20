export const validateLogin = ({ name, email, password }) => {
  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "Name is required";
  } else if (name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.trim())) {
      errors.email = "Please enter a valid email address";
    }
  }

  if (!password || password === "") {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/[a-zA-Z]/.test(password)) {
    errors.password = "Password must contain at least one letter";
  } else if (!/[0-9]/.test(password)) {
    errors.password = "Password must contain at least one number";
  }

  return errors;
};

export const validateTask = ({ task, assignedTo }) => {
  const errors = {};

  if (!task || task.trim() === "") {
    errors.task = "Task name is required";
  }

  if (!assignedTo || assignedTo.trim() === "") {
    errors.assignedTo = "Assigned user is required";
  }

  return errors;
};

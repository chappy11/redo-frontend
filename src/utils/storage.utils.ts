export const save = (user: any) => {
  try {
    const userString = JSON.stringify(user);
    localStorage.setItem("user", userString);
  } catch (error) {
    console.log(error);
  }
};

export const getUserFromStorage = async () => {
  try {
    const user = await localStorage.getItem("user");
    const data = user ? JSON.parse(user) : null;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
};

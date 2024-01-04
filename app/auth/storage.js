import * as SecureStore from "expo-secure-store";

const key = "authKey";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (err) {
    console.log("Error storing Authentication Token", err);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (err) {
    console.log("Error removing Authentication Token", err);
  }
};

const getToken = async () => {
  try {
    const authToken = await SecureStore.getItemAsync(key);
    return authToken;
  } catch (err) {
    console.log("Error getting Authentication Token", err);
  }
};

export default { getToken, storeToken, removeToken };

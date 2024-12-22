import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { createUser } from "../../api/usersApi";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  role: Yup.string()
    .oneOf(['doctor', 'volunteer'], 'Please select a role')
    .required('Role is required'),
});

const AddUser = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "doctor", // default role
  });
  const [errors, setErrors] = useState({});

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      const isValid = await validateForm();
      if (!isValid) {
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setErrors({ ...errors, confirmPassword: "Passwords must match" });
        return;
      }

      const { confirmPassword, ...submitData } = formData;
      const response = await createUser(submitData);
      if (response.data) {
        // Clear the form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "doctor",
        });
        setErrors({});
        Alert.alert("Success", "User created successfully", [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <ScreenTemplate>
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={formData.name}
            onChangeText={(text) => {
              setFormData({ ...formData, name: text });
              setErrors({ ...errors, name: null });
            }}
            placeholder="Enter name"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={formData.email}
            onChangeText={(text) => {
              setFormData({ ...formData, email: text });
              setErrors({ ...errors, email: null });
            }}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={styles.label}>Password *</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            value={formData.password}
            onChangeText={(text) => {
              setFormData({ ...formData, password: text });
              setErrors({ ...errors, password: null });
            }}
            placeholder="Enter password (minimum 8 characters)"
            secureTextEntry
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <Text style={styles.label}>Confirm Password *</Text>
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            value={formData.confirmPassword}
            onChangeText={(text) => {
              setFormData({ ...formData, confirmPassword: text });
              setErrors({ ...errors, confirmPassword: null });
            }}
            placeholder="Confirm password"
            secureTextEntry
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

          <Text style={styles.label}>Role *</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity 
              style={styles.radioOption} 
              onPress={() => setFormData({ ...formData, role: "doctor" })}
            >
              <View style={styles.radio}>
                {formData.role === "doctor" && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioText}>Doctor</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.radioOption}
              onPress={() => setFormData({ ...formData, role: "volunteer" })}
            >
              <View style={styles.radio}>
                {formData.role === "volunteer" && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioText}>Volunteer</Text>
            </TouchableOpacity>
          </View>

          {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}

          <Text style={styles.noteText}>
            ⚠️ Make sure the user changes their password right after the account is created
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create User</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  radioText: {
    fontSize: 16,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
});

export default AddUser;

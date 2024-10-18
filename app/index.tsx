import React, { useState } from "react";
import { Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native";
import { useRouter } from "expo-router";
export default function Index() {
  const user = {
    'FirstName': '',
    'LastName': '',
    'Email': '',
    'Password': '',
    'ConfirmPassword': ''
  };

  const [inputs, setInputs] = useState(user);
  const [errors, setErrors] = useState(user);
  const router = useRouter();

  type InputKeys = keyof typeof user;

  const handleChange = (field: InputKeys, text: string) => {
    setInputs((values) => ({ ...values, [field]: text }));
    if (text === "") {
      setErrors((err) => ({ ...err, [field]: `${field} cannot be empty!` }));
    } else {
      setErrors((err) => ({ ...err, [field]: '' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    for (let key in inputs) {
      const field = key as InputKeys;
      if (inputs[field] === "") {
        newErrors[field] = `${field} cannot be empty!`;
        valid = false;
      }
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputs.Email && !emailPattern.test(inputs.Email)) {
      newErrors.Email = "Invalid email format!";
      valid = false;
    }

    if (inputs.Password !== inputs.ConfirmPassword) {
      newErrors.ConfirmPassword = "Passwords do not match!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const postData = {
        userName: inputs.FirstName + " " + inputs.LastName,
        emailId: inputs.Email,
        password: inputs.Password,
      }
      fetch('http://192.168.1.215:8084/addUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      }).then(() => {
        setInputs(user);
        setErrors(user);
        router.push('./signIn');
      }).catch((err) => console.log(err));
    }
  };

  const styles = StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: '#f9f9f9',
    },
    main: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: '#fff',
      borderRadius: 10,
      elevation: 5,
      padding: 20,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    label: {
      marginBottom: 5,
      fontSize: 16,
      fontWeight: '600',
    },
    inp: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      paddingLeft: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    err: {
      color: 'red',
      marginBottom: 10,
      fontSize: 12,
    },
    button: {
      backgroundColor: '#007BFF',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 20
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  return (
    <KeyboardAvoidingView style={styles.body}>
      <Text style={[styles.title,{fontSize: 36}]}>Megatron Logistics</Text>
      <ScrollView style={styles.main}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>User Registration</Text>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={[styles.inp, errors.FirstName ? { borderColor: 'red' } : {}]}
          placeholder="First Name"
          value={inputs.FirstName}
          onChangeText={(text) => handleChange('FirstName', text)}
        />
        <Text style={styles.err}>{errors.FirstName}</Text>

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={[styles.inp, errors.LastName ? { borderColor: 'red' } : {}]}
          placeholder="Last Name"
          value={inputs.LastName}
          onChangeText={(text) => handleChange('LastName', text)}
        />
        <Text style={styles.err}>{errors.LastName}</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.inp, errors.Email ? { borderColor: 'red' } : {}]}
          placeholder="Email"
          value={inputs.Email}
          onChangeText={(text) => handleChange('Email', text)}
          keyboardType="email-address"
        />
        <Text style={styles.err}>{errors.Email}</Text>

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.inp, errors.Password ? { borderColor: 'red' } : {}]}
          placeholder="Password"
          secureTextEntry
          value={inputs.Password}
          onChangeText={(text) => handleChange('Password', text)}
        />
        <Text style={styles.err}>{errors.Password}</Text>

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={[styles.inp, errors.ConfirmPassword ? { borderColor: 'red' } : {}]}
          placeholder="Re-enter Password"
          secureTextEntry
          value={inputs.ConfirmPassword}
          onChangeText={(text) => handleChange('ConfirmPassword', text)}
        />
        <Text style={styles.err}>{errors.ConfirmPassword}</Text>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

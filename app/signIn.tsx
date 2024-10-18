import React, { useState } from "react";
import { Text, StyleSheet, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from "react-native";
import { useRouter } from "expo-router";
export default function Index() {
  const user = {
    'UserName': '',
    'Password': '',
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
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const response = await fetch(`http://localhost:8084/user/${inputs.UserName}`);
      const data = await response.json();
        if(data){
          if(data.password === inputs.Password){
            alert('Logged!');
            setInputs(user);
            setErrors(user);
            //router.push('./signIn');
          }
          else{
            setErrors((err) => ({ ...err, Password: 'Incorrect Password!' }));  
          }
        }
        else{
          setErrors((err) => ({ ...err, UserName: 'Cannot find User with given Username!' }));
        }
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
      <View style={styles.main}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={[styles.inp, errors.UserName ? { borderColor: 'red' } : {}]}
          placeholder="Enter your UserName"
          value={inputs.UserName}
          onChangeText={(text) => handleChange('UserName', text)}
        />
        <Text style={styles.err}>{errors.UserName}</Text>

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.inp, errors.Password ? { borderColor: 'red' } : {}]}
          placeholder="Enter your Password"
          secureTextEntry
          value={inputs.Password}
          onChangeText={(text) => handleChange('Password', text)}
        />
        <Text style={styles.err}>{errors.Password}</Text>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>SignIn</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Surface, Text, TextInput, Modal } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export default function RegistroScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState({
    email: false,
    senha: false,
    repetirSenha: false,
    nome: false,
  });

  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  function realizaRegistro() {
    if (nome === "") {
      setErro({ ...erro, nome: true });
      setErrorMessage("Nome é obrigatório.");
      showModal();
      return;
    }
    setErro({ ...erro, nome: false });

    if (email === "") {
      setErro({ ...erro, email: true });
      setErrorMessage("Email é obrigatório.");
      showModal();
      return;
    }
    setErro({ ...erro, email: false });

    if (senha === "") {
      setErro({ ...erro, senha: true });
      setErrorMessage("Senha é obrigatória.");
      showModal();
      return;
    }
    setErro({ ...erro, senha: false });

    if (repetirSenha === "") {
      setErro({ ...erro, repetirSenha: true });
      setErrorMessage("Repetir senha é obrigatório.");
      showModal();
      return;
    }
    setErro({ ...erro, repetirSenha: false });

    if (senha !== repetirSenha) {
      setErro({ ...erro, senha: true, repetirSenha: true });
      setErrorMessage("As senhas não coincidem.");
      showModal();
      return;
    }
    setErro({ ...erro, senha: false, repetirSenha: false });

    cadastrarNoFirebase();
  }

  async function cadastrarNoFirebase() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      const collectionRef = collection(db, "usuarios");

      await setDoc(doc(collectionRef, user.uid), {
        nome: nome,
        email: email,
      });

      navigation.navigate("Login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email já está cadastrado.");
      } else {
        setErrorMessage("Erro ao cadastrar usuário: " + error.message);
      }
      showModal();
    }
  }

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Text variant="headlineSmall" style={styles.title}>Faça seu Registro</Text>
        <TextInput
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          error={erro.nome}
        />
        <TextInput
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          error={erro.email}
        />
        <TextInput
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
          error={erro.senha}
        />
        <TextInput
          placeholder="Repita sua senha"
          value={repetirSenha}
          onChangeText={setRepetirSenha}
          secureTextEntry
          style={styles.input}
          error={erro.repetirSenha}
        />
        <TouchableOpacity style={styles.button} onPress={realizaRegistro}>
            <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Voltar ao login</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={visible} onDismiss={hideModal}>
        <Text>{errorMessage}</Text>
        <Button onPress={hideModal}>Fechar</Button>
      </Modal>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E90FF',
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

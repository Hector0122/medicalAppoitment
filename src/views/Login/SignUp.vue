<template>
  <div class="form-container">
    <h1>Sign Up</h1>
    <input
      type="email"
      v-model="email"
      placeholder="Enter Email"
      class="input-field"
    />
    <input
      type="password"
      v-model="password"
      placeholder="Enter Password"
      class="input-field"
    />
    <select v-model="role" class="input-field">
      <option :value="0">Paciente</option>
      <option :value="1">Doctor</option>
    </select>
  </div>
  <div class="button-container">
    <button v-on:click="signUp" class="sign-up-button">Sign Up</button>
    <p>
      Already have an account?
      <router-link to="/login" class="login-link">Login</router-link>
    </p>
  </div>
</template>

<style>
.form-container {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
}

.input-field {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.button-container {
  text-align: center;
}

.sign-up-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sign-up-button:hover {
  background-color: #0062cc;
}

.login-link {
  color: #007bff;
  text-decoration: none;
}
</style>

<script>
import axios from "axios";
import sgMail from "@sendgrid/mail";

export default {
  name: "SignUp",
  data() {
    return {
      role: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async signUp() {
      await axios
        .post(
          "http://localhost:3000/users",
          {
            email: this.email,
            password: this.password,
            role: parseInt(this.role),
          },
          {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
            },
          }
        )
        .then(() => {
          this.sendConfirmationEmail();
          alert("Usuario registrado correctamente");
        })

        .catch((error) => {
          console.log(error);
        });
    },

    sendConfirmationEmail() {
      sgMail.setApiKey(
        "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"
      );

      sgMail.send({
        to: this.email,
        from: "hpave954@gmail.com",
        subject: "Confirmación de registro",
        text: `¡Hola!

¡Gracias por registrarte en nuestra plataforma! Estamos muy contentos de tenerte como parte de nuestra comunidad. Para acceder a tu cuenta, por favor sigue el enlace que aparece a continuación:

Iniciar sesión: http://localhost:4000/login

Si tienes alguna pregunta o problema, por favor no dudes en contactarnos. Estamos aquí para ayudarte en todo lo que necesites.

¡Bienvenido de nuevo y gracias por unirte a nosotros!

Saludos cordiales,`,
      });
    },
  },
};
</script>

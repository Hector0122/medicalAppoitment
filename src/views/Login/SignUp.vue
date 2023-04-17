<template>
  <div class="container">
    <div class="form-container">
      <h1>Sign Up</h1>
      <div>
        <v-text-field
          label="Email"
          v-model="email"
          hide-details="auto"
          :rules="[rules.required, rules.validateEmail]"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
      </div>
      <v-select
        v-model="select"
        :items="items"
        item-title="text"
        item-value="value"
        label="Role"
        persistent-hint
        return-object
        single-line
      ></v-select>
      <button v-on:click="signUp" class="sign-up-button mb-3">Sign Up</button>

      <div>
        Already have an account?
        <router-link to="/login" class="login-link">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sgMail from "@sendgrid/mail";
import "./style.css";

export default {
  name: "SignUp",
  data() {
    return {
      role: "",
      email: "",
      password: "",
      select: { text: "Paciente", value: 0 },
      items: [
        { text: "Paciente", value: 0 },
        { text: "Doctor", value: 1 },
      ],
      show1: false,
      show2: true,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
        validateEmail: (value) =>
          /.+@.+\..+/.test(value) || "E-mail must be valid",
      },
    };
  },

  mounted() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    async signUp() {
      await axios
        .post(
          "http://localhost:3000/users",
          {
            email: this.email,
            password: this.password,
            role: this.select.value,
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
      sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY);

      console.log(this.email);

      sgMail.send({
        to: this.email,
        from: "hpave954@gmail.com",
        subject: "Confirmación de registro",
        text: `¡Hola!

¡Gracias por registrarte en nuestra plataforma! Estamos muy contentos de tenerte como parte de nuestra comunidad. Para acceder a tu cuenta, por favor sigue el enlace que aparece a continuación:

Iniciar sesión: http://localhost:4000/profile

Si tienes alguna pregunta o problema, por favor no dudes en contactarnos. Estamos aquí para ayudarte en todo lo que necesites.

¡Bienvenido de nuevo y gracias por unirte a nosotros!

Saludos cordiales,`,
      });
    },
  },
};
</script>

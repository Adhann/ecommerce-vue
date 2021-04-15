<template>
<div>
  <Navbar />
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <div>
      <v-tabs v-model="tab" show-arrows background-color="teal lighten-1" icons-and-text dark grow>
        <v-tabs-slider color="teal darken-4"></v-tabs-slider>
        <v-tab v-for="i in tabs" :key="i.id">
          <v-icon large>{{ i.icon }}</v-icon>
          <div class="caption py-1">{{ i.name }}</div>
        </v-tab>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="loginForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="loginPassword" :append-icon="showPass?'mdi-eye':'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="showPass ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 6 characters" counter @click:append="showPass = !showPass"></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" xsm="12">
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                    <v-btn x-large block :disabled="!valid" color="teal darken" class="white--text" @click.prevent="validate"> Login </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="registerForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                      <v-text-field v-model="registerName" :rules="[rules.required]" label="Full Name" maxlength="30" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                      <v-text-field v-model="registerEmail" :rules="emailRules" label="E-mail" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                      <v-text-field v-model="registerPassword" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="showPass ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 6 characters" counter @click:append="showPass = !showPass"></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                      <v-btn x-large block :disabled="!valid" color="success" @click.prevent="validate">Register</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </v-dialog>
</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar'
export default {
  name: 'Home',
  components: {
    Navbar
  },
  computed: {
    passwordMatch () {
      return () => this.password === this.verify || 'Password must match'
    }
  },
  methods: {
    validate () {
      if (this.$refs.loginForm.validate()) {
        this.$store.dispatch('login', { loginEmail: this.loginEmail, loginPassword: this.loginPassword })
      } else {
        this.$store.dispatch('register', { registerName: this.registerName, registerEmail: this.registerEmail, registerPassword: this.registerPassword })
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { id: 1, name: 'Login', icon: 'mdi-account' },
      { id: 2, name: 'Register', icon: 'mdi-account-outline' }
    ],
    valid: true,
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    verify: '',
    loginPassword: '',
    loginEmail: '',
    loginEmailRules: [
      v => !!v || 'Required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    emailRules: [
      v => !!v || 'Required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],

    showPass: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => (v && v.length >= 6) || 'Min 6 characters'
    }
  })
}
</script>

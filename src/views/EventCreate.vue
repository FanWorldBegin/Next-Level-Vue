<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect 
        label="select a category" 
        :options="categories" 
        v-model="event.category" 
        @blur="$v.event.category.$touch()"
        :class="{ err: $v.event.category.$error }"
        class="field"></BaseSelect>

      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required"
          class="errorMessage"> Category is required.</p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput 
        label="Title" 
        v-model="event.title" 
        type="text" 
        placeholder="Title" 
        class="field"
        :class="{ err: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
        ></BaseInput>
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required"
          class="errorMessage"> Title is required.</p>
      </template>

      <div class="field">
        <BaseInput 
          label="Description" 
          v-model="event.description" 
          type="text" 
          placeholder="Description" 
          class="field"
          @blur="$v.event.description.$touch()"
          ></BaseInput>
      </div>
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required"
          class="errorMessage"> description is required.</p>
      </template>

      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input v-model="event.location" type="text" placeholder="Add a location"/>
      </div>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker 
          v-model="event.date" 
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error }"
          @opened="$v.event.date.$touch()"
          />
      </div>

      <div class="field">
        <BaseSelect 
          label="select a time"
          :options="times"
          v-model="event.time"
          class="filed"
          @blur="$v.event.time.$touch()"
          ></BaseSelect>
      </div>
      
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required"
          class="errorMessage"> time is required.</p>
      </template>
      <BaseButton type="submit" @click="sendMessage" buttonClass="-fill-gradient">Sumit</BaseButton>
      <!-- <input type="submit" class="button -fill-gradient" value="Submit"/> -->
    </form>
  </div>
</template>


<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  validations: {
    event: {
      category: { required },
      user: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    }
  },
  methods: {
  
    sendMessage() {
      console.log('sendMessage')
    },
    createEvent() {
      this.$v.$touch(); // make every field $dirty

      if(!this.$v.$invalid) {
        // 
        NProgress.start()
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            })
            this.event = this.createFreshEventObject()
          })
          .catch(() => {
            NProgress.done()
          })
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
.error {
  color: red;

}
</style>

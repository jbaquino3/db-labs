<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components/VForm'
import { useCalendarStore } from './useCalendarStore'

// 👉 store
const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  event: {
    type: null,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'addEvent',
  'updateEvent',
  'removeEvent',
])

const userData = useCookie('userData')
const store = useCalendarStore()
const refForm = ref()

// 👉 Event
const event = ref(JSON.parse(JSON.stringify(props.event)))

const resetEvent = () => {
  event.value = JSON.parse(JSON.stringify(props.event))
  nextTick(() => {
    refForm.value?.resetValidation()
  })
}

watch(() => props.isDrawerOpen, resetEvent)

const removeEvent = () => {
  emit('removeEvent', String(event.value.id))

  // Close drawer
  emit('update:isDrawerOpen', false)
}

const handleSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      // If id exist on id => Update event
      if ('id' in event.value)
        emit('updateEvent', event.value)

      // Else => add new event
      else
        emit('addEvent', event.value)

      // Close drawer
      emit('update:isDrawerOpen', false)
    }
  })
}

// 👉 Form
const onCancel = () => {

  // Close drawer
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    resetEvent()
    refForm.value?.resetValidation()
  })
}

const startDateTimePickerConfig = computed(() => {
  const config = {
    enableTime: !event.value.allDay,
    dateFormat: `Y-m-d${ event.value.allDay ? '' : ' H:i' }`,
  }

  if (event.value.end)
    config.maxDate = event.value.end
  
  return config
})

const endDateTimePickerConfig = computed(() => {
  const config = {
    enableTime: !event.value.allDay,
    dateFormat: `Y-m-d${ event.value.allDay ? '' : ' H:i' }`,
  }

  if (event.value.start)
    config.minDate = event.value.start
  
  return config
})

const dialogModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const title = computed(() => {
  let arr = []

  if(event.value.extendedProps.calendar) {
    arr.push(event.value.extendedProps.calendar)
  }

  if(event.value.extendedProps.guests && event.value.extendedProps.guests.length > 0) {
    const guests = event.value.extendedProps.guests
    const label = guests[0] + (guests.length > 1 ? ` et al.` : '')

    arr.push(label)
  }

  return arr.join(' - ') || 'Schedule Information'
})

const equipments = computed(() => {
  const selectedCalendar = store.availableCalendars.find(x => x.label === event.value.extendedProps.calendar)

  if(selectedCalendar) {
    return selectedCalendar.equipments || []
  }

  return []
})
</script>

<template>
  <VNavigationDrawer
    temporary
    location="end"
    :model-value="props.isDrawerOpen"
    width="420"
    class="scrollable-content"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- 👉 Header -->
    <AppDrawerHeaderSection
      :title="title"
      @cancel="$emit('update:isDrawerOpen', false)"
    >
      <template #beforeClose>
        <IconBtn
          v-show="event.id"
          @click="removeEvent"
        >
          <VIcon
            size="18"
            color="error"
            icon="tabler-trash"
          />
        </IconBtn>
      </template>
    </AppDrawerHeaderSection>

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- SECTION Form -->
          <VForm
            ref="refForm"
            @submit.prevent="handleSubmit"
          >
            <VRow>
              <!-- 👉 Calendar -->
              <VCol cols="12">
                <AppSelect
                  v-model="event.extendedProps.calendar"
                  label="Room/Equipment"
                  :rules="[requiredValidator]"
                  :items="store.availableCalendars"
                  :item-title="item => item.label"
                  :item-value="item => item.label"
                >
                  <template #selection="{ item }">
                    <div
                      v-show="event.extendedProps.calendar"
                      class="align-center"
                      :class="event.extendedProps.calendar ? 'd-flex' : ''"
                    >
                      <VBadge
                        :color="item.raw.color"
                        inline
                        dot
                        class="pa-1 pb-2"
                      />
                      <span>{{ item.raw.label }}</span>
                    </div>
                  </template>
                </AppSelect>
              </VCol>

              <!-- 👉 Calendar -->
              <VCol cols="12">
                <VCheckbox
                  v-for="equipment in equipments"
                  :key="equipment"
                  v-model="event.extendedProps.equipments"
                  :value="equipment"
                  :label="equipment"
                />
              </VCol>

              <!-- 👉 Start date -->
              <VCol cols="12">
                <AppDateTimePicker
                  :key="JSON.stringify(startDateTimePickerConfig)"
                  v-model="event.start"
                  :rules="[requiredValidator]"
                  :label="event.allDay ? 'Start Date' : 'Start Date/Time'"
                  :placeholder="event.allDay ? 'Select Start Date' : 'Select Start Date/Time'"
                  :config="startDateTimePickerConfig"
                />
              </VCol>

              <!-- 👉 End date -->
              <VCol cols="12">
                <AppDateTimePicker
                  :key="JSON.stringify(endDateTimePickerConfig)"
                  v-model="event.end"
                  :rules="[requiredValidator]"
                  :label="event.allDay ? 'End Date' : 'End Date/Time'"
                  :placeholder="event.allDay ? 'Select End Date' : 'Select End Date/Time'"
                  :config="endDateTimePickerConfig"
                />
              </VCol>

              <!-- 👉 Students -->
              <VCol cols="12">
                <AppSelect
                  v-if="userData.members"
                  v-model="event.extendedProps.guests"
                  label="Students"
                  placeholder="Select Students"
                  :rules="[requiredValidator]"
                  :items="userData.members"
                  :item-title="item => item"
                  :item-value="item => item"
                  chips
                  multiple
                  eager
                />
              </VCol>

              <!-- 👉 Form buttons -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Submit
                </VBtn>
                <VBtn
                  variant="outlined"
                  color="secondary"
                  @click="onCancel"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        <!-- !SECTION -->
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

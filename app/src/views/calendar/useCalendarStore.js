export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    availableCalendars: [
      {
        label: 'IB 109',
      },
      {
        label: 'KA 101',
      },
      {
        label: 'KA 102 Open Lab',
      },
      {
        label: 'KA 102 Weighing Room',
        equipments: [
          'Analytical Balance',
          'Digital top loading balance',
        ],
      },
      {
        label: 'KA 102 Rotary Evaporator',
      },
      {
        label: 'KA 103',
      },
      {
        label: 'KA 201 Open Lab',
        equipments: [
          'Incubators',
          'Refrigerator', 
          'Orbital shaker', 
          'Microwave oven',
          'Digital top loading balance',
        ],
      },
      {
        label: 'KA 201 Autoclave',
      },
      {
        label: 'KA 201 Sterile Room',
        equipments: [
          'BSC',
          'Laminar Flow Hood',
        ],
      },
      {
        label: 'KA 202 Open Lab',
      },
      {
        label: 'KA 202 Oven Dryer',
      },
      {
        label: 'KA 203 Open Lab',
        equipments: [
          'Refrigerated centrifuge',
          'Microplate reader',
          'Incubator',
          'Refrigerator',
          'Homogenizer',
          'Thermal cycler',
          'UV trans-illuminator',
          'Analytical balance',
          'Digital top loading balance',
          'Microwave oven',
        ],
      },
      {
        label: 'KA 203 Sterile Room',
        equipments: [
          'BSC',
          'Agarose gel electrophoresis set-up',
          'Vortex mixer',
        ],
      },
      {
        label: 'Research Lab Open Lab',
        equipments: [
          'Refrigerator',
          'Refrigerated Centrifuge',
          'Thermal Cycler',
          'qPCR',
          'Gel-electrophoresis set up',
          'Gel-documentation System',
        ],
      },
      {
        label: 'Research Lab Chrom Room',
        equipments: [
          'Autoclave',
          'Laminar Flow Hood',
          'Microplate Reader',
          'Ultrasonic Bath Sonicator',
          'Analytical Balance',
          'Top Loading Balance',
        ],
      },
      {
        label: 'Research Lab V10',
      },
      {
        label: 'Shaker Incubator 1',
      },
      {
        label: 'Shaker Incubator 2',
      },
    ],
    selectedCalendars: [],
  }),
  actions: {
    async fetchEvents() {
      const { data, error } = await useApi(createUrl('/apps/calendar', {
        query: {
          calendars: this.selectedCalendars,
        },
      }))

      if (error.value)
        return error.value
      
      return data.value.map(x => {
        let arr = []

        if(x.extendedProps.calendar) {
          arr.push(x.extendedProps.calendar)
        }

        if(x.extendedProps.guests && x.extendedProps.guests.length > 0) {
          const label = x.extendedProps.guests[0] + (x.extendedProps.guests.length > 1 ? ` et al.` : '')

          arr.push(label)
        }

        return {
          ...x,
          title: arr.join(', '),
        }
      })
    },
    async addEvent(event) {
      await $api('/apps/calendar', {
        method: 'POST',
        body: event,
      })
    },
    async updateEvent(event) {
      return await $api(`/apps/calendar/${event.id}`, {
        method: 'PUT',
        body: event,
      })
    },
    async removeEvent(eventId) {
      return await $api(`/apps/calendar/${eventId}`, {
        method: 'DELETE',
      })
    },
  },
})

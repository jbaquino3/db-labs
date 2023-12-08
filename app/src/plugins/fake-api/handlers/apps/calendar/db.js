const date = new Date()
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
const nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)
const prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)
export const db = {
  events: [
    {
      id: 1,
      start: date,
      end: nextDay,
      allDay: false,
      extendedProps: {
        calendar: 'IB 109',
        guests: ['Jane Foster'],
        status: ['confirmed', 'pending'][Math.floor(Math.random() * 2)],
      },
    },
    {
      id: 2,
      start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
      allDay: true,
      extendedProps: {
        calendar: 'IB 109',
        guests: ['Donna Frank'],
        status: ['confirmed', 'pending'][Math.floor(Math.random() * 2)],
      },
    },
    {
      id: 3,
      allDay: true,
      start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -7),
      extendedProps: {
        calendar: 'KA 102 Open Lab',
        guests: ['Donna Frank', 'Jane Foster', 'Gabrielle Robertson'],
        status: ['confirmed', 'pending'][Math.floor(Math.random() * 2)],
      },
    },
    {
      id: 4,
      start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
      allDay: true,
      extendedProps: {
        calendar: 'KA 102 Rotavap',
        guests: ['Donna Frank'],
        status: ['confirmed', 'pending'][Math.floor(Math.random() * 2)],
      },
    },
    {
      id: 5,
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'KA 102 Weighing Room',
        guests: ['Donna Frank', 'Jane Foster', 'Gabrielle Robertson'],
        status: ['confirmed', 'pending'][Math.floor(Math.random() * 2)],
      },
    },
    {
      id: 6,
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'KA 102 Rotavap',
        guest: ['Donna Frank'],
        status: ['confirmed', 'pending'][Math.floor(Math.random() * 2)],
      },
    },
    {
      id: 7,
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'KA 101',
        guests: ['Donna Frank', 'Jane Foster', 'Gabrielle Robertson'],
        status: ['confirmed', 'pending'][Math.floor(Math.random() * 2)],
      },
    },
    {
      id: 8,
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'IB 109',
        guests: ['Donna Frank', 'Jane Foster', 'Gabrielle Robertson'],
        status: ['confirmed', 'pending'][Math.floor(Math.random() * 2)],
      },
    },
    {
      id: 9,
      start: nextMonth,
      end: nextMonth,
      allDay: true,
      extendedProps: {
        calendar: 'IB 109',
        guests: ['Donna Frank', 'Jane Foster', 'Gabrielle Robertson'],
        status: ['confirmed', 'pending'][Math.floor(Math.random() * 2)],
      },
    },
    {
      id: 10,
      start: prevMonth,
      end: prevMonth,
      allDay: true,
      extendedProps: {
        calendar: 'KA 102 Rotavap',
        guest: ['Donna Frank'],
        status: ['confirmed', 'pending'][Math.floor(Math.random() * 2)],
      },
    },
  ],
}

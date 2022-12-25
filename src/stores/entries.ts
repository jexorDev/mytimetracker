import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TimeEntryRecord } from '@/interfaces/TimeEntry'

export const userEntriesStore = defineStore('entries', () => {
  const timeEntries = ref([] as TimeEntryRecord[])
  function refresh() {
    const entries = localStorage.getItem('entries');
    if (entries) {
      timeEntries.value = JSON.parse(entries);

    }
  }
  function add(record: TimeEntryRecord) {
    timeEntries.value.push(record);
    localStorage.setItem('entries', JSON.stringify(timeEntries.value));
  }
  function update(record: TimeEntryRecord) {
    timeEntries.value = timeEntries.value.filter(x => x.start !== record.start);
    timeEntries.value.push(record);
    localStorage.setItem('entries', JSON.stringify(timeEntries.value));

  }
  function remove(record: TimeEntryRecord) {
    timeEntries.value = timeEntries.value.filter(x => x.start !== record.start);
    localStorage.setItem('entries', JSON.stringify(timeEntries.value));

  }

  return { timeEntries, add, update, remove, refresh }
})

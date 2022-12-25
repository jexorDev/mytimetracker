<script setup lang="ts">
import dayjs from 'dayjs'
import {ref, computed} from 'vue';
import type {TimeEntryRecord} from "@/interfaces/TimeEntry";
import {userEntriesStore} from "@/stores/entries";
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear)

    const store = userEntriesStore();

    const selectedDate = ref(dayjs().format("MM/DD/YYYY"));
    //const selectedDate = ref("test");
    const entryStart = ref(dayjs().format("HH:mm"))
    const entryEnd = ref("")
    const todaysTimeEntries = computed(() => {
        return store.timeEntries.filter(x => x.start.split(" ")[0] === dayjs(selectedDate.value).format("MM/DD/YYYY"));
    })

    //const entries = ref([] as TimeEntryRecord[])

    function createEntry() {
        store.add({
            start: dayjs(selectedDate.value).hour(parseInt(entryStart.value.split(":")[0])).minute(parseInt(entryStart.value.split(":")[1])).format("MM/DD/YYYY HH:mm"),
            end: entryEnd.value === "" ? "" : dayjs(selectedDate.value).hour(parseInt(entryEnd.value.split(":")[0])).minute(parseInt(entryEnd.value.split(":")[1])).format("MM/DD/YYYY HH:mm")
        })
    }

    function endEntry(startEntry: TimeEntryRecord) {
        store.update({...startEntry, end: dayjs().format("MM/DD/YYYY HH:mm")});
    }

    function deleteEntry(entry: TimeEntryRecord) {
        store.remove(entry);

    }

    function prevClick() {
        selectedDate.value = dayjs(selectedDate.value).add(-1, 'day').format("MM/DD/YYYY");
    }

    function nextClick() {
        selectedDate.value = dayjs(selectedDate.value).add(1, 'day').format("MM/DD/YYYY");
    }

    const dayHoursTotal = computed(() => {
        const todaysEntries = todaysTimeEntries.value.filter(x => x.end !== '').filter(x => x.start.split(" ")[0] === dayjs(selectedDate.value).format("MM/DD/YYYY"));
        let totalMinutes = 0;

        for (const entry of todaysEntries) {
            totalMinutes += dayjs(entry.end).diff(entry.start, "minute");
        }

        console.log(totalMinutes)

        const hours = totalMinutes / 60;
        const minutes = hours < 1 ? totalMinutes : totalMinutes % 60;
        if (hours < 1) {
            return `${minutes} min`
            
            } else {
            return `${parseInt(hours.toString())} hrs ${minutes} min`;
        }
    })

    const weekHoursTotal = computed(() => {
        const weekEntries = store.timeEntries.filter(x => x.end !== '').filter(x => dayjs(x.start.split(" ")[0]).week() === dayjs(selectedDate.value).week());
        let totalMinutes = 0;

        for (const entry of weekEntries) {
            totalMinutes += dayjs(entry.end).diff(entry.start, "minute");
        }

        console.log(totalMinutes)

        const hours = totalMinutes / 60;
        const minutes = hours < 1 ? totalMinutes : totalMinutes % 60;
        if (hours < 1) {
            return `${minutes} min`
            
            } else {
            return `${parseInt(hours.toString())} hrs ${minutes} min`;
        }
    })


</script>
<template>
<div>
    <v-row>
        <v-col :cols="2">
<v-btn @click="prevClick">Prev</v-btn>
        </v-col>
        <v-col :cols="8">
    <div class="text-overline">Entry Date</div>
    <v-text-field v-model="selectedDate"></v-text-field>

        </v-col>
        <v-col :cols="2">
<v-btn @click="nextClick">Next</v-btn>
        </v-col>

    </v-row>
    <v-row>
        <v-col>
    <div class="text-overline">Start Time</div>
    <v-text-field v-model="entryStart"></v-text-field>
        </v-col>
<v-col>
<div class="text-overline">End Time</div>
    <v-text-field v-model="entryEnd"></v-text-field>
</v-col>
    </v-row>
    <v-row>
        <v-col>

    <v-btn color="primary" @click="createEntry">Start</v-btn>
        </v-col>

    </v-row>
    <v-row>
        <v-col>
    <div class="text-overline">Entries</div>
   <v-table>
    <thead>
      <tr>
        <th class="text-overline text-left">
          Start
        </th>
        <th class="text-overline text-left">
          End
        </th>
        <th>

        </th>
        <th>

        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="entry in todaysTimeEntries"
        :key="entry.start"
      >
        <td>{{ entry.start }}</td>
        <td>{{ entry.end }}</td>
        <td>
            <v-btn v-show="entry.end === ''" @click="endEntry(entry)">End</v-btn>
        </td>
        <td>
            <v-btn @click="deleteEntry(entry)">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <div class="text-overline">Today</div>
            <div v-text="dayHoursTotal"></div>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <div class="text-overline">This Week</div>
            <div v-text="weekHoursTotal"></div>
        </v-col>
    </v-row>
    
</div>
</template>
<script setup lang="ts">
import * as dayjs from 'dayjs'
import {ref, computed} from 'vue';
import type {TimeEntryRecord} from "@/interfaces/TimeEntry";

    const selectedDate = ref(dayjs().format("MM/DD/YYYY"));
    //const selectedDate = ref("test");
    const entryStart = ref(dayjs().format("HH:mm"))
    const entryEnd = ref("")

    const entries = ref([] as TimeEntryRecord[])

    function createEntry() {
        entries.value.push({
            start: dayjs(selectedDate.value).hour(entryStart.value.split(":")[0]).minute(entryStart.value.split(":")[1]).format("MM/DD/YYYY HH:mm"),
            end: entryEnd.value === "" ? "" : dayjs(selectedDate.value).hour(entryEnd.value.split(":")[0]).minute(entryEnd.value.split(":")[1]).format("MM/DD/YYYY HH:mm")
        })
    }

    function endEntry(startEntry: string) {
        const record = entries.value.find(x => x.start === startEntry);

        if (!record)
        {
            console.log("unable to find record");
            return;
        }

        record.end = dayjs().format("MM/DD/YYYY HH:mm");
    }

    function deleteEntry(startEntry: string) {


        entries.value = entries.value.filter(x => x.start !== startEntry)
    }

    const dayHoursTotal = computed(() => {
        const todaysEntries = entries.value.filter(x => x.start.split(" ")[0] === dayjs(selectedDate.value).format("MM/DD/YYYY"));
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


</script>
<template>
<div>
    <v-row>
        <v-col>
    <div class="text-overline">Entry Date</div>
    <v-text-field v-model="selectedDate"></v-text-field>

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
        v-for="entry in entries"
        :key="entry.start"
      >
        <td>{{ entry.start }}</td>
        <td>{{ entry.end }}</td>
        <td>
            <v-btn v-show="entry.end === ''" @click="endEntry(entry.start)">End</v-btn>
        </td>
        <td>
            <v-btn @click="deleteEntry(entry.start)">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <div v-text="dayHoursTotal"></div>
        </v-col>
    </v-row>
    
</div>
</template>
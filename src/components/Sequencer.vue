<script setup lang="ts">
import { useSequencerStore } from '~/stores/sequencer'

const sequencerStore = useSequencerStore()

function addSequence() {
  sequencerStore.addSequence()
}

function removeSequence(index: number) {
  sequencerStore.removeSequence(index)
}

function updateSequenceStart(index: number, event: Event) {
  const value = Number.parseInt((event.target as HTMLInputElement).value)
  sequencerStore.updateSequence(index, { start: value })
}

function updateSequenceEnd(index: number, event: Event) {
  const value = Number.parseInt((event.target as HTMLInputElement).value)
  sequencerStore.updateSequence(index, { end: value })
}

function updateTotalPatterns(event: Event) {
  const value = Number.parseInt((event.target as HTMLInputElement).value)
  sequencerStore.setTotalPatterns(value)
}
</script>

<template>
  <div class="sequencer">
    <div class="sequencer-header">
      <h2>Séquenceur</h2>
      <div class="sequence-count">
        Nombre de séquences : {{ sequencerStore.sequenceCount }}
      </div>
    </div>

    <div class="sequences">
      <div v-for="(sequence, index) in sequencerStore.sequences" :key="index" class="sequence">
        <div class="sequence-header">
          <h3>Séquence {{ index + 1 }}</h3>
          <button class="remove-btn" @click="removeSequence(index)">
            ×
          </button>
        </div>
        <div class="sequence-controls">
          <div class="control-group">
            <label>Début (pattern)</label>
            <input
              type="number"
              :value="sequence.start"
              :min="1"
              :max="sequence.end"
              @input="updateSequenceStart(index, $event)"
            >
          </div>
          <div class="control-group">
            <label>Fin (pattern)</label>
            <input
              type="number"
              :value="sequence.end"
              :min="sequence.start"
              :max="sequencerStore.totalPatterns"
              @input="updateSequenceEnd(index, $event)"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="sequencer-footer">
      <div class="total-patterns-control">
        <label>Nombre total de patterns :</label>
        <input
          type="number"
          :value="sequencerStore.totalPatterns"
          min="1"
          @input="updateTotalPatterns($event)"
        >
      </div>
      <button class="add-sequence-btn" @click="addSequence">
        Ajouter une séquence
      </button>
    </div>
  </div>
</template>

<style scoped>
.sequencer {
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.sequencer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.sequence {
  background: var(--bg-primary);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  position: relative;
}

.sequence-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.remove-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
}

.remove-btn:hover {
  color: var(--error-color);
}

.sequence-controls {
  display: flex;
  gap: 1rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.control-group input {
  width: 80px;
  padding: 0.25rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.sequencer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.total-patterns-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.total-patterns-control input {
  width: 60px;
  padding: 0.25rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.add-sequence-btn {
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-sequence-btn:hover {
  opacity: 0.9;
}
</style>

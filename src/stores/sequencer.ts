import { acceptHMRUpdate, defineStore } from 'pinia'

interface Sequence {
  start: number
  end: number
}

export const useSequencerStore = defineStore('sequencer', {
  state: () => ({
    sequences: [] as Sequence[],
    totalPatterns: 16,
  }),

  actions: {
    addSequence() {
      this.sequences.push({
        start: 1,
        end: this.totalPatterns,
      })
    },

    removeSequence(index: number) {
      this.sequences.splice(index, 1)
    },

    updateSequence(index: number, sequence: Partial<Sequence>) {
      if (sequence.start !== undefined) {
        this.sequences[index].start = Math.max(1, Math.min(sequence.start, this.sequences[index].end))
      }
      if (sequence.end !== undefined) {
        this.sequences[index].end = Math.min(this.totalPatterns, Math.max(sequence.end, this.sequences[index].start))
      }
    },

    setTotalPatterns(count: number) {
      this.totalPatterns = Math.max(1, count)
      // Ajuster les séquences existantes si nécessaire
      this.sequences.forEach((sequence) => {
        if (sequence.end > this.totalPatterns) {
          sequence.end = this.totalPatterns
        }
        if (sequence.start > sequence.end) {
          sequence.start = sequence.end
        }
      })
    },
  },

  getters: {
    sequenceCount: state => state.sequences.length,
    isValid: (state) => {
      return state.sequences.every(sequence =>
        sequence.start >= 1
        && sequence.end <= state.totalPatterns
        && sequence.start <= sequence.end,
      )
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSequencerStore, import.meta.hot))
}

export interface Formation {
  school: string
  diploma: string
  startYear: string
  endYear: string
  city: string
}
export interface Element<T> {
  title: string
  items: T[]
}
interface Contact {
  icon: string
  label: string
  value: string

}
interface Language {
  label: string
  value: string
}

export interface Header {
  name: string
  job: string
  description: string
}

export interface Competence {
  name: string
  percentage: number
  icon: string
  moreIcons?: string[]
}

export interface Mission {
  name: string
  actions: string[]
}

export interface Experience {
  company: string
  city: string
  job: string
  missions: Mission[]
  startDate: string
  endDate?: string
}

export interface CV {
  header: Header
  contact: Element<Contact>
  languages: Element<Language>
  formations: Element<Formation>
  competences: Element<Competence>
  experiences: Element<Experience>
  softwaresAndTechnologies: Element<Competence>
  passions: Element<string>
}

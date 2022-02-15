import { atom } from "recoil";

export const symptomAtom = atom<string[]>({
    key : 'symptom',
    default: []
})

export const modalAtom = atom({
    key : 'modal',
    default: false
})
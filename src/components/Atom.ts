import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: 'storedata', // this key is using to store data in local storage
    storage: sessionStorage, // configurate which stroage will be used to store the data
  })

export const symptomAtom = atom<string[]>({
    key : 'symptom',
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const modalAtom = atom({
    key : 'modal',
    default: false
})

export const wikiDocsAtom = atom({
    key: 'wikiDocs',
    default: []
})

export const docIdAtom = atom({
    key: 'docid',
    default: '',
    effects_UNSTABLE: [persistAtom],
})
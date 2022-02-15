import Swal from 'sweetalert2'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { symptomAtom } from './components/Atom'

/* export const DeleteAlert = (symptom : string) => {
 const [symptoms, setSymptoms] = useRecoilState(symptomAtom)

  return Swal.fire({
    title: '이 증상을 삭제하시겠습니까?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '삭제!',
    cancelButtonText: '취소'
  }).then((result) => {
    if (result.isConfirmed) {
      /* setSymptoms(()=> symptoms.filter((symps) => symps !== symptom))     
    }
  })}  이렇게 실패함*/

  export const DeleteAlert = (symptom : string) => {
     return Swal.fire({
       title: '이 증상을 삭제하시겠습니까?',
       text: "You won't be able to revert this!",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: '삭제!',
       cancelButtonText: '취소'
     }).then((result) => {
       if (result.isConfirmed) {
        
       }
     })}
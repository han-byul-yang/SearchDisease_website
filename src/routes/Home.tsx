import { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import styled from 'styled-components'
import Top from '../components/Head'
import { newwords3, newwords4 } from '../data/Symptomdic'
import {DeleteAlert} from '../Modal'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalAtom, symptomAtom } from '../components/Atom'
import Swal from 'sweetalert2'
import Wikipedia from '../Api'

const Body = styled.div`
display: flex;
flex-direction: column;
position: relative;
` 

const Notice = styled.div`
margin-bottom: 1vh;
`

const SearchBox = styled.form`
margin: 28vh auto 0;
position: relative;
`

const Search = styled.input`
width: 85vh;
height: 8vh;
border-radius: 1em;
margin-right: 1vh;
`

const Button = styled.button`
width: 7vh;
height: 7vh;`

const Box = styled.li`
position: relative;
width: 12vh;
height: 7vh;
margin-right: 2.5vh;
border-radius: 1.4rem;
text-align: center;
color: black;
background: #e9e2d0;`

const Symptoms = styled.ul`
position: relative;
margin-top: 3vh;
display: flex;
flex-direction: row;
width: 90vh;`

const SeeResult = styled.button`
display: inline-block;
position: absolute;
width: 30vh;
height: 12vh;
margin-left: 50%;
transform: translateX(-50%);
margin-top: 70vh;
z-index: -1;
`

const Droplist = styled.div`
width: 84vh;
overflow: auto;`

const Ops = styled.div`
width: 82vh;
height: 4vh;
background: black;`

interface Symptom {
    search : string,
}
interface List {
    data : string,
}

function Home (){
    const { register, watch, handleSubmit, formState, setError, setValue} = useForm<Symptom>();
    const [symptoms, setSymptoms] = useRecoilState<string[]>(symptomAtom)
    const [dropword, setDropWord] = useState<string[]>([])

    useEffect(()=>{
        Wikipedia()
    })

    const Searchfunc = ({search} : Symptom) => {
        setValue('search', '')
        setDropWord([])
        if (symptoms.indexOf(search) !== -1){
            setError('search', {message: '이미 입력된 증상입니다.'}) //여기서 에러 메시지 띄우기
        } else {
        setSymptoms((old) => [search, ...old])
        }
    }

    const chooseWord = (word : string) => {
        if (symptoms.indexOf(word) !== -1){
            setError('search', {message: '이미 입력된 증상입니다.'})
        } else {
        setSymptoms((old) => [word, ...old])
        }
        setDropWord([])
        setValue('search', '')
    }

    const onRemove = (symptom: string) => {
        Swal.fire({
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
                setSymptoms(()=> symptoms.filter((symps) => symps !== symptom))   
            } 
          })
    }

    const change = (e: any) => { //any 대신
        const curwords = newwords4.filter((word) => (word.includes(e.target.value)))
        if (e.target.value === ''){
            setDropWord([])
        } else {
        setDropWord(curwords)
        }
    }
 
    return (
        <>
        <Top />
        <Body>
        <SearchBox onSubmit={handleSubmit(Searchfunc)}>
            <Notice>*증상을 많이 입력할 수록 정확한 결과가 나옵니다. </Notice>
            <Search {...register('search', {required: '증상을 입력해주세요', onChange: (e) => change(e)})} type="text" placeholder='현재 나의 증상은?'></Search>
                <Droplist>
                    {dropword.map((word, idx) => <Ops key={idx} onClick={() => chooseWord(word)}>{word}</Ops>)}
                </Droplist>
            <Button onClick={handleSubmit(Searchfunc)}>+</Button> 
            <Symptoms>
                {symptoms.map((symptom) => <Box key={symptom} onClick={()=> onRemove(symptom)}>{symptom}</Box>)}
            </Symptoms>
        </SearchBox>
        <SeeResult>결과 보기</SeeResult>
        </Body>
        </>
    )
}

export default Home
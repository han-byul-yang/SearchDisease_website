import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Top from '../components/Head'
import { newwords4 } from '../data/Symptomdic'
import { useRecoilState } from 'recoil'
import { symptomAtom } from '../components/Atom'
import Swal from 'sweetalert2'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"


const Body = styled.div`
display: flex;
flex-direction: column;
position: relative;
`

const Notice = styled.div`
margin-bottom: 1vh;
`

const SearchBox = styled.form`
margin: 26vh auto 0;
position: relative;
`

const SearchForm = styled.div`
position: relative;
width: 86vh;
height: 8.1vh;
`

const Search = styled.input`
position: absolute;
width: 85vh;
height: 8vh;
background: rgba(0,0,0,0.3);
border: none;
margin-right: 1vh;
`

const MagnifyingGlassIcon = styled.div`
position: absolute;
transform: scale(2) ;
right: 2rem;
top: 1.3rem;`

const SymptomText = styled.div`
margin-top: 1.4rem;
`
const Symptoms = styled.ul`
position: relative;
margin-top: 3vh;
display: flex;
flex-direction: row;
width: 90vh;`

const Box = styled.li`
position: relative;
width: 13vh;
height: 6.8vh;
margin-right: 2.5vh;
border-radius: 1.4rem;
border: 2px solid white;
text-align: center;
padding-top: 15px;
color: white;
background: rgba(0,0,0,0);`

const SeeResult = styled.button`
display: inline-block;
position: absolute;
width: 37vh;
height: 11vh;
margin-left: 50%;
transform: translateX(-50%);
margin-top: 8rem;
background: #FBF7F7;
color: #003D51;
border: none;
border-radius: 10px;
font-size: 18px;
font-family: 'OTWelcomeRA';
`

const DropDownList = styled.div`
position: absolute;
width: 85vh;
overflow: auto;
z-index: 100;`

const Ops = styled.div`
width: 85vh;
height: 4vh;
background: black;`

interface Symptom {
    inputSymtoms: string,
}

function Home({history}) {
    const { register, handleSubmit, setError, setValue } = useForm<Symptom>();
    const [symptomList, setSymptomList] = useRecoilState<string[]>(symptomAtom)
    const [dropDownWords, setDropDownWords] = useState<string[]>([])

    const submitSymptom = ({ inputSymtoms }: Symptom) => {
        if (symptomList.indexOf(inputSymtoms) !== -1) {
            setError('inputSymtoms', { message: '?????? ????????? ???????????????.' }) //????????? ?????? ????????? ?????????
        } else {
            setSymptomList((oldSymptoms) => [inputSymtoms, ...oldSymptoms])
        }
        setDropDownWords([]) //?????? ????????? ?????? ?????? ??????
        setValue('inputSymtoms', '') //?????? ????????? ?????? ?????? ??????
    }

    const chooseSymptom = (dropDownWord: string) => {
        if (symptomList.indexOf(dropDownWord) !== -1) {
            setError('inputSymtoms', { message: '?????? ????????? ???????????????.' }) //????????? ?????? ????????? ?????????
        } else {
            setSymptomList((oldSymptoms) => [dropDownWord, ...oldSymptoms])
        }
        setDropDownWords([]) //?????? ????????? ?????? ?????? ??????
        setValue('inputSymtoms', '') //?????? ????????? ?????? ?????? ??????
    }

    const onRemove = (removeSymptom: string) => {
        Swal.fire({
            title: '??? ????????? ?????????????????????????',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '??????!',
            cancelButtonText: '??????'
        }).then((result) => {
            if (result.isConfirmed) {
                setSymptomList(() => symptomList.filter((symptom) => symptom !== removeSymptom))
            }
        })
    }

    const showDropDown = (e: any) => { //any ??????
        const currentWords = newwords4.filter((word) => (word.includes(e.target.value)))
        if (e.target.value === '') {
            setDropDownWords([])
        } else {
            setDropDownWords(currentWords)
        }
    }

    const toResultPage = () => {
        history.push('/result')
    }

    return (
        <>
            <Body>
            <Top />
                <SearchBox onSubmit={handleSubmit(submitSymptom)}>
                    <Notice>*????????? ?????? ????????? ?????? ????????? ????????? ????????????. </Notice>
                    <SearchForm onSubmit={handleSubmit(submitSymptom)}>
                    <Search {...register('inputSymtoms', { required: '????????? ??????????????????', onChange: (e) => showDropDown(e) })} type="text" placeholder='?????? ?????? ??????????'></Search>
                    <MagnifyingGlassIcon onClick={handleSubmit(submitSymptom)}><FontAwesomeIcon icon={faMagnifyingGlass} /></MagnifyingGlassIcon>
                    </SearchForm>
                    <DropDownList>
                        {dropDownWords.map((dropDownWord, idx) => <Ops key={idx} onClick={() => chooseSymptom(dropDownWord)}>{dropDownWord}</Ops>)}
                    </DropDownList>
                    <SymptomText>?????? ?????? ...</SymptomText>
                    <Symptoms>
                        {symptomList.map((symptom) => <Box key={symptom} onClick={() => onRemove(symptom)}>{symptom}</Box>)}
                    </Symptoms>
                    <SeeResult onClick={toResultPage}>?????? ??????</SeeResult>
                </SearchBox>
            </Body>
        </>
    )
}

export default withRouter(Home)
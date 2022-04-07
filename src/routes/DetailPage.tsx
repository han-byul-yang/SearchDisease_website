import React, { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil'
import { docIdAtom } from '../components/Atom'
import axios from 'axios'
import styled from "styled-components";
import Top from "../components/Head";

const Body = styled.div`
display: flex;
flex-direction: column;
`
const Button = styled.div`
margin-left: auto;
margin-right: auto;
width: 70rem;
height: auto;`

const SearchHospital = styled.button`
border: none;
border-radius: 5px;
padding: 14px 23px;
color: #002133;
font-family: 'OTWelcomeRA';
font-size: 14px;
margin-right: 15px;
margin-top: 2.7rem;
`

const GoCommunity = styled(SearchHospital)``

const Form = styled.div`
margin-left: auto;
margin-right: auto;
margin-top: 1rem;
width: 70rem;
height: auto;
min-height: 37rem;
background: whitesmoke;
color: black;`

const Title = styled.div``

const Description = styled.div``
interface Container {
    num: number;
}
const Text = styled.div<Container>`
padding-top: ${(props) => (props.num % 2 === 0 ? '10px' : '30px')};
font-size: ${(props) => (props.num % 2 === 0 ? '15px' : '20px')};
color: ${(props) => (props.num % 2 === 0 ? 'black' : '#4598C7')};
padding-left: 2rem;
padding-right: 2rem;
&:first-child {
    padding-top: 3rem;
}`

const Plant = styled.div<Container>`
background-image: url(${(props) => (props.num % 2 === 0 ? '' : `${process.env.PUBLIC_URL}/plant.png`)});
background-size :contain;
width: 23px;
height: 27px;
position: absolute;`

function DetailPage(): JSX.Element {
    const docId = useRecoilValue(docIdAtom)
    const [docText, setDocText] = useState('')

    const searchWikiDocs = async () => {
        await axios.get(`/w/api.php?pageids=${docId}&prop=pageimages%7Ccirrusdoc&piprop=original%7Cname`
            , {
                params: {
                    action: 'query'
                    , format: 'json'
                    , converttitles: 1
                    , utf8: 1
                }
            }).then((response) => {
                setDocText(response.data.query.pages[`${docId}`].cirrusdoc[0].source.source_text); //split을 따로 빼야하나 고민 
            })
    }

    useEffect(() => {
        searchWikiDocs()
    }, [])
    useEffect(() => {
        if (docText !== '') {
            console.log(docText.replace(/\<ref.{0,}\>.+\<\/ref\>/g, '').replace(/\{\{.{0,}\}\}/g, '').replace(/\[\[/g, '').replace(/\]\]/g, '').replace(/\=\= 같이 보기 \=\=\n{0,}.{0,}/m, '').trim().replace(/\=\=\=/g, '=='))
        }
    }, [docText])

    return <Body>
        <Top />
        <Button>
            <SearchHospital>병원 찾기</SearchHospital>
            <GoCommunity>커뮤니티</GoCommunity>
        </Button>
        <Form>
            <Title></Title>
            <Description>
                {/* {docText.map((txt, idx)=> <Text key={txt} num={idx}>{txt}</Text>)} */}
                {docText.replace(/\<ref.{0,}\>.+\<\/ref\>/g, '').replace(/\<ref.{0,}\>/g, '').replace(/\{\{.{0,}\}\}/g, '').replace(/\[\[/g, '').replace(/\]\]/g, '').replace(/\=\= 같이 보기 \=\=\n{0,}.{0,}/m, '').replace(/\=\= 각주 \=\=\n{0,}.{0,}/m, '').replace(/\=\= 외부 링크 \=\=\n{0,}.{0,}/m, '').trim().replace(/\=\=\=/g, '==').split(/\=\=/).map((txt, idx) => 
                <><Plant num={idx} /><Text key={idx} num={idx}>{txt}</Text></>)}
            </Description>
        </Form>
    </Body>
}

export default DetailPage
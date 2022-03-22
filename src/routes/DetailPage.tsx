import React, { useEffect, useState } from "react";
import {useRecoilValue} from 'recoil'
import {docIdAtom} from '../components/Atom'
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

const GoCommunity =styled(SearchHospital)``

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

const Text = styled.div``

function DetailPage () {
    const docId = useRecoilValue(docIdAtom)
    const [docText, setDocText] = useState([])

    const searchWikiDocs = async () => {
        await axios.get(`/w/api.php?pageids=${docId}&prop=pageimages%7Ccirrusdoc&piprop=original%7Cname`
            , {
                params: {
                    action: 'query'
                    , format: 'json'
                    , converttitles: 1
                    , utf8: 1
                }
            }).then((response) => {setDocText(response.data.query.pages[`${docId}`].cirrusdoc[0].source.source_text.split('==')); //split을 따로 빼야하나 고민 
})
    }

    useEffect(() => {
        searchWikiDocs()
    }, [])


    return <Body>
        <Top />
        <Button>
        <SearchHospital>병원 찾기</SearchHospital>
        <GoCommunity>커뮤니티</GoCommunity>
        </Button>
        <Form>
            <Title></Title>
            <Description>
                {docText.map((txt)=> <Text>{txt}</Text>)}
            </Description>
        </Form>
    </Body>
}

export default DetailPage
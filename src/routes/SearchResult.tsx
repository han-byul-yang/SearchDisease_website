import React, {useState, useEffect} from "react"
import { withRouter } from "react-router-dom"
import axios from "axios"
import { docIdAtom, symptomAtom, wikiDocsAtom } from '../components/Atom'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import styled from "styled-components"
import Top from "../components/Head"

const Body = styled.div``

const SearchNumber = styled.h1`
margin-top: 5rem;
text-align: center;
font-size: 20px;`


const ResultForm = styled.div`
position: relative;
display: flex;
flex-direction: column;
margin: 0 auto;
margin-top: 23px;
width: 77vw;
min-height: 70vh;
background: rgba(0,0,0,0.5);
color: black;
font-family: 'YanoljaYacheR';
&::selection { color: white; background: red; }`

const DocSingle = styled.div`
position: relative;
display: flex;
flex-direction: row;
margin: 3px;
width: 70rem;
height: 15rem;
border-radius: 11px;
background: white;
transform: translateX(-50%);
margin-left: 50%;
&:first-child {margin-top: 40px};
&:last-child{margin-bottom: 40px};`

const DocPicture = styled.img`
padding: 10px;
width: 200px;
height: 230px;`

const DocText = styled.div`
position: relative;
width: 63rem;
height: 13rem;
margin-left: 1rem;
margin-top: 1rem;`

const DocTitle = styled.div`
position: relative;
font-size: 27px;
border-bottom: solid black 1px;
padding-bottom: 0.5rem;`

const DocDescription = styled.div`
position: relative;
width: 55rem;
font-size: 19px;
line-height: 25px;
margin-top: 0.1rem;`

const Tags = styled.div`
position: absolute;
display: flex;
flex-direction: row;
bottom: 0.5rem;
`

const Tag = styled.button`
border: none;
outline: none;
margin-right: 1rem;
padding: 0.4rem;
color: white;
background: #002E3D;
border-radius: 5px;`

function SearchResult ({history}) {
    const [wikiDocs, setWikiDocs] = useRecoilState(wikiDocsAtom)
    const symptomList = useRecoilValue(symptomAtom)
    const setDocId = useSetRecoilState(docIdAtom)
    const [wikiListDocsIds, setWikiListDocsIds] = useState([])
    const [wikiListDocs, setWikiListDocs] = useState([])
    
    //api 컴포넌트 따로 분리 할 필요 있음
    useEffect(()=> {
        searchWikiList(symptomList)
    },[])

    useEffect(() => {
        if (wikiListDocsIds !== []) {
            searchWikiDocs(wikiListDocsIds)
        }
    }, [wikiListDocsIds])

    useEffect(()=>{
        if (wikiListDocs !== []) {
            pickWikiSymptomDocs(wikiListDocs)
        }
    }, [wikiListDocs])

    const searchWikiList = async(symptomList: any[]) => {
        const words = symptomList.join('%2C%20')
        await axios.get(`/w/api.php?srsearch=${words}`,
            {
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'search',
                    converttitles: 1,
                    utf8: 1,
                    srlimit: 20,
                    srqiprofile: 'engine_autoselect'
                }
            }).then(async (response: any) => {setWikiListDocsIds( await response.data.query.search)})
    } 
    const searchWikiDocs = async (wikiListDocsIds: any[]) => {
        const wikiIdsString = wikiListDocsIds.map((wikiListDosId) => wikiListDosId.pageid).join('%7C')
        await axios.get(`/w/api.php?pageids=${wikiIdsString}&prop=pageimages%7Ccirrusdoc&piprop=original%7Cname`
            , {
                params: {
                    action: 'query'
                    , format: 'json'
                    , converttitles: 1
                    , utf8: 1
                }
            }).then((response) => {setWikiListDocs(response.data.query.pages); })
    }

    const pickWikiSymptomDocs = async (wikiListDocs: any[]) => {
        const wikiListValues = Object.values(wikiListDocs)
        const wikiSymptomDocs = wikiListValues.filter((wikiListValue) => {return wikiListValue.cirrusdoc[0].source.template.indexOf("틀:질병 정보") !== -1})
        setWikiDocs(wikiSymptomDocs)
        console.log(wikiSymptomDocs)
    } //여기까지 api 컴포넌트///

    const storeDocId = (doc) => {
        setDocId(doc.pageid)
    } 

    const movetoDetailpage = () => {
        history.push('/detail')
    }

    const onClick = (doc) => {
        storeDocId(doc)
        movetoDetailpage()
    }

    return <Body>
        <Top />
        <SearchNumber>검색 결과 {wikiDocs.length} 건</SearchNumber>
        <ResultForm>
            {wikiDocs.map((wikiDoc) => 
            {return <DocSingle key={wikiDoc.pageid} onClick={() => onClick(wikiDoc)}>
                <DocPicture alt={wikiDoc.title} src={wikiDoc.original ? wikiDoc.original.source : `${process.env.PUBLIC_URL}/nobookimg.jpg`}></DocPicture>
                <DocText>
                    <DocTitle>{wikiDoc.title}</DocTitle>
                    <DocDescription>{wikiDoc.cirrusdoc[0].source.text.slice(0,350)}...</DocDescription>
                    <Tags>
                        {wikiDoc.cirrusdoc[0].source.redirect.slice(0,6).map((tag) => <Tag>{tag.title}</Tag>)}
                    </Tags>
                </DocText>
            </DocSingle>})} 
        </ResultForm>
    </Body>
}

export default withRouter(SearchResult)
import React from "react";
import {useRecoilValue} from 'recoil'
import {docIdAtom} from '../components/Atom'

function DetailPage () {
    const docId = useRecoilValue(docIdAtom)

    return <div>{docId}</div>
}

export default DetailPage
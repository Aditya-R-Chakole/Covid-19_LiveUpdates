import { Card, CardContent } from '@material-ui/core'
import React from 'react'

import './infobox.css';

function Infobox({title, number, total, color, onClick, ifActive}) {
    const bgColor = (ifActive)?(color+"40"):("white"); 
    const textColor = (ifActive)?("#4056A1"):(color);
    return (
        <Card className="infobox"
            style={{borderLeft:`10px solid ${color}`, color:`${textColor}`, backgroundColor:`${bgColor}`}}
            onClick={onClick}>
            <CardContent>
                <div className="cardLeft">
                    {/* title */}
                    <div className="infobox__title">
                        <b>{title}</b>
                    </div>
                </div>
            </CardContent>
            <CardContent>
                <div className="cardRight">
                    {/* total */}
                    <div className="infobox__total">
                        <b>{number}</b> <br /> {total} <b>Total</b>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Infobox

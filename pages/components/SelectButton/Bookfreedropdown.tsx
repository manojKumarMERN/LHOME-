import React from 'react';
import {Input} from 'reactstrap';
export function Bookfreedropdown() {
    const [title, setTitle] = React.useState("");
    return (
        <>
            <div>
                <Input
                    type="select"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="selectTitle"
                >
                    <option hidden>Title</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mr.">Mr.</option>
                </Input>
            </div>
        </>
    )
}
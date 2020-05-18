import React from 'react'

const Filter = (props) => {

    return (
        <div className="filter">
            Filter: <input value={props.value} onChange={props.onChange} />
        </div>
    )
}

export default Filter
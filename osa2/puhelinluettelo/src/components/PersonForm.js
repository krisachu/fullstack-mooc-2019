import React from 'react'

const PersonForm = (props) => {

    return (
        <form onSubmit={props.onSubmit} className="add-new-form">
            <div>
                Name: <input value={props.nameValue}
                    onChange={props.onNameChange} />
            </div>
            <div>
                Number: <input value={props.numberValue} onChange={props.onNumberChange} />
            </div>
            <div>
                <button type="submit" className="add-button">Add</button>
            </div>
        </form>
    )
}

export default PersonForm
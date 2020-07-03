import React from "react";

const Form = ({ addPerson, newName, handleChange, handleChange2, newNumber }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleChange2} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
};
export default Form;
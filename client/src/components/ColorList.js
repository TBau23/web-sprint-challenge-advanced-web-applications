import React, { useState } from "react";
import {  axiosWithAuth } from '../utils/axiosWithAuth'


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false)
  const [newColor, setNewColor] = useState(initialColor)
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  
  

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = (e) => {
    e.preventDefault()
    setAdding(true)    
  }

  const postColor = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/api/colors', newColor)
      .then(res => {
        updateColors(res.data)
        setNewColor(initialColor)
      })
      .catch(error => {console.log(error)})
      
  }

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res)
        updateColors(colors.map(col => {
          if (col.id === res.data.id) {
            return res.data
          } else {
            return col
          }
        }))
        

      })
      .catch(error => {console.log(error)})
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(col => col.id !== color.id))
      })
      .catch(error => {console.log(error)})
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span data-testid='test'>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
          
        ))}
        <button onClick={addColor}>Add Color</button>
      </ul>
      {adding && (
        <form onSubmit={postColor}>
          <label> color name: &nbsp;
            <input
            type='text'
            value={newColor.color}
            onChange={e => setNewColor({ ...newColor, color: e.target.value})}
            />
          </label>

          <label> hex code: &nbsp;
            <input
            type='text'
            value={newColor.code.hex}
            onChange={e => 
              setNewColor({
                ...newColor,
                code: { hex: e.target.value}
              })}
            />
          </label>
          <button type='submit'>Add</button>
          <button onClick={() => setAdding(false)}>Cancel</button>
        </form>
      )}


      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;

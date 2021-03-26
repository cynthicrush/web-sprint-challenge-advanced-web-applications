import React, { useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { axiosWithAuth } from "../helpers/axiosWithAuth";

import axios from "axios";

import EditMenu from './EditMenu';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const { id } = useParams();
  const { push } = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    console.log('event', e);
    e.preventDefault();
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${e.id}`)
    .then(res => {
      updateColors(colors);
      push(`/bubbles/${e.id}`);
    })
    .catch(err => {
      console.log(err);
    })
  };

  const deleteColor = color => {

    console.log('color', color);
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      colors = colors.filter(obj => obj.id !== Number(color.id) );
      updateColors(colors);
      push('/bubbles');
    })
    .catch(err => {
      console.log(err);
    })  
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
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
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.
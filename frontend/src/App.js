import './App.css';
import React, { useState } from 'react';

function App() {
  // state to hold the items: will store all the get request items
  const [items, setItems] = useState([
  {
      name: "Notebook",
      from: "XYZ",
      date: "19/04/25",
      type: "Borrowed",
      status: "Pending",
    },
    {
      name: "Calculator",
      from: "ABC",
      date: "20/04/25",
      type: "Lent",
      status: "Returned",
    },
  ]);
  // state to hold the new item: will be sent to put request for updating the database
  const [newItem, setNewItem] = useState({
    name: "",
    from: "",
    date: "",
    type: "",
    status: "",
  });
  // state to check if the item is being edited or not
  const [editIndex, setEditIndex] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({
    name: "",
    from: "",
    date: "",
    type: "",
    status: "",
  });

  // handles the edit functionality
  const handleEdit = (event, index) => {
    const { name, value } = event.target;
    setUpdatedItem({ ...updatedItem, [name]: value });
  };

  // handles the new item input
  const handleInput = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // handles the addition of the item in the list: for put request
  const addAnItem = (event) => {
    event.preventDefault();
    console.log("Item added:", newItem);
    setItems([...items, newItem]);
    // resetting the form fields
    setNewItem({
      name: "",
      from: "",
      date: "",
      type: "",
      status: "",
    });
  };

  // handles the edit functionality: for update request
  const editanItem = (index) => {
    setEditIndex(index);
    setUpdatedItem(items[index]);
  }

  // handles the save functionality: for update request
  const saveTheItem = (index) => { 
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItem };
    setItems(updatedItems);
    setEditIndex(null);
    console.log("Updated items:", updatedItem);
  };

  // handles the delete functionality: for delete request
  const deleteAnItem = (index) => { 
    console.log("Delete item at index:", index);
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
    console.log("Updated items:", updatedItems);
  }

  // TODO:
  // need to add the useeffect to fetch the items from the database

  return (
    <div className="App">
      {/* adding a new item */}
      <div className='AddItems'>
        <h1>Add Items</h1>
        <form onSubmit={addAnItem}>
          <input type="text" name="name" placeholder="Item Name" value={newItem.name} onChange={handleInput}/>
          <input type="text" name="from" placeholder="From" value={newItem.from} onChange={handleInput}/>
          <input type="date" name="date" placeholder="Date" value={newItem.date} onChange={handleInput}/>
          <input type="text" name="type" placeholder="Type" value={newItem.type} onChange={handleInput}/>
          <input type="text" name="status" placeholder="Status" value={newItem.status} onChange={handleInput}/>
          <button type="submit">Add Item</button>
        </form>
      </div>
      {/* displays the items lists of the user*/}
      {/* as well allows to edit or delete the items */}
      <div className='ItemsList'>
        <h1>Items List</h1>
        <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>From</th>
            <th>Date</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                <input
                      type="text"
                      name="name"
                      value={updatedItem.name}
                      onChange={(e) => handleEdit(e, index)}
                />
                ) : (item.name)}
              </td>
              <td>
                {editIndex === index ? (
                <input
                      type="text"
                      name="from"
                      value={updatedItem.from}
                      onChange={(e) => handleEdit(e, index)}
                />
                ) : (item.from)}
              </td>
              <td>
                {editIndex === index ? (
                <input
                      type="date"
                      name="date"
                      value={updatedItem.date}
                      onChange={(e) => handleEdit(e, index)}
                />
              ) : (item.date)}
              </td>
              <td>
                {editIndex === index ? (
                <input
                      type="text"
                      name="type"
                      value={updatedItem.type}
                      onChange={(e) => handleEdit(e, index)}
                />
                ) : (item.type)}
              </td>
              <td>
                {editIndex === index ? (
                <input
                      type="text"
                      name="status"
                      value={updatedItem.status}
                      onChange={(e) => handleEdit(e, index)}
                />
                ) : (item.status)}
              </td>
              <td>
                {editIndex === index ?
                  (<button onClick={() => saveTheItem(index)}>Save</button>) :
                  (<button onClick={() => editanItem(index)}>Edit</button>)
              }
                <button onClick={() => deleteAnItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default App;

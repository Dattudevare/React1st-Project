import React, { useState } from 'react';
import { Container, Button, Modal, Form, Table } from 'react-bootstrap';
import { json } from 'react-router-dom';

function Registration() {
    const [show, setShow] = useState(true);
    const [allData, SetAllData] = useState([{}])
    const [index, Setindex] = useState(0)
    const [buttonstate, SetbuttonState] = useState(true)
    const [Input, SetInput] = useState({
        fullname: "",
        email: "",
        Mobile: "",
        password: ""
    })

    function Getinputdata(e) {
        // console.log(e)
        let target = e.target
        // console.log(target)
        let value = target.value
        let key = target.name
        // console.log(value + key)
        return (
            SetInput((old) => {
                return (
                    {
                        ...old,
                        [key]: value
                    }
                )

            })
        )

    }
    let temp = {}  //for save our data  in this variable
    const getFormData = (e) => {
        e.preventDefault()
        let form = e.target
        // console.log(form);

        // let obj={
        //     k:v
        // }

        // its litteral method of object

        let formData = new FormData(form)
        // console.log(formData)

        // console.log(formData.get("fullname"))
        // console.log(formData.get("email"))
        // console.log(formData.get("mobile"))
        // console.log(formData.get("password"))

        // for destructuring data 1 by 1 it will print  thats why we have to use loop for loop
        for (let data of formData.entries()) {
            // console.log(data)
            let key = data[0]
            let value = data[1]
            // console.log(key + value)
            if (typeof (value) == 'object') {
                value = URL.createObjectURL(value)
            }
            // console.log(value)
            temp[key] = value;
        }

    }


    // insertData 
    function insertData(e) {
        e.preventDefault()
        // alert(insertData)
        getFormData(e)
        return (
            SetAllData((old) => {
                return [
                    ...old,
                    temp
                ]
            }),
            setShow(false),
            SetInput({
                fullname: "",
                email: "",
                Mobile: "",
                password: ""
            })
        )

    }






    function updateData(e) {
        e.preventDefault()
        // alert(index)
        // alert(updateData)
        // alert(Index)
        getFormData(e)
        // console.log(temp)
        const TempData = [...allData]
        // console.log(TempData)
        TempData[index] = temp
        // console.log(TempData)
        // console.log(TempData)
        return (
            setShow(false),
            SetAllData(TempData)
        )

    }

    // EditData func
    function EditeData(item) {
        // alert(item.index)
        // console.log(item)
        // let edit = itme.target
        // console.log(edit)
        return (
            setShow(true),
            SetInput(item),
            SetbuttonState(false),
            Setindex(item.index)
        )

    }

    // DeletData 

    function Deleteuser(index) {
        // console.log(index)
        // fmethod 
        // [...allData].splice(index,1)  but we have to send data which is remaining  thats why we create newe variable
        let tempdata = [...allData]
        //    console.log(tempdata)
        alert("do you want delete data")
        tempdata.splice(index, 1)
        // console.log(tempdata)

        return (
            SetAllData(tempdata)

        )
    }

    function AddButton() {
        return (
            setShow(true),
            // it will give us empty form whenever we click o plus button   
            SetInput({
                fullname: "",
                email: "",
                Mobile: "",
                password: ""
            })

        )
    }

    function Tr({ item }) {
        // console.log(item)
        return (
            <tr className='text-center'>
                <td>{item.index + 1}</td>
                <td>{item.fullname}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.Mobile}</td>
                <td><img src={item.file} alt="" width={60} height={60} /></td>
                <td>
                    <Button className='me-4' onClick={() => EditeData(item)}>
                        <i className='fa fa-edit'></i>
                    </Button>
                    <Button className='btn btn-danger'
                        onClick={() => Deleteuser(item.index)}>
                        <i className='fa fa-trash'></i>
                    </Button>
                </td>
            </tr>
        )
    }


    return (
        <>
            <h1 className='text-center'>Registraion Form</h1>
            <Button className="fa fa-plus fs-3 p-4 rounded-circle 
            position-absolute bottom-0 end-0 mb-4 me-5 "
                // when we click on add function whihc denoted by plus that time our form will empty thats why we are creating new function  
                // onClick={() => setShow(true)}></Button>
                onClick={AddButton}></Button>
            <Container>
                <Modal show={show} onHide={() => setShow(false)} >
                    <Modal.Header closeButton>
                        <Modal.Title>Registraion Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={buttonstate ? insertData : updateData}>

                            <Form.Group>
                                <Form.Label>
                                    First Name:
                                </Form.Label>
                                <Form.Control type='text' name='fullname'
                                    placeholder='full-name' onChange={Getinputdata}
                                    value={Input.fullname} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Email:
                                </Form.Label>
                                <Form.Control type='email'
                                    name='email' placeholder='email' onChange={Getinputdata}
                                    value={Input.email} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Password:
                                </Form.Label>
                                <Form.Control type='password' name='password'
                                    placeholder='full-name' onChange={Getinputdata}
                                    value={Input.password} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Mobile No:
                                </Form.Label>
                                <Form.Control type='tel' name='Mobile'
                                    placeholder='Mobile' onChange={Getinputdata}
                                    value={Input.Mobile} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Profile Photo:
                                </Form.Label>
                                <Form.Control type='file' name='file'
                                    placeholder='Mobile' />
                            </Form.Group>
                            {/* <p>{JSON.stringify(allData)}</p> */}
                            {JSON.stringify(Input)}
                            <br></br>

                            {/* <Button type='submit' className='me-3'> Submit</Button> */}
                            {/* we want both button submit or update chenge button when we click on sumbit or edit button */}

                            {
                                buttonstate ? <Button type='submit' className='me-3'> Submit</Button> :
                                    <Button type='submit' className='me-3 bg-info '> Update</Button>


                            }

                            <Button className='btn btn-danger'
                                onClick={() => setShow(false)}> Cancel</Button>

                        </Form>

                    </Modal.Body>

                </Modal>
            </Container>
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <th>sr No</th>
                            <th>First Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Mobile NO</th>
                            <th>Profile Photo</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allData.map((item, index) => {
                                item["index"] = index
                                return <Tr item={item} key={index} />
                            })
                        }

                    </tbody>
                </Table>
            </Container>

        </>
    )
}

export default Registration;
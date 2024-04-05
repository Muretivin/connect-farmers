import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, Grid, Loader } from 'semantic-ui-react';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection,doc,getDoc,serverTimestamp, updateDoc} from "firebase/firestore";
import Ome from './Ome';

const initialState = {
    namee:"",
    email:"",
    info:"",
    contact:""
}
const AddEditUser = () => {
    const [data, setData] = useState(initialState);
    const {namee,email,info,contact} = data;
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        id && getSingleProduct();
    },[id])

    const getSingleProduct = async () => {
        const docRef = doc(db, "products", id);
        const snapshot = await getDoc(docRef);
        if(snapshot.exists()){
            setData({...snapshot.data() });
        }
    };

    useEffect(() => {
        const uploadFile =() =>{
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage,file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
                setProgress(progress);
                switch (snapshot.state){
                    case "paused":
                        console.log("upload is pause");
                        break;
                    default:
                        break;
                } 
            },
            (error) => {
                console.log(error);
            },
            () =>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setData((prev) => ({...prev, img: downloadURL}));

                });
            }
            );
        };
        file && uploadFile();
    }, [file]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value});
    };
    const validate = () =>{
        let errors ={};
        if(!namee){
            errors.namee="Name is Required"
        }
        if(!email){
            errors.email="Email is Required"
        }
        if(!info){
            errors.info="Info is Required"
        }
        if(!contact){
            errors.contact="Contact is Required"
        }
        return errors;
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        let errors = validate();
        if (Object.keys(errors).length) return setErrors(errors);
        setIsSubmit(true);
        if(!id){
            try{
                await addDoc(collection(db, "products"),{
                    ...data,
                    timestamp:serverTimestamp()
                 });

            }catch (error){
                console.log(error);
            }
        } else {
            try{
                await updateDoc(doc(db, "products", id),{
                    ...data,
                    timestamp:serverTimestamp()
                 });

            }catch (error){
                console.log(error);
            }
        }
          
           navigate("/");
    };

  return (
    <div>
        <Grid centered verticalAlign='middle' columns='3' style={{height: "80vh"}}>
            <Grid.Row>
                <Grid.Column textAlign='center'>
                    <div>
                        {isSubmit ? ( <Loader active inline="centered" size='huge' />
                        ) :(
                            <>
                              <h2> {id ? "Update User" : "Add User"}</h2>
                              <Form onSubmit={handleSubmit}>
                                <Form.Input label='Name' error={errors.namee ? {content:errors.namee} : null} placeholder='Enter product name' name='namee' onChange={handleChange} value={namee} autoFocus />
                                <Form.Input label='Email' error={errors.email ? {content:errors.email} : null} placeholder='Enter email' name='email' onChange={handleChange} value={email}  />
                                <Form.Input label='Info' error={errors.info ? {content:errors.info} : null} placeholder='Enter info' name='info' onChange={handleChange} value={info}  />
                                <Form.Input label='Contact' error={errors.contact ? {content:errors.contact} : null} placeholder='Enter Contact' name='contact' onChange={handleChange} value={contact}  />
                                <Form.Input label='Upload' type="file" onChange={(e) => setFile(e.target.files[0])} />
                                <Button primary type='submit' disabled={progress !== null && progress < 100}>
                                    Submit
                                </Button>
                              </Form>
                            </>
                        )}
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        
    </div>
  )
}

export default AddEditUser
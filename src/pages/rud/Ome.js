import React from 'react';
import { db } from '../../firebase';
import { Button, Card, Container, Grid, Image } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot} from "firebase/firestore";
import ModalComp from '../../components/crud/ModalComp';



const Ome = () => {
    const [products, setProducts] =useState([]);
    const [open, setOpen] =useState(false);
    const [product, setProduct] =useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const unsub = onSnapshot(collection(db, "products"), (snapshot) =>{
            let list =[];
            snapshot.docs.forEach((doc) => {
                list.push({id: doc.id, ...doc.data()})
            });
            setProducts(list);
            setLoading(false);

        },
        (error) => {
            console.log(error);
        }
        );
        return () => {
            unsub();
        };
    }, []);

    const handleModal = (item) => {
        setOpen(true);
        setProduct(item);
    };
    const handleDelete = async (id) =>{
        if(window.confirm("Are you sure to delete that product")){
            try{
                setOpen(false);
                await deleteDoc(doc(db, "products", id));
                setProducts(products.filter((product) => product.id !== id));
            } catch (err){
                console.log(err);
            }
        }
    };
  return (
    <Container>
        <Card.Group>
            <Grid  stackable>
                {products && products.map((item) => (
                    <Grid.Column key={item.id}>
                        <Card >
                            <Card.Content>
                                <Image src={item.img} size="medium" style={{
                                    height: "150px",
                                    width: "150px",
                                    borderRadius: "50%",
                                }}
                                />
                                <Card.Header style={{marginTop: "10px"}}>
                                    {item.namee}
                                </Card.Header>
                                <Card.Description> {item.info}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div>
                                    <Button color='green' onClick={() => navigate(`/update/${item.id}`)}>Update</Button>
                                    <Button color='purple' onClick={() => handleModal(item)}>View</Button>
                                    {open && (
                                        <ModalComp
                                            open={open}
                                            setOpen={setOpen}
                                            handleDelete={handleDelete}
                                            {...product} 
                                         />
                                    )}
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                ))}
            </Grid>
        </Card.Group>
    </Container>
  )
}

export default Ome
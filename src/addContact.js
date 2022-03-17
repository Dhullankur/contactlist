import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "./store/actions";
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import './style.scss'
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const AddContact = (props) => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState("");
    const [state, setState] = useState({
        name: "",
        phone: "",
        nameError: "",
        phoneError: ""
    })
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState("");
    const [isOnWhatsapp, setIsOnWhatsapp] = useState(false);
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch();
    const selectValues = [
        {
            value: "Personal"
        },
        {
            value: "Office"
        }
    ]


    const handleChange = () => {
        setIsOnWhatsapp(!isOnWhatsapp);
    };

    const Input = styled('input')({
        display: 'none',
    });

    const [phoneType, setPhoneType] = useState("Personal");

    const handleChangeDropdown = (e) => {
        setPhoneType(e.target.value);
    };

    const handleName = (e) => {
        let userName = e.target.value;
        setNameError("");
        if (!userName) {
            setNameError("Name is required");
        } else if (userName.length < 3) {
            setNameError("Name must be 3 character long");
        }
        setName(e.target.value);
    };

    const handlePhone = (e) => {
        let userPhone = e.target.value;
        setPhoneError("");
        if (!userPhone) {
            setPhoneError("Phone number is required");
        } else if (userPhone.length !== 10) {
            setPhoneError("Phone number must be 10 digit long");
        }
        setPhone(e.target.value);
    }

    const handleAddBtn = () => {

        if (name.length < 4) {
            setNameError("name is required");
            return;
        };
        if (phone.length !== 10) {
            setPhoneError("phone number is required");
            return;
        };
        dispatch(addContact({ name, phone, isOnWhatsapp, phoneType, photo }));
        props.history.push('/');

    }

    const handleDelete = () => {
        setPhoto(null);
    }
    return (
        <>
            <Container maxWidth="sm" className='style'>

                <Paper elevation={2} className='p-20'>
                    <Typography variant='h6' className='title'>
                        Add Contact Details
                    </Typography>
                    <Grid container spacing={2} direction={"column"} >
                        <Grid item xs={12}>

                            {photo ? <div className="userAvatar"> <Avatar alt="Contact photo" src={photo} />
                                <IconButton onClick={handleDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                                :
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" type="file" onChange={(e) => { setPhoto(URL.createObjectURL(e.target.files[0])) }} />
                                    <Button variant="contained" component="span" >
                                        Upload your photo
                                    </Button>


                                </label>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="outlined-basic"
                                label="add contact name"
                                variant="outlined"
                                fullWidth
                                name="name"
                                value={name}
                                error={!!nameError}
                                helperText={nameError}
                                onChange={handleName}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="outlined-basic"
                                label="add phone"
                                fullWidth
                                variant="outlined"
                                name="phone"
                                value={phone}
                                error={!!phoneError}
                                helperText={phoneError}
                                onChange={handlePhone}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-currency-native"
                                select
                                label="Phone type"
                                value={phoneType}
                                fullWidth
                                onChange={handleChangeDropdown}
                            >
                                {selectValues.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isOnWhatsapp}
                                    onChange={handleChange}
                                />
                                Available on whatsapp
                            </label>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                type="button"
                                size="large"
                                onClick={handleAddBtn}
                            >Add
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    )
};

export default AddContact;